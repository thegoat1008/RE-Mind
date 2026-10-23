package com.remind.rag;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.net.URI;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HexFormat;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Flow;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import javax.xml.XMLConstants;
import javax.xml.parsers.DocumentBuilderFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.ErrorHandler;
import org.xml.sax.SAXParseException;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.json.JsonMapper;

/** Manual, bounded imports from three fixed public providers. No model controls a URL. */
public final class PublicDataClient {
    static final int MAX_BYTES = 8 * 1024 * 1024;
    static final String EVENT_PATH = "15161440/v1/uddi:51971c19-2f02-4625-9932-f0850fc01f64";
    private static final String WELFARE_SOURCE = "https://www.data.go.kr/data/15090532/openapi.do";
    private static final String HOSPITAL_SOURCE = "https://www.data.go.kr/data/15001698/openapi.do";
    private static final String EVENT_SOURCE = "https://www.data.go.kr/data/15161440/fileData.do";
    private static final int PAGE_SIZE = 100;
    private final HttpClient http;
    private final JsonMapper json;
    private final String key;
    private final Duration timeout;
    private final URI welfareBase;
    private final URI hospitalBase;
    private final URI eventBase;

    public PublicDataClient(HttpClient http, JsonMapper json, String serviceKey, Duration timeout) {
        this(http, json, serviceKey, timeout,
            URI.create("https://apis.data.go.kr/B554287/NationalWelfareInformationsV001/"),
            URI.create("https://apis.data.go.kr/B551182/hospInfoServicev2/"),
            URI.create("https://api.odcloud.kr/api/"), false);
    }

    /** Test-only loopback endpoints; arbitrary remote hosts are never accepted. */
    PublicDataClient(HttpClient http, JsonMapper json, String serviceKey, Duration timeout,
                     URI welfareBase, URI hospitalBase, URI eventBase) {
        this(http, json, serviceKey, timeout, welfareBase, hospitalBase, eventBase, true);
    }

    private PublicDataClient(HttpClient http, JsonMapper json, String serviceKey, Duration timeout,
                             URI welfareBase, URI hospitalBase, URI eventBase, boolean testing) {
        if (http.followRedirects() != HttpClient.Redirect.NEVER)
            throw new IllegalArgumentException("Public data HTTP redirects must be disabled");
        if (timeout == null || timeout.isZero() || timeout.isNegative())
            throw new IllegalArgumentException("A positive timeout is required");
        if (testing) for (URI base : List.of(welfareBase, hospitalBase, eventBase)) {
            if (!"http".equals(base.getScheme()) || !List.of("localhost", "127.0.0.1", "[::1]", "::1").contains(base.getHost())
                || base.getRawQuery() != null || base.getFragment() != null || base.getUserInfo() != null)
                throw new IllegalArgumentException("Test endpoints must be loopback HTTP origins");
        }
        this.http = http;
        this.json = json;
        this.key = normalizeKey(serviceKey);
        this.timeout = timeout;
        this.welfareBase = trailingSlash(welfareBase);
        this.hospitalBase = trailingSlash(hospitalBase);
        this.eventBase = trailingSlash(eventBase);
    }

