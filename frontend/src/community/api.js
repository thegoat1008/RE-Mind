const base = '/api/community'
const sessionKey = 'remind-community-session-v1'
let sessionPromise

export class ApiError extends Error {
  constructor(message, status) { super(message); this.status = status }
}

async function request(path, { token, signal, ...options } = {}) {
  let response
  try {
    response = await fetch(base + path, {
      ...options, signal,
      headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new ApiError('커뮤니티에 연결하지 못했어요. 잠시 후 다시 시도해 주세요.', 0)
  }
  if (response.status === 204) return null
  const data = await response.json().catch(() => null)
  if (!response.ok) throw new ApiError(data?.message || '요청을 처리하지 못했어요. 다시 시도해 주세요.', response.status)
  if (!data) throw new ApiError('응답을 확인하지 못했어요. 다시 시도해 주세요.', 0)
  return data
}

export function getSession() {
  if (!sessionPromise) {
    sessionPromise = (async () => {
      let saved
      try { saved = JSON.parse(localStorage.getItem(sessionKey) || 'null') }
      catch { /* Invalid stored JSON can be replaced with a fresh session. */ }
      if (saved?.token) {
        try {
          const viewer = await request('/session', { token: saved.token })
          return { token: saved.token, nickname: viewer.nickname }
        } catch (error) { if (error.status !== 401) throw error }
      }
      const created = await request('/session', { method: 'POST' })
      try { localStorage.setItem(sessionKey, JSON.stringify(created)) }
      catch { throw new ApiError('작성한 글을 관리하려면 브라우저의 사이트 저장을 허용해 주세요.', 0) }
      return created
    })().catch(error => { sessionPromise = undefined; throw error })
  }
  return sessionPromise
}

async function authenticated(path, options) {
  const session = await getSession()
  try { return await request(path, { ...options, token: session.token }) }
  catch (error) {
    if (error.status === 401) {
      // Never silently replay a mutation under a different author after a DB reset.
      sessionPromise = undefined
      localStorage.removeItem(sessionKey)
    }
    throw error
  }
}

export const api = {
  list: (params, signal) => authenticated(`/posts?${new URLSearchParams(params)}`, { signal }),
  detail: (id, signal) => authenticated(`/posts/${id}`, { signal }),
  view: (id, signal) => authenticated(`/posts/${id}/view`, { method: 'PUT', signal }),
  create: body => authenticated('/posts', { method: 'POST', body: JSON.stringify(body) }),
  edit: (id, body) => authenticated(`/posts/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  remove: id => authenticated(`/posts/${id}`, { method: 'DELETE' }),
  like: (id, liked) => authenticated(`/posts/${id}/like`, { method: liked ? 'PUT' : 'DELETE' }),
  comments: (id, page = 0, signal) => authenticated(`/posts/${id}/comments?page=${page}`, { signal }),
  addComment: (id, content) => authenticated(`/posts/${id}/comments`, { method: 'POST', body: JSON.stringify({ content }) }),
  removeComment: (id, commentId) => authenticated(`/posts/${id}/comments/${commentId}`, { method: 'DELETE' }),
}
