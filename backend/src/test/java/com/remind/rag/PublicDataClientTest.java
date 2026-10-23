package com.remind.rag;

import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.function.Function;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import tools.jackson.databind.json.JsonMapper;
import static org.assertj.core.api.Assertions.*;

class PublicDataClientTest {
    final JsonMapper json = JsonMapper.builder().build();
    HttpServer server;
    ExecutorService executor;
    PublicDataClient client;
    URI base;
    final List<URI> requests = new CopyOnWriteArrayList<>();
    Function<URI, String> reply;
    int status = 200;
    long delayMillis;
    final String fakeKey = "synthetic-public-key+/=";

    @BeforeEach void start() throws Exception {
        server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        executor = Executors.newCachedThreadPool(); server.setExecutor(executor);
        server.createContext("/", exchange -> {
            requests.add(exchange.getRequestURI());
            try {
                if (delayMillis > 0) Thread.sleep(delayMillis);
                byte[] bytes = reply.apply(exchange.getRequestURI()).getBytes(StandardCharsets.UTF_8);
                exchange.sendResponseHeaders(status, bytes.length);
                exchange.getResponseBody().write(bytes);
            } catch (IOException ignored) { }
            catch (InterruptedException ignored) { Thread.currentThread().interrupt(); }
            finally { exchange.close(); }
        });
        server.start();
        base = URI.create("http://127.0.0.1:" + server.getAddress().getPort() + "/");
        client = create(fakeKey, Duration.ofSeconds(3));
    }
    @AfterEach void stop() { server.stop(0); executor.shutdownNow(); }
    PublicDataClient create(String key, Duration timeout) {
        return new PublicDataClient(HttpClient.newHttpClient(), json, key, timeout, base, base, base);
    }
    String list(String ids, int total) {
        StringBuilder items = new StringBuilder();
        for (String id : ids.split(",")) if (!id.isEmpty()) items.append("<servList><servId>").append(id)
            .append("</servId><servNm>목록 요약</servNm><servDgst>목록만으로는 자격을 판단하지 않음</servDgst>")
            .append("<servDtlLink>https://www.bokjiro.go.kr/detail?servId=").append(id).append("</servDtlLink></servList>");
        return "<response><wantedList><resultCode>0</resultCode><totalCount>" + total + "</totalCount>" + items + "</wantedList></response>";
    }
    String detail(String id) {
        return "<response><wantedDtl><resultCode>0</resultCode><servId>" + id + "</servId><servNm>치매 가족 지원 " + id + "</servNm>"
            + "<tgtrDtlCn>대상 조건은 담당 기관에서 확인합니다.</tgtrDtlCn><slctCritCn>소득과 돌봄 상황에 따른 조건이 있습니다.</slctCritCn>"
            + "<alwServCn>공식 상세에서 확인한 지원 내용입니다.</alwServCn><crtrYr>2026</crtrYr>"
            + "<applmetList><servSeDetailNm>관할 기관에 신청합니다.</servSeDetailNm></applmetList>"
            + "<baslawList><servSeDetailNm>관련 법령 명칭</servSeDetailNm></baslawList></wantedDtl></response>";
    }
    String hospital(String id, int total) {
        return "<response><header><resultCode>00</resultCode></header><body><totalCount>" + total + "</totalCount><items><item>"
            + "<ykiho>" + id + "</ykiho><yadmNm>가상병원 " + id + "</yadmNm><addr>가상 주소</addr>"
            + "<sidoCdNm>서울</sidoCdNm><telno>가상연락처</telno><XPos>127.1</XPos><YPos>37.1</YPos></item></items></body></response>";
    }

