/** @jsxRuntime classic */
/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from '../designRuntime.jsx'
import { useCommunityData, timeAgo } from '../community/useCommunity.js'
import { PostActions, PostState, CommentThread } from '../community/Bindings.jsx'

const imgStatusDarkBackgroundMask = `/assets/figma-v2/c9227.svg`;
const imgNetworkSignalDark = `/assets/figma-v2/4c652.svg`;
const imgWiFiSignalDark = `/assets/figma-v2/f883c.svg`;
const imgBatteryDark = `/assets/figma-v2/9efe4.svg`;
const imgTimeDarkBackgroundMask = `/assets/figma-v2/f965f.svg`;
const img941 = `/assets/figma-v2/a1382.svg`;
const imgIconChevL = `/assets/figma-v2/905bb.svg`;
const imgIconMic = `/assets/figma-v2/876c8.svg`;
const imgIconSend = `/assets/figma-v2/7e014.svg`;
const imgIconHeart = `/assets/figma-v2/54f0f.svg`;
const imgIconHeartOutline = `/assets/figma-v2/03bff.svg`;
const imgIconMsg = `/assets/figma-v2/38131.svg`;
export default function Component102() {
  const community = useCommunityData();
  const post = community.post;
  return <div className="design-1" data-node-id="220:8296" data-name="10-2 글 상세">
      <div className="design-2" data-node-id="179:6212" data-name="Status Bar">
        <div className="design-3" data-node-id="I179:6212;486:2224" data-name="Status">
          <div className="design-3" data-node-id="I179:6212;486:2225" data-name="status/dark">
            <div className="design-4" data-node-id="I179:6212;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-5" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-6" data-node-id="I179:6212;486:2227" data-name="status/dark">
              <div className="design-7" data-node-id="I179:6212;486:2228" data-name="Status Icons">
                <div className="design-8" data-node-id="I179:6212;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-5" src={imgNetworkSignalDark} />
                </div>
                <div className="design-9" data-node-id="I179:6212;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-5" src={imgWiFiSignalDark} />
                </div>
                <div className="design-10" data-node-id="I179:6212;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-5" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-11" data-node-id="I179:6212;486:2249" data-name="Time / Dark">
                <div className="design-12" data-node-id="I179:6212;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-5" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-13" data-node-id="I179:6212;486:2251" data-name="Time / Dark">
                  <div className="design-14" data-node-id="I179:6212;486:2252" data-name="9:41">
                    <img alt="" className="design-5" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-88" data-node-id="179:6213" data-name="Content">
        <div className="design-16" data-node-id="179:6214" data-name="Header">
          <a className="design-17" data-node-id="179:6215" data-name="뒤로 버튼">
            <div className="design-18" data-node-id="179:6216" data-name="icon/chevL">
              <img alt="" className="design-5" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-19" data-node-id="179:6218">
            커뮤니티
          </p>
        </div>
        {post && <div className="design-89" data-node-id="179:6219" data-name="입력창">
          <div className="design-90" data-node-id="179:6220" data-name="input">
            <input className="design-91 design-input" aria-label="댓글" placeholder="경험과 방법을 남겨 주세요" maxLength={1000} disabled={community.busy}
              value={community.comment} onChange={event => community.setComment(event.target.value)}
              onKeyDown={event => { if (event.key === "Enter" && !event.nativeEvent.isComposing) community.addComment(); }} />
            <div className="design-92" data-node-id="179:6222" data-name="icon/mic">
              <img alt="" className="design-5" src={imgIconMic} />
            </div>
          </div>
          <div className="design-93" data-node-id="179:6225" data-name="보내기" aria-label="댓글 보내기" disabled={community.busy} onClick={community.addComment}>
            <div className="design-92" data-node-id="179:6226" data-name="icon/send">
              <img alt="" className="design-5" src={imgIconSend} />
            </div>
          </div>
        </div>}
        <div className="design-94" data-node-id="179:6229" data-name="Scroll">
          {!post ? <PostState /> : <>
          <div className="design-95" data-node-id="179:6230" data-name="게시글">
            <div className="design-96" data-node-id="179:6231" data-name="meta">
              <div className="design-97" data-node-id="179:6232" data-name="tag">
                <p className="design-56" data-node-id="179:6233">
                  👍 추천
                </p>
              </div>
              <div className="design-98" data-node-id="179:6234" data-name="spacer" />
              <p className="design-99" data-node-id="179:6235">{timeAgo(post.createdAt)}</p>
            </div>
            <div className="design-100" data-node-id="179:6236" data-live-text="true"><p className="design-101">{post.title}</p></div>
            <p className="design-103" data-node-id="179:6237" data-live-text="true">{post.content}</p>
            <div className="design-16" data-node-id="179:6238" data-name="반응">
              <div className="design-61" data-node-id="220:8324" data-name="icon/heart" aria-label="공감 하트" aria-pressed={!!post.liked} disabled={community.busy} onClick={community.like}>
                <img alt="" className="design-5" src={post.liked ? imgIconHeart : imgIconHeartOutline} />
              </div>
              <p className="design-21" data-node-id="220:8327">{post.likeCount}</p>
              <div className="design-104" data-node-id="179:6242" data-name="gap" />
              <div className="design-61" data-node-id="179:6243" data-name="icon/msg">
                <img alt="" className="design-5" src={imgIconMsg} />
              </div>
              <p className="design-21" data-node-id="179:6245">{post.commentCount}</p>
              <div className="design-98" data-node-id="179:6246" data-name="spacer" />
              <p className="design-21" data-node-id="179:6247">{post.nickname}</p>
            </div>
          </div>
          <PostActions />
          <p className="design-35" data-node-id="179:6248">댓글 {post.commentCount}</p>
          <div className="design-105" data-node-id="179:6249" data-name="댓글 목록">
            <CommentThread />
          </div>
          </>}
        </div>
      </div>
    </div>;
}