    public List<RagDocument> welfare(String query, int maxPages, int maxDetails) {
        checkPages(maxPages);
        if (maxDetails < 1 || maxDetails > 10) throw new IllegalArgumentException("maxDetails must be 1..10");
        query = cleanQuery(query, "치매");
        Map<String, Element> candidates = new LinkedHashMap<>();
        for (int page = 1; page <= maxPages && candidates.size() < maxDetails; page++) {
            Element root = xml(get(welfareBase, "NationalWelfarelistV001", Map.of(
                "serviceKey", key, "callTp", "L", "pageNo", String.valueOf(page),
                "numOfRows", String.valueOf(PAGE_SIZE), "srchKeyCode", "003", "searchWrd", query)));
            verifyXmlResult(root);
            Element wanted = requiredElement(root, "wantedList");
            List<Element> items = elements(wanted, "servList");
            for (Element item : items) {
                String id = requiredText(item, "servId");
                candidates.putIfAbsent(id, item);
                if (candidates.size() == maxDetails) break;
            }
            long total = count(wanted, "totalCount");
            if (items.isEmpty() || (total >= 0 && candidates.size() >= total)) break;
        }
        List<RagDocument> documents = new ArrayList<>();
        for (Map.Entry<String, Element> candidate : candidates.entrySet()) {
            Element root = xml(get(welfareBase, "NationalWelfaredetailedV001",
                Map.of("serviceKey", key, "callTp", "D", "servId", candidate.getKey())));
            verifyXmlResult(root);
            Element detail = requiredElement(root, "wantedDtl");
            if (!candidate.getKey().equals(requiredText(detail, "servId"))) throw invalid();
            StringBuilder content = new StringBuilder();
            append(content, "서비스명", requiredText(detail, "servNm"));
            append(content, "소관부처", text(detail, "jurMnofNm"));
            append(content, "서비스 요약", text(detail, "wlfareInfoOutlCn"));
            append(content, "지원 대상", text(detail, "tgtrDtlCn"));
            append(content, "선정 기준", text(detail, "slctCritCn"));
            append(content, "지원 내용", text(detail, "alwServCn"));
            append(content, "기준연도", text(detail, "crtrYr"));
            append(content, "지원 주기", text(detail, "sprtCycNm"));
            append(content, "제공 유형", text(detail, "srvPvsnNm"));
            append(content, "생애주기", text(detail, "lifeArray"));
            append(content, "가구 유형", text(detail, "trgterIndvdlArray"));
            append(content, "관심 주제", text(detail, "intrsThemaArray"));
            append(content, "문의처", text(detail, "rprsCtadr"));
            appendGroups(content, detail, "applmetList", "이용 및 신청 방법");
            appendGroups(content, detail, "inqplCtadrList", "문의 기관");
            appendGroups(content, detail, "inqplHmpgReldList", "관련 사이트");
            appendGroups(content, detail, "basfrmList", "서식 자료");
            appendGroups(content, detail, "baslawList", "근거법령명 (법령 본문 아님)");
            String source = officialLink(text(candidate.getValue(), "servDtlLink"), WELFARE_SOURCE, "bokjiro.go.kr");
            documents.add(RagDocument.create("WELFARE", candidate.getKey(), "POLICY",
                requiredText(detail, "servNm"), bounded(content.toString()), source,
                text(detail, "crtrYr"), Instant.now()));
        }
        return List.copyOf(documents);
    }

    public List<RagDocument> hospitals(String name, String sidoCode, int maxPages) {
        checkPages(maxPages);
        name = cleanQuery(name, "");
        sidoCode = sidoCode == null ? "" : sidoCode.strip();
        if (!sidoCode.isEmpty() && !sidoCode.matches("[0-9]{6}"))
            throw new IllegalArgumentException("sidoCode must be an official six-digit HIRA code");
        Map<String, RagDocument> documents = new LinkedHashMap<>();
        for (int page = 1; page <= maxPages; page++) {
            Map<String, String> params = new LinkedHashMap<>();
            params.put("ServiceKey", key); // Official HIRA Swagger uses upper-case S.
            params.put("pageNo", String.valueOf(page)); params.put("numOfRows", String.valueOf(PAGE_SIZE));
            if (!name.isEmpty()) params.put("yadmNm", name);
            if (!sidoCode.isEmpty()) params.put("sidoCd", sidoCode);
            Element root = xml(get(hospitalBase, "getHospBasisList", params));
            verifyXmlResult(root);
            Element body = requiredElement(root, "body");
            List<Element> items = elements(body, "item");
            for (Element item : items) {
                String id = requiredText(item, "ykiho");
                StringBuilder content = new StringBuilder();
                append(content, "병원명", requiredText(item, "yadmNm"));
                append(content, "종별", text(item, "clCdNm"));
                append(content, "시도", text(item, "sidoCdNm"));
                append(content, "시군구", text(item, "sgguCdNm"));
                append(content, "읍면동", text(item, "emdongNm"));
                append(content, "주소", text(item, "addr"));
                append(content, "전화", text(item, "telno"));
                append(content, "경도", text(item, "XPos"));
                append(content, "위도", text(item, "YPos"));
                append(content, "개설일", text(item, "estbDd"));
                append(content, "자료 범위", "의료기관 신고 기본정보입니다. 치매 전문성, 현재 진료·예약 가능 여부와 복지 자격은 확인하지 않습니다.");
                documents.put(id, RagDocument.create("HIRA", id, "HOSPITAL", requiredText(item, "yadmNm"),
                    bounded(content.toString()), HOSPITAL_SOURCE, "", Instant.now()));
            }
            long total = count(body, "totalCount");
            if (items.isEmpty() || (total >= 0 && documents.size() >= total)) break;
        }
        return List.copyOf(documents.values());
    }