    @Test void welfareUsesExactListAndDetailContractsAndPreservesConditions() {
        reply = uri -> uri.getPath().endsWith("NationalWelfarelistV001") ? list("W1,W2", 2)
            : detail(uri.getRawQuery().contains("servId=W1") ? "W1" : "W2");
        List<RagDocument> docs = client.welfare("치매", 2, 2);
        assertThat(docs).hasSize(2);
        assertThat(docs.get(0).kind()).isEqualTo("POLICY");
        assertThat(docs.get(0).content()).contains("지원 대상", "선정 기준", "지원 내용", "관할 기관에 신청", "법령 본문 아님");
        assertThat(docs.get(0).content()).doesNotContain("목록만으로는");
        assertThat(docs.get(0).sourceUpdatedAt()).isEqualTo("2026");
        assertThat(docs.get(0).sourceUrl()).isEqualTo("https://www.bokjiro.go.kr/detail?servId=W1");
        assertThat(requests).hasSize(3);
        assertThat(requests.get(0).getPath()).isEqualTo("/NationalWelfarelistV001");
        assertThat(requests.get(0).getRawQuery()).contains("callTp=L", "srchKeyCode=003", "pageNo=1", "numOfRows=100", "searchWrd=%EC%B9%98%EB%A7%A4");
        assertThat(requests.get(1).getRawQuery()).contains("callTp=D", "servId=W1");
    }

