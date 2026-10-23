package com.remind.rag;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;

/** Immutable BM25 + Korean bigram snapshot built only from imported DB rows. */
public final class KnowledgeIndex {
    private static final int CHUNK_SIZE = 480;
    private static final int OVERLAP = 100;
    private static final int MAX_CHUNKS = 10_000;
    private static final int MAX_TOTAL_CHARS = 20_000_000;
    private static final Set<String> STOP_WORDS = Set.of("지원", "비용", "대상", "절차", "신청", "기관", "확인",
        "상담", "제도", "도움", "요건", "여부", "자료", "내용", "이용", "안내", "최신", "지급", "조건", "금액",
        "무엇", "어떻게", "알려줘", "알려주세요", "뭔가요", "있나요", "있습니다", "합니다", "하세요", "그리고",
        "하는", "위한", "대한", "있는", "등에", "따라", "있으며", "해야", "받을", "우리", "현재", "가족");
    private static final Pattern WORD = Pattern.compile("[\\p{L}\\p{N}]+", Pattern.UNICODE_CHARACTER_CLASS);
    private static final Pattern PARTICLE = Pattern.compile("(?:인가요|일까요|에서|으로|부터|까지|에게|한테|은|는|을|를|이|가|에|와|과|도|로|의)$");
    private final List<Chunk> chunks;
    private final Map<String, Integer> wordDf;
    private final Map<String, Integer> gramDf;
    private final double averageWords;
    private final double averageGrams;

    public KnowledgeIndex(List<RagDocument> documents) {
        if (documents == null || documents.size() > 1000) throw invalidCorpus();
        List<Chunk> built = new ArrayList<>();
        Set<String> ids = new HashSet<>();
        int totalChars = 0;
        for (RagDocument document : documents) {
            if (document == null || !ids.add(document.id())) throw invalidCorpus();
            totalChars += document.content().length();
            if (totalChars > MAX_TOTAL_CHARS) throw invalidCorpus();
            List<int[]> spans = split(document.content());
            for (int i = 0; i < spans.size(); i++) {
                int[] span = spans.get(i);
                var excerpt = new Models.Knowledge(document.id() + ":chunk-" + (i + 1), document.title(),
                    document.kind(), document.content().substring(span[0], span[1]), document.sourceUrl(),
                    "", List.of(), document.fetchedAt().toString(), document.sourceUpdatedAt());
                built.add(new Chunk(document.id(), span[0], span[1], excerpt, frequencies(words(excerpt.text())),
                    frequencies(grams(excerpt.text())), frequencies(words(document.title())), spans.size()));
                if (built.size() > MAX_CHUNKS) throw invalidCorpus();
            }
        }
        chunks = List.copyOf(built);
        wordDf = documentFrequencies(chunks, false);
        gramDf = documentFrequencies(chunks, true);
        averageWords = Math.max(1, chunks.stream().mapToInt(c -> count(c.words())).average().orElse(1));
        averageGrams = Math.max(1, chunks.stream().mapToInt(c -> count(c.grams())).average().orElse(1));
    }

    /** Returns at most four exact registered text excerpts. No match is a valid result. */
    public List<Models.Knowledge> search(String query) {
        if (query == null || query.isBlank()) return List.of();
        String expanded = expand(query.length() > 4000 ? query.substring(0, 4000) : query);
        Set<String> queryWords = new HashSet<>(words(expanded));
        Set<String> queryGrams = new HashSet<>(grams(expanded));
        String compactQuery = compact(expanded);
        List<Scored> ranked = new ArrayList<>();
        for (Chunk chunk : chunks) {
            long exact = queryWords.stream().filter(chunk.words()::containsKey).count();
            long gramMatches = queryGrams.stream().filter(chunk.grams()::containsKey).count();
            boolean keyword = chunk.knowledge().keywords().stream().map(KnowledgeIndex::compact)
                .anyMatch(k -> k.length() >= 3 && compactQuery.contains(k));
            boolean headline = queryWords.stream().anyMatch(w -> w.length() >= 3 && chunk.metadata().containsKey(w));
            // Metadata can identify a short summary, but cannot make every part of a long document relevant.
            boolean metadataMatch = chunk.documentChunks() == 1 && (keyword || headline);
            double gramCoverage = gramMatches / (double) Math.max(1, queryGrams.size());
            if (exact == 0 && !metadataMatch && !(gramMatches >= 3 && gramCoverage >= 0.22)) continue;
            double score = bm25(queryWords, chunk.words(), wordDf, averageWords)
                + 0.45 * bm25(queryGrams, chunk.grams(), gramDf, averageGrams)
                + 0.12 * bm25(queryWords, chunk.metadata(), wordDf, averageWords)
                + (metadataMatch ? 0.9 : 0);
            if (score > 0) ranked.add(new Scored(chunk, score));
        }
        ranked.sort(Comparator.comparingDouble(Scored::score).reversed().thenComparing(s -> s.chunk().knowledge().id()));
        List<Models.Knowledge> result = new ArrayList<>();
        Map<String, Integer> perDocument = new HashMap<>();
        for (Scored item : ranked) {
            Chunk chunk = item.chunk();
            if (perDocument.getOrDefault(chunk.documentId(), 0) >= 2) continue;
            result.add(chunk.knowledge());
            perDocument.merge(chunk.documentId(), 1, Integer::sum);
            if (result.size() == 4) break;
        }
        return List.copyOf(result);
    }