    public List<RagDocument> events(int maxPages) {
        checkPages(maxPages);
        Map<String, RagDocument> documents = new LinkedHashMap<>();
        String[][] fields = {{"치매안심센터명", "치매안심센터"}, {"구분", "구분"}, {"행사명", "행사명"},
            {"행사일", "행사일"}, {"장소", "장소"}, {"기획의도", "기획의도"}, {"모집여부", "모집여부"},
            {"모집시작일", "모집시작일"}, {"모집종료일", "모집종료일"}, {"참석자수", "참석자수"}};
        for (int page = 1; page <= maxPages; page++) {
            JsonNode root;
            try { root = json.readTree(get(eventBase, EVENT_PATH, Map.of("serviceKey", key,
                "page", String.valueOf(page), "perPage", String.valueOf(PAGE_SIZE), "returnType", "JSON"))); }
            catch (Problem e) { throw e; }
            catch (Exception e) { throw invalid(); }
            if (root == null || !root.isObject() || !root.path("data").isArray()
                || !root.path("currentCount").isNumber() || !root.path("totalCount").isNumber()) throw invalid();
            JsonNode rows = root.path("data");
            for (JsonNode row : rows) {
                String title = jsonText(row, "행사명");
                if (title.isBlank()) throw invalid();
                String center = jsonText(row, "치매안심센터명");
                String date = jsonText(row, "행사일");
                String place = jsonText(row, "장소");
                String id = "event-" + sha256(center + "\0" + title + "\0" + date + "\0" + place);
                StringBuilder content = new StringBuilder();
                for (String[] field : fields) append(content, field[1], jsonText(row, field[0]));
                append(content, "자료 범위", "2026-08-19 행사 현황 자료입니다. 현재 모집 중인지와 참석 가능 여부는 담당 센터에 확인해야 합니다.");
                String source = officialLink(jsonText(row, "자세히보기주소"), EVENT_SOURCE, "nid.or.kr");
                documents.put(id, RagDocument.create("ODCLOUD", id, "EVENT", title,
                    bounded(content.toString()), source, "2026-08-19", Instant.now()));
            }
            long total = root.path("matchCount").isNumber() ? root.path("matchCount").asLong() : root.path("totalCount").asLong();
            if (rows.isEmpty() || documents.size() >= total) break;
        }
        return List.copyOf(documents.values());
    }

    private byte[] get(URI base, String operation, Map<String, String> parameters) {
        if (key.isBlank()) throw new Problem(503, "PUBLIC_DATA_NOT_CONFIGURED", "공공데이터 API 인증키가 설정되지 않았어요.", false);
        StringBuilder query = new StringBuilder();
        parameters.forEach((name, value) -> {
            if (!query.isEmpty()) query.append('&');
            query.append(encode(name)).append('=').append(encode(value));
        });
        URI endpoint = URI.create(base.resolve(operation).toASCIIString() + "?" + query);
        HttpRequest request = HttpRequest.newBuilder(endpoint).timeout(timeout).header("Accept", "application/xml, application/json")
            .GET().build();
        CompletableFuture<HttpResponse<byte[]>> future = http.sendAsync(request, ignored -> new LimitedSubscriber(MAX_BYTES));
        try {
            HttpResponse<byte[]> response = future.get(timeout.toMillis(), TimeUnit.MILLISECONDS);
            if (response.statusCode() == 401 || response.statusCode() == 403) throw auth();
            if (response.statusCode() == 429) throw limit();
            if (response.statusCode() < 200 || response.statusCode() >= 300) throw unavailable();
            return response.body();
        } catch (InterruptedException e) { future.cancel(true); Thread.currentThread().interrupt(); throw unavailable();
        } catch (TimeoutException e) { future.cancel(true); throw unavailable();
        } catch (ExecutionException e) {
            Throwable cause = e.getCause();
            while (cause != null && cause.getCause() != null && !(cause instanceof Problem)) cause = cause.getCause();
            if (cause instanceof Problem problem) throw problem;
            throw unavailable();
        }
    }

