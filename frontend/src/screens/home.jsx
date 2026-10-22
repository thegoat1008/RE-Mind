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
const imgPill = `/assets/figma/b27e0.svg`;
const imgCheck = `/assets/figma/2cc00.svg`;
const imgGroup1 = `/assets/figma/2b65f.svg`;
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
export default function Component071() {
  return <div className="design-5" data-node-id="5:1549" data-name="07-1 홈">
      <div className="design-131" data-node-id="5:1550" data-name="Status Bar">
        <div className="design-7" data-node-id="I5:1550;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I5:1550;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I5:1550;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I5:1550;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I5:1550;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I5:1550;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I5:1550;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I5:1550;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I5:1550;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I5:1550;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I5:1550;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I5:1550;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-233" data-node-id="5:1551" data-name="Content">
        <div className="design-234" data-node-id="5:1552" data-name="Header">
          <div className="design-235" data-node-id="5:1553" data-name="Frame">
            <p className="design-236" data-node-id="5:1554">
              안녕하세요, 지은님
            </p>
            <p className="design-237" data-node-id="5:1555">
              오늘도 어머니와 함께해요
            </p>
          </div>
          <a className="design-238" data-node-id="5:1556" data-name="Notification">
            <div className="design-60" data-node-id="5:1557" data-name="bell">
              <img alt="" className="design-9" src={imgBell} />
            </div>
          </a>
        </div>
        <div className="design-239" data-node-id="5:1559" data-name="온이 카드">
          <Character className="design-240" />
          <a className="design-241" data-node-id="5:1561" data-name="Frame">
            <div className="design-242" data-node-id="5:1562">
              <p className="design-122">오늘 어머니 기분은 어떠세요?</p>
              <p className="design-123">온이와 이야기해 볼까요?</p>
            </div>
            <div className="design-243" data-node-id="5:1563" data-name="대화 버튼">
              <p className="design-244" data-node-id="5:1564">
                온이와 대화하기
              </p>
            </div>
          </a>
        </div>
        <a className="design-245" data-node-id="75:1796" data-name="치매 상식 카드">
          <div className="design-246" data-node-id="75:1797" data-name="O/X">
            <p className="design-31" data-node-id="75:1798">
              O X
            </p>
          </div>
          <div className="design-247" data-node-id="75:1799" data-name="text">
            <p className="design-40" data-node-id="75:1800">
              오늘의 치매 상식
            </p>
            <p className="design-41" data-node-id="75:1801">
              O/X 퀴즈, 1분이면 끝나요
            </p>
          </div>
          <div className="design-25" data-node-id="75:1802" data-name="icon/chev">
            <div className="design-248" data-node-id="75:1803" data-name="Group">
              <div className="design-249">
                <img alt="" className="design-28" src={imgGroup} />
              </div>
            </div>
          </div>
        </a>
        <div className="design-250" data-node-id="5:1565" data-name="오늘의 일정">
          <div className="design-251" data-node-id="5:1566" data-name="Frame">
            <p className="design-252" data-node-id="5:1567">
              오늘의 일정
            </p>
            <a className="design-253" data-node-id="5:1568">
              <p className="design-123">전체보기</p>
            </a>
          </div>
          <div className="design-254" data-node-id="5:1569" data-name="Frame">
            <div className="design-255" data-node-id="5:1570" data-name="Frame">
              <div className="design-230" data-node-id="5:1571" data-name="Frame">
                <div className="design-60" data-node-id="5:1572" data-name="pill">
                  <img alt="" className="design-9" src={imgPill} />
                </div>
              </div>
              <div className="design-235" data-node-id="5:1574" data-name="Frame">
                <p className="design-256" data-node-id="5:1575">
                  아침 약 복용
                </p>
                <p className="design-257" data-node-id="5:1576">
                  오전 8:00 · 완료
                </p>
              </div>
              <div className="design-258" data-node-id="5:1577" data-name="Frame">
                <div className="design-146" data-node-id="5:1578" data-name="check">
                  <img alt="" className="design-9" src={imgCheck} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="design-35" data-node-id="72:1547" data-name="가족 알림">
          <div className="design-259" data-node-id="72:1548" data-name="title">
            <p className="design-260" data-node-id="72:1549">
              가족에게 일정 알림
            </p>
            <a className="design-261" data-node-id="72:1550">
              <p className="design-262">설정</p>
            </a>
          </div>
          <a className="design-263" data-node-id="72:1552" data-name="카드">
            <div className="design-37" data-node-id="72:1553" data-name="icon">
              <div className="design-77" data-node-id="72:1554" data-name="icon/mail">
                <div className="design-26" data-node-id="72:1555" data-name="Group">
                  <div className="design-194">
                    <img alt="" className="design-28" src={imgGroup1} />
                  </div>
                </div>
              </div>
            </div>
            <div className="design-59" data-node-id="72:1558" data-name="text">
              <p className="design-40" data-node-id="72:1559">
                가족 2명
              </p>
              <p className="design-41" data-node-id="72:1560">
                매일 오전 8시에 이메일로
              </p>
            </div>
            <div className="design-264" data-node-id="72:1561" data-name="지금 보내기">
              <p className="design-31" data-node-id="72:1562">
                지금 보내기
              </p>
            </div>
          </a>
        </div>
      </div>
      <div className="design-75" data-node-id="13:1072" data-name="TabBar (앱 화면)">
        <div className="design-76" data-node-id="I13:1072;13:927" data-name="tab/home">
          <div className="design-77" data-node-id="I13:1072;13:928" data-name="icon/home">
            <div className="design-78" data-node-id="I13:1072;13:929" data-name="Group">
              <div className="design-79">
                <img alt="" className="design-28" src={imgGroup2} />
              </div>
            </div>
          </div>
          <p className="design-55" data-node-id="I13:1072;13:931">
            홈
          </p>
        </div>
        <div className="design-76" data-node-id="I13:1072;13:932" data-name="tab/calendar">
          <div className="design-77" data-node-id="I13:1072;13:933" data-name="icon/calendar">
            <div className="design-81" data-node-id="I13:1072;13:934" data-name="Group">
              <div className="design-82">
                <img alt="" className="design-28" src={imgGroup3} />
              </div>
            </div>
          </div>
          <p className="design-80" data-node-id="I13:1072;13:937">
            캘린더
          </p>
        </div>
        <div className="design-76" data-node-id="I13:1072;13:938" data-name="tab/chat">
          <div className="design-77" data-node-id="I13:1072;13:939" data-name="icon/chat">
            <div className="design-83" data-node-id="I13:1072;13:940" data-name="Group">
              <div className="design-84">
                <img alt="" className="design-28" src={imgGroup4} />
              </div>
            </div>
          </div>
          <p className="design-80" data-node-id="I13:1072;13:942">
            대화
          </p>
        </div>
        <div className="design-76" data-node-id="I13:1072;13:943" data-name="tab/community">
          <div className="design-77" data-node-id="I13:1072;13:944" data-name="icon/community">
            <div className="design-85" data-node-id="I13:1072;13:945" data-name="Group">
              <div className="design-86">
                <img alt="" className="design-28" src={imgGroup5} />
              </div>
            </div>
          </div>
          <p className="design-80" data-node-id="I13:1072;13:948">
            커뮤니티
          </p>
        </div>
        <div className="design-76" data-node-id="I13:1072;13:949" data-name="tab/settings">
          <div className="design-77" data-node-id="I13:1072;13:950" data-name="icon/settings">
            <div className="design-87" data-node-id="I13:1072;13:951" data-name="Group">
              <div className="design-88">
                <img alt="" className="design-28" src={imgGroup6} />
              </div>
            </div>
          </div>
          <p className="design-80" data-node-id="I13:1072;13:954">
            내 설정
          </p>
        </div>
      </div>
    </div>;
}