    private double bm25(Set<String> query, Map<String, Integer> tf, Map<String, Integer> df, double average) {
        double score = 0;
        int length = count(tf);
        for (String term : query) {
            int frequency = tf.getOrDefault(term, 0);
            if (frequency == 0) continue;
            double idf = Math.log(1 + (chunks.size() - df.getOrDefault(term, 0) + 0.5) / (df.getOrDefault(term, 0) + 0.5));
            score += idf * frequency * 2.2 / (frequency + 1.2 * (0.25 + 0.75 * length / average));
        }
        return score;
    }

    private static String expand(String query) {
        String compact = compact(query);
        StringBuilder expanded = new StringBuilder(query);
        boolean care = compact.matches(".*(돌보|돌봄|간병|치매|장기요양|가족요양).*" );
        boolean money = compact.matches(".*(비용|돈|수당|지원금|경제|부담|지원받|나라에서|정부).*" );
        if (care && money) expanded.append(" 돌봄비용 경제적지원 지원제도");
        if (compact.contains("가족요양비") || (care && money && compact.matches(".*(가족|엄마|어머니|아빠|아버지|할머니|할아버지).*")))
            expanded.append(" 가족요양비 가족돌봄수당");
        if (care && compact.matches(".*(낮.*맡|맡길|주간|낮동안).*")) expanded.append(" 주간보호 주야간보호");
        if (care && compact.matches(".*(집으로.*[오와]|방문.*도움|집에서).*")) expanded.append(" 방문요양 재가급여");
        if (compact.matches(".*(장기요양.*신청|등급.*[받신]|인정.*신청).*")) expanded.append(" 인정신청 신청절차 장기요양");
        return expanded.toString();
    }

    private static List<String> words(String text) {
        List<String> words = new ArrayList<>();
        var matcher = WORD.matcher(text.toLowerCase(Locale.ROOT));
        while (matcher.find()) {
            String word = matcher.group();
            String stripped = PARTICLE.matcher(word).replaceFirst("");
            if (stripped.length() >= 2) word = stripped;
            if (word.length() >= 2 && !STOP_WORDS.contains(word)) words.add(word);
        }
        return words;
    }
    private static List<String> grams(String text) {
        List<String> result = new ArrayList<>();
        for (String word : words(text)) {
            if (!word.matches("[가-힣]+")) continue;
            for (int i = 0; i + 2 <= word.length(); i++) result.add(word.substring(i, i + 2));
        }
        return result;
    }
    private static String compact(String text) { return text.toLowerCase(Locale.ROOT).replaceAll("[^\\p{L}\\p{N}]", ""); }
    private static Map<String, Integer> frequencies(List<String> terms) {
        Map<String, Integer> counts = new HashMap<>();
        terms.forEach(term -> counts.merge(term, 1, Integer::sum));
        return Map.copyOf(counts);
    }
    private static int count(Map<String, Integer> frequencies) { return frequencies.values().stream().mapToInt(Integer::intValue).sum(); }
    private static Map<String, Integer> documentFrequencies(List<Chunk> chunks, boolean grams) {
        Map<String, Integer> result = new HashMap<>();
        for (Chunk chunk : chunks) (grams ? chunk.grams() : chunk.words()).keySet().forEach(term -> result.merge(term, 1, Integer::sum));
        return Map.copyOf(result);
    }

    private static List<int[]> split(String text) {
        List<int[]> spans = new ArrayList<>();
        int start = 0;
        while (start < text.length()) {
            while (start < text.length() && Character.isWhitespace(text.charAt(start))) start++;
            if (start >= text.length()) break;
            int end = Math.min(text.length(), start + CHUNK_SIZE);
            if (end < text.length()) {
                int paragraph = text.lastIndexOf("\n\n", end);
                int sentence = text.lastIndexOf(". ", end);
                int boundary = Math.max(paragraph, sentence < 0 ? -1 : sentence + 1);
                if (boundary >= start + CHUNK_SIZE / 2) end = boundary;
                else {
                    int space = text.lastIndexOf(' ', end);
                    if (space > start + CHUNK_SIZE / 2) end = space;
                }
            }
            int trimmedEnd = end;
            while (trimmedEnd > start && Character.isWhitespace(text.charAt(trimmedEnd - 1))) trimmedEnd--;
            spans.add(new int[] {start, trimmedEnd});
            if (end == text.length()) break;
            int next = Math.max(start + 1, end - OVERLAP);
            // Retain an overlap without cutting a word when a nearby boundary is available.
            int floor = Math.max(start + 1, next - 40);
            while (next > floor && !Character.isWhitespace(text.charAt(next - 1))) next--;
            start = next;
        }
        return spans;
    }

    private static Problem invalidCorpus() {
        return new Problem(503, "RAG_INDEX_LIMIT", "검색할 공식 자료의 크기나 식별자를 확인해 주세요. 색인을 구성하지 못했습니다.", false);
    }
    private record Chunk(String documentId, int start, int end, Models.Knowledge knowledge,
                         Map<String, Integer> words, Map<String, Integer> grams, Map<String, Integer> metadata,
                         int documentChunks) { }
    private record Scored(Chunk chunk, double score) { }
}