    @Test void realWelfareRootDocumentsAndRepeatedApplicationMethodsAreAccepted() {
        String listXml = """
            <?xml version="1.0" encoding="UTF-8" standalone="yes"?><wantedList><totalCount>8</totalCount><pageNo>1</pageNo><numOfRows>2</numOfRows><resultCode>0</resultCode><resultMessage>SUCCESS</resultMessage><servList><inqNum>99555</inqNum><intrsThemaArray>생활지원,보호·돌봄</intrsThemaArray><jurMnofNm>보건복지부</jurMnofNm><jurOrgNm>사회서비스사업과</jurOrgNm><onapPsbltYn>Y</onapPsbltYn><rprsCtadr>129</rprsCtadr><servDgst>일상생활이 어려운 저소득층 가정에 간병·가사 서비스를 지원하여  취약계층의 생활 안정을 도모하고  가사·간병 방문 제공인력의 사회적 일자리를 창출합니다.</servDgst><servDtlLink>https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001087&amp;wlfareInfoReldBztpCd=01</servDtlLink><servId>WLF00001087</servId><servNm>가사·간병 방문 지원사업</servNm><sprtCycNm>월</sprtCycNm><srvPvsnNm>전자바우처(바우처)</srvPvsnNm><svcfrstRegTs>20210903</svcfrstRegTs><trgterIndvdlArray>장애인,저소득,한부모·조손</trgterIndvdlArray></servList><servList><inqNum>57583</inqNum><intrsThemaArray>생활지원,보호·돌봄</intrsThemaArray><jurMnofNm>보건복지부</jurMnofNm><jurOrgNm>요양보험제도과</jurOrgNm><lifeArray>노년</lifeArray><onapPsbltYn>N</onapPsbltYn><rprsCtadr>1577-1000</rprsCtadr><servDgst>가족등으로부터 방문요양에 상당한 장기요양급여를 받은 때 수급자에게 특별현금급여를 지급합니다.</servDgst><servDtlLink>https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001086&amp;wlfareInfoReldBztpCd=01</servDtlLink><servId>WLF00001086</servId><servNm>특별현금급여(가족요양비)</servNm><sprtCycNm>월</sprtCycNm><srvPvsnNm>현금지급</srvPvsnNm><svcfrstRegTs>20210903</svcfrstRegTs></servList></wantedList>
            """;
        String detailXml = """
            <?xml version="1.0" encoding="UTF-8" standalone="yes"?><wantedDtl><servId>WLF00001087</servId><servNm>가사·간병 방문 지원사업</servNm><jurMnofNm>보건복지부 사회서비스사업과</jurMnofNm><tgtrDtlCn>만 65세 미만의 기준중위소득 70% 이하 계층 중 가사·간병 서비스가 필요한 자를 지원합니다.&#13;아래에 해당하는 경우 지원대상에서 제외합니다.&#13;- 만 65세 이상의 어르신&#13;- 국고로 지원되는 아래의 동일 또는 유사 돌봄서비스를 받고 있는자 &#13; * 장애인활동지원서비스, 노인돌봄종합서비스, 노인장기요양보험급여(만 65세 미만 치매특별등급 포함) &#13;- 국민기초생활보장법 제32조에 따른 보장시설 입소자 &#13;- 의료기관 입원 중인 이용자(입원 기간 동안만 서비스 불가, 입퇴원일은 서비스 제공 가능)&#13;</tgtrDtlCn><slctCritCn>가사·간병 서비스 신청자격은 다음과 같습니다.&#13;&amp;#9312; 장애의 정도가 심한 장애인&#13;&amp;#9313; 6개월 이상 치료를 요하는 중증질환자 ※ 보건복지부장관이 고시한 중증질환 상병 해당자로, 최근 3개월 이내 발행된 진단서 또는 소견서 첨부&#13;&amp;#9314; 희귀난치성 질환자&#13; ※ 보건복지부장관이 고시한 희귀난치성 질환 상병 해당자로, 진단서 또는 소견서 첨부 ※ 단 행복e음을 통해 산정특례 등록여부 확인이 가능한 경우에는 관련 자료로 대체&#13;&amp;#9315; 소년소녀가정, 조손가정, 한부모가정(법정보호세대)  ※ 이 경우 서비스 대상자는 자녀·손자녀가 됨&#13;&amp;#9316; 만 65세 미만의 의료급여 수급자 중 장기입원 사례관리 퇴원자&#13;&amp;#9317; 기타 시군구청장이 예산범위 내에서 장애정도가 심하지 않은 장애인, 질환 및 부상으로 인한 장기 치료자 등 가사·간병 서비스가 필요하다고 별도로 인정한 자 ※ 국고로 지원되는 장애인활동지원서비스 포함 유사 돌봄서비스를 받고 있는 자는 제외&#13;</slctCritCn><alwServCn>한 달에 일정기간 동안 가사 또는 간병 서비스를 이용할 수 있는 이용권(바우처)을 지급합니다. &#13;(지원기간) 바우처 자격 결정일로부터 1년 * 단, 재판정 절차를 통해 1년 단위로 연장 가능&#13;(지원시간) 월 24시간 또는 27시간(이용자가 선택)&#13;(서비스 비용) 월 427,200원(24시간) 또는 월 480,600원(27시간) * 시간당 단가 17,800원&#13;(정부지원금) 소득수준 및 이용시간에 따라 차등 지원&#13;(본인부담금) 서비스 가격에서 정부지원금을 뺀 차액 부담&#13;</alwServCn><crtrYr>2026</crtrYr><rprsCtadr>129</rprsCtadr><wlfareInfoOutlCn>일상생활이 어려운 저소득층 가정에 간병·가사 서비스를 지원하여  취약계층의 생활 안정을 도모하고  가사·간병 방문 제공인력의 사회적 일자리를 창출합니다.</wlfareInfoOutlCn><sprtCycNm>월</sprtCycNm><srvPvsnNm>전자바우처(바우처)</srvPvsnNm><trgterIndvdlArray>한부모·조손, 장애인, 저소득</trgterIndvdlArray><intrsThemaArray>보호·돌봄, 생활지원</intrsThemaArray><applmetList><servSeCode>070</servSeCode><servSeDetailLink>거주지 읍/면/동 주민센터, 읍면동 또는 복지로 웹사이트(PC/모바일앱)에서 ‘서비스 신청’</servSeDetailLink><servSeDetailNm>신청기관연락처목록</servSeDetailNm></applmetList><applmetList><servSeCode>070</servSeCode><servSeDetailLink>담당 시/군/구청 또는 시군구에서 조사 및 심사</servSeDetailLink><servSeDetailNm>조사기관연락처목록</servSeDetailNm></applmetList><applmetList><servSeCode>070</servSeCode><servSeDetailLink>담당 시/군/구청 또는 읍면동에서 조사 및 심사</servSeDetailLink><servSeDetailNm>조사기관연락처목록</servSeDetailNm></applmetList><applmetList><servSeCode>070</servSeCode><servSeDetailLink>담당 시/군/구청 또는 시군구에서 보장 결정</servSeDetailLink><servSeDetailNm>결정기관연락처목록 </servSeDetailNm></applmetList><applmetList><servSeCode>070</servSeCode><servSeDetailLink>이의가 있을 경우, 담당 시/군/구청 또는 시군구에 이의 신청 접수</servSeDetailLink><servSeDetailNm>이의신청접수기관연락처목록 </servSeDetailNm></applmetList><applmetList><servSeCode>070</servSeCode><servSeDetailLink>담당 시/군/구청 또는 시도 및 시군구에 등록요건을 갖춘 민간 제공기관에서 대상자에게 서비스 제공</servSeDetailLink><servSeDetailNm>지급기관연락처목록 </servSeDetailNm></applmetList><applmetList><servSeCode>070</servSeCode><servSeDetailLink>담당 시/군/구청 또는 시군구에서 서비스 제공 이후 대상자의 상황 관리</servSeDetailLink><servSeDetailNm>사후관리기관목록</servSeDetailNm></applmetList><inqplCtadrList><servSeCode>010</servSeCode><servSeDetailLink>1566-3232</servSeDetailLink><servSeDetailNm>사회서비스전자바우처</servSeDetailNm></inqplCtadrList><inqplCtadrList><servSeCode>010</servSeCode><servSeDetailLink>129</servSeDetailLink><servSeDetailNm>보건복지상담센터</servSeDetailNm></inqplCtadrList><inqplHmpgReldList><servSeCode>020</servSeCode><servSeDetailLink>https://www.socialservice.or.kr:444/</servSeDetailLink><servSeDetailNm>사회서비스전자바우처</servSeDetailNm></inqplHmpgReldList><inqplHmpgReldList><servSeCode>020</servSeCode><servSeDetailLink>http://www.129.go.kr</servSeDetailLink><servSeDetailNm>보건복지상담센터</servSeDetailNm></inqplHmpgReldList><basfrmList><servSeCode>040</servSeCode><servSeDetailLink>https://bokjiro.go.kr/ssis-tbu/CmmFileUtil/getDownload.do?atcflId=20250220UUWBM1352490124684810&amp;atcflSn=1</servSeDetailLink><servSeDetailNm>사회보장급여(사회서비스이용권) 신청(변경)서(사회보장급여 관련 공통서식에 관한 고시).hwpx</servSeDetailNm></basfrmList><basfrmList><servSeCode>040</servSeCode><servSeDetailLink>https://bokjiro.go.kr/ssis-tbu/CmmFileUtil/getDownload.do?atcflId=1704GOWF16GOWF161704&amp;atcflSn=1</servSeDetailLink><servSeDetailNm>사회서비스 전용 국민행복카드 발급(재발급) 신청서.hwp</servSeDetailNm></basfrmList><basfrmList><servSeCode>040</servSeCode><servSeDetailLink>https://bokjiro.go.kr/ssis-tbu/CmmFileUtil/getDownload.do?atcflId=1705GOWF16GOWF161705&amp;atcflSn=1</servSeDetailLink><servSeDetailNm>사회서비스 전용 국민행복카드 발급을 위한 법정대리인 동의서.hwp</servSeDetailNm></basfrmList><basfrmList><servSeCode>040</servSeCode><servSeDetailLink>https://bokjiro.go.kr/ssis-tbu/CmmFileUtil/getDownload.do?atcflId=20240110UUWBM2037410065246513&amp;atcflSn=1</servSeDetailLink><servSeDetailNm>국민행복카드 상담전화를 위한 개인정보 제공동의서.hwpx</servSeDetailNm></basfrmList><basfrmList><servSeCode>040</servSeCode><servSeDetailLink>https://bokjiro.go.kr/ssis-tbu/CmmFileUtil/getDownload.do?atcflId=20240111UUWBM1752470065444589&amp;atcflSn=1</servSeDetailLink><servSeDetailNm>2024년 가사간병 방문지원사업 안내_최종.pdf</servSeDetailNm></basfrmList><baslawList><servSeCode>030</servSeCode><servSeDetailNm>사회서비스 이용 및 이용권 관리에 관한 법률</servSeDetailNm></baslawList><baslawList><servSeCode>030</servSeCode><servSeDetailNm>사회복지사업법</servSeDetailNm></baslawList><resultCode>0</resultCode><resultMessage>SUCCESS</resultMessage></wantedDtl>
            """;
        reply = uri -> uri.getPath().endsWith("NationalWelfarelistV001") ? listXml : detailXml;
        RagDocument document = client.welfare("치매", 1, 1).get(0);
        assertThat(document.externalId()).isEqualTo("WLF00001087");
        assertThat(document.title()).isEqualTo("가사·간병 방문 지원사업");
        assertThat(document.sourceUpdatedAt()).isEqualTo("2026");
        assertThat(document.sourceUrl()).contains("wlfareInfoId=WLF00001087", "wlfareInfoReldBztpCd=01");
        assertThat(document.content()).contains("지원 대상:", "선정 기준:", "지원 내용:", "가사·간병", "사회복지사업법");
        assertThat(document.kind()).isEqualTo("POLICY");
    }

