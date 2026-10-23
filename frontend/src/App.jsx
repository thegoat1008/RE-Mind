import { useEffect, useState } from 'react'
import { DesignContext } from './designRuntime.jsx'
import manifest from './screenManifest.json'
import './design.css'
import './designPrecision.css'
import { CommunityContext, communityScreens, useCommunity } from './community/useCommunity.js'
import './community/bindings.css'

const modules = import.meta.glob('./screens/*.jsx', { eager: true })
const screenNames = new Set(manifest.map((screen) => screen.key))

function currentScreen(route) {
  const key = route.replace(/^#\/?/, '').split('?')[0]
  return screenNames.has(key) ? key : 'welcome'
}

export default function App() {
  const [route, setRoute] = useState(() => window.location.hash)
  const screen = currentScreen(route)
  const [fields, setFields] = useState({})
  const [selections, setSelections] = useState({})
  const [toast, setToast] = useState('')
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

  function go(key) { window.location.hash = `/${key}` }
  function back() {
    const parents = {
      login: 'welcome', signup: 'login', verify: 'signup', 'forgot-password': 'login',
      'care-registration': 'signup-complete', 'check-intro': 'care-registration', 'check-question': 'check-intro',
      'check-result': 'check-question', 'check-clear': 'check-question', 'email-setup': 'care-registration',
      notifications: 'home', quiz: 'home', 'quiz-answer': 'quiz', 'family-record': 'quiz-answer',
      'add-event': 'calendar', 'event-detail': 'calendar', 'delete-event': 'event-detail', 'event-voice': 'calendar',
      'send-email': 'calendar', 'chat-voice': 'chat', 'chat-history': 'chat-modes', 'chat-crisis': 'chat',
      'write-mode': 'community', 'write-post': 'community', post: 'community', 'empathy-post': 'community',
      'family-email': 'settings', 'email-schedule': 'family-email', hospitals: 'settings', policies: 'settings', emergency: 'settings',
    }
    go(parents[screen] || 'home')
  }

  function activate({ name, label }) {
    const tab = { home: 'home', calendar: 'calendar', chat: 'chat-modes', community: 'community', settings: 'settings' }
    if (name.startsWith('tab/')) return go(tab[name.slice(4)])
    if (communityScreens.has(screen)) {
      if (name === '뒤로 버튼') return community.back()
      if (name === '글쓰기 FAB') return community.go('write-mode')
      if (screen === 'write-mode' && name === '모드 카드') return community.chooseMode(/공감/.test(label) ? 'EMPATHY' : 'SOLUTION')
      if (screen === 'write-post' && ['말로 쓰기', 'icon/mic'].includes(name)) return community.dictate()
      if (screen === 'post' && name === 'icon/mic') return community.dictate('comment')
      if (screen === 'post' && name === '보내기') return community.addComment()
      if (screen === 'write-post' && label === '글 올리기') return community.save()
      if (screen === 'write-post' && label === '바꾸기') return community.editId ? undefined : community.go('write-mode')
      return
    }
    if (name === '뒤로 버튼') return back()
    if (name === '보기 버튼' || name === 'toggle' || name === '개인정보 동의') return
    if (label === '로그아웃') return go('login')
    if (name === 'Notification') return go('notifications')
    if (name === '치매 상식 카드') return go('quiz')
    if (name === '대화 버튼') return go('chat-modes')
    if (label === '전체보기') return go('calendar')
    if (label === '설정') return go('family-email')
    if (label === '지금 보내기' || name === '지금 보내기') return go('send-email')
    if (name === 'EventItem' || name === '오늘의 일정') return go('event-detail')
    if (name === '글쓰기 FAB') return go('write-mode')
    if (name === '말로 추가') return go('event-voice')
    if (name === '이메일 보내기') return go('send-email')
    if (name === 'icon/mic' || name === '말로 쓰기') {
      if (screen === 'calendar') return go('event-voice')
      if (screen.startsWith('chat')) return go('chat-voice')
      return setToast('이 브라우저의 음성 입력 연동을 준비 중이에요.')
    }
    if (name === '전화 버튼' || name === 'call') return setToast('전화 연결은 실제 서비스 연동 후 사용할 수 있어요.')
    if (screen === 'welcome' && ['시작하기', '이미 계정이 있어요'].includes(label)) return go(label === '시작하기' ? 'signup' : 'login')
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
    if (screen === 'forgot-password') return setToast('비밀번호 재설정 메일은 서버 연동 후 보낼 수 있어요.')
    if (screen === 'signup-complete') return go(label === '나중에 할게요' ? 'home-empty' : 'care-registration')
    if (screen === 'care-registration' && label === '다음') return go('check-intro')
    if (screen === 'check-intro') return go(label === '시작하기' ? 'check-question' : 'email-setup')
    if (screen === 'check-question' && ['다음', '건너뛰기'].includes(label)) return go(label === '건너뛰기' ? 'check-clear' : 'check-result')
    if (screen === 'check-question' && label === '이전') return go('check-intro')
    if (screen === 'check-result') {
      if (/센터 찾기/.test(label)) return go('hospitals')
      if (label === '다음에 할게요') return go('email-setup')
    }
    if (screen === 'check-clear' && label === '다음') return go('email-setup')
    if (screen === 'email-setup' && ['저장하기', '나중에 할게요'].includes(label)) return go('home-empty')
    if (screen === 'home-empty' && /일정/.test(label)) return go('add-event')
    if (screen === 'calendar') {
      if (/일정 추가/.test(label)) return go('add-event')
      if (name === '이메일' || name === '메일') return go('send-email')
    }
    if (screen === 'event-detail') {
      if (label === '수정하기') return go('add-event')
      if (label === '삭제') return go('delete-event')
    }
    if (screen === 'delete-event') return go(label === '취소' ? 'event-detail' : 'calendar')
    if (['add-event', 'event-voice'].includes(screen) && label === '저장하기') {
      sessionStorage.setItem('remind-event-draft', JSON.stringify(Object.fromEntries(Object.entries(fields).filter(([key]) => key.startsWith(`${screen}:`)))))
      go('calendar')
      return
    }
    if (screen === 'send-email' && label === '보내기') return setToast('이메일 발송은 서버 연동 후 사용할 수 있어요.')
    if (screen === 'chat-modes') return go(name === '이전 대화' ? 'chat-history' : 'chat')
    if (screen === 'chat-history' && name === '대화 카드') return go('chat')
    if (screen === 'chat-voice') return go('chat')
    if (screen === 'chat' && name === '보내기') return setToast('AI 답변은 서버 연동 후 받을 수 있어요.')
    if (screen === 'settings') {
      if (/병원 찾기/.test(label)) return go('hospitals')
      if (/치매 정책/.test(label)) return go('policies')
      if (/긴급 안내/.test(label)) return go('emergency')
      if (/치매 체크/.test(label)) return go('check-intro')
      if (/돌보는 분/.test(label)) return go('care-registration')
      if (/가족 이메일/.test(label)) return go('family-email')
    }
    if (screen === 'family-email') {
      if (label === '수정') return go('email-schedule')
      if (/가족 이메일 추가/.test(label)) return go('email-schedule')
      if (label === '삭제') return setToast('가족 정보 삭제는 서버 연동 후 사용할 수 있어요.')
    }
    if (screen === 'email-schedule' && label === '저장하기') return go('family-email')
    if (screen === 'quiz' && (['버튼 O', '버튼 X'].includes(name) || label === '건너뛰기')) return go('quiz-answer')
    if (screen === 'quiz-answer') {
      if (name === '우리 가족') return go('family-record')
      if (label === '다음 퀴즈') return go('quiz')
      if (label === '그만 볼게요') return go('home')
    }
    if (screen === 'family-record' && ['저장하고 대화하기', '건너뛰기'].includes(label)) return go('chat-modes')
  }

  const context = {
    screen, fields, selections, activate,
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
        </div>
      </main>
      </CommunityContext.Provider>
    </DesignContext.Provider>
  )
}
