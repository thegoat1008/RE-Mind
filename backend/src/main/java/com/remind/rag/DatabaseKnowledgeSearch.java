package com.remind.rag;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Pattern;

/** One immutable snapshot per source kind; approved public corpora never get mixed. */
public final class DatabaseKnowledgeSearch implements KnowledgeSearch {
    private static final Duration TTL = Duration.ofSeconds(30);
    private static final Pattern POLICY_FACT = Pattern.compile("정책|법률|법령|지원금|지원대상|자격|조건|신청서류|본인부담|급여|비용|금액|보험|등급|수급");
    private static final Pattern HOSPITAL = Pattern.compile("병원|의원|의료기관|치매안심센터");
    private static final Pattern FIND_LOCATION = Pattern.compile("찾|위치|어디|근처|주변|주소|전화|연락처|검색");
    private static final Pattern EVENT = Pattern.compile("행사|프로그램|교육일정|가족교실|자조모임|모집|행사일정|참여일정");
    private final RagDocumentRepository repository;
    private final Clock clock;
    private final Map<String, Snapshot> snapshots = new HashMap<>();

    public DatabaseKnowledgeSearch(RagDocumentRepository repository, Clock clock) {
        this.repository = repository; this.clock = clock;
    }

    @Override public List<Models.Knowledge> search(String query) {
        if (query == null || query.isBlank()) return List.of();
        String kind = sourceKind(query);
        KnowledgeIndex index;
        synchronized (snapshots) {
            Instant now = clock.instant();
            Snapshot snapshot = snapshots.get(kind);
            if (snapshot == null || now.isBefore(snapshot.createdAt()) || !now.isBefore(snapshot.createdAt().plus(TTL))) {
                snapshot = new Snapshot(now, new KnowledgeIndex(repository.findActive(kind, 1000)));
                snapshots.put(kind, snapshot);
            }
            index = snapshot.index();
        }
        return index.search(query);
    }

    /** Import completion and explicit invalidation cannot race a stale cache install. */
    public void invalidate() { synchronized (snapshots) { snapshots.clear(); } }

    static String sourceKind(String query) {
        String compact = query == null ? "" : query.replaceAll("\\s+", "").toLowerCase(Locale.ROOT);
        if (POLICY_FACT.matcher(compact).find()) return "POLICY";
        if (EVENT.matcher(compact).find()) return "EVENT";
        if (HOSPITAL.matcher(compact).find() && FIND_LOCATION.matcher(compact).find()) return "HOSPITAL";
        return "POLICY";
    }
    private record Snapshot(Instant createdAt, KnowledgeIndex index) { }
}