    @Test void welfareDoesNotSilentlyKeepSummaryWhenDetailFails() {
        reply = uri -> uri.getPath().endsWith("NationalWelfarelistV001") ? list("W1,W2", 2)
            : uri.getRawQuery().contains("servId=W1") ? detail("W1") : "<response><wantedDtl><resultCode>10</resultCode></wantedDtl></response>";
        assertThatThrownBy(() -> client.welfare("치매", 1, 2)).isInstanceOf(Problem.class);
    }

    @Test void hospitalPagingIsBoundedAndNeverClassifiedAsPolicy() {
        reply = uri -> hospital(uri.getRawQuery().contains("pageNo=1") ? "H1" : "H2", 3);
        List<RagDocument> docs = client.hospitals("가상", "110000", 2);
        assertThat(docs).hasSize(2).allMatch(d -> d.kind().equals("HOSPITAL") && d.provider().equals("HIRA"));
        assertThat(requests).hasSize(2);
        assertThat(requests.get(0).getRawQuery()).contains("ServiceKey=", "sidoCd=110000", "yadmNm=").doesNotContain("serviceKey=");
        assertThat(docs.get(0).content()).contains("치매 전문성", "가상 주소", "127.1");
        assertThat(docs.get(0).sourceUpdatedAt()).isEmpty();
    }

