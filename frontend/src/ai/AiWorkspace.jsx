import { useEffect, useRef, useState } from 'react'
import './ai.css'

const SESSION_KEY = 'remind-ai-conversation-id'
const ASSETS = '/assets/figma/'
const MODE_LABEL = { EMPATHY: '공감', SOLUTION: '해결책' }
const INTENT_LABEL = { EMPATHY: '공감', POLICY: '정책 검색', SCHEDULE: '일정 초안', GENERAL: '일반 대화', CLARIFY: '추가 질문', SAFETY: '안전 확인' }
const EMPTY = { id: null, mode: 'EMPATHY', messages: [], exchanges: [] }

function readSessionId() {
  try { return sessionStorage.getItem(SESSION_KEY) } catch { return null }
}

// Keep only the opaque conversation id in browser storage, never conversation text.
function storeSessionId(id) {
  try {
    if (id) sessionStorage.setItem(SESSION_KEY, id)
    else sessionStorage.removeItem(SESSION_KEY)
  } catch { /* Conversation still works when browser storage is disabled. */ }
}

async function api(path, options = {}) {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 60000)
  try {
    const response = await fetch(`/api/ai${path}`, {
      ...options,
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', ...options.headers },
      signal: controller.signal,
    })
    if (response.status === 204) return null
    const body = await response.json().catch(() => null)
    if (!response.ok) {
      const error = new Error(body?.message || '요청을 처리하지 못했어요. 서버 연결을 확인해 주세요.')
      error.status = response.status
      error.code = body?.code
      error.retryable = body?.retryable ?? response.status >= 500
      throw error
    }
    if (!body) throw new Error('서버 응답을 읽지 못했어요. 다시 시도해 주세요.')
    return body
  } catch (error) {
    if (error.name === 'AbortError') {
      const timedOut = new Error('응답을 기다리는 시간이 길어졌어요. 같은 요청으로 다시 시도할 수 있어요.')
      timedOut.retryable = true
      throw timedOut
    }
    if (error instanceof TypeError) {
      const offline = new Error('서버에 연결하지 못했어요. 서버 실행과 네트워크를 확인해 주세요.')
      offline.retryable = true
      throw offline
    }
    throw error
  } finally {
    window.clearTimeout(timeout)
  }
}

function safeUrl(value) {
  try {
    const url = new URL(value)
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null
  } catch { return null }
}

function formatDate(value) {
  if (!value) return ''
  const date = new Date(value)
  return Number.isNaN(date.valueOf()) ? '' : new Intl.DateTimeFormat('ko-KR', {
    month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Seoul',
  }).format(date)
}

function SourceCards({ sources = [] }) {
  if (!sources.length) return null
  return <div className="oni-sources" aria-label="답변 근거 자료">
    {sources.map((source) => {
      const url = safeUrl(source.sourceUrl)
      return <article className="oni-source" key={source.id || source.sourceUrl}>
        <span className="oni-eyebrow">공식 정책 자료</span>
        <h3>{source.title}</h3>
        <p>{source.summary}</p>
        {source.eligibility && <p><b>대상</b> {source.eligibility}</p>}
        {source.application && <p><b>신청</b> {source.application}</p>}
        {url && <a href={url} target="_blank" rel="noopener noreferrer">공식 출처 확인 ↗</a>}
        <small>{source.verifiedAt ? `자료 확인일 ${source.verifiedAt}` : '자료 확인일 미제공'} · 신청 조건은 담당 기관에 확인해 주세요.</small>
      </article>
    })}
  </div>
}

function ScheduleCard({ proposal }) {
  if (!proposal) return null
  const fields = { title: '제목', date: '날짜', time: '시간', invalidDate: '올바른 날짜', invalidTime: '올바른 시간·오전/오후', futureDateTime: '앞으로의 날짜·시간' }
  return <article className="oni-schedule">
    <div className="oni-card-top"><span className="oni-eyebrow">일정 초안</span><strong>저장되지 않았어요</strong></div>
    <h3>{proposal.title || '일정 제목 확인 필요'}</h3>
    <p>{proposal.date || '날짜 확인 필요'} · {proposal.time || '시간 확인 필요'}</p>
    <small>한국 시간 · {proposal.timezone || 'Asia/Seoul'}</small>
    {proposal.missingFields?.length > 0 && <p className="oni-missing">추가로 알려주세요: {proposal.missingFields.map((field) => fields[field] || field).join(', ')}</p>}
    <p className="oni-draft-note">캘린더 연결 전이라 초안만 표시해요. 병원 예약이나 일정 등록은 실행되지 않았어요.</p>
  </article>
}

