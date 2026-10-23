import React, { createContext, useContext, useState } from 'react'
import { formatTime, formatDate, localDate, occursOn } from './calendarData.js'

export const DesignContext = createContext(null)
export const Fragment = React.Fragment

const EventContext = createContext(null)
const seedCards = {
  '179:6743': 'morning', '186:10074': 'hospital', '186:10122': 'family',
  '220:6192': 'morning', '220:6203': 'hospital', '220:6458': 'family',
  '196:5669': 'morning', '196:5680': 'hospital',
}
const seedIds = new Set(['morning', 'hospital', 'family'])
const likeNodes = {
  '179:6329': ['night', 24], '179:6346': ['tired', 41], '179:6363': ['policy', 63],
  '179:6239': ['night', 24], '179:8065': ['tired', 41],
}
const likeCounts = {
  '179:6331': ['night', 24], '179:6348': ['tired', 41], '179:6365': ['policy', 63],
  '179:6241': ['night', 24], '179:8067': ['tired', 41],
}
function LikeButton({ postId, children, ...props }) {
  const app = useContext(DesignContext)
  const liked = Boolean(app.likes[postId])
  return <button {...props} type="button" className={`${props.className} like-button`}
    aria-label="좋아요" aria-pressed={liked} data-liked={liked} data-interactive="true"
    onKeyDown={(event) => event.stopPropagation()}
    onClick={(event) => { event.stopPropagation(); app.toggleLike(postId) }}>
    {children}
  </button>
}
function LikeCount({ postId, count, ...props }) {
  const app = useContext(DesignContext)
  return <p {...props}>{count + (app.likes[postId] ? 1 : 0)}</p>
}
function EventCard({ eventId, children, ...props }) {
  const app = useContext(DesignContext)
  const event = app.eventsForDate.find((item) => item.id === eventId)
  if (!event) return null
  return <EventContext.Provider value={event}>
    <ActionNode {...props} element="div" data-name="event-card" data-event-id={eventId}>{children}</ActionNode>
  </EventContext.Provider>
}
function EventText({ title = false, children, ...props }) {
  const app = useContext(DesignContext)
  const event = useContext(EventContext)
  return <p {...props}>{!event ? children : title ? event.title : `${formatTime(event.time)} · ${event.completedDates[app.selectedDate] ? '완료' : '예정'}`}</p>
}
function AddedEventCard({ event }) {
  const app = useContext(DesignContext)
  const completed = Boolean(event.completedDates[app.selectedDate])
  return <div className="design-208" data-name="event-card" data-event-id={event.id} role="button" tabIndex={0}
    data-interactive="true" aria-label={event.title}
    onClick={() => app.activate({ name: 'event-card', eventId: event.id })}
    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); app.activate({ name: 'event-card', eventId: event.id }) } }}>
    <div className="design-209">
      <div className="design-210"><div className="design-61"><img alt="" className="design-5" src="/assets/figma-v2/89fb2.svg" /></div></div>
      <div className="design-211"><p className="design-212 event-title">{event.title}</p><p className="design-213">{formatTime(event.time)} · {completed ? '완료' : '예정'}</p></div>
      <button type="button" className={completed ? 'design-214' : 'design-215'} data-name="check"
        role="checkbox" aria-label={`${event.title} 완료`} aria-checked={completed}
        onKeyDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); app.toggleEvent(event.id) }}>
        <img alt="" width="18" height="18" src={`/assets/figma-v2/${completed ? '2cc00' : '58710'}.svg`} />
      </button>
    </div>
  </div>
}
function EventList({ children, home = false, ...props }) {
  const app = useContext(DesignContext)
  const added = app.eventsForDate.filter((event) => !seedIds.has(event.id))
  const items = React.Children.toArray(children)
  const initiallyEmpty = app.screen === 'home-empty'
  return <div {...props}>
    {home && items[0]}
    <div className={home ? 'home-event-list' : 'calendar-event-list'}>
      {(!initiallyEmpty || added.length === 0) && (home ? items.slice(1) : children)}
      {added.map((event) => <AddedEventCard key={event.id} event={event} />)}
      {!initiallyEmpty && app.eventsForDate.length === 0 && <p className="empty-events">등록된 일정이 없어요</p>}
    </div>
  </div>
}
function CalendarText({ count = false, children, ...props }) {
  const app = useContext(DesignContext)
  const events = app.eventsForDate.filter((event) => app.screen !== 'family-calendar' || event.id !== 'family')
  return <p {...props}>{count ? `일정 ${events.length}개` : formatDate(app.selectedDate, true)}</p>
}
function CalendarMonth({ children, ...props }) {
  const app = useContext(DesignContext)
  const [year, month] = app.calendarMonth.split('-').map(Number)
  const nodes = React.Children.toArray(children)
  const oldHeader = nodes[0]
  const headerParts = React.Children.toArray(oldHeader.props.children)
  function move(offset) {
    app.setCalendarMonth(localDate(new Date(year, month - 1 + offset, 1)).slice(0, 7))
  }
  const days = new Date(year, month, 0).getDate()
  const leading = new Date(year, month - 1, 1).getDay()
  const weeks = Math.ceil((leading + days) / 7)
  return <div {...props}>
    <div {...oldHeader.props}>
      <button {...headerParts[0].props} type="button" aria-label="이전 달" data-interactive="true" onClick={() => move(-1)} />
      <p {...headerParts[1].props}>{year}년 {month}월</p>
      <button {...headerParts[2].props} type="button" aria-label="다음 달" data-interactive="true" onClick={() => move(1)} />
    </div>
    {nodes[1]}
    {app.calendarMonth === '2026-10' ? nodes.slice(2) : Array.from({ length: weeks }, (_, week) =>
      <div className="design-195" key={week}>
        {Array.from({ length: 7 }, (_, weekday) => {
          const day = week * 7 + weekday - leading + 1
          if (day < 1 || day > days) return <div className="design-197" key={weekday} />
          const date = `${app.calendarMonth}-${String(day).padStart(2, '0')}`
          const hasEvent = app.events.some((event) => occursOn(event, date))
          return <div className="design-198" key={weekday}>
            <button type="button" className="design-199" data-choice="date" data-name="calendar-day"
              aria-label={`${month}월 ${day}일`} aria-pressed={app.selectedDate === date} onClick={() => app.selectDate(date)}>
              <p className="design-190">{day}</p>
            </button>
            {hasEvent && <div className="design-200"><img alt="" className="design-5" src="/assets/figma-v2/16e58.svg" /></div>}
          </div>
        })}
      </div>)}
  </div>
}
const detailNodes = {
  '179:7738': 'title', '179:7742': 'date', '179:7746': 'time', '179:7750': 'repeat',
  '179:7772': 'title', '179:7776': 'date', '179:7780': 'time', '179:7784': 'repeat',
}
function EventDetailText({ field, children, ...props }) {
  const app = useContext(DesignContext)
  const event = app.selectedEvent
  let value = children
  if (event) value = field === 'date' ? formatDate(app.selectedDate) : field === 'time' ? formatTime(event.time) : event[field]
  return <p {...props}>{value}</p>
}