    @Test void encodedAndDecodedServiceKeysAreEncodedExactlyOnce() {
        reply = uri -> hospital("H1", 1);
        create("synthetic-public-key%2B%2F%3D", Duration.ofSeconds(3)).hospitals("", "", 1);
        assertThat(requests.get(0).getRawQuery()).contains("ServiceKey=synthetic-public-key%2B%2F%3D").doesNotContain("%252B");
    }

    @Test void eventSnapshotHasExactOperationKoreanFieldsAndSafeSource() {
        reply = uri -> json.writeValueAsString(Map.of("page", 1, "perPage", 100, "currentCount", 1,
            "totalCount", 1, "matchCount", 1, "data", List.of(Map.of("치매안심센터명", "가상 센터", "행사명", "가상 가족 행사",
                "행사일", "2026-08-01", "장소", "가상 장소", "기획의도", "가족 교류", "참석자수", 12,
                "자세히보기주소", "https://www.nid.or.kr/event?id=1"))));
        RagDocument doc = client.events(3).get(0);
        assertThat(requests).hasSize(1);
        assertThat(requests.get(0).getPath()).isEqualTo("/" + PublicDataClient.EVENT_PATH);
        assertThat(requests.get(0).getRawQuery()).contains("page=1", "perPage=100", "returnType=JSON");
        assertThat(doc.kind()).isEqualTo("EVENT");
        assertThat(doc.content()).contains("가족 교류", "참석자수: 12", "현재 모집 중인지");
        assertThat(doc.sourceUpdatedAt()).isEqualTo("2026-08-19");
        assertThat(doc.sourceUrl()).isEqualTo("https://www.nid.or.kr/event?id=1");
    }

    @Test void unsafeEventLinksFallBackToOfficialDataset() {
        reply = uri -> json.writeValueAsString(Map.of("currentCount", 1, "totalCount", 1, "data", List.of(
            Map.of("행사명", "가상 행사", "자세히보기주소", "https://attacker.invalid/?serviceKey=" + fakeKey))));
        assertThat(client.events(1).get(0).sourceUrl()).isEqualTo("https://www.data.go.kr/data/15161440/fileData.do");
    }

