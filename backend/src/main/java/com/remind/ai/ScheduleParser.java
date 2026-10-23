package com.remind.ai;

import org.springframework.stereotype.Component;

import java.time.Clock;
import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/** Deterministic draft parser. It never books an institution or saves a calendar event. */
@Component
public class ScheduleParser {
    private static final ZoneId SEOUL = ZoneId.of("Asia/Seoul");
    private static final Pattern ISO_DATE = Pattern.compile("(?<!\\d)(\\d{4})-(\\d{1,2})-(\\d{1,2})(?!\\d)");
    private static final Pattern KOREAN_DATE = Pattern.compile("(\\d{4})년\\s*(\\d{1,2})월\\s*(\\d{1,2})일");
    private static final Pattern TIME = Pattern.compile("(?:(오전|오후|아침|저녁|밤|새벽|낮)\\s*)?(?<!\\d)(\\d{1,2})(?:\\s*시(?:\\s*(?:(\\d{1,2})\\s*분|(반)))?|:(\\d{2}))(?!\\d)");
    private final Clock clock;

    public record Proposal(String title, String date, String time, String timezone,
                           List<String> missingFields, boolean saved) {}

    public ScheduleParser() { this(Clock.system(SEOUL)); }
    public ScheduleParser(Clock clock) { this.clock = clock.withZone(SEOUL); }

    public Proposal parse(String message) {
        String text = message == null ? "" : message.trim();
        LocalDate date = parseDate(text);
        LocalTime time = parseTime(text);
        String title = parseTitle(text);
        List<String> missing = new ArrayList<>();
        if (title == null) missing.add("title");
        if (date == null) {
            missing.add("date");
            if (ISO_DATE.matcher(text).find() || text.matches(".*\\d+월\\s*\\d+일.*")) missing.add("invalidDate");
        }
        if (time == null) {
            missing.add("time");
            if (TIME.matcher(text).find()) missing.add("invalidTime");
        }
        if (date != null && date.isBefore(LocalDate.now(clock))) missing.add("futureDateTime");
        else if (date != null && time != null && LocalDateTime.of(date, time).isBefore(LocalDateTime.now(clock))) {
            missing.add("futureDateTime");
        }
        return new Proposal(title, date == null ? null : date.toString(), time == null ? null : time.toString(),
                SEOUL.getId(), List.copyOf(missing), false);
    }

    private LocalDate parseDate(String text) {
        Matcher iso = ISO_DATE.matcher(text);
        if (iso.find()) {
            LocalDate result = date(iso);
            return iso.find() ? null : result;
        }
        Matcher korean = KOREAN_DATE.matcher(text);
        if (korean.find()) {
            LocalDate result = date(korean);
            return korean.find() ? null : result;
        }
        // An incomplete/invalid absolute date must not be replaced by a relative date elsewhere.
        if (text.matches(".*\\d+월\\s*\\d+일.*")) return null;
        if (text.contains("내일모레") || text.contains("모레")) return LocalDate.now(clock).plusDays(2);
        if (text.contains("내일")) return LocalDate.now(clock).plusDays(1);
        if (text.contains("오늘")) return LocalDate.now(clock);
        return null;
    }

    private LocalDate date(Matcher match) {
        try {
            return LocalDate.of(Integer.parseInt(match.group(1)), Integer.parseInt(match.group(2)), Integer.parseInt(match.group(3)));
        } catch (DateTimeException | NumberFormatException invalid) {
            return null;
        }
    }

    private LocalTime parseTime(String text) {
        Matcher match = TIME.matcher(text);
        if (!match.find()) {
            if (text.contains("정오")) return LocalTime.NOON;
            if (text.contains("자정")) return LocalTime.MIDNIGHT;
            return null;
        }
        Matcher second = TIME.matcher(text);
        second.find();
        if (second.find()) return null;
        int hour = Integer.parseInt(match.group(2));
        int minute = match.group(3) != null ? Integer.parseInt(match.group(3))
                : match.group(4) != null ? 30 : match.group(5) != null ? Integer.parseInt(match.group(5)) : 0;
        String period = match.group(1);
        if (period != null) {
            if (hour < 1 || hour > 12) return null;
            // Natural-language midnight boundaries need confirmation, not an accidental noon.
            if (hour == 12 && List.of("밤", "저녁", "아침").contains(period)) return null;
            hour %= 12;
            if (List.of("오후", "저녁", "밤", "낮").contains(period)) hour += 12;
        } else if (match.group(5) == null && hour >= 1 && hour <= 12) {
            // "3시" does not tell us AM/PM; "15시" and "15:00" are explicit 24-hour forms.
            return null;
        }
        try { return LocalTime.of(hour, minute); }
        catch (DateTimeException invalid) { return null; }
    }

    private String parseTitle(String text) {
        if (text.contains("치매안심센터")) return "치매안심센터 방문";
        if (text.contains("병원")) return "병원 방문";
        if (text.contains("상담")) return "상담";
        if (text.contains("검사")) return "검사";
        if (text.contains("약 복용") || text.contains("약 먹")) return "약 복용";
        if (text.contains("운동")) return "운동";
        if (text.contains("산책")) return "산책";
        return null;
    }
}