function textOf(node) {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textOf).join(' ')
  return textOf(node.props?.children || node.props?.label)
}

function InputSlot({ children, ...props }) {
  const app = useContext(DesignContext)
  const [visible, setVisible] = useState(false)
  let replaced = false
  return (
    <div {...props}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child
        if (!replaced && (child.type === 'p' || (props['data-name'] === 'textarea' && child.type === 'div'))) {
          replaced = true
          const placeholder = (props['data-name'] === 'textarea' ? React.Children.toArray(child.props.children).map(textOf).join('\n') : textOf(child)).trim()
          const password = /비밀번호|8자/.test(placeholder)
          const multiline = props['data-name'] === 'textarea'
          const Tag = multiline ? 'textarea' : 'input'
          return <Tag {...child.props} children={undefined} className={`${child.props.className || ''} design-input`}
            aria-label={placeholder} placeholder={placeholder}
            type={multiline ? undefined : password && !visible ? 'password' : /이메일|@/.test(placeholder) ? 'email' : 'text'}
            autoComplete={password ? 'current-password' : 'off'}
            value={app.fields[`${app.screen}:${props['data-node-id']}`] || ''}
            onChange={(event) => app.setField(props['data-node-id'], event.target.value)} />
        }
        if (child.props['data-name'] === '보기 버튼') {
          return <div {...child.props} role="button" data-interactive="true" tabIndex={0} aria-label="비밀번호 표시 전환"
            onClick={() => setVisible(!visible)} onKeyDown={(event) => { if (event.key === 'Enter') setVisible(!visible) }}>
            {visible ? '숨기기' : child.props.children}
          </div>
        }
        return child
      })}
    </div>
  )
}

