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
const imgBell = `/assets/figma-v2/45599.svg`;
const imgPlus = `/assets/figma-v2/9e9fa.svg`;
const imgGroup = `/assets/figma-v2/5eb45.svg`;
const imgGroup1 = `/assets/figma-v2/8381d.svg`;
const imgGroup2 = `/assets/figma-v2/9a8d3.svg`;
const imgGroup3 = `/assets/figma-v2/acaf5.svg`;
const imgGroup4 = `/assets/figma-v2/90d71.svg`;
const imgGroup5 = `/assets/figma-v2/07ec0.svg`;
function Character({ className }) {
  return <div className={className || "design-150"} data-node-id="5:332" data-name="온이 (Character)">
      <img alt="" className="design-5" src={imgCharacter} />
    </div>;
}
export default function Component07() {
  return <div className="design-1" data-node-id="179:6770" data-name="07 홈 · 처음 시작">
      <div className="design-126" data-node-id="179:6771" data-name="iPhone 16 & 17 Pro - 2">
        <div className="design-3" data-node-id="I179:6771;486:2224" data-name="Status">
          <div className="design-3" data-node-id="I179:6771;486:2225" data-name="status/dark">
            <div className="design-4" data-node-id="I179:6771;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-5" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-6" data-node-id="I179:6771;486:2227" data-name="status/dark">
              <div className="design-7" data-node-id="I179:6771;486:2228" data-name="Status Icons">
                <div className="design-8" data-node-id="I179:6771;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-5" src={imgNetworkSignalDark} />
                </div>
                <div className="design-9" data-node-id="I179:6771;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-5" src={imgWiFiSignalDark} />
                </div>
                <div className="design-10" data-node-id="I179:6771;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-5" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-11" data-node-id="I179:6771;486:2249" data-name="Time / Dark">
                <div className="design-12" data-node-id="I179:6771;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-5" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-13" data-node-id="I179:6771;486:2251" data-name="Time / Dark">
                  <div className="design-14" data-node-id="I179:6771;486:2252" data-name="9:41">
                    <img alt="" className="design-5" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-256" data-node-id="179:6772" data-name="content">
        <div className="design-257" data-node-id="179:6773" data-name="Header">
          <div className="design-232" data-node-id="179:6774" data-name="Frame">
            <p className="design-233" data-node-id="179:6775">
              안녕하세요, 지은님
            </p>
            <p className="design-234" data-node-id="179:6776">
              오늘도 저와 함께해요
            </p>
          </div>
          <a className="design-235" data-node-id="179:6777" data-name="Notification">
            <div className="design-61" data-node-id="179:6778" data-name="bell">
              <img alt="" className="design-5" src={imgBell} />
            </div>
          </a>
        </div>
        <div className="design-258" data-node-id="179:6780" data-name="온이 카드">
          <Character className="design-237" />
          <a className="design-238" data-node-id="179:6782" data-name="Frame">
            <div className="design-239" data-node-id="179:6783">
              <p className="design-240">처음 오셨네요!</p>
              <p className="design-241">온이와 인사해 볼까요?</p>
            </div>
            <div className="design-242" data-node-id="179:6784" data-name="대화 버튼">
              <p className="design-243" data-node-id="179:6785">
                온이와 인사하기
              </p>
            </div>
          </a>
        </div>
        <div className="design-259" data-node-id="179:6795" data-name="오늘의 일정">
          <div className="design-245" data-node-id="179:6796" data-name="Frame">
            <p className="design-246" data-node-id="179:6797">
              오늘의 일정
            </p>
            <a className="design-247" data-node-id="179:6798">
              <p className="design-248">일정 추가</p>
            </a>
          </div>
          <div className="design-208" data-node-id="179:6799" data-name="Frame">
            <a className="design-252" data-node-id="179:6800" data-name="일정 없음">
              <div className="design-210" data-node-id="179:6801" data-name="Frame">
                <div className="design-61" data-node-id="179:6802" data-name="plus">
                  <img alt="" className="design-5" src={imgPlus} />
                </div>
              </div>
              <div className="design-260" data-node-id="179:6804" data-name="text">
                <p className="design-212" data-node-id="179:6805">
                  등록된 일정이 없어요
                </p>
                <p className="design-213" data-node-id="179:6806">
                  새 일정을 추가해 보세요
                </p>
              </div>
            </a>
          </div>
        </div>
        <div className="design-36" data-node-id="179:6807" data-name="가족 알림">
          <div className="design-139" data-node-id="179:6808" data-name="title">
            <p className="design-19" data-node-id="179:6809">
              함께 보는 가족
            </p>
          </div>
          <a className="design-252" data-node-id="196:5318" data-name="카드">
            <div className="design-261" data-node-id="196:5319" data-name="icon">
              <div className="design-77" data-node-id="196:5320" data-name="icon/plus">
                <div className="design-262" data-node-id="196:5321" data-name="Group">
                  <div className="design-263">
                    <img alt="" className="design-28" src={imgGroup} />
                  </div>
                </div>
              </div>
            </div>
            <div className="design-60" data-node-id="196:5323" data-name="text">
              <p className="design-40" data-node-id="196:5324">
                가족 코드를 만들어 보세요
              </p>
              <p className="design-41" data-node-id="196:5325">
                가족과 일정을 함께 볼 수 있어요
              </p>
            </div>
          </a>
        </div>
      </div>
      <div className="design-75" data-node-id="179:6818" data-name="TabBar (앱 화면)">
        <div className="design-76" data-node-id="I179:6818;13:927" data-name="tab/home">
          <div className="design-77" data-node-id="I179:6818;13:928" data-name="icon/home">
            <div className="design-78" data-node-id="I179:6818;13:929" data-name="Group">
              <div className="design-79">
                <img alt="" className="design-28" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="design-56" data-node-id="I179:6818;13:931">
            홈
          </p>
        </div>
        <div className="design-76" data-node-id="I179:6818;13:932" data-name="tab/calendar">
          <div className="design-77" data-node-id="I179:6818;13:933" data-name="icon/calendar">
            <div className="design-80" data-node-id="I179:6818;13:934" data-name="Group">
              <div className="design-81">
                <img alt="" className="design-28" src={imgGroup2} />
              </div>
            </div>
          </div>
          <p className="design-21" data-node-id="I179:6818;13:937">
            캘린더
          </p>
        </div>
        <div className="design-76" data-node-id="I179:6818;13:938" data-name="tab/chat">
          <div className="design-77" data-node-id="I179:6818;13:939" data-name="icon/chat">
            <div className="design-82" data-node-id="I179:6818;13:940" data-name="Group">
              <div className="design-83">
                <img alt="" className="design-28" src={imgGroup3} />
              </div>
            </div>
          </div>
          <p className="design-21" data-node-id="I179:6818;13:942">
            대화
          </p>
        </div>
        <div className="design-76" data-node-id="I179:6818;13:943" data-name="tab/community">
          <div className="design-77" data-node-id="I179:6818;13:944" data-name="icon/community">
            <div className="design-84" data-node-id="I179:6818;13:945" data-name="Group">
              <div className="design-85">
                <img alt="" className="design-28" src={imgGroup4} />
              </div>
            </div>
          </div>
          <p className="design-21" data-node-id="I179:6818;13:948">
            커뮤니티
          </p>
        </div>
        <div className="design-76" data-node-id="I179:6818;13:949" data-name="tab/settings">
          <div className="design-77" data-node-id="I179:6818;13:950" data-name="icon/settings">
            <div className="design-86" data-node-id="I179:6818;13:951" data-name="Group">
              <div className="design-87">
                <img alt="" className="design-28" src={imgGroup5} />
              </div>
            </div>
          </div>
          <p className="design-21" data-node-id="I179:6818;13:954">
            내 설정
          </p>
        </div>
      </div>
    </div>;
}
