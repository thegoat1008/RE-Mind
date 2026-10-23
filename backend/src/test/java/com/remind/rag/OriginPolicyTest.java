package com.remind.rag;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.mock.web.MockHttpServletRequest;

import static org.assertj.core.api.Assertions.*;

class OriginPolicyTest {
    @Test void acceptsDirectSameOriginWithExplicitAndDefaultPorts() {
        OriginPolicy policy = new OriginPolicy("");
        assertThatCode(() -> policy.check(request("http", "localhost", 8080, "http://localhost:8080", "same-origin")))
            .doesNotThrowAnyException();
        assertThatCode(() -> policy.check(request("https", "care.example", 443, "https://care.example", "same-origin")))
            .doesNotThrowAnyException();
        assertThatCode(() -> policy.check(request("http", "localhost", 80, "http://localhost", "same-origin")))
            .doesNotThrowAnyException();
    }

    @Test void exactViteOriginIsAllowedEvenWhenProxyChangesTargetHostAndPort() {
        OriginPolicy policy = new OriginPolicy("http://localhost:5173,http://127.0.0.1:5173");
        for (String origin : policy.allowedOrigins()) {
            assertThatCode(() -> policy.check(request("http", "127.0.0.1", 8080, origin, "same-site")))
                .doesNotThrowAnyException();
        }
    }

    @Test void explicitlyAllowedCrossSiteFrontendIsAccepted() {
        OriginPolicy policy = new OriginPolicy("https://care.example");
        assertThatCode(() -> policy.check(request("https", "api.example", 443, "https://care.example", "cross-site")))
            .doesNotThrowAnyException();
    }

    @ParameterizedTest
    @ValueSource(strings = {"https://evil.example", "http://localhost:5173.evil.example", "http://localhost:5174",
        "https://localhost:5173", "http://127.0.0.1:5173", "null", "*", "http://localhost:5173/",
        "http://user@localhost:5173", "http://localhost:5173?x=1", "http://localhost:5173#fragment"})
    void rejectsUnlistedAndMalformedOriginsRatherThanMatchingHostSubstrings(String origin) {
        OriginPolicy policy = new OriginPolicy("http://localhost:5173");
        assertDenied(policy, request("http", "localhost", 8080, origin, "cross-site"));
    }

    @Test void crossSiteWithoutExplicitAllowlistFailsEvenIfOriginMatchesTarget() {
        assertDenied(new OriginPolicy(""), request("http", "localhost", 8080, "http://localhost:8080", "cross-site"));
    }

    @Test void missingOriginIsAllowedForDirectClientsButCrossSiteFetchIsDenied() {
        OriginPolicy policy = new OriginPolicy("");
        assertThatCode(() -> policy.check(request("http", "localhost", 8080, null, null)))
            .doesNotThrowAnyException();
        assertDenied(policy, request("http", "localhost", 8080, null, "cross-site"));
    }

    @ParameterizedTest
    @ValueSource(strings = {"*", "null", "https://*.example", "https://care.example/", "https://user@care.example",
        "https://care.example?x=1", "https://care.example#fragment", "file:///tmp/example"})
    void rejectsInvalidAllowlistConfigurationAtStartup(String origin) {
        assertThatIllegalArgumentException().isThrownBy(() -> new OriginPolicy(origin));
    }

    @Test void trimsAndDeduplicatesExactOriginsForSharedCorsConfiguration() {
        OriginPolicy policy = new OriginPolicy(" http://localhost:5173 ,https://care.example,,http://localhost:5173 ");
        assertThat(policy.allowedOrigins()).isEqualTo(List.of("http://localhost:5173", "https://care.example"));
        assertThatThrownBy(() -> policy.allowedOrigins().add("https://evil.example"))
            .isInstanceOf(UnsupportedOperationException.class);
    }

    private static MockHttpServletRequest request(String scheme, String host, int port, String origin, String fetchSite) {
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.setScheme(scheme);
        request.setServerName(host);
        request.setServerPort(port);
        if (origin != null) request.addHeader("Origin", origin);
        if (fetchSite != null) request.addHeader("Sec-Fetch-Site", fetchSite);
        return request;
    }

    private static void assertDenied(OriginPolicy policy, MockHttpServletRequest request) {
        assertThatThrownBy(() -> policy.check(request)).isInstanceOfSatisfying(Problem.class, problem -> {
            assertThat(problem.status()).isEqualTo(403);
            assertThat(problem.code()).isEqualTo("ORIGIN_DENIED");
            assertThat(problem.retryable()).isFalse();
        });
    }
}
