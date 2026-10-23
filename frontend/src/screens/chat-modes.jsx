/** @jsxRuntime classic */
/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from '../designRuntime.jsx'

const imgCharacter = `/assets/figma-v2/efa7a.svg`;
const imgStatusDarkBackgroundMask = `/assets/figma-v2/c9227.svg`;
const imgNetworkSignalDark = `/assets/figma-v2/4c652.svg`;
const imgWiFiSignalDark = `/assets/figma-v2/f883c.svg`;
const imgBatteryDark = `/assets/figma-v2/9efe4.svg`;
const imgTimeDarkBackgroundMask = `/assets/figma-v2/f965f.svg`;
const img941 = `/assets/figma-v2/a1382.svg`;
const imgReiconBulb = `/assets/figma-v2/5cd06.svg`;
const imgIconHeart = `/assets/figma-v2/d859c.svg`;
const imgGroup = `/assets/figma-v2/81955.svg`;
const imgGroup1 = `/assets/figma-v2/fb968.svg`;
const imgGroup2 = `/assets/figma-v2/492e0.svg`;
const imgGroup3 = `/assets/figma-v2/9a8d3.svg`;
const imgGroup4 = `/assets/figma-v2/e4e9b.svg`;
const imgGroup5 = `/assets/figma-v2/90d71.svg`;
const imgGroup6 = `/assets/figma-v2/07ec0.svg`;
function Character({ className }) {
  return <div className={className || "design-150"} data-node-id="5:332" data-name="온이 (Character)">
      <img alt="" className="design-5" src={imgCharacter} />
    </div>;
}
export default function Component092Ai() {
  return <div className="design-1" data-node-id="179:7384" data-name="09-2 AI 챗팅 · 모드 선택">
      <div className="design-2" data-node-id="179:7385" data-name="Status Bar">
        <div className="design-3" data-node-id="I179:7385;486:2224" data-name="Status">
          <div className="design-3" data-node-id="I179:7385;486:2225" data-name="status/dark">
            <div className="design-4" data-node-id="I179:7385;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-5" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-6" data-node-id="I179:7385;486:2227" data-name="status/dark">
              <div className="design-7" data-node-id="I179:7385;486:2228" data-name="Status Icons">
                <div className="design-8" data-node-id="I179:7385;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-5" src={imgNetworkSignalDark} />
                </div>
                <div className="design-9" data-node-id="I179:7385;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-5" src={imgWiFiSignalDark} />
                </div>
                <div className="design-10" data-node-id="I179:7385;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-5" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-11" data-node-id="I179:7385;486:2249" data-name="Time / Dark">
                <div className="design-12" data-node-id="I179:7385;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-5" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-13" data-node-id="I179:7385;486:2251" data-name="Time / Dark">
                  <div className="design-14" data-node-id="I179:7385;486:2252" data-name="9:41">
                    <img alt="" className="design-5" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-376" data-node-id="179:7386" data-name="Content">
        <div className="design-377" data-node-id="179:7387" data-name="온이">
          <Character className="design-266" />
          <div className="design-39" data-node-id="179:7389" data-name="t">
            <p className="design-122" data-node-id="179:7390">
              온이
            </p>
            <p className="design-123" data-node-id="179:7391">
              보호자님 곁에 있어요
            </p>
          </div>
        </div>
        <div className="design-291" data-node-id="179:7392" data-name="제목">
          <div className="design-378" data-node-id="179:7393">
            <p className="design-379">오늘은 어떤 대화가</p>
            <p className="design-380">필요하세요?</p>
          </div>
          <p className="design-381" data-node-id="179:7394">
            마음에 맞는 쪽을 골라 주세요.
          </p>
        </div>
        <div className="design-382" data-node-id="179:7395" data-name="선택">
          <a className="design-383" data-node-id="179:7396" data-name="모드 카드">
            <div className="design-384" data-node-id="179:7397" data-name="icon">
              <div className="design-chat-mode-icon design-chat-mode-icon--bulb" data-node-id="220:7668" data-name="reicon:bulb">
                <img alt="" className="design-5" src={imgReiconBulb} />
              </div>
            </div>
            <div className="design-385" data-node-id="179:7401" data-name="text">
              <p className="design-386" data-node-id="179:7402">
                해결책이 필요해요
              </p>
              <p className="design-41" data-node-id="179:7403">
                무엇이든 물어보세요
              </p>
            </div>
            <div className="design-67" data-node-id="179:7404" data-name="icon/chev">
              <div className="design-387" data-node-id="179:7405" data-name="Group">
                <div className="design-388">
                  <img alt="" className="design-28" src={imgGroup} />
                </div>
              </div>
            </div>
          </a>
          <a className="design-383" data-node-id="179:7407" data-name="모드 카드">
            <div className="design-384" data-node-id="179:7408" data-name="icon">
              <div className="design-chat-mode-icon design-chat-mode-icon--heart" data-node-id="220:7671" data-name="icon/heart">
                <img alt="" className="design-5" src={imgIconHeart} />
              </div>
            </div>
            <div className="design-385" data-node-id="179:7412" data-name="text">
              <p className="design-386" data-node-id="179:7413">
                공감 해주세요
              </p>
              <p className="design-41" data-node-id="179:7414">
                편하게 이야기해 주세요
              </p>
            </div>
            <div className="design-67" data-node-id="179:7415" data-name="icon/chev">
              <div className="design-387" data-node-id="179:7416" data-name="Group">
                <div className="design-388">
                  <img alt="" className="design-28" src={imgGroup} />
                </div>
              </div>
            </div>
          </a>
        </div>
        <a className="design-389" data-node-id="179:7418" data-name="이전 대화">
          <p className="design-390" data-node-id="179:7419">
            이전 대화 이어가기
          </p>
          <div className="design-67" data-node-id="179:7420" data-name="icon/chev">
            <div className="design-387" data-node-id="179:7421" data-name="Group">
              <div className="design-388">
                <img alt="" className="design-28" src={imgGroup1} />
              </div>
            </div>
          </div>
        </a>
      </div>
      <div className="design-75" data-node-id="179:7423" data-name="TabBar (앱 화면)">
        <div className="design-76" data-node-id="I179:7423;13:985" data-name="tab/home">
          <div className="design-77" data-node-id="I179:7423;13:986" data-name="icon/home">
            <div className="design-78" data-node-id="I179:7423;13:987" data-name="Group">
              <div className="design-79">
                <img alt="" className="design-28" src={imgGroup2} />
              </div>
            </div>
          </div>
          <p className="design-21" data-node-id="I179:7423;13:989">
            홈
          </p>
        </div>
        <div className="design-76" data-node-id="I179:7423;13:990" data-name="tab/calendar">
          <div className="design-77" data-node-id="I179:7423;13:991" data-name="icon/calendar">
            <div className="design-80" data-node-id="I179:7423;13:992" data-name="Group">
              <div className="design-81">
                <img alt="" className="design-28" src={imgGroup3} />
              </div>
            </div>
          </div>
          <p className="design-21" data-node-id="I179:7423;13:995">
            캘린더
          </p>
        </div>
        <div className="design-76" data-node-id="I179:7423;13:996" data-name="tab/chat">
          <div className="design-77" data-node-id="I179:7423;13:997" data-name="icon/chat">
            <div className="design-82" data-node-id="I179:7423;13:998" data-name="Group">
              <div className="design-83">
                <img alt="" className="design-28" src={imgGroup4} />
              </div>
            </div>
          </div>
          <p className="design-56" data-node-id="I179:7423;13:1000">
            대화
          </p>
        </div>
        <div className="design-76" data-node-id="I179:7423;13:1001" data-name="tab/community">
          <div className="design-77" data-node-id="I179:7423;13:1002" data-name="icon/community">
            <div className="design-84" data-node-id="I179:7423;13:1003" data-name="Group">
              <div className="design-85">
                <img alt="" className="design-28" src={imgGroup5} />
              </div>
            </div>
          </div>
          <p className="design-21" data-node-id="I179:7423;13:1006">
            커뮤니티
          </p>
        </div>
        <div className="design-76" data-node-id="I179:7423;13:1007" data-name="tab/settings">
          <div className="design-77" data-node-id="I179:7423;13:1008" data-name="icon/settings">
            <div className="design-86" data-node-id="I179:7423;13:1009" data-name="Group">
              <div className="design-87">
                <img alt="" className="design-28" src={imgGroup6} />
              </div>
            </div>
          </div>
          <p className="design-21" data-node-id="I179:7423;13:1012">
            내 설정
          </p>
        </div>
      </div>
    </div>;
}
