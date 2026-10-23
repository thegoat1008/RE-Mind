import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { api, getSession } from './api.js'

export const CommunityContext = createContext(null)
export const useCommunityData = () => useContext(CommunityContext)
export const communityScreens = new Set(['community', 'write-mode', 'write-post', 'post', 'empathy-post'])
const draftKey = 'remind-community-draft-v1'
const blank = { mode: 'SOLUTION', title: '', content: '' }
function readDraft() {
  try {
    const saved = JSON.parse(localStorage.getItem(draftKey) || 'null')
    return { mode: saved?.mode === 'EMPATHY' ? 'EMPATHY' : 'SOLUTION', title: String(saved?.title || ''), content: String(saved?.content || '') }
  } catch { return { ...blank } }
}
const isId = value => /^[1-9]\d*$/.test(value || '')
export function timeAgo(value) {
  const minutes = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 60000))
  if (minutes < 1) return '방금 전'
  if (minutes < 60) return `${minutes}분 전`
  if (minutes < 1440) return `${Math.floor(minutes / 60)}시간 전`
  return new Date(value).toLocaleDateString('ko-KR')
}

export function useCommunity({ screen, route, notify }) {
  const params = new URLSearchParams(route.split('?')[1] || '')
  const id = params.get('id')
  const editId = params.get('edit')
  const active = communityScreens.has(screen)
  const [session, setSession] = useState(null)
  const [revision, setRevision] = useState(0)
  const [draft, setDraft] = useState(readDraft)
  const [editForm, setEditForm] = useState(null)
  const [formError, setFormError] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [mode, setMode] = useState('ALL')
  const [sort, setSort] = useState('LATEST')
  const [mine, setMine] = useState(false)
  const [page, setPage] = useState(0)
  const [list, setList] = useState(null)
  const [listError, setListError] = useState('')
  const [post, setPost] = useState(null)
  const [postError, setPostError] = useState('')
  const [comments, setComments] = useState(null)
  const [commentError, setCommentError] = useState('')
  const [comment, setComment] = useState('')
  const [busy, setBusy] = useState(false)
  const lock = useRef(false)
  const routeRef = useRef(route)
  routeRef.current = route
  const recognition = useRef(null)
  const [listening, setListening] = useState(false)
  const go = key => { window.location.hash = `/${key}` }
  const refresh = () => setRevision(value => value + 1)

  useEffect(() => {
    if (!active) return
    let current = true
    getSession().then(value => { if (current) setSession(value) }).catch(() => {})
    return () => { current = false }
  }, [active, revision])
  useEffect(() => {
    try { localStorage.setItem(draftKey, JSON.stringify(draft)) }
    catch { notify('임시 저장을 사용할 수 없어요. 브라우저의 사이트 저장 설정을 확인해 주세요.') }
  }, [draft])
  useEffect(() => {
    const timer = setTimeout(() => { setPage(0); setDebouncedQuery(query.trim()) }, 300)
    return () => clearTimeout(timer)
  }, [query])
  useEffect(() => {
    if (screen !== 'community') return
    const controller = new AbortController()
    setList(null); setListError('')
    api.list({ q: debouncedQuery, mode, sort, mine, page, size: 10 }, controller.signal)
      .then(value => {
        if (controller.signal.aborted) return
        if (value.totalPages > 0 && page >= value.totalPages) setPage(value.totalPages - 1)
        else setList(value)
      }).catch(error => { if (error.name !== 'AbortError') setListError(error.message) })
    return () => controller.abort()
  }, [screen, debouncedQuery, mode, sort, mine, page, revision])
  useEffect(() => {
    if (!['post', 'empathy-post'].includes(screen)) return
    setPost(null); setPostError(''); setComments(null); setCommentError(''); setComment('')
    if (!isId(id)) { setPostError('글을 선택해 주세요. 목록에서 다시 열 수 있어요.'); return }
    const controller = new AbortController()
    api.view(id, controller.signal).then(async value => {
      if (controller.signal.aborted) return
      const correctScreen = 'post'
      if (screen !== correctScreen) { go(`${correctScreen}?id=${id}`); return }
      setPost(value)
      try {
        const result = await api.comments(id, 0, controller.signal)
        if (!controller.signal.aborted) setComments(result)
      } catch (error) { if (error.name !== 'AbortError') setCommentError(error.message) }
    }).catch(error => { if (error.name !== 'AbortError') setPostError(error.message) })
    return () => controller.abort()
  }, [screen, id, revision])
  useEffect(() => {
    setFormError('')
    if (screen !== 'write-post' || !editId) return
    setEditForm(null)
    if (!isId(editId)) { setFormError('수정할 글을 찾을 수 없어요.'); return }
    const controller = new AbortController()
    api.detail(editId, controller.signal).then(value => {
      if (controller.signal.aborted) return
      if (!value.mine) { setFormError('내가 작성한 글만 수정할 수 있어요.'); return }
      setEditForm({ mode: value.mode, title: value.title, content: value.content })
    }).catch(error => { if (error.name !== 'AbortError') setFormError(error.message) })
    return () => controller.abort()
  }, [screen, editId, revision])
  useEffect(() => {
    return () => { recognition.current?.abort(); recognition.current = null; setListening(false) }
  }, [route])

  const form = editId ? editForm : draft
  function setField(key, value) {
    const setter = editId ? setEditForm : setDraft
    setter(current => current ? { ...current, [key]: value } : current)
  }
  async function perform(action) {
    if (lock.current) return
    lock.current = true; setBusy(true)
    try { await action() } catch (error) { notify(error.message || '처리하지 못했어요. 다시 시도해 주세요.') }
    finally { lock.current = false; setBusy(false) }
  }
  function chooseMode(value) {
    setDraft(current => ({ ...current, mode: value }))
    go('write-post')
  }
  function openPost(value) { go(`post?id=${value.id}`) }
  function save() {
    if (!form || formError) return
    if (!form.title.trim() || !form.content.trim()) { notify('제목과 내용을 모두 입력해 주세요.'); return }
    if (form.title.length > 120 || form.content.length > 5000) { notify('제목은 120자, 내용은 5,000자까지 입력할 수 있어요.'); return }
    const originalRoute = route
    perform(async () => {
      const value = editId ? await api.edit(editId, form) : await api.create(form)
      if (!editId) { setDraft({ ...blank }); localStorage.removeItem(draftKey) }
      if (routeRef.current !== originalRoute) return
      setPost(value); openPost(value)
    })
  }
  function like() {
    if (!post) return
    const originalRoute = route
    perform(async () => {
      const value = await api.like(post.id, !post.liked)
      if (routeRef.current === originalRoute) setPost(value)
    })
  }
  function removePost() {
    if (!post?.mine || !window.confirm('이 글과 댓글을 삭제할까요? 삭제하면 복구할 수 없어요.')) return
    perform(async () => { await api.remove(post.id); go('community') })
  }
  function addComment() {
    if (!post) return
    if (!comment.trim()) { notify('댓글을 입력해 주세요.'); return }
    const originalRoute = route
    perform(async () => {
      await api.addComment(post.id, comment)
      if (routeRef.current !== originalRoute) return
      setComment('')
      setPost(current => current && ({ ...current, commentCount: current.commentCount + 1 }))
      try { setComments(await api.comments(post.id)); setCommentError('') }
      catch (error) { setCommentError(error.message) }
    })
  }
  function removeComment(value) {
    if (!value.mine || !window.confirm('이 댓글을 삭제할까요?')) return
    const originalRoute = route
    perform(async () => {
      await api.removeComment(post.id, value.id)
      if (routeRef.current !== originalRoute) return
      setPost(current => current && ({ ...current, commentCount: Math.max(0, current.commentCount - 1) }))
      try { setComments(await api.comments(post.id)); setCommentError('') }
      catch (error) { setCommentError(error.message) }
    })
  }
  function moreComments() {
    if (!comments?.hasNext) return
    const originalRoute = route
    perform(async () => {
      const next = await api.comments(post.id, comments.page + 1)
      if (routeRef.current === originalRoute) setComments(current => ({ ...next, items: [...current.items, ...next.items] }))
    })
  }
  function dictate(target = 'content') {
    if (listening) { recognition.current?.stop(); return }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) { notify('이 브라우저에서는 음성 입력을 지원하지 않아요. 키보드로 입력해 주세요.'); return }
    const engine = new SpeechRecognition()
    recognition.current = engine; engine.lang = 'ko-KR'; engine.interimResults = false
    const originalRoute = route
    engine.onresult = event => {
      if (routeRef.current !== originalRoute) return
      const text = Array.from(event.results).map(result => result[0].transcript).join(' ')
      if (target === 'comment') setComment(current => `${current}${current ? ' ' : ''}${text}`.slice(0, 1000))
      else (editId ? setEditForm : setDraft)(current => current && ({ ...current, content: `${current.content}${current.content ? ' ' : ''}${text}`.slice(0, 5000) }))
    }
    engine.onend = () => { recognition.current = null; setListening(false) }
    engine.onerror = event => { if (event.error !== 'aborted') notify(event.error === 'not-allowed' ? '음성 입력을 사용하려면 마이크 권한을 허용해 주세요.' : '음성을 듣지 못했어요. 다시 시도해 주세요.'); setListening(false) }
    try { engine.start(); setListening(true) } catch { notify('마이크를 시작하지 못했어요.'); setListening(false) }
  }

  return { screen, session, form, formError, editId, busy, listening, setField, chooseMode, save, dictate,
    searchOpen, setSearchOpen, query, setQuery, mode, sort, mine, page, list, listError, refresh,
    filter: value => { setMode(value); setPage(0) },
    order: value => { setSort(value); setPage(0) },
    own: value => { setMine(value); setPage(0) }, setPage,
    post, postError, comments, commentError, comment, setComment, openPost, like, removePost,
    edit: () => go(`write-post?edit=${post.id}`), addComment, removeComment, moreComments,
    back: () => { if (editId && post) openPost(post); else go('community') }, go,
  }
}