    @Test void xmlAuthenticationErrorAtHttp200IsNotSuccessfulData() {
        reply = uri -> "<OpenAPI_ServiceResponse><cmmMsgHeader><returnAuthMsg>private " + fakeKey
            + "</returnAuthMsg><returnReasonCode>30</returnReasonCode></cmmMsgHeader></OpenAPI_ServiceResponse>";
        assertThatThrownBy(() -> client.hospitals("", "", 1)).isInstanceOfSatisfying(Problem.class, p -> {
            assertThat(p.code()).isEqualTo("PUBLIC_DATA_AUTH");
            assertThat(p.getMessage()).doesNotContain(fakeKey, "private", "http:");
        });
    }

    @Test void doctypeAndExternalEntitiesAreRejected() {
        reply = uri -> "<!DOCTYPE response [<!ENTITY xxe SYSTEM 'file:///synthetic-must-not-be-read'>]>"
            + "<response><header><resultCode>00</resultCode></header><body>&xxe;</body></response>";
        assertThatThrownBy(() -> client.hospitals("", "", 1)).isInstanceOfSatisfying(Problem.class,
            p -> assertThat(p.code()).isEqualTo("PUBLIC_DATA_INVALID_RESPONSE"));
    }

    @Test void oversizedBodiesAndTimeoutsAreBounded() {
        reply = uri -> " ".repeat(PublicDataClient.MAX_BYTES + 1);
        assertThatThrownBy(() -> client.events(1)).isInstanceOfSatisfying(Problem.class,
            p -> assertThat(p.code()).isEqualTo("PUBLIC_DATA_INVALID_RESPONSE"));
        reply = uri -> hospital("H1", 1); delayMillis = 400;
        assertThatThrownBy(() -> create(fakeKey, Duration.ofMillis(80)).hospitals("", "", 1))
            .isInstanceOfSatisfying(Problem.class, p -> assertThat(p.code()).isEqualTo("PUBLIC_DATA_UNAVAILABLE"));
    }

    @Test void missingKeyInvalidPagesAndRemoteTestOriginsNeverCallNetwork() {
        assertThatThrownBy(() -> create("", Duration.ofSeconds(1)).events(1)).isInstanceOfSatisfying(Problem.class,
            p -> assertThat(p.code()).isEqualTo("PUBLIC_DATA_NOT_CONFIGURED"));
        assertThatThrownBy(() -> client.events(6)).isInstanceOf(IllegalArgumentException.class);
        assertThatThrownBy(() -> client.welfare("치매", 1, 11)).isInstanceOf(IllegalArgumentException.class);
        assertThatThrownBy(() -> new PublicDataClient(HttpClient.newHttpClient(), json, fakeKey, Duration.ofSeconds(1),
            URI.create("https://attacker.invalid/"), base, base)).isInstanceOf(IllegalArgumentException.class);
        assertThatThrownBy(() -> new PublicDataClient(HttpClient.newBuilder().followRedirects(HttpClient.Redirect.ALWAYS).build(),
            json, fakeKey, Duration.ofSeconds(1))).isInstanceOf(IllegalArgumentException.class);
        assertThat(requests).isEmpty();
    }

    @Test void httpAndServiceQuotaErrorsAreExplicitWithoutBodyOrKeyLeaks() {
        reply = uri -> "private upstream " + fakeKey;
        status = 403;
        assertThatThrownBy(() -> client.events(1)).isInstanceOfSatisfying(Problem.class, p -> {
            assertThat(p.code()).isEqualTo("PUBLIC_DATA_AUTH"); assertThat(p.getMessage()).doesNotContain(fakeKey, "private");
        });
        status = 429;
        assertThatThrownBy(() -> client.events(1)).isInstanceOfSatisfying(Problem.class,
            p -> assertThat(p.code()).isEqualTo("PUBLIC_DATA_LIMIT"));
        status = 200; reply = uri -> "<response><header><resultCode>22</resultCode></header></response>";
        assertThatThrownBy(() -> client.hospitals("", "", 1)).isInstanceOfSatisfying(Problem.class,
            p -> assertThat(p.code()).isEqualTo("PUBLIC_DATA_LIMIT"));
    }
}
