import React, { createContext, useContext, useState } from 'react'

export const DesignContext = createContext(null)
export const Fragment = React.Fragment

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
        if (!replaced && child.type === 'p') {
          replaced = true
          const placeholder = textOf(child).trim()
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
          return <div {...child.props} role="button" tabIndex={0} aria-label="비밀번호 표시 전환"
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
  '재전송', '개인정보 동의', 'toggle', 'check', '보기 버튼', '로그아웃',
])

function ActionNode({ element, children, ...props }) {
  const app = useContext(DesignContext)
  const [selected, setSelected] = useState(null)
  const name = props['data-name'] || ''
  const label = textOf(children).replace(/\s+/g, ' ').trim()
  const toggle = name === 'toggle'
  const select = name === '선택지' || name === '기간 선택' || name === '가족' || name === 'Chip (앱 화면)' || /24:(974|976)/.test(props['data-node-id'] || '') || /node-24_97[46]/.test(props.id || '')
  const key = `${app.screen}:${props['data-node-id'] || props.id}:${label}`
  const kind = ['초기', '중기', '후기', '모르겠어요'].includes(label) ? 'stage' : ['어머니', '아버지', '배우자', '기타'].includes(label) ? 'relation' : name || 'chip'
  const group = name === '선택지' ? `${app.screen}:answer` : select ? `${app.screen}:${kind}` : ''
  const isSelected = group && app.selections[group] ? app.selections[group] === key : selected
  function activate(event) {
    event.preventDefault()
    event.stopPropagation()
    if (toggle) setSelected(selected === null ? false : !selected)
    if (select) app.select(group, key)
    app.activate({ name, label, nodeId: props['data-node-id'], event })
  }
  const Tag = element === 'a' ? 'div' : element
  return <Tag {...props} role={toggle ? 'switch' : select ? 'button' : 'button'} tabIndex={0}
    aria-label={label || name} aria-checked={toggle ? selected ?? true : undefined}
    aria-pressed={select && isSelected !== null ? Boolean(isSelected) : undefined}
    data-interactive="true" data-toggled={toggle && selected !== null ? String(selected) : undefined}
    onClick={activate} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') activate(event) }}>
    {children}
  </Tag>
}

// Figma screen components use this adapter to share form and navigation behavior.
export function h(type, props, ...children) {
  if (typeof type !== 'string') return React.createElement(type, props, ...children)
  const name = props?.['data-name'] || ''
  const nodeId = props?.['data-node-id'] || ''
  if (name.startsWith('code/')) return React.createElement(CodeSlot, props, ...children)
  if (name === 'input' || name === 'textarea' || name === '검색') {
    return React.createElement(InputSlot, props, ...children)
  }
  const label = textOf(children).replace(/\s+/g, ' ').trim()
  const textLink = ['전체보기', '설정', '회원가입', '바꾸기', '삭제', '수정'].includes(label) && type === 'p'
  if (type === 'a' || name === 'Chip (앱 화면)' || name === 'row' || name === '게시글' || name === '이메일' || name === '메일' || name.startsWith('tab/') || clickableNames.has(name) || /^24:(967|969|974|976)$/.test(nodeId) || /^node-24_(967|969|974|976)$/.test(props?.id || '') || textLink) {
    return React.createElement(ActionNode, { ...props, element: type }, ...children)
  }
  return React.createElement(type, props, ...children)
}
