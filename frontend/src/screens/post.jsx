/** @jsxRuntime classic */
/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "../designRuntime.jsx";
import { useCommunityData, timeAgo } from "../community/useCommunity.js";
import { Message, PostActions, PostState, ListTools } from "../community/Bindings.jsx";


const imgStatusDarkBackgroundMask = `/assets/figma/c9227.svg`;
const imgNetworkSignalDark = `/assets/figma/4c652.svg`;
const imgWiFiSignalDark = `/assets/figma/f883c.svg`;
const imgBatteryDark = `/assets/figma/9efe4.svg`;
const imgTimeDarkBackgroundMask = `/assets/figma/f965f.svg`;
const img941 = `/assets/figma/a1382.svg`;
const imgIconChevL = `/assets/figma/fa782.svg`;
const imgIconMic = `/assets/figma/876c8.svg`;
const imgIconSend = `/assets/figma/7e014.svg`;
const imgIconHeart = `/assets/figma/9e73a.svg`;
const imgIconMsg = `/assets/figma/38131.svg`;
export default function Component102() {
  const community = useCommunityData();
  const post = community.post;
  return <div className="design-5" data-node-id="16:1195" data-name="10-2 글 상세">
      <div className="design-6" data-node-id="16:1196" data-name="Status Bar">
        <div className="design-7" data-node-id="I16:1196;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I16:1196;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I16:1196;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I16:1196;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I16:1196;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I16:1196;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I16:1196;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I16:1196;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I16:1196;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I16:1196;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I16:1196;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I16:1196;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-90" data-node-id="16:1228" data-name="Content">
        <div className="design-20" data-node-id="16:1229" data-name="Header">
          <a className="design-21" data-node-id="31:982" data-name="뒤로 버튼">
            <div className="design-22" data-node-id="16:1230" data-name="icon/chevL">
              <img alt="" className="design-9" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-23" data-node-id="16:1232">
            커뮤니티
          </p>
        </div>
        {post && <div className="design-91" data-node-id="16:1267" data-name="입력창">
          <div className="design-92" data-node-id="16:1268" data-name="input">
            <input className="design-93 design-input" aria-label="댓글" placeholder="따뜻한 댓글을 남겨 주세요" maxLength={1000} disabled={community.busy}
              value={community.comment} onChange={event => community.setComment(event.target.value)}
              onKeyDown={event => { if (event.key === "Enter" && !event.nativeEvent.isComposing) community.addComment(); }} />
            <div className="design-94" data-node-id="16:1270" data-name="icon/mic">
              <img alt="" className="design-9" src={imgIconMic} />
            </div>
          </div>
          <div className="design-95" data-node-id="16:1273" data-name="보내기" aria-label="댓글 보내기" disabled={community.busy} onClick={community.addComment}>
            <div className="design-94" data-node-id="16:1274" data-name="icon/send">
              <img alt="" className="design-9" src={imgIconSend} />
            </div>
          </div>
        </div>}
        <div className="design-96" data-node-id="29:969" data-name="Scroll">
          {!post ? <PostState /> : <>
          <div className="design-97" data-node-id="16:1233" data-name="게시글">
            <div className="design-98" data-node-id="16:1234" data-name="meta">
              <div className="design-99" data-node-id="16:1235" data-name="tag">
                <p className="design-55" data-node-id="16:1236">
                  해결책 모드
                </p>
              </div>
              <p className="design-100" data-node-id="16:1237">{post.nickname}</p>
              <p className="design-101" data-node-id="16:1238">{timeAgo(post.createdAt)}</p>
            </div>
            <div className="design-102" data-node-id="16:1239" data-live-text="true"><p className="design-103">{post.title}</p></div>
            <p className="design-105" data-node-id="16:1240" data-live-text="true">{post.content}</p>
            <div className="design-20" data-node-id="16:1241" data-name="반응">
              <div className="design-60" data-node-id="16:1242" data-name="icon/heart" aria-label="공감 하트" aria-pressed={!!post.liked} disabled={community.busy} onClick={community.like}>
                <img alt="" className="design-9" src={imgIconHeart} />
              </div>
              <p className="design-80" data-node-id="16:1244">{post.likeCount}</p>
              <div className="design-106" data-node-id="16:1247" data-name="gap" />
              <div className="design-60" data-node-id="16:1245" data-name="icon/msg">
                <img alt="" className="design-9" src={imgIconMsg} />
              </div>
              <p className="design-80" data-node-id="16:1248">{post.commentCount}</p>
            </div>
          </div>
          <PostActions />
          <p className="design-34" data-node-id="16:1249">댓글 {post.commentCount}</p>
          <div className="design-107" data-node-id="16:1250" data-name="댓글 목록">
            {community.commentError ? <Message error={community.commentError} /> : !community.comments ? <Message loading /> : community.comments.items.length === 0 ? <Message empty="첫 댓글로 마음을 나눠 주세요." /> : community.comments.items.map(comment => (
              <div className="design-108" key={comment.id}>
                <div className="design-109">
                  <p className="design-110">{comment.nickname}</p>
                  <p className="design-111">{timeAgo(comment.createdAt)}</p>
                  {comment.mine && <button className="design-55" disabled={community.busy} onClick={() => community.removeComment(comment)}>삭제</button>}
                </div>
                <p className="design-112" data-live-text="true">{comment.content}</p>
              </div>
            ))}
            {community.comments?.hasNext && <button className="design-43" disabled={community.busy} onClick={community.moreComments}>댓글 더 보기</button>}
          </div>
          </>}
        </div>
      </div>
    </div>;
}
