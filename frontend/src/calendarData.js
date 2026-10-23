export const DEMO_DATE = '2026-10-18'
export const initialEvents = [
  { id: 'morning', title: '아침 약 복용', date: DEMO_DATE, time: '08:00', repeat: '안 함', completedDates: { [DEMO_DATE]: true } },
  { id: 'hospital', title: '병원가기', date: DEMO_DATE, time: '13:00', repeat: '안 함', completedDates: {} },
  { id: 'family', title: '가족 모임', date: DEMO_DATE, time: '19:00', repeat: '안 함', completedDates: {} },
]
export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
export function parseDate(value, fallback = DEMO_DATE) {
  if (!value?.trim()) return fallback
  const text = value.trim()
  const match = text.match(/^(?:(\d{4})[-./년]\s*)?(\d{1,2})[-./월]\s*(\d{1,2})일?$/)
  if (!match) return null
  const year = Number(match[1] || fallback.slice(0, 4))
  const month = Number(match[2]); const day = Number(match[3])
  const date = new Date(year, month - 1, day)
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? localDate(date) : null
}
export function parseTime(value, fallback = '19:00') {
  if (!value?.trim()) return fallback
  const match = value.trim().match(/^(오전|오후)?\s*(\d{1,2})\s*[:시]\s*(\d{1,2})?분?$/)
  if (!match) return null
  let hour = Number(match[2]); const minute = Number(match[3] || 0)
  if (minute > 59 || hour > (match[1] ? 12 : 23) || (match[1] && hour < 1)) return null
  if (match[1]) hour = hour % 12 + (match[1] === '오후' ? 12 : 0)
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}
export function formatTime(value) {
  const [hour, minute] = value.split(':').map(Number)
  return `${hour < 12 ? '오전' : '오후'} ${hour % 12 || 12}:${String(minute).padStart(2, '0')}`
}
export function formatDate(value, weekday = false) {
  const [year, month, day] = value.split('-').map(Number)
  return `${month}월 ${day}일${weekday ? ` ${['일', '월', '화', '수', '목', '금', '토'][new Date(year, month - 1, day).getDay()]}요일` : ''}`
}
export function occursOn(event, date) {
  if (date < event.date) return false
  if (event.repeat === '매일') return true
  const start = new Date(event.date + 'T00:00:00'); const target = new Date(date + 'T00:00:00')
  if (event.repeat === '매주') return start.getDay() === target.getDay()
  if (event.repeat === '매월') return start.getDate() === target.getDate()
  return date === event.date
}
