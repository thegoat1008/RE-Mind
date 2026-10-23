package com.remind.ai;

import org.springframework.stereotype.Component;
import tools.jackson.databind.json.JsonMapper;

import java.io.InputStream;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;

/** Small, manually verified national information catalog; not a benefit eligibility engine. */
@Component
public class PolicyCatalog {
    public record Policy(String id, String title, String summary, String eligibility,
                         String application, String sourceUrl, String verifiedAt) {}
    public record Entry(String id, String title, String summary, String eligibility,
                        String application, String sourceUrl, String verifiedAt, List<String> keywords) {
        Policy policy() { return new Policy(id, title, summary, eligibility, application, sourceUrl, verifiedAt); }
    }
    private record Match(Entry entry, int score) {}
    private final List<Entry> entries;

    public PolicyCatalog() {
        try (InputStream input = PolicyCatalog.class.getResourceAsStream("/ai/policies.json")) {
            if (input == null) throw new IllegalStateException("Policy catalog resource is missing");
            entries = List.of(JsonMapper.builder().build().readValue(input, Entry[].class));
        } catch (Exception exception) {
            throw new IllegalStateException("Policy catalog could not be loaded", exception);
        }
    }

    public List<Policy> search(String message, String region) {
        String text = normalize(message);
        // No municipality records are present: region must never imply local availability or eligibility.
        // Unsupported money/medical/legal queries must not silently receive generic family-program matches.
        if (text.matches(".*(?:외계인|우주인|청년|출산|육아|주택|주거|자동차|실업|창업|장학|대출|세금|치료비|약값|지원금|현금|얼마|비용지원).*")) {
            return List.of();
        }
        List<Match> matches = new ArrayList<>();
        for (Entry entry : entries) {
            int score = 0;
            for (String keyword : entry.keywords()) {
                if (text.contains(normalize(keyword))) score++;
            }
            if (score > 0) matches.add(new Match(entry, score));
        }
        return matches.stream().sorted(Comparator.comparingInt(Match::score).reversed()
                        .thenComparing(match -> match.entry().id()))
                .limit(3).map(match -> match.entry().policy()).toList();
    }

    private String normalize(String value) {
        return Normalizer.normalize(value == null ? "" : value, Normalizer.Form.NFKC)
                .toLowerCase(Locale.ROOT).replaceAll("\\s+", "");
    }
}
