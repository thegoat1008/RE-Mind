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
const imgGroup = `/assets/figma/bc8db.svg`;
const imgGroup1 = `/assets/figma/3bacc.svg`;
function Button({ className, label = "버튼", type = "primary", disabled, onClick }) {
  return <div onClick={onClick} disabled={disabled} aria-busy={disabled} className={className || "design-113"} data-node-id="24:967">
      <p className="design-3" data-node-id="24:968">
        {label}
      </p>
    </div>;
}
function Chip({ className, label = "칩", state = "active" }) {
  return <div className={className || "design-114"} data-node-id="24:976">
      <p className="design-48" data-node-id="24:977">
        {label}
      </p>
    </div>;
}
export default function Component101() {
  const community = useCommunityData();
  return <div className="design-5" data-node-id="16:1131" data-name="10-1 글쓰기">
      <div className="design-6" data-node-id="16:1132" data-name="Status Bar">
        <div className="design-7" data-node-id="I16:1132;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I16:1132;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I16:1132;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I16:1132;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I16:1132;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I16:1132;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I16:1132;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I16:1132;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I16:1132;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I16:1132;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I16:1132;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I16:1132;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-115" data-node-id="16:1164" data-name="Content">
        <div className="design-20" data-node-id="16:1165" data-name="Header">
          <a className="design-21" data-node-id="31:980" data-name="뒤로 버튼">
            <div className="design-22" data-node-id="16:1166" data-name="icon/chevL">
              <img alt="" className="design-9" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-23" data-node-id="16:1168">{community.editId ? "글 수정" : "글쓰기"}</p>
        </div>
        <div className="design-116" data-node-id="71:1561" data-name="선택한 모드">
          <Chip className="design-73 instance-write-post-0" label={community.form?.mode === "EMPATHY" ? "공감만 해주세요" : "해결책을 주세요"} />
          <p className="design-117" data-node-id="71:1564">{community.form?.mode === "EMPATHY" ? "댓글 없이 마음만 나눠요" : "댓글이 열려요"}</p>
          <p className="design-55" data-node-id="71:1565">{community.editId ? "모드 유지" : "바꾸기"}</p>
        </div>
        <div className="design-61" data-node-id="16:1178" data-name="field/제목">
          <p className="design-80" data-node-id="16:1179">
            제목
          </p>
          <div className="design-118" data-node-id="16:1180" data-name="input">
            <input className="design-119 design-input" aria-label="제목" placeholder="제목을 입력하세요" maxLength={120} disabled={!community.form || community.busy}
              value={community.form?.title || ""} onChange={event => community.setField("title", event.target.value)} />
          </div>
        </div>
        <div className="design-61" data-node-id="16:1182" data-name="field/내용">
          <p className="design-80" data-node-id="16:1183">
            내용
          </p>
          <div className="design-120" data-node-id="16:1184" data-name="textarea">
            <textarea className="design-input" aria-label="내용" placeholder={"마음을 편하게 적어 주세요.\n경험을 나누면 다른 보호자에게 큰 힘이 돼요."} maxLength={5000} disabled={!community.form || community.busy}
              value={community.form?.content || ""} onChange={event => community.setField("content", event.target.value)} />
            <div className="design-124" data-node-id="47:1455" data-name="말로 쓰기">
              <div className="design-25" data-node-id="47:1456" data-name="icon/mic">
                <div className="design-125" data-node-id="47:1457" data-name="Group">
                  <div className="design-126">
                    <img alt="" className="design-28" src={imgGroup} />
                  </div>
                </div>
              </div>
              <p className="design-55" data-node-id="47:1461">{community.listening ? "듣는 중…" : "말로 쓰기"}</p>
            </div>
          </div>
        </div>
        <div className="design-127" data-node-id="71:1566" data-name="익명 닉네임">
          <div className="design-25" data-node-id="71:1567" data-name="icon/lock">
            <div className="design-68" data-node-id="71:1568" data-name="Group">
              <div className="design-69">
                <img alt="" className="design-28" src={imgGroup1} />
              </div>
            </div>
          </div>
          <div className="design-128" data-node-id="71:1571" data-name="t">
            <p className="design-129" data-node-id="71:1572">{community.session?.nickname || "닉네임 확인 중…"}</p>
            <p className="design-130" data-node-id="71:1573">
              익명 닉네임으로 올라가요
            </p>
          </div>
        </div>
        {community.formError && <p className="design-56" role="alert">{community.formError}</p>}
        <div className="design-44" data-node-id="16:1192" data-name="spacer" />
        <Button className="design-45" label={community.busy ? "저장 중…" : community.editId ? "수정 완료" : "글 올리기"} disabled={community.busy || !community.form || !!community.formError} onClick={community.save} />
      </div>
    </div>;
}
