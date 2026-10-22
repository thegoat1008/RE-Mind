/** @jsxRuntime classic */
/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "../designRuntime.jsx";

const imgCharacter = `/assets/figma/efa7a.svg`;
const imgStatusDarkBackgroundMask = `/assets/figma/c9227.svg`;
const imgNetworkSignalDark = `/assets/figma/4c652.svg`;
const imgWiFiSignalDark = `/assets/figma/f883c.svg`;
const imgBatteryDark = `/assets/figma/9efe4.svg`;
const imgTimeDarkBackgroundMask = `/assets/figma/f965f.svg`;
const img941 = `/assets/figma/a1382.svg`;
const imgBell = `/assets/figma/0dbec.svg`;
const imgGroup = `/assets/figma/81955.svg`;
const imgPlus = `/assets/figma/9a463.svg`;
const imgGroup1 = `/assets/figma/9856a.svg`;
const imgGroup2 = `/assets/figma/11ae7.svg`;
const imgGroup3 = `/assets/figma/9a8d3.svg`;
const imgGroup4 = `/assets/figma/acaf5.svg`;
const imgGroup5 = `/assets/figma/a95ec.svg`;
const imgGroup6 = `/assets/figma/07ec0.svg`;
function Character({ className }) {
  return <div className={className || "design-153"} data-node-id="5:332" data-name="온이 (Character)">
      <img alt="" className="design-9" src={imgCharacter} />
    </div>;
}
export default function Component07() {
  return <div className="design-5" data-node-id="5:1485" data-name="07 홈 · 처음 시작">
      <div className="design-131" data-node-id="5:1486" data-name="iPhone 16 & 17 Pro - 2">
        <div className="design-7" data-node-id="I5:1486;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I5:1486;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I5:1486;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I5:1486;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I5:1486;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I5:1486;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I5:1486;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I5:1486;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I5:1486;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I5:1486;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I5:1486;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I5:1486;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-265" data-node-id="5:1487" data-name="content">
        <div className="design-266" data-node-id="31:1060" data-name="Header">
          <div className="design-235" data-node-id="31:1061" data-name="Frame">
            <p className="design-236" data-node-id="31:1062">
              안녕하세요, 지은님
            </p>
            <p className="design-237" data-node-id="31:1063">
              오늘도 어머니와 함께해요
            </p>
          </div>
          <a className="design-238" data-node-id="31:1064" data-name="Notification">
            <div className="design-60" data-node-id="31:1065" data-name="bell">
              <img alt="" className="design-9" src={imgBell} />
            </div>
          </a>
        </div>
        <div className="design-267" data-node-id="31:1067" data-name="온이 카드">
          <Character className="design-240" />
          <a className="design-241" data-node-id="31:1069" data-name="Frame">
            <div className="design-242" data-node-id="31:1070">
              <p className="design-122">처음 오셨네요!</p>
              <p className="design-123">온이와 인사해 볼까요?</p>
            </div>
            <div className="design-243" data-node-id="31:1071" data-name="대화 버튼">
              <p className="design-244" data-node-id="31:1072">
                온이와 인사하기
              </p>
            </div>
          </a>
        </div>
        <a className="design-245" data-node-id="75:1806" data-name="치매 상식 카드">
          <div className="design-246" data-node-id="75:1807" data-name="O/X">
            <p className="design-31" data-node-id="75:1808">
              O X
            </p>
          </div>
          <div className="design-247" data-node-id="75:1809" data-name="text">
            <p className="design-40" data-node-id="75:1810">
              오늘의 치매 상식
            </p>
            <p className="design-41" data-node-id="75:1811">
              O/X 퀴즈, 1분이면 끝나요
            </p>
          </div>
          <div className="design-25" data-node-id="75:1812" data-name="icon/chev">
            <div className="design-248" data-node-id="75:1813" data-name="Group">
              <div className="design-249">
                <img alt="" className="design-28" src={imgGroup} />
              </div>
            </div>
          </div>
        </a>
        <div className="design-268" data-node-id="31:1073" data-name="오늘의 일정">
          <div className="design-251" data-node-id="31:1074" data-name="Frame">
            <p className="design-252" data-node-id="31:1075">
              오늘의 일정
            </p>
            <a className="design-253" data-node-id="31:1076">
              <p className="design-123">일정 추가</p>
            </a>
          </div>
          <div className="design-254" data-node-id="31:1077" data-name="Frame">
            <a className="design-263" data-node-id="31:1129" data-name="일정 없음">
              <div className="design-230" data-node-id="31:1130" data-name="Frame">
                <div className="design-60" data-node-id="31:1131" data-name="plus">
                  <img alt="" className="design-9" src={imgPlus} />
                </div>
              </div>
              <div className="design-218" data-node-id="31:1133" data-name="text">
                <p className="design-269" data-node-id="31:1134">
                  등록된 일정이 없어요
                </p>
                <p className="design-257" data-node-id="31:1135">
                  새 일정을 추가해 보세요
                </p>
              </div>
            </a>
          </div>
        </div>
        <div className="design-35" data-node-id="72:1564" data-name="가족 알림">
          <div className="design-140" data-node-id="72:1565" data-name="title">
            <p className="design-23" data-node-id="72:1566">
              가족에게 일정 알림
            </p>
          </div>
          <a className="design-263" data-node-id="72:1568" data-name="카드">
            <div className="design-37" data-node-id="72:1569" data-name="icon">
              <div className="design-77" data-node-id="72:1570" data-name="icon/mail">
                <div className="design-270" data-node-id="72:1571" data-name="Group">
                  <div className="design-271">
                    <img alt="" className="design-28" src={imgGroup1} />
                  </div>
                </div>
              </div>
            </div>
            <div className="design-59" data-node-id="72:1573" data-name="text">
              <p className="design-40" data-node-id="72:1574">
                가족 이메일을 등록해 보세요
              </p>
              <p className="design-41" data-node-id="72:1575">
                일정을 이메일로 받아 볼 수 있어요
              </p>
            </div>
          </a>
        </div>
      </div>
      <div className="design-75" data-node-id="13:1101" data-name="TabBar (앱 화면)">
        <div className="design-76" data-node-id="I13:1101;13:927" data-name="tab/home">
          <div className="design-77" data-node-id="I13:1101;13:928" data-name="icon/home">
            <div className="design-78" data-node-id="I13:1101;13:929" data-name="Group">
              <div className="design-79">
                <img alt="" className="design-28" src={imgGroup2} />
              </div>
            </div>
          </div>
          <p className="design-55" data-node-id="I13:1101;13:931">
            홈
          </p>
        </div>
        <div className="design-76" data-node-id="I13:1101;13:932" data-name="tab/calendar">
          <div className="design-77" data-node-id="I13:1101;13:933" data-name="icon/calendar">
            <div className="design-81" data-node-id="I13:1101;13:934" data-name="Group">
              <div className="design-82">
                <img alt="" className="design-28" src={imgGroup3} />
              </div>
            </div>
          </div>
          <p className="design-80" data-node-id="I13:1101;13:937">
            캘린더
          </p>
        </div>
        <div className="design-76" data-node-id="I13:1101;13:938" data-name="tab/chat">
          <div className="design-77" data-node-id="I13:1101;13:939" data-name="icon/chat">
            <div className="design-83" data-node-id="I13:1101;13:940" data-name="Group">
              <div className="design-84">
                <img alt="" className="design-28" src={imgGroup4} />
              </div>
            </div>
          </div>
          <p className="design-80" data-node-id="I13:1101;13:942">
            대화
          </p>
        </div>
        <div className="design-76" data-node-id="I13:1101;13:943" data-name="tab/community">
          <div className="design-77" data-node-id="I13:1101;13:944" data-name="icon/community">
            <div className="design-85" data-node-id="I13:1101;13:945" data-name="Group">
              <div className="design-86">
                <img alt="" className="design-28" src={imgGroup5} />
              </div>
            </div>
          </div>
          <p className="design-80" data-node-id="I13:1101;13:948">
            커뮤니티
          </p>
        </div>
        <div className="design-76" data-node-id="I13:1101;13:949" data-name="tab/settings">
          <div className="design-77" data-node-id="I13:1101;13:950" data-name="icon/settings">
            <div className="design-87" data-node-id="I13:1101;13:951" data-name="Group">
              <div className="design-88">
                <img alt="" className="design-28" src={imgGroup6} />
              </div>
            </div>
          </div>
          <p className="design-80" data-node-id="I13:1101;13:954">
            내 설정
          </p>
        </div>
      </div>
    </div>;
}