function CodeSlot({ children, ...props }) {
  const app = useContext(DesignContext)
  const value = app.fields[`${app.screen}:${props['data-node-id']}`] || ''
  const original = React.Children.toArray(children).find((child) => child.type === 'p')
  return <div {...props}>
    <input className={`${original?.props.className || ''} verification-input`} inputMode="numeric" maxLength={1}
      aria-label={`인증 코드 ${props['data-name'].split('/')[1]}번째 자리`}
      placeholder={textOf(original)} value={value}
      onChange={(event) => app.setField(props['data-node-id'], event.target.value.replace(/\D/g, '').slice(-1))} />
    {!original && !value && children}
  </div>
}

const clickableNames = new Set([
  '뒤로 버튼', 'Notification', '대화 버튼', '치매 상식 카드', 'EventItem', '오늘의 일정',
  '전체보기', '설정', '지금 보내기', '비밀번호 찾기', '회원가입 안내', '구글 로그인',
  '글쓰기 FAB', '모드 카드', '대화 카드', '이전 대화', '알림', '기간 선택', '가족',
  '선택지', '버튼 O', '버튼 X', '우리 가족', '건너뛰기', '보내기', '말로 추가',
  'icon/mic', '말로 쓰기', '병원 카드', '전화 버튼', 'call', '추가', '삭제', '수정',
  'Button (앱 화면)', 'btn 복사', 'btn 공유', '코드 공유', '일정 추가 FAB', '재전송', '개인정보 동의', 'toggle', 'check', '보기 버튼', '로그아웃',
])

function ActionNode({ element, children, ...props }) {
  const app = useContext(DesignContext)
  const boundEvent = useContext(EventContext)
  const [selected, setSelected] = useState(null)
  const name = props['data-name'] || ''
  const label = textOf(children).replace(/\s+/g, ' ').trim()
  const toggle = name === 'toggle' || name === 'check' || name === '개인정보 동의'
  const initiallyChecked = name !== 'check' || React.Children.toArray(children).some((child) => child.props?.src?.endsWith('/2cc00.svg'))
  const checked = name === 'check' && boundEvent ? Boolean(boundEvent.completedDates[app.selectedDate]) : selected ?? initiallyChecked
  const select = name === 'calendar-day' || name === '선택지' || name === '기간 선택' || name === '가족' || name === 'Chip (앱 화면)' || /24:(974|976)/.test(props['data-node-id'] || '') || /node-24_97[46]/.test(props.id || '')
  const key = `${app.screen}:${props['data-node-id'] || props.id}:${label}`
  const kind = ['초기', '중기', '후기', '모르겠어요'].includes(label) ? 'stage' : ['어머니', '아버지', '배우자', '기타'].includes(label) ? 'relation' : name || 'chip'
  const group = name === 'calendar-day' ? `${app.screen}:date` : name === '선택지' ? `${app.screen}:answer` : select ? `${app.screen}:${kind}` : ''
  const isSelected = name === 'calendar-day' ? app.selectedDate === `${app.calendarMonth}-${String(Number(label)).padStart(2, '0')}` : group && app.selections[group] ? app.selections[group] === key : selected
  function activate(event) {
    event.preventDefault()
    event.stopPropagation()
    if (name === 'check' && boundEvent) app.toggleEvent(boundEvent.id)
    else if (toggle) setSelected(!checked)
    if (select) app.select(group, key)
    app.activate({ name, label, nodeId: props['data-node-id'], eventId: boundEvent?.id, event })
  }
  const Tag = element === 'a' ? 'div' : element
  return <Tag {...props} role={toggle ? 'switch' : select ? 'button' : 'button'} tabIndex={0}
    aria-label={name === 'check' && boundEvent ? `${boundEvent.title} 완료` : label || name} aria-checked={toggle ? checked : undefined}
    aria-pressed={select && isSelected !== null ? Boolean(isSelected) : undefined}
    data-interactive="true" data-choice={name === 'calendar-day' ? 'date' : undefined} data-toggled={toggle && (selected !== null || boundEvent) ? String(checked) : undefined}
    onClick={activate} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') activate(event) }}>
    {name === 'check' && (selected !== null || boundEvent) ? React.Children.map(children, (child) => child.type === 'img' ? React.cloneElement(child, { src: `/assets/figma-v2/${checked ? '2cc00' : '58710'}.svg` }) : child) : children}
  </Tag>
}