    private static Element xml(byte[] bytes) {
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            factory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);
            factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
            factory.setFeature("http://xml.org/sax/features/external-general-entities", false);
            factory.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
            factory.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);
            factory.setAttribute(XMLConstants.ACCESS_EXTERNAL_DTD, "");
            factory.setAttribute(XMLConstants.ACCESS_EXTERNAL_SCHEMA, "");
            factory.setXIncludeAware(false);
            factory.setExpandEntityReferences(false);
            var builder = factory.newDocumentBuilder();
            builder.setErrorHandler(new ErrorHandler() {
                @Override public void warning(SAXParseException e) throws SAXParseException { throw e; }
                @Override public void error(SAXParseException e) throws SAXParseException { throw e; }
                @Override public void fatalError(SAXParseException e) throws SAXParseException { throw e; }
            });
            Document document = builder.parse(new ByteArrayInputStream(bytes));
            return document.getDocumentElement();
        } catch (Exception e) { throw invalid(); }
    }

    private static void verifyXmlResult(Element root) {
        String code = text(root, "returnReasonCode");
        if (code.isEmpty()) code = text(root, "resultCode");
        if (code.isEmpty()) throw invalid();
        if (List.of("0", "00", "0000").contains(code)) return;
        if (List.of("20", "30", "31", "32").contains(code)) throw auth();
        if (List.of("22", "23").contains(code)) throw limit();
        throw new Problem(502, "PUBLIC_DATA_API_ERROR", "공공데이터 API가 요청을 처리하지 못했어요. API 승인 상태와 검색 조건을 확인해 주세요.", true);
    }

    private static void appendGroups(StringBuilder out, Element parent, String tag, String label) {
        for (Element group : elements(parent, tag)) {
            append(out, label, text(group, "servSeDetailNm"));
            append(out, label + " 안내", text(group, "servSeDetailLink"));
        }
    }
    private static void append(StringBuilder out, String label, String value) {
        if (!value.isBlank()) out.append(label).append(": ").append(value.strip()).append('\n');
    }
    private static List<Element> elements(Element parent, String tag) {
        List<Element> result = new ArrayList<>();
        NodeList children = parent.getElementsByTagName(tag);
        for (int index = 0; index < children.getLength(); index++) result.add((Element) children.item(index));
        return result;
    }
    private static Element requiredElement(Element parent, String tag) {
        if (parent.getTagName().equals(tag)) return parent;
        List<Element> elements = elements(parent, tag);
        if (elements.isEmpty()) throw invalid();
        return elements.get(0);
    }
    private static String text(Element parent, String tag) {
        Node node = parent.getTagName().equals(tag) ? parent : parent.getElementsByTagName(tag).item(0);
        return node == null ? "" : node.getTextContent().strip();
    }
    private static String requiredText(Element parent, String tag) {
        String value = text(parent, tag);
        if (value.isBlank()) throw invalid();
        return value;
    }
    private static long count(Element parent, String tag) {
        try { return Long.parseLong(text(parent, tag)); }
        catch (NumberFormatException e) { return -1; }
    }
    private static String jsonText(JsonNode row, String key) {
        JsonNode value = row.path(key);
        if (value.isMissingNode() || value.isNull()) return "";
        if (!value.isString() && !value.isNumber() && !value.isBoolean()) throw invalid();
        return (value.isString() ? value.asString() : value.toString()).strip();
    }
    private static String officialLink(String value, String fallback, String hostSuffix) {
        try {
            URI uri = URI.create(value);
            String host = uri.getHost();
            String query = uri.getRawQuery() == null ? "" : uri.getRawQuery().toLowerCase(java.util.Locale.ROOT);
            if (value.length() <= 2000 && "https".equals(uri.getScheme()) && host != null
                && (host.equals(hostSuffix) || host.endsWith("." + hostSuffix))
                && uri.getUserInfo() == null && uri.getRawFragment() == null && (uri.getPort() == -1 || uri.getPort() == 443)
                && !query.matches(".*(?:servicekey|api[_-]?key|token|authorization|password|secret|credential).*")) return value;
        } catch (Exception ignored) { }
        return fallback;
    }
    private static String normalizeKey(String value) {
        if (value == null || value.isBlank()) return "";
        try {
            String key = value.strip();
            if (key.matches(".*%[0-9a-fA-F]{2}.*")) key = URLDecoder.decode(key.replace("+", "%2B"), StandardCharsets.UTF_8);
            if (key.length() > 1024 || key.chars().anyMatch(c -> Character.isWhitespace(c) || Character.isISOControl(c)))
                throw new IllegalArgumentException("Invalid public data credential format");
            return key;
        } catch (IllegalArgumentException e) { throw new IllegalArgumentException("Invalid public data credential format"); }
    }
    private static String cleanQuery(String query, String fallback) {
        query = query == null || query.isBlank() ? fallback : query.strip();
        if (query.length() > 100 || query.chars().anyMatch(Character::isISOControl))
            throw new IllegalArgumentException("Search query must be at most 100 printable characters");
        return query;
    }
    private String bounded(String content) {
        if (content.length() > 100_000 || (!key.isEmpty() && (content.contains(key) || content.contains(encode(key))))) throw invalid();
        return content;
    }
    private static void checkPages(int value) {
        if (value < 1 || value > 5) throw new IllegalArgumentException("maxPages must be 1..5");
    }
    private static URI trailingSlash(URI uri) { return URI.create(uri.toString().endsWith("/") ? uri.toString() : uri + "/"); }
    private static String encode(String text) { return URLEncoder.encode(text, StandardCharsets.UTF_8); }
    private static String sha256(String value) {
        try { return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(value.getBytes(StandardCharsets.UTF_8))); }
        catch (Exception e) { throw new IllegalStateException("SHA-256 unavailable"); }
    }
    private static Problem invalid() { return new Problem(502, "PUBLIC_DATA_INVALID_RESPONSE", "공공데이터 응답 형식을 확인하지 못했어요. 기존 자료는 유지됩니다.", true); }
    private static Problem unavailable() { return new Problem(503, "PUBLIC_DATA_UNAVAILABLE", "공공데이터 서버에 연결하지 못했어요. 잠시 후 다시 시도해 주세요.", true); }
    private static Problem auth() { return new Problem(503, "PUBLIC_DATA_AUTH", "공공데이터 API 인증키와 해당 서비스의 활용 승인을 확인해 주세요.", false); }
    private static Problem limit() { return new Problem(429, "PUBLIC_DATA_LIMIT", "공공데이터 API 호출 한도에 도달했어요. 한도와 갱신 시간을 확인해 주세요.", true); }

    private static final class LimitedSubscriber implements HttpResponse.BodySubscriber<byte[]> {
        private final int maximum;
        private final ByteArrayOutputStream body = new ByteArrayOutputStream();
        private final CompletableFuture<byte[]> completed = new CompletableFuture<>();
        private Flow.Subscription subscription;
        LimitedSubscriber(int maximum) { this.maximum = maximum; }
        @Override public CompletionStage<byte[]> getBody() { return completed; }
        @Override public void onSubscribe(Flow.Subscription subscription) { this.subscription = subscription; subscription.request(1); }
        @Override public void onNext(List<ByteBuffer> chunks) {
            for (ByteBuffer chunk : chunks) {
                if (chunk.remaining() > maximum - body.size()) {
                    subscription.cancel(); completed.completeExceptionally(invalid()); return;
                }
                byte[] bytes = new byte[chunk.remaining()]; chunk.get(bytes); body.writeBytes(bytes);
            }
            subscription.request(1);
        }
        @Override public void onError(Throwable error) { completed.completeExceptionally(error); }
        @Override public void onComplete() { completed.complete(body.toByteArray()); }
    }
}
