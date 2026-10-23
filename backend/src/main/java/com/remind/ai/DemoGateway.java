package com.remind.ai;

import java.util.List;

/** Explicit deterministic demo, not a real language model and never an error fallback. */
public final class DemoGateway implements AiGateway {
    @Override public Plan plan(String message, String mode, List<AiDtos.Turn> history) {
        return new Plan("GENERAL",false,message);
    }
    @Override public Answer answer(Context c) {
        String text=switch(c.decision().intent()) {
            case "SAFETY" -> "지금 많이 힘든 상황으로 들려요. 현재 안전한 곳에 계신가요? 가까운 믿을 수 있는 사람이나 전문기관에 도움을 요청해 주세요.";
            case "POLICY" -> c.policies().isEmpty()
                ? "현재 준비된 자료에서 맞는 지원 정보를 찾지 못했어요. 어떤 도움이 필요한지 조금 더 알려주시겠어요? 확인되지 않은 지원 조건은 단정하지 않을게요."
                : "돌봄에 필요한 도움을 혼자 찾느라 부담이 크셨겠어요. 아래 공식 안내를 함께 확인해 보세요. 지역별 운영 여부와 신청 조건은 담당 기관에서 확인해야 해요.";
            case "SCHEDULE" -> c.schedule()==null
                ? "실제 병원 예약과 앱 일정 기록 중 어떤 것을 원하시나요? 온이는 병원 예약을 대신할 수 없어요."
                : c.schedule().missingFields().isEmpty()
                    ? "말씀하신 내용으로 일정 초안을 정리했어요. 아직 캘린더에 저장되지 않았어요. 날짜와 시간을 확인해 주세요."
                    : "일정 초안을 만들려면 " + String.join(", ",c.schedule().missingFields()) + " 정보가 더 필요해요. 아직 저장하지 않았어요.";
            case "CLARIFY" -> "원하시는 도움을 조금 더 구체적으로 알려주시겠어요? 이야기를 들어드리거나, 정책 안내와 일정 초안을 도울 수 있어요.";
            default -> "혼자 돌봄을 이어가느라 마음 쓸 일이 많으셨겠어요. 지금 가장 마음에 남는 일이 무엇인지 편하게 이야기해 주세요.";
        };
        return new Answer(text,c.policies().stream().map(PolicyCatalog.Policy::id).toList());
    }
    @Override public String provider() { return "demo"; }
    @Override public boolean configured() { return true; }
}