function Decision({ exchange }) {
  if (!exchange?.decision) return null
  return <details className="oni-decision">
    <summary>개발 확인 · 판단 근거</summary>
    <dl>
      <dt>판단</dt><dd>{INTENT_LABEL[exchange.decision.intent] || exchange.decision.intent}</dd>
      <dt>근거</dt><dd>{exchange.decision.reason}</dd>
      <dt>확인 필요</dt><dd>{exchange.decision.requiresConfirmation ? '예' : '아니오'}</dd>
      <dt>응답 방식</dt><dd>{exchange.demo ? '시연용 규칙 응답' : exchange.provider}</dd>
    </dl>
  </details>
}

function Nav({ go, disabled }) {
  const tabs = [
    ['home', '홈', '492e0.svg'], ['calendar', '캘린더', '9a8d3.svg'],
    ['chat-modes', '대화', '84469.svg'], ['community', '커뮤니티', 'a95ec.svg'], ['settings', '설정', '07ec0.svg'],
  ]
  return <nav className="oni-nav" aria-label="주 메뉴">
    {tabs.map(([key, label, image]) => <button type="button" key={key} disabled={disabled}
      onClick={() => go(key)} aria-current={key === 'chat-modes' ? 'page' : undefined}>
      <img src={`${ASSETS}${image}`} alt="" /><span>{label}</span>
    </button>)}
  </nav>
}