// Figma screen components use this adapter to share form and navigation behavior.
export function h(type, props, ...children) {
  if (typeof type !== 'string') return React.createElement(type, props, ...children)
  const name = props?.['data-name'] || ''
  const nodeId = props?.['data-node-id'] || ''
  if (likeNodes[nodeId]) return React.createElement(LikeButton, { ...props, postId: likeNodes[nodeId][0] }, ...children)
  if (likeCounts[nodeId]) return React.createElement(LikeCount, { ...props, postId: likeCounts[nodeId][0], count: likeCounts[nodeId][1] })
  if (seedCards[nodeId]) return React.createElement(EventCard, { ...props, eventId: seedCards[nodeId] }, ...children)
  if (type === 'p' && props?.className === 'design-213') return React.createElement(EventText, props, ...children)
  if (type === 'p' && props?.className === 'design-212') return React.createElement(EventText, { ...props, title: true }, ...children)
  if (name === '오늘의 일정') return React.createElement(EventList, { ...props, home: true }, ...children)
  if (name === '일정 목록') return React.createElement(EventList, { ...props, className: `${props.className} dynamic-event-list` }, ...children)
  if (name === '월간 캘린더') return React.createElement(CalendarMonth, props, ...children)
  if (['220:6189', '196:5666'].includes(nodeId)) return React.createElement(CalendarText, props, ...children)
  if (['220:6190', '196:5667'].includes(nodeId)) return React.createElement(CalendarText, { ...props, count: true }, ...children)
  if (detailNodes[nodeId]) return React.createElement(EventDetailText, { ...props, field: detailNodes[nodeId] }, ...children)
  if (name.startsWith('code/')) return React.createElement(CodeSlot, props, ...children)
  if (name === 'input' || name === 'textarea' || name === '검색') {
    return React.createElement(InputSlot, props, ...children)
  }
  const label = textOf(children).replace(/\s+/g, ' ').trim()
  if (name === 'Frame' && props?.className === 'design-208') {
    return React.createElement(ActionNode, { ...props, 'data-name': 'event-card', element: type }, ...children)
  }
  if (name === 'Frame' && ['design-199', 'design-202'].includes(props?.className) && /^\d{1,2}$/.test(label)) {
    return React.createElement(ActionNode, { ...props, 'data-name': 'calendar-day', element: type }, ...children)
  }
  const textLink = ['전체보기', '관리', '설정', '회원가입', '바꾸기', '삭제', '수정', '새 코드 만들기', '연결 해제'].includes(label) && type === 'p'
  if (type === 'a' || name === 'Chip (앱 화면)' || name === '게시글' || name === '이메일' || name === '메일' || name.startsWith('tab/') || clickableNames.has(name) || /^24:(967|969|974|976)$/.test(nodeId) || /^node-24_(967|969|974|976)$/.test(props?.id || '') || textLink) {
    return React.createElement(ActionNode, { ...props, element: type }, ...children)
  }
  return React.createElement(type, props, ...children)
}
