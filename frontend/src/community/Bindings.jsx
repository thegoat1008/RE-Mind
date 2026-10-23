import { useCommunityData, timeAgo } from './useCommunity.js'

// Functional states use the existing screen's text and button styles.
export function Message({ error, loading = false, empty = '아직 글이 없어요. 첫 이야기를 나눠 주세요.' }) {
  const community = useCommunityData()
  return <div className="design-20" aria-live="polite">
    <p className="design-41" role={error ? 'alert' : 'status'}>{error || (loading ? '불러오는 중이에요…' : empty)}</p>
    {error && <button className="design-46" onClick={community.refresh}>다시 시도</button>}
  </div>
}

export function PostActions() {
  const community = useCommunityData()
  if (!community.post?.mine) return null
  return <div className="design-128" data-community-actions="true">
    <button className="design-56" disabled={community.busy} onClick={community.edit}>수정</button>
    <button className="design-56" disabled={community.busy} onClick={community.removePost}>삭제</button>
  </div>
}

export function PostState() {
  const community = useCommunityData()
  return <>
    <Message error={community.postError} loading={!community.postError} />
    <button className="design-46" onClick={() => community.go('community')}>목록으로</button>
  </>
}

export function ListTools() {
  const community = useCommunityData()
  if (!community.searchOpen) {
    if (!community.query && !community.mine && community.sort === 'LATEST' && community.mode === 'ALL') return null
    return <div className="design-128">
      <p className="design-41">{[community.query && `검색: ${community.query}`, community.mine && '내 글만', community.mode === 'SOLUTION' && '해결책', community.mode === 'EMPATHY' && '공감', community.sort === 'POPULAR' && '공감 많은 순', community.sort === 'RECOMMENDED' && '댓글·공감 많은 순'].filter(Boolean).join(' · ')}</p>
      <button className="design-56" onClick={() => { community.setQuery(''); community.own(false); community.order('LATEST'); community.filter('ALL') }}>초기화</button>
    </div>
  }
  return <div className="design-20" data-community-tools="true">
    <div className="design-112">
      <input className="design-91 design-input" aria-label="게시글 검색" placeholder="제목이나 내용 검색" maxLength={100}
        value={community.query} onChange={event => community.setQuery(event.target.value)} />
      {community.query && <button className="design-56" onClick={() => community.setQuery('')}>지우기</button>}
    </div>
    <div className="design-128">
      <select className="design-56" aria-label="글 모드 분류" value={community.mode} onChange={event => community.filter(event.target.value)}>
        <option value="ALL">모든 모드</option><option value="SOLUTION">해결책</option><option value="EMPATHY">공감</option>
      </select>
      <select className="design-56" aria-label="게시글 정렬" value={community.sort} onChange={event => community.order(event.target.value)}>
        <option value="LATEST">최신순</option><option value="POPULAR">공감 많은 순</option><option value="RECOMMENDED">댓글·공감 많은 순</option>
      </select>
      <label className="design-56"><input type="checkbox" checked={community.mine} onChange={event => community.own(event.target.checked)} /> 내 글만</label>
    </div>
  </div>
}

export function CommentThread() {
  const community = useCommunityData()
  return <>
    {community.commentError ? <Message error={community.commentError} /> : !community.comments ? <Message loading /> : community.comments.items.length === 0 ? <Message empty="첫 댓글로 마음을 나눠 주세요." /> : community.comments.items.map(comment => (
      <div className="design-106" key={comment.id}>
        <div className="design-107">
          <p className="design-108">{comment.nickname}</p>
          <p className="design-109">{timeAgo(comment.createdAt)}</p>
          {comment.mine && <button className="design-56" disabled={community.busy} onClick={() => community.removeComment(comment)}>삭제</button>}
        </div>
        <p className="design-110" data-live-text="true">{comment.content}</p>
      </div>
    ))}
    {community.comments?.hasNext && <button className="design-46" disabled={community.busy} onClick={community.moreComments}>댓글 더 보기</button>}
  </>
}
