package com.remind.ai;

import org.junit.jupiter.api.Test;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;

import static org.junit.jupiter.api.Assertions.*;

class ScheduleParserTest {
    // Seoul is 2026-10-23 10:00, independent of host timezone.
    private final ScheduleParser parser = new ScheduleParser(Clock.fixed(Instant.parse("2026-10-23T01:00:00Z"), ZoneOffset.UTC));

    @Test void tomorrowAndKoreanPmProduceOnlyADraft() {
        var result = parser.parse("내일 오후 3시 병원 일정을 등록해줘");
        assertEquals("2026-10-24", result.date());
        assertEquals("15:00", result.time());
        assertEquals("병원 방문", result.title());
        assertEquals("Asia/Seoul", result.timezone());
        assertTrue(result.missingFields().isEmpty());
        assertFalse(result.saved());
    }

    @Test void explicitIsoAnd24HourTimeAreSupported() {
        var result = parser.parse("2026-10-30 15:30 상담 일정 추가해줘");
        assertEquals("2026-10-30", result.date());
        assertEquals("15:30", result.time());
    }

    @Test void koreanFullDateAndHalfHourAreSupported() {
        var result = parser.parse("2026년 11월 2일 오후 3시 반 운동 기록해줘");
        assertEquals("2026-11-02", result.date());
        assertEquals("15:30", result.time());
    }

    @Test void missingTimeAndAmbiguousAmPmStayMissing() {
        assertNull(parser.parse("내일 병원 일정 추가").time());
        assertNull(parser.parse("내일 3시 병원 일정 추가").time());
        assertTrue(parser.parse("내일 3시 병원 일정 추가").missingFields().contains("time"));
    }

    @Test void invalidDatesAndTimesDoNotBecomeValidEvents() {
        assertNull(parser.parse("2026-02-30 오후 3시 병원 등록").date());
        assertNull(parser.parse("내일 25:00 병원 등록").time());
        assertNull(parser.parse("내일 오후 15시 병원 등록").time());
        assertNull(parser.parse("내일 오후 3시 70분 병원 등록").time());
        assertTrue(parser.parse("오후 25시").missingFields().contains("invalidTime"));
        assertTrue(parser.parse("2026-02-30").missingFields().contains("invalidDate"));
    }

    @Test void multipleTimesRequireClarificationInsteadOfChoosingOne() {
        var result = parser.parse("내일 오후 3시 아니 오후 4시 병원 기록");
        assertNull(result.time());
        assertTrue(result.missingFields().contains("invalidTime"));
    }

    @Test void missingYearRequiresClarification() {
        assertNull(parser.parse("11월 2일 오후 3시 상담 기록").date());
    }

    @Test void midnightAndNoonAreConvertedCorrectly() {
        assertEquals("00:00", parser.parse("내일 오전 12시 병원 등록").time());
        assertEquals("12:00", parser.parse("내일 오후 12시 병원 등록").time());
    }

    @Test void ambiguousNaturalMidnightIsNotGuessedAsNoon() {
        assertNull(parser.parse("내일 밤 12시 병원 일정 등록").time());
        assertTrue(parser.parse("밤 12시").missingFields().contains("invalidTime"));
    }

    @Test void pastDateTimeNeedsCorrection() {
        assertTrue(parser.parse("오늘 오전 9시 병원 등록").missingFields().contains("futureDateTime"));
        assertTrue(parser.parse("2026-10-20 오후 3시 상담 기록").missingFields().contains("futureDateTime"));
    }

    @Test void followupMayBePartialAndCannotSaveAnything() {
        var result = parser.parse("오후 3시");
        assertNull(result.date());
        assertNull(result.title());
        assertEquals("15:00", result.time());
        assertFalse(result.saved());
    }

    @Test void todayUsesSeoulCalendarDayAtUtcBoundary() {
        var boundary = new ScheduleParser(Clock.fixed(Instant.parse("2026-10-23T16:00:00Z"), ZoneOffset.UTC));
        assertEquals("2026-10-24", boundary.parse("오늘 오후 3시 상담 기록").date());
    }
}
