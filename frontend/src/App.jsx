import { useEffect, useState } from 'react'
import { DesignContext } from './designRuntime.jsx'
import manifest from './screenManifest.json'
import { initialEvents, DEMO_DATE, parseDate, parseTime, formatTime, formatDate, localDate, occursOn } from './calendarData.js'
import './design.css'
import './designPrecision.css'
import { CommunityContext, communityScreens, useCommunity } from './community/useCommunity.js'
import './community/bindings.css'

const modules = import.meta.glob('./screens/*.jsx', { eager: true })
const screenNames = new Set(manifest.map((screen) => screen.key))
const parents = {
  login: 'welcome', signup: 'login', verify: 'signup', 'forgot-password': 'login',
  'signup-complete': 'verify', 'care-registration': 'signup-complete', 'family-setup': 'care-registration',
  notifications: 'home', 'add-event': 'calendar', 'event-detail': 'calendar',
  'delete-event': 'event-detail', 'event-voice': 'calendar', 'family-calendar': 'family-codes',
  'chat-voice': 'chat', 'chat-history': 'chat-modes', 'chat-crisis': 'chat',
  'write-mode': 'community', 'write-post': 'community', post: 'community', 'empathy-post': 'community',
  'family-codes': 'settings', hospitals: 'settings', policies: 'settings', emergency: 'settings',
}
function currentScreen(route) {
  const key = route.replace(/^#\/?/, '').split('?')[0]
  if (key === 'write-mode') return 'write-post'
  if (key === 'empathy-post') return 'post'
  return screenNames.has(key) ? key : 'welcome'
}

function useLocalState(key, fallback) {
  const [value, setValue] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key))
      return saved && (Array.isArray(fallback) ? Array.isArray(saved) : typeof saved === typeof fallback) ? saved : fallback
    } catch { return fallback }
  })
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* Keep using in-memory state when storage is unavailable. */ }
  }, [key, value])
  return [value, setValue]
}

