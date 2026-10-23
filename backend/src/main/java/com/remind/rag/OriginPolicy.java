package com.remind.rag;

import jakarta.servlet.http.HttpServletRequest;
import java.net.URI;
import java.util.Arrays;
import java.util.List;

/** Exact origins only. The same allowlist is used by the controller and CORS. */
public final class OriginPolicy {
    private final List<String> allowed;
    public OriginPolicy(String origins) {
        allowed=Arrays.stream(origins.split(",")).map(String::strip).filter(v->!v.isEmpty()).distinct().toList();
        if(allowed.stream().anyMatch(v->!valid(v))) throw new IllegalArgumentException("RAG_ALLOWED_ORIGINS must contain exact HTTP(S) origins without paths");
    }
    public List<String> allowedOrigins() { return allowed; }
    public void check(HttpServletRequest request) {
        String origin=request.getHeader("Origin");
        if(origin!=null) {
            if(!valid(origin)) throw denied();
            if(allowed.contains(origin)) return;
            URI uri=URI.create(origin);
            int port=uri.getPort()<0?(uri.getScheme().equals("https")?443:80):uri.getPort();
            if(uri.getScheme().equals(request.getScheme()) && uri.getHost().equalsIgnoreCase(request.getServerName())
                && port==request.getServerPort() && !"cross-site".equalsIgnoreCase(request.getHeader("Sec-Fetch-Site"))) return;
            throw denied();
        }
        if("cross-site".equalsIgnoreCase(request.getHeader("Sec-Fetch-Site"))) throw denied();
    }
    private static boolean valid(String value) {
        try {
            URI uri=URI.create(value);
            return ("http".equals(uri.getScheme()) || "https".equals(uri.getScheme())) && uri.getHost()!=null
                && uri.getUserInfo()==null && uri.getRawQuery()==null && uri.getRawFragment()==null
                && (uri.getRawPath()==null || uri.getRawPath().isEmpty());
        } catch(IllegalArgumentException e) { return false; }
    }
    private static Problem denied() { return new Problem(403,"ORIGIN_DENIED","허용된 앱 화면에서 요청해 주세요.",false); }
}
