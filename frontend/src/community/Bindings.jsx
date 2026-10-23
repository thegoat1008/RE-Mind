import { useCommunityData } from './useCommunity.js'

// Functional states use the existing screen's text and button styles.
export function Message({ error, loading = false, empty = '아직 글이 없어요. 첫 이야기를 나눠 주세요.' }) {
  const community = useCommunityData()
  return <div className="design-61" aria-live="polite">
    <p className="design-56" role={error ? 'alert' : 'status'}>{error || (loading ? '불러오는 중이에요…' : empty)}</p>
    {error && <button className="design-43" onClick={community.refresh}>다시 시도</button>}
  </div>
}

export function PostActions() {
  const community = useCommunityData()
  if (!community.post?.mine) return null
  return <div className="design-116" data-community-actions="true">
    <button className="design-55" disabled={community.busy} onClick={community.edit}>수정</button>
    <button className="design-55" disabled={community.busy} onClick={community.removePost}>삭제</button>
  </div>
}

export function PostState() {
  const community = useCommunityData()
  return <>
    <Message error={community.postError} loading={!community.postError} />
    <button className="design-43" onClick={() => community.go('community')}>목록으로</button>
  </>
}

export function ListTools() {
  const community = useCommunityData()
  if (!community.searchOpen) {
    if (!community.query && !community.mine && community.sort === 'LATEST') return null
    return <div className="design-116">
      <p className="design-56">{[community.query && `검색: ${community.query}`, community.mine && '내 글만', community.sort === 'POPULAR' && '공감 많은 순'].filter(Boolean).join(' · ')}</p>
      <button className="design-55" onClick={() => { community.setQuery(''); community.own(false); community.order('LATEST') }}>초기화</button>
    </div>
  }
  return <div className="design-61" data-community-tools="true">
    <div className="design-118">
      <input className="design-119 design-input" aria-label="게시글 검색" placeholder="제목이나 내용 검색" maxLength={100}
        value={community.query} onChange={event => community.setQuery(event.target.value)} />
      {community.query && <button className="design-55" onClick={() => community.setQuery('')}>지우기</button>}
    </div>
    <div className="design-116">
      <select className="design-55" aria-label="게시글 정렬" value={community.sort} onChange={event => community.order(event.target.value)}>
        <option value="LATEST">최신순</option><option value="POPULAR">공감 많은 순</option>
      </select>
      <label className="design-55"><input type="checkbox" checked={community.mine} onChange={event => community.own(event.target.checked)} /> 내 글만</label>
    </div>
  </div>
}