export default function App() {
  const [route, setRoute] = useState(() => window.location.hash)
  const screen = currentScreen(route)
  const [fields, setFields] = useState({})
  const [verificationCode, setVerificationCodeState] = useState(['', '', '', ''])
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const [selections, setSelections] = useState({})
  const [toast, setToast] = useState('')
  const [notificationsRead, setNotificationsRead] = useState(false)
  const [events, setEvents] = useLocalState('remind-events-v1', initialEvents)
  const [selectedDate, setSelectedDate] = useLocalState('remind-date-v1', DEMO_DATE)
  const [calendarMonth, setCalendarMonth] = useState(selectedDate.slice(0, 7))
  const [selectedEventId, setSelectedEventId] = useState(null)
  const [editingEventId, setEditingEventId] = useState(null)
  const community = useCommunity({ screen, route, notify: setToast })
  const Screen = modules[`./screens/${screen}.jsx`].default

  useEffect(() => {
    const update = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])
  useEffect(() => {
    document.title = `RE:MIND · ${manifest.find((item) => item.key === screen).name.replace(/^\S+ /, '')}`
    window.scrollTo(0, 0)
    setToast('')
  }, [route])
  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 3500)
    return () => window.clearTimeout(timer)
  }, [toast])

  function go(key) { if (screenNames.has(key)) window.location.hash = `/${key}` }
  function saveDraft(kind) {
    const draft = Object.fromEntries(Object.entries(fields).filter(([key]) => key.startsWith(`${screen}:`)))
    try { sessionStorage.setItem(`remind-${kind}-draft`, JSON.stringify(draft)) }
    catch { /* The in-memory draft remains available when browser storage is blocked. */ }
  }
  function selectDate(date) {
    setSelectedDate(date)
    setCalendarMonth(date.slice(0, 7))
  }
  function setVerificationCode(index, text) {
    const rawDigits = text.replace(/\D/g, '')
    const digits = rawDigits.length >= 4 ? rawDigits.slice(0, 4) : rawDigits.slice(0, 4 - index)
    setVerificationCodeState((current) => {
      if (rawDigits.length >= 4) return digits.split('')
      const next = [...current]
      if (digits.length > 1) {
        digits.split('').forEach((digit, offset) => { next[index + offset] = digit })
      } else if (digits.length === 1) next[index] = digits
      else next[index] = ''
      return next
    })
    const focusIndex = rawDigits.length >= 4 ? 3 : Math.min(index + Math.max(digits.length, 1), 3)
    requestAnimationFrame(() => document.querySelectorAll('.verification-input')[focusIndex]?.focus())
  }
  function openDatePicker() {
    const current = parseDate(fields['add-event:179:6426'], selectedDate) || selectedDate
    setCalendarMonth(current.slice(0, 7))
    setDatePickerOpen(true)
  }
  function chooseEventDate(date) {
    setFields((current) => ({ ...current, 'add-event:179:6426': formatDate(date) }))
    selectDate(date)
    setDatePickerOpen(false)
  }
  function startEvent(event = null) {
    setEditingEventId(event?.id || null)
    setFields((current) => ({ ...current,
      'add-event:179:6421': event?.title || '',
      'add-event:179:6426': event ? formatDate(event.date) : '',
      'add-event:179:6433': event ? formatTime(event.time) : '',
    }))
    setSelections((current) => ({ ...current, 'add-event:Chip (앱 화면)': `add-event:179:${{ '안 함': 6441, '매일': 6442, '매주': 6443, '매월': 6444 }[event?.repeat || '매일']}:${event?.repeat || '매일'}` }))
    go('add-event')
  }
  function saveEvent() {
    const voice = screen === 'event-voice'
    const title = voice ? '병원 가기' : fields['add-event:179:6421']?.trim()
    if (!title) return setToast('일정 제목을 입력해 주세요.')
    const date = voice ? localDate(new Date(new Date(selectedDate + 'T00:00:00').getTime() + 86400000)) : parseDate(fields['add-event:179:6426'], selectedDate)
    const time = voice ? '09:00' : parseTime(fields['add-event:179:6433'])
    if (!date) return setToast('날짜를 10월 18일 또는 2026-10-18 형식으로 입력해 주세요.')
    if (!time) return setToast('시간을 오후 7:00 또는 19:00 형식으로 입력해 주세요.')
    const repeat = voice ? '안 함' : (selections['add-event:Chip (앱 화면)']?.split(':').at(-1) || '매일')
    const existing = events.find((event) => event.id === editingEventId)
    const event = { id: existing?.id || crypto.randomUUID(), title, date, time, repeat, completedDates: existing?.completedDates || {} }
    setEvents((current) => existing ? current.map((item) => item.id === event.id ? event : item) : [...current, event])
    setSelectedEventId(event.id)
    setEditingEventId(null)
    selectDate(date)
    saveDraft('event')
    go('calendar')
  }
  async function copyCode() {
    try {
      await navigator.clipboard.writeText('DA-4821')
      setToast('예시 가족 코드 DA-4821을 복사했어요.')
    } catch { setToast('가족 코드 DA-4821을 직접 복사해 주세요.') }
  }
  async function activate({ name, label, eventId }) {
    if (name.startsWith('tab/')) {
      return go({ home: 'home', calendar: 'calendar', chat: 'chat-modes', community: 'community', settings: 'settings' }[name.slice(4)])
    }
    if (communityScreens.has(screen)) {
      if (name === '뒤로 버튼') return community.back()
      if (name === '글쓰기 FAB') return community.go('write-post')
      if (screen === 'write-mode' && name === '모드 카드') return community.chooseMode(/공감/.test(label) ? 'EMPATHY' : 'SOLUTION')
      if (screen === 'write-post' && ['말로 쓰기', 'icon/mic'].includes(name)) return community.dictate()
      if (['post', 'empathy-post'].includes(screen) && name === 'icon/mic') return community.dictate('comment')
      if (['post', 'empathy-post'].includes(screen) && name === '보내기') return community.addComment()
      return
    }
    if (name === '뒤로 버튼') return go(parents[screen] || 'home')
    if (name === 'icon/cal') return openDatePicker()
    if (name === 'calendar-day') return selectDate(`${calendarMonth}-${String(Number(label)).padStart(2, '0')}`)
    if (['보기 버튼', 'toggle', 'check', '개인정보 동의'].includes(name)) return
    if (['calendar', 'family-calendar'].includes(screen) && label === '오늘') return selectDate(localDate())
    if (name === 'btn 복사') return copyCode()
    if (name === 'btn 공유') {
      if (!navigator.share) return copyCode()
      try { await navigator.share({ title: 'RE:MIND 가족 코드 (예시)', text: '가족 코드: DA-4821' }) }
      catch (error) { if (error.name !== 'AbortError') return copyCode() }
      return
    }
    if (label === '로그아웃') return go('login')
    if (name === 'Notification') return go('notifications')
    if (name === '대화 버튼' || (screen.startsWith('home') && /온이와 대화하기/.test(label))) return go('chat-modes')
    if (label === '전체보기') return go('calendar')
    if (label === '관리' || name === '코드 공유' || (name === '카드' && /가족/.test(label))) return go('family-codes')
    if (name === 'EventItem' || name === 'event-card') {
      if (eventId) setSelectedEventId(eventId)
      return go('event-detail')
    }
    if (name === '글쓰기 FAB') return go('write-post')
    if (name === '일정 추가 FAB') return startEvent()
    if (name === '말로 추가') return go('event-voice')
    if (name === 'icon/mic' || name === '말로 쓰기') {
      if (screen.startsWith('chat')) return go('chat-voice')
      return setToast('음성 인식은 아직 연결되지 않았어요. 직접 입력해 주세요.')
    }
    if (name === '전화 버튼' || name === 'call') return setToast('전화 연결 전시용 버튼이에요. 실제 통화는 시작하지 않아요.')
    if (screen === 'welcome') return go(label === '시작하기' ? 'signup' : 'login')
    if (screen === 'login') {
      if (/비밀번호/.test(label)) return go('forgot-password')
      if (/회원가입/.test(label)) return go('signup')
      if (label === '로그인') return go('home')
      if (/구글/.test(label)) return setToast('구글 로그인은 서버 연동 후 사용할 수 있어요.')
    }
    if (screen === 'signup' && label === '계정 만들기') return go('verify')
    if (screen === 'verify') {
      if (label === '인증하기') return go('signup-complete')
      if (name === '재전송') return setToast('인증 메일 발송은 서버 연동 후 사용할 수 있어요.')
    }
    if (screen === 'forgot-password' && name === 'Button (앱 화면)') return setToast('비밀번호 재설정 메일은 서버 연동 후 보낼 수 있어요.')
    if (screen === 'signup-complete') return go(label === '나중에 할게요' ? 'home-empty' : 'care-registration')
    if (screen === 'care-registration' && label === '다음') { saveDraft('care'); return go('family-setup') }
    if (screen === 'family-setup') {
      if (label === '연결하기') {
        const code = fields['family-setup:195:5960']?.trim()
        return setToast(code ? '예시 화면이에요. 가족 연결과 승인은 서버 연동 후 가능해요.' : '가족에게 받은 코드를 입력해 주세요.')
      }
      if (['시작하기', '나중에 할게요'].includes(label)) return go('home-empty')
    }
    if (screen === 'family-codes') {
      if (/새 코드/.test(label)) return setToast('새 가족 코드 발급은 서버 연동 후 사용할 수 있어요.')
      if (label === '연결 해제') return setToast('가족 연결 해제는 서버 연동 후 사용할 수 있어요.')
      if (/다른 가족 초대/.test(label)) return go('family-setup')
    }
    if (screen === 'home-empty' && label === '일정 추가') return startEvent()
    if (screen === 'home-empty' && /가족|코드/.test(label)) return go('family-setup')
    if (screen === 'event-detail') {
      if (label === '수정하기') return startEvent(events.find((event) => event.id === selectedEventId))
      if (/삭제/.test(label)) return go('delete-event')
    }
    if (screen === 'delete-event' && name === 'Button (앱 화면)') {
      if (label === '취소') return go('event-detail')
      setEvents((current) => current.filter((event) => event.id !== selectedEventId))
      return go('calendar')
    }
    if (['add-event', 'event-voice'].includes(screen) && label === '저장하기') {
      return saveEvent()
    }
    if (screen === 'event-voice' && /수정/.test(label)) return startEvent()
    if (screen === 'chat-modes') {
      if (name === '이전 대화') return go('chat-history')
      if (name === '모드 카드') return go('chat')
    }
    if (screen === 'chat-history' && name === '대화 카드') return go('chat')
    if (screen === 'chat-voice' && name === 'Button (앱 화면)') return go('chat')
    if (screen === 'chat' && name === '보내기') return setToast('입력한 내용은 전송되지 않아요. AI 답변은 서버 연동 후 받을 수 있어요.')
    if (screen === 'settings') {
      if (/병원 찾기/.test(label)) return go('hospitals')
      if (/치매 정책/.test(label)) return go('policies')
      if (/긴급 안내/.test(label)) return go('emergency')
      if (/돌보는 분/.test(label)) return go('care-registration')
      if (/가족 코드/.test(label)) return go('family-codes')
      if (label === '수정') return setToast('프로필 수정은 서버 연동 후 사용할 수 있어요.')
    }
    if (screen === 'policies' && name === 'Button (앱 화면)') return setToast('정책 상세 정보 연결은 준비 중이에요.')
  }

  const context = {
    screen, fields, selections, activate, notificationsRead, verificationCode, setVerificationCode,
    events, selectedDate, calendarMonth, selectDate, setCalendarMonth,
    selectedEvent: events.find((event) => event.id === selectedEventId),
    eventsForDate: events.filter((event) => occursOn(event, selectedDate)),
    toggleEvent: (id) => setEvents((current) => current.map((event) => event.id === id ? {
      ...event, completedDates: { ...event.completedDates, [selectedDate]: !event.completedDates[selectedDate] },
    } : event)),
    markAllNotificationsRead: () => setNotificationsRead(true),
    setField: (id, value) => setFields((current) => ({ ...current, [`${screen}:${id}`]: value })),
    select: (group, key) => setSelections((current) => ({ ...current, [group]: key })),
  }
  return (
    <DesignContext.Provider value={context}>
      <CommunityContext.Provider value={community}>
      <main className="desktop-stage">
        <div className="app-viewport" data-screen={screen} data-community-live={communityScreens.has(screen)} key={route}>
          <Screen />
          {toast && <div className="app-toast" role="status">{toast}</div>}
          {datePickerOpen && screen === 'add-event' && <div className="date-picker-backdrop" onClick={() => setDatePickerOpen(false)}>
            <section className="date-picker" role="dialog" aria-modal="true" aria-label="일정 날짜 선택" onClick={(event) => event.stopPropagation()}>
              <header className="date-picker-header">
                <button type="button" aria-label="이전 달" onClick={() => setCalendarMonth(moveMonth(calendarMonth, -1))}>‹</button>
                <strong>{calendarMonth.replace('-', '년 ')}월</strong>
                <button type="button" aria-label="다음 달" onClick={() => setCalendarMonth(moveMonth(calendarMonth, 1))}>›</button>
              </header>
              <div className="date-picker-grid date-picker-weekdays">{'일월화수목금토'.split('').map((day) => <span key={day}>{day}</span>)}</div>
              <div className="date-picker-grid">
                {Array.from({ length: new Date(...calendarMonth.split('-').map(Number).map((value, index) => index === 1 ? value - 1 : value), 1).getDay() }, (_, index) => <span key={`blank-${index}`} />)}
                {Array.from({ length: new Date(...calendarMonth.split('-').map(Number), 0).getDate() }, (_, index) => {
                  const date = `${calendarMonth}-${String(index + 1).padStart(2, '0')}`
                  const active = formatDate(parseDate(fields['add-event:179:6426'], selectedDate) || selectedDate) === formatDate(date)
                  return <button type="button" key={date} aria-pressed={active} onClick={() => chooseEventDate(date)}>{index + 1}</button>
                })}
              </div>
              <button type="button" className="date-picker-today" onClick={() => chooseEventDate(localDate())}>오늘</button>
            </section>
          </div>}
        </div>
      </main>
      </CommunityContext.Provider>
    </DesignContext.Provider>
  )
}

function moveMonth(value, offset) {
  const [year, month] = value.split('-').map(Number)
  return localDate(new Date(year, month - 1 + offset, 1)).slice(0, 7)
}