export default function AiWorkspace({ screen, go }) {
  const [config, setConfig] = useState(null)
  const [configError, setConfigError] = useState('')
  const [conversation, setConversation] = useState(EMPTY)
  const [restoring, setRestoring] = useState(Boolean(readSessionId()))
  const [message, setMessage] = useState('')
  const [region, setRegion] = useState('')
  const [sending, setSending] = useState(false)
  const [queued, setQueued] = useState(null)
  const [chatError, setChatError] = useState(null)
  const [notice, setNotice] = useState('')
  const [history, setHistory] = useState([])
  const [historyLoading, setHistoryLoading] = useState(false)
  const [historyError, setHistoryError] = useState('')
  const [deleteId, setDeleteId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [recording, setRecording] = useState(false)
  const [voiceMessage, setVoiceMessage] = useState('')
  const [interim, setInterim] = useState('')
  const requestRef = useRef(null)
  const sendingRef = useRef(false)
  const recognitionRef = useRef(null)
  const messageEndRef = useRef(null)
  const composerRef = useRef(null)
  const loadSequence = useRef(0)
  const speechSupported = Boolean(window.SpeechRecognition || window.webkitSpeechRecognition)
  const isHistory = screen === 'chat-history'
  const isModes = screen === 'chat-modes'
  const busy = sending || restoring || Boolean(deletingId)

  async function loadConfig() {
    setConfigError('')
    try { setConfig(await api('/config')) }
    catch (error) { setConfigError(error.message) }
  }

  useEffect(() => {
    let cancelled = false
    api('/config').then((result) => { if (!cancelled) setConfig(result) })
      .catch((error) => { if (!cancelled) setConfigError(error.message) })
    const id = readSessionId()
    if (id) {
      api(`/conversations/${encodeURIComponent(id)}`).then((result) => {
        if (!cancelled) setConversation({ ...EMPTY, ...result })
      }).catch((error) => {
        if (cancelled) return
        if (error.status === 404) {
          storeSessionId(null)
          setConversation(EMPTY)
          setNotice('이전 대화를 찾을 수 없어요. 새 대화를 시작해 주세요.')
        } else setNotice(`이전 대화를 불러오지 못했어요. 이전 대화에서 다시 열어 주세요. ${error.message}`)
      }).finally(() => { if (!cancelled) setRestoring(false) })
    }
    return () => { cancelled = true }
  }, [])

  async function loadHistory() {
    setHistoryLoading(true)
    setHistoryError('')
    try { setHistory(await api('/conversations')) }
    catch (error) { setHistoryError(error.message) }
    finally { setHistoryLoading(false) }
  }

  useEffect(() => { if (isHistory) loadHistory() }, [isHistory])
  useEffect(() => { messageEndRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' }) }, [conversation.messages.length, queued, sending])
  useEffect(() => {
    return () => {
      const recognition = recognitionRef.current
      if (recognition) {
        recognition.onresult = null
        recognition.onerror = null
        recognition.onend = null
        recognition.abort()
      }
    }
  }, [])
  useEffect(() => {
    if (isModes || isHistory) recognitionRef.current?.stop()
  }, [isModes, isHistory])

  function editMessage(value) {
    setMessage(value)
    requestRef.current = null
    setQueued(null)
    setChatError(null)
  }

  function editRegion(value) {
    setRegion(value)
    requestRef.current = null
    setQueued(null)
    setChatError(null)
  }

  function newConversation(mode) {
    if (busy) return
    recognitionRef.current?.stop()
    ++loadSequence.current
    storeSessionId(null)
    setConversation({ ...EMPTY, mode })
    setMessage('')
    setRegion('')
    setChatError(null)
    setQueued(null)
    setNotice('')
    setVoiceMessage('')
    requestRef.current = null
    go('chat')
  }

  async function openConversation(id) {
    if (busy) return
    const sequence = ++loadSequence.current
    setRestoring(true)
    setHistoryError('')
    try {
      const result = await api(`/conversations/${encodeURIComponent(id)}`)
      if (sequence !== loadSequence.current) return
      storeSessionId(result.id)
      setConversation({ ...EMPTY, ...result })
      setMessage('')
      setRegion('')
      setChatError(null)
      setQueued(null)
      setNotice('')
      requestRef.current = null
      go('chat')
    } catch (error) {
      if (sequence !== loadSequence.current) return
      if (error.status === 404) {
        if (id === conversation.id || id === readSessionId()) {
          storeSessionId(null)
          setConversation(EMPTY)
          setQueued(null)
          requestRef.current = null
        }
        setHistory((items) => items.filter((item) => item.id !== id))
      }
      setHistoryError(error.message)
    } finally { if (sequence === loadSequence.current) setRestoring(false) }
  }

  async function deleteConversation(id) {
    if (busy) return
    setDeletingId(id)
    setHistoryError('')
    try {
      await api(`/conversations/${encodeURIComponent(id)}`, { method: 'DELETE' })
      setHistory((items) => items.filter((item) => item.id !== id))
      if (id === conversation.id || id === readSessionId()) {
        storeSessionId(null)
        setConversation(EMPTY)
        setMessage('')
        setQueued(null)
        setChatError(null)
        requestRef.current = null
      }
      setDeleteId(null)
    } catch (error) {
      if (error.status === 404) {
        setHistory((items) => items.filter((item) => item.id !== id))
        if (id === conversation.id || id === readSessionId()) {
          storeSessionId(null)
          setConversation(EMPTY)
          setMessage('')
          setQueued(null)
          requestRef.current = null
        }
      }
      setHistoryError(error.message)
    } finally { setDeletingId(null) }
  }

  async function send(event) {
    event?.preventDefault()
    if (sendingRef.current || busy || recording || !message.trim() || !config?.configured || message.trim().length > 2000) return
    // A retry retains the complete request, including its id. Editing the draft clears it.
    const payload = requestRef.current || {
      ...(conversation.id ? { conversationId: conversation.id } : {}),
      requestId: crypto.randomUUID(), mode: conversation.mode,
      message: message.trim(), ...(region.trim() ? { region: region.trim() } : {}),
    }
    requestRef.current = payload
    setQueued(payload)
    setChatError(null)
    setSending(true)
    sendingRef.current = true
    try {
      const result = await api('/chat', { method: 'POST', body: JSON.stringify(payload) })
      storeSessionId(result.conversationId)
      setConversation((current) => ({
        ...current, id: result.conversationId,
        messages: [...current.messages, { role: 'USER', content: payload.message }, { role: 'ASSISTANT', content: result.reply }],
        exchanges: [...current.exchanges, result],
      }))
      setMessage('')
      setQueued(null)
      requestRef.current = null
      setVoiceMessage('')
    } catch (error) {
      if (error.status === 404) {
        storeSessionId(null)
        setConversation({ ...EMPTY, mode: conversation.mode })
        setQueued(null)
        requestRef.current = null
        setChatError({ message: '대화를 찾을 수 없어요. 입력한 내용으로 새 대화를 시작해 주세요.', retryable: false })
      } else setChatError({ message: error.message, retryable: error.retryable !== false, code: error.code })
    } finally {
      setSending(false)
      sendingRef.current = false
    }
  }

  function startVoice() {
    if (busy) return
    if (recording) { recognitionRef.current?.stop(); return }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setVoiceMessage('이 브라우저는 음성입력을 지원하지 않아요. 글로 입력해 주세요.')
      composerRef.current?.focus()
      return
    }
    requestRef.current = null
    setQueued(null)
    setChatError(null)
    const recognition = new SpeechRecognition()
    const base = message.trim()
    let finalText = ''
    recognition.lang = 'ko-KR'
    recognition.continuous = false
    recognition.interimResults = true
    recognition.onresult = (event) => {
      let partial = ''
      for (let index = event.resultIndex; index < event.results.length; index++) {
        if (event.results[index].isFinal) finalText += event.results[index][0].transcript
        else partial += event.results[index][0].transcript
      }
      setInterim(partial)
      if (finalText) setMessage([base, finalText].filter(Boolean).join(' '))
    }
    recognition.onerror = (event) => {
      const errors = {
        'not-allowed': '마이크 사용 권한이 필요해요. 브라우저 권한을 확인하거나 글로 입력해 주세요.',
        'service-not-allowed': '음성인식 서비스가 허용되지 않았어요. 글로 입력해 주세요.',
        'audio-capture': '사용할 수 있는 마이크를 찾지 못했어요. 글로 입력해 주세요.',
        'no-speech': '목소리가 들리지 않았어요. 다시 누르거나 글로 입력해 주세요.',
        network: '음성인식 서버에 연결하지 못했어요. 글로 입력해 주세요.',
        aborted: '음성입력을 중단했어요. 입력 내용을 확인해 주세요.',
      }
      setVoiceMessage(errors[event.error] || '음성입력에 실패했어요. 글로 계속 입력할 수 있어요.')
    }
    recognition.onend = () => {
      setRecording(false)
      setInterim('')
      recognitionRef.current = null
      if (finalText) setVoiceMessage('음성을 글로 옮겼어요. 내용을 수정·확인한 뒤 보내 주세요.')
    }
    recognitionRef.current = recognition
    setVoiceMessage('듣고 있어요. 끝나면 중지하고 글로 옮겨진 내용을 확인해 주세요.')
    setInterim('')
    setRecording(true)
    try { recognition.start() }
    catch {
      setRecording(false)
      recognitionRef.current = null
      setVoiceMessage('마이크를 시작하지 못했어요. 글로 입력해 주세요.')
    }
  }

  let assistantIndex = 0
  return <section className="oni-workspace" aria-label="온이 AI 대화">
    <div className="oni-status" aria-hidden="true"><span>9:41</span><div><img src={`${ASSETS}4c652.svg`} alt="" /><img src={`${ASSETS}f883c.svg`} alt="" /><img src={`${ASSETS}9efe4.svg`} alt="" /></div></div>
    <header className="oni-header">
      {isHistory && <button className="oni-back" onClick={() => go('chat-modes')} disabled={busy} aria-label="대화 선택으로 돌아가기">‹</button>}
      <img className="oni-character" src={`${ASSETS}efa7a.svg`} alt="" />
      <div><h1>{isHistory ? '이전 대화' : '온이'}</h1><p>{isHistory ? '이 브라우저 세션의 대화예요' : '보호자님 곁에 있어요'}</p></div>
      {!isModes && !isHistory && <button className="oni-text-button" disabled={busy} onClick={() => go('chat-modes')}>대화 선택</button>}
    </header>
    <div className={`oni-provider ${config?.demo ? 'is-demo' : ''}`} role="status">
      {configError ? <><span>{configError}</span><button onClick={loadConfig}>연결 재확인</button></>
        : !config ? '서버 연결을 확인하고 있어요…'
          : <><strong>{config.demo ? '시연 모드 · 실제 AI 연결 아님' : config.configured ? 'Gemini 연결 모드' : 'Gemini 설정 필요'}</strong>
            <span>{config.notice || (config.configured ? '가상 사례로 대화 흐름을 확인해 주세요.' : '서버의 API 키 설정 후 연결을 다시 확인해 주세요.')}</span>
            {!config.configured && <button onClick={loadConfig}>설정 후 다시 확인</button>}</>}
    </div>
    {notice && <p className="oni-notice" role="status">{notice}</p>}
    {restoring && <p className="oni-loading" role="status">대화를 불러오고 있어요…</p>}

    {isModes ? <div className="oni-scroll oni-mode-content">
      <h2>오늘은 어떤 대화가<br />필요하세요?</h2>
      <p className="oni-muted">마음에 맞는 쪽을 골라 주세요.</p>
      {conversation.id && <button className="oni-resume" disabled={busy} onClick={() => go('chat')}>이어서 대화하기 <span>{MODE_LABEL[conversation.mode]} ›</span></button>}
      <button className="oni-mode-card" disabled={busy} onClick={() => newConversation('SOLUTION')}>
        <span className="oni-mode-icon"><img src={`${ASSETS}6f8cb.svg`} alt="" /></span>
        <span><strong>해결책이 필요해요</strong><small>해볼 방법과 지원 정보를 찾아요.</small></span><span aria-hidden="true">›</span>
      </button>
      <button className="oni-mode-card" disabled={busy} onClick={() => newConversation('EMPATHY')}>
        <span className="oni-mode-icon"><img src={`${ASSETS}ae472.svg`} alt="" /></span>
        <span><strong>공감해주세요</strong><small>마음을 먼저 들어드려요.</small></span><span aria-hidden="true">›</span>
      </button>
      {conversation.id && <p className="oni-small oni-muted">모드를 고르면 새 대화가 시작돼요. 기존 대화는 이전 대화에 남아요.</p>}
      <button className="oni-history-link" disabled={busy} onClick={() => go('chat-history')}>이전 대화 이어가기 <span aria-hidden="true">›</span></button>
      <p className="oni-medical">온이는 의료 전문가를 대신하지 않아요.</p>
      <p className="oni-privacy">가상 사례로 체험해 주세요. 실제 이름·건강정보는 입력하지 마세요.</p>
    </div> : isHistory ? <div className="oni-scroll oni-history-content">
      <div className="oni-list-title"><h2>나눈 이야기</h2><button className="oni-text-button" disabled={busy || historyLoading} onClick={loadHistory}>새로고침</button></div>
      <p className="oni-small oni-muted">같은 브라우저 세션에서만 이어갈 수 있어요. 서버를 재시작하면 기록이 사라질 수 있어요.</p>
      {historyLoading && <p className="oni-loading" role="status">목록을 불러오고 있어요…</p>}
      {historyError && <p className="oni-error" role="alert">{historyError}</p>}
      {!historyLoading && !historyError && !history.length && <div className="oni-empty"><p>아직 나눈 이야기가 없어요.</p><button className="oni-primary" onClick={() => go('chat-modes')}>새 대화 시작하기</button></div>}
      {history.map((item) => <article className="oni-history-card" key={item.id}>
        <button className="oni-history-open" disabled={busy} onClick={() => openConversation(item.id)}>
          <span className="oni-card-top"><span className="oni-mode-tag">{MODE_LABEL[item.mode] || item.mode}</span><small>{formatDate(item.updatedAt)}</small></span>
          <strong>{item.title || '제목 없는 대화'}</strong><span className="oni-small">이어서 대화하기 ›</span>
        </button>
        {deleteId === item.id ? <div className="oni-delete-confirm"><p>이 대화를 삭제할까요? 복구할 수 없어요.</p><button disabled={busy} onClick={() => setDeleteId(null)}>취소</button><button className="oni-danger" disabled={busy} onClick={() => deleteConversation(item.id)}>{deletingId === item.id ? '삭제 중…' : '삭제하기'}</button></div>
          : <button className="oni-delete" disabled={busy} onClick={() => setDeleteId(item.id)} aria-label={`${item.title || '대화'} 삭제`}>삭제</button>}
      </article>)}
    </div> : <>
      <div className="oni-chat-meta"><span className="oni-mode-tag">{MODE_LABEL[conversation.mode]} 대화</span><p>온이는 의료 전문가를 대신하지 않아요.</p></div>
      <div className="oni-scroll oni-messages" role="log" aria-label="대화 내용" aria-live="polite" aria-relevant="additions">
        {!conversation.messages.length && !queued && <div className="oni-welcome"><img src={`${ASSETS}efa7a.svg`} alt="" /><h2>편하게 이야기해 주세요.</h2><p>{conversation.mode === 'EMPATHY' ? '어떤 하루를 보내셨나요? 마음을 먼저 들을게요.' : '어떤 도움이 필요하세요? 함께 방법을 찾아볼게요.'}</p><span>가상 사례로 체험하고, 실제 이름·건강정보는 입력하지 마세요.</span></div>}
        {conversation.messages.map((item, index) => {
          const assistant = item.role === 'ASSISTANT'
          const exchange = assistant ? conversation.exchanges[assistantIndex++] : null
          return <div className={`oni-message ${assistant ? 'is-assistant' : 'is-user'}`} key={`${conversation.id}-${index}`}>
            <span className="oni-speaker">{assistant ? '온이' : '나'}</span>
            <p className="oni-bubble">{item.content}</p>
            {assistant && <>{exchange?.safety?.message && <p className="oni-safety" role="status">{exchange.safety.message}</p>}<SourceCards sources={exchange?.sources} /><ScheduleCard proposal={exchange?.scheduleProposal} /><Decision exchange={exchange} /></>}
          </div>
        })}
        {queued && <div className="oni-message is-user"><span className="oni-speaker">나 · {sending ? '답변 대기 중' : '전송 결과 확인 필요'}</span><p className="oni-bubble">{queued.message}</p></div>}
        {sending && <p className="oni-thinking" role="status">온이가 이야기를 살피고 있어요<span>…</span></p>}
        {chatError && <div className="oni-error" role="alert"><p>{chatError.message}</p>{chatError.retryable && <button className="oni-text-button" onClick={send}>같은 요청 다시 시도</button>}{!chatError.retryable && <p className="oni-small">입력이나 설정을 확인한 후 보내 주세요.</p>}</div>}
        <div ref={messageEndRef} />
      </div>
      <form className="oni-composer" onSubmit={send}>
        <details className="oni-region"><summary>지역 정보 (선택) {region && `· ${region}`}</summary><label>거주 지역 <input value={region} onChange={(event) => editRegion(event.target.value)} maxLength={50} placeholder="예: 서울특별시 강남구" disabled={busy || recording} /></label><p className="oni-small">현재 전국 공통 자료를 안내해요. 지역별 지원 여부는 담당 기관에 확인해 주세요.</p></details>
        {(screen === 'chat-voice' || recording || voiceMessage) && <div className="oni-voice-info" role="status"><p>{voiceMessage || (speechSupported ? '마이크를 눌러 말한 뒤, 글로 옮겨진 내용을 확인해 주세요.' : '이 브라우저는 음성입력을 지원하지 않아요. 아래에 글로 입력해 주세요.')}</p>{interim && <p className="oni-interim">{interim}</p>}<small>브라우저가 음성을 외부 인식 서비스로 보낼 수 있어요. 자동 전송하지 않아요.</small></div>}
        <label className="oni-sr-only" htmlFor="oni-message">온이에게 보낼 내용</label>
        <div className="oni-compose-row"><textarea ref={composerRef} id="oni-message" rows={2} maxLength={2000} value={message} disabled={busy || recording} onChange={(event) => editMessage(event.target.value)} placeholder="온이에게 편하게 이야기해 주세요" onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); send() } }} />
          <div className="oni-compose-actions"><button type="button" className={`oni-mic ${recording ? 'is-recording' : ''}`} disabled={busy} onClick={startVoice} aria-label={recording ? '음성입력 중지' : '음성입력 시작'}>{recording ? <span className="oni-stop" /> : <img src={`${ASSETS}39a22.svg`} alt="" />}</button><button type="submit" className="oni-send" disabled={busy || recording || !message.trim() || message.trim().length > 2000 || !config?.configured} aria-label="메시지 보내기"><img src={`${ASSETS}7e014.svg`} alt="" /></button></div></div>
        <div className="oni-composer-foot"><span>가상 사례로 체험해 주세요. 음성은 브라우저의 외부 인식 서비스로 전송될 수 있어요.</span><span className={message.length > 2000 ? 'oni-danger' : ''}>{message.length}/2000</span></div>
      </form>
    </>}
    <Nav go={go} disabled={busy || recording} />
  </section>
}
