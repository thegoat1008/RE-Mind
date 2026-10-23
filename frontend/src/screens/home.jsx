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
const imgPill = `/assets/figma-v2/67b88.svg`;
const imgCheck = `/assets/figma-v2/2cc00.svg`;
const imgPlus = `/assets/figma-v2/096a7.svg`;
const imgCheck1 = `/assets/figma-v2/58710.svg`;
const imgGroup = `/assets/figma-v2/d539c.svg`;
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
export default function Component071() {
  return <div className="design-1" data-node-id="179:6714" data-name="07-1 홈">
      <div className="design-126" data-node-id="179:6715" data-name="Status Bar">
        <div className="design-3" data-node-id="I179:6715;486:2224" data-name="Status">
          <div className="design-3" data-node-id="I179:6715;486:2225" data-name="status/dark">
            <div className="design-4" data-node-id="I179:6715;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-5" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-6" data-node-id="I179:6715;486:2227" data-name="status/dark">
              <div className="design-7" data-node-id="I179:6715;486:2228" data-name="Status Icons">
                <div className="design-8" data-node-id="I179:6715;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-5" src={imgNetworkSignalDark} />
                </div>
                <div className="design-9" data-node-id="I179:6715;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-5" src={imgWiFiSignalDark} />
                </div>
                <div className="design-10" data-node-id="I179:6715;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-5" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-11" data-node-id="I179:6715;486:2249" data-name="Time / Dark">
                <div className="design-12" data-node-id="I179:6715;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-5" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-13" data-node-id="I179:6715;486:2251" data-name="Time / Dark">
                  <div className="design-14" data-node-id="I179:6715;486:2252" data-name="9:41">
                    <img alt="" className="design-5" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-230" data-node-id="179:6716" data-name="Content">
        <div className="design-231" data-node-id="179:6717" data-name="Header">
          <div className="design-232" data-node-id="179:6718" data-name="Frame">
            <p className="design-233" data-node-id="179:6719">
              안녕하세요, 지은님
            </p>
            <p className="design-234" data-node-id="179:6720">
              오늘도 저와 함께해요
            </p>
          </div>
          <a className="design-235" data-node-id="179:6721" data-name="Notification">
            <div className="design-61" data-node-id="220:6474" data-name="bell">
              <img alt="" className="design-5" src={imgBell} />
            </div>
          </a>
        </div>
        <div className="design-236" data-node-id="179:6724" data-name="온이 카드">
          <Character className="design-237" />
          <a className="design-238" data-node-id="179:6726" data-name="Frame">
            <div className="design-239" data-node-id="179:6727">
              <p className="design-240">오늘은 어떠세요?</p>
              <p className="design-241">온이와 이야기해 볼까요?</p>
            </div>
            <div className="design-242" data-node-id="179:6728" data-name="대화 버튼">
              <p className="design-243" data-node-id="179:6729">
                온이와 대화하기
              </p>
            </div>
          </a>
        </div>
        <div className="design-244" data-node-id="179:6739" data-name="오늘의 일정">
          <div className="design-245" data-node-id="179:6740" data-name="Frame">
            <p className="design-246" data-node-id="179:6741">
              오늘의 일정
            </p>
            <a className="design-247" data-node-id="179:6742">
              <p className="design-248">전체보기</p>
            </a>
          </div>
          <div className="design-208" data-node-id="179:6743" data-name="Frame">
            <div className="design-209" data-node-id="179:6744" data-name="Frame">
              <div className="design-210" data-node-id="179:6745" data-name="Frame">
                <div className="design-61" data-node-id="220:5478" data-name="pill">
                  <img alt="" className="design-5" src={imgPill} />
                </div>
              </div>
              <div className="design-211" data-node-id="179:6748" data-name="Frame">
                <p className="design-212" data-node-id="179:6749">
                  아침 약 복용
                </p>
                <p className="design-213" data-node-id="179:6750">
                  오전 8:00 · 완료
                </p>
              </div>
              <div className="design-214" data-node-id="179:6751" data-name="Frame">
                <div className="design-145" data-node-id="179:6752" data-name="check">
                  <img alt="" className="design-5" src={imgCheck} />
                </div>
              </div>
            </div>
          </div>
          <div className="design-208" data-node-id="186:10074" data-name="Frame">
            <div className="design-209" data-node-id="186:10075" data-name="Frame">
              <div className="design-210" data-node-id="186:10076" data-name="Frame">
                <div className="design-61" data-node-id="220:5475" data-name="plus">
                  <img alt="" className="design-5" src={imgPlus} />
                </div>
              </div>
              <div className="design-211" data-node-id="186:10079" data-name="Frame">
                <p className="design-212" data-node-id="186:10080">
                  병원가기
                </p>
                <p className="design-213" data-node-id="186:10081">
                  오후 1:00 · 예정
                </p>
              </div>
              <div className="design-215" data-node-id="186:10082" data-name="Frame">
                <div className="design-145" data-node-id="186:10083" data-name="check">
                  <img alt="" className="design-5" src={imgCheck1} />
                </div>
              </div>
            </div>
          </div>
          <div className="design-208" data-node-id="186:10122" data-name="Frame">
            <div className="design-209" data-node-id="186:10123" data-name="Frame">
              <div className="design-210" data-node-id="186:10124" data-name="Frame">
                <div className="design-77" data-node-id="220:5469" data-name="icon/users">
                  <div className="design-216" data-node-id="220:5470" data-name="Group">
                    <div className="design-217">
                      <img alt="" className="design-28" src={imgGroup} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="design-211" data-node-id="186:10127" data-name="Frame">
                <p className="design-212" data-node-id="186:10128">
                  가족 모임
                </p>
                <p className="design-213" data-node-id="186:10129">
                  오후 7:00 · 예정
                </p>
              </div>
              <div className="design-215" data-node-id="186:10130" data-name="Frame">
                <div className="design-145" data-node-id="186:10131" data-name="check">
                  <img alt="" className="design-5" src={imgCheck1} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="design-36" data-node-id="179:6754" data-name="가족 알림">
          <div className="design-249" data-node-id="179:6755" data-name="title">
            <p className="design-250" data-node-id="179:6756">
              함께 보는 가족
            </p>
            <a className="design-251" data-node-id="179:6757">
              <p className="design-248">관리</p>
            </a>
          </div>
          <a className="design-252" data-node-id="196:5306" data-name="카드">
            <div className="design-253" data-node-id="196:5307" data-name="avatars">
              <div className="design-extra-3" data-node-id="196:5308" data-name="avatar">
                <p className="design-254" data-node-id="196:5309">
                  민
                </p>
              </div>
              <div className="design-extra-2" data-node-id="196:5310" data-name="avatar">
                <p className="design-254" data-node-id="196:5311">
                  이
                </p>
              </div>
            </div>
            <div className="design-60" data-node-id="196:5312" data-name="text">
              <p className="design-40" data-node-id="196:5313">
                가족 2명
              </p>
              <p className="design-41" data-node-id="196:5314">
                가족 코드 DA-4821
              </p>
            </div>
            <div className="design-255" data-node-id="196:5315" data-name="코드 공유">
              <p className="design-226" data-node-id="196:5316">
                코드 공유
              </p>
            </div>
          </a>
        </div>
      </div>
      <div className="design-75" data-node-id="179:6769" data-name="TabBar (앱 화면)">
        <div className="design-76" data-node-id="I179:6769;13:927" data-name="tab/home">
          <div className="design-77" data-node-id="I179:6769;13:928" data-name="icon/home">
            <div className="design-78" data-node-id="I179:6769;13:929" data-name="Group">
              <div className="design-79">
                <img alt="" className="design-28" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="design-56" data-node-id="I179:6769;13:931">
            홈
          </p>
        </div>
        <div className="design-76" data-node-id="I179:6769;13:932" data-name="tab/calendar">
          <div className="design-77" data-node-id="I179:6769;13:933" data-name="icon/calendar">
            <div className="design-80" data-node-id="I179:6769;13:934" data-name="Group">
              <div className="design-81">
                <img alt="" className="design-28" src={imgGroup2} />
              </div>
            </div>
          </div>
          <p className="design-21" data-node-id="I179:6769;13:937">
            캘린더
          </p>
        </div>
        <div className="design-76" data-node-id="I179:6769;13:938" data-name="tab/chat">
          <div className="design-77" data-node-id="I179:6769;13:939" data-name="icon/chat">
            <div className="design-82" data-node-id="I179:6769;13:940" data-name="Group">
              <div className="design-83">
                <img alt="" className="design-28" src={imgGroup3} />
              </div>
            </div>
          </div>
          <p className="design-21" data-node-id="I179:6769;13:942">
            대화
          </p>
        </div>
        <div className="design-76" data-node-id="I179:6769;13:943" data-name="tab/community">
          <div className="design-77" data-node-id="I179:6769;13:944" data-name="icon/community">
            <div className="design-84" data-node-id="I179:6769;13:945" data-name="Group">
              <div className="design-85">
                <img alt="" className="design-28" src={imgGroup4} />
              </div>
            </div>
          </div>
          <p className="design-21" data-node-id="I179:6769;13:948">
            커뮤니티
          </p>
        </div>
        <div className="design-76" data-node-id="I179:6769;13:949" data-name="tab/settings">
          <div className="design-77" data-node-id="I179:6769;13:950" data-name="icon/settings">
            <div className="design-86" data-node-id="I179:6769;13:951" data-name="Group">
              <div className="design-87">
                <img alt="" className="design-28" src={imgGroup5} />
              </div>
            </div>
          </div>
          <p className="design-21" data-node-id="I179:6769;13:954">
            내 설정
          </p>
        </div>
      </div>
    </div>;
}
