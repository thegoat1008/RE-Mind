/** @jsxRuntime classic */
/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "../designRuntime.jsx";

const imgStatusDarkBackgroundMask = `/assets/figma/c9227.svg`;
const imgNetworkSignalDark = `/assets/figma/4c652.svg`;
const imgWiFiSignalDark = `/assets/figma/f883c.svg`;
const imgBatteryDark = `/assets/figma/9efe4.svg`;
const imgTimeDarkBackgroundMask = `/assets/figma/f965f.svg`;
const img941 = `/assets/figma/a1382.svg`;
const imgGroup = `/assets/figma/2b65f.svg`;
const imgIconPlus = `/assets/figma/caf6b.svg`;
const imgIconChevL = `/assets/figma/85afe.svg`;
const imgIconChevR = `/assets/figma/4691a.svg`;
const imgFrame = `/assets/figma/78f72.svg`;
const imgFrame1 = `/assets/figma/a8a27.svg`;
const imgFrame2 = `/assets/figma/608b1.svg`;
const imgFrame3 = `/assets/figma/5b087.svg`;
const imgIconPill = `/assets/figma/1ac1b.svg`;
const imgCheck = `/assets/figma/bb471.svg`;
const imgIconSun = `/assets/figma/e1d97.svg`;
const imgGroup1 = `/assets/figma/a2c0e.svg`;
const imgGroup2 = `/assets/figma/492e0.svg`;
const imgGroup3 = `/assets/figma/aeb75.svg`;
const imgGroup4 = `/assets/figma/acaf5.svg`;
const imgGroup5 = `/assets/figma/a95ec.svg`;
const imgGroup6 = `/assets/figma/07ec0.svg`;
function Chip({ className, label = "칩", state = "active" }) {
  return <div className={className || "design-114"} data-node-id="24:976">
      <p className="design-48" data-node-id="24:977">
        {label}
      </p>
    </div>;
}
export default function Component08() {
  return <div className="design-5" data-node-id="5:923" data-name="08 캘린더">
      <div className="design-131" data-node-id="5:924" data-name="iPhone 16 & 17 Pro - 2">
        <div className="design-7" data-node-id="I5:924;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I5:924;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I5:924;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I5:924;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I5:924;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I5:924;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I5:924;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I5:924;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I5:924;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I5:924;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I5:924;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I5:924;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-192" data-node-id="5:925" data-name="Content">
        <div className="design-140" data-node-id="5:926" data-name="Header">
          <p className="design-133" data-node-id="5:927">
            돌봄 캘린더
          </p>
          <a className="design-193" data-node-id="72:1577" data-name="이메일 보내기">
            <div className="design-77" data-node-id="72:1578" data-name="icon/mail">
              <div className="design-26" data-node-id="72:1579" data-name="Group">
                <div className="design-194">
                  <img alt="" className="design-28" src={imgGroup} />
                </div>
              </div>
            </div>
          </a>
          <Chip className="design-73 instance-calendar-0" label="오늘" />
        </div>
        <a className="design-195" data-node-id="5:1124" data-name="일정 추가 FAB">
          <div className="design-60" data-node-id="5:1125" data-name="icon/plus">
            <img alt="" className="design-9" src={imgIconPlus} />
          </div>
          <p className="design-196" data-node-id="5:1127">
            일정 추가
          </p>
        </a>
        <div className="design-197" data-node-id="29:966" data-name="Scroll">
          <div className="design-198" data-node-id="5:929" data-name="월간 캘린더">
            <div className="design-199" data-node-id="5:930" data-name="월 이동">
              <div className="design-60" data-node-id="5:931" data-name="icon/chevL">
                <img alt="" className="design-9" src={imgIconChevL} />
              </div>
              <p className="design-179" data-node-id="5:933">
                2026년 10월
              </p>
              <div className="design-60" data-node-id="5:934" data-name="icon/chevR">
                <img alt="" className="design-9" src={imgIconChevR} />
              </div>
            </div>
            <div className="design-200" data-node-id="5:936" data-name="요일">
              <div className="design-201" data-node-id="5:937" data-name="Frame">
                <p className="design-202" data-node-id="5:938">
                  일
                </p>
              </div>
              <div className="design-201" data-node-id="5:939" data-name="Frame">
                <p className="design-181" data-node-id="5:940">
                  월
                </p>
              </div>
              <div className="design-201" data-node-id="5:941" data-name="Frame">
                <p className="design-181" data-node-id="5:942">
                  화
                </p>
              </div>
              <div className="design-201" data-node-id="5:943" data-name="Frame">
                <p className="design-181" data-node-id="5:944">
                  수
                </p>
              </div>
              <div className="design-201" data-node-id="5:945" data-name="Frame">
                <p className="design-181" data-node-id="5:946">
                  목
                </p>
              </div>
              <div className="design-201" data-node-id="5:947" data-name="Frame">
                <p className="design-181" data-node-id="5:948">
                  금
                </p>
              </div>
              <div className="design-201" data-node-id="5:949" data-name="Frame">
                <p className="design-202" data-node-id="5:950">
                  토
                </p>
              </div>
            </div>
            <div className="design-200" data-node-id="5:951" data-name="Week 1">
              <div className="design-203" data-node-id="5:952" data-name="Frame" />
              <div className="design-203" data-node-id="5:953" data-name="Frame" />
              <div className="design-203" data-node-id="5:954" data-name="Frame" />
              <div className="design-203" data-node-id="5:955" data-name="Frame" />
              <div className="design-204" data-node-id="5:956" data-name="Frame">
                <div className="design-205" data-node-id="5:957" data-name="Frame">
                  <p className="design-206" data-node-id="5:958">
                    1
                  </p>
                </div>
                <div className="design-207" data-node-id="5:959" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="5:961" data-name="Frame">
                <div className="design-205" data-node-id="5:962" data-name="Frame">
                  <p className="design-206" data-node-id="5:963">
                    2
                  </p>
                </div>
                <div className="design-207" data-node-id="5:964" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame1} />
                </div>
              </div>
              <div className="design-204" data-node-id="5:966" data-name="Frame">
                <div className="design-205" data-node-id="5:967" data-name="Frame">
                  <p className="design-208" data-node-id="5:968">
                    3
                  </p>
                </div>
                <div className="design-207" data-node-id="5:969" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
            </div>
            <div className="design-200" data-node-id="5:971" data-name="Week 2">
              <div className="design-204" data-node-id="5:972" data-name="Frame">
                <div className="design-205" data-node-id="5:973" data-name="Frame">
                  <p className="design-208" data-node-id="5:974">
                    4
                  </p>
                </div>
                <div className="design-207" data-node-id="5:975" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="5:977" data-name="Frame">
                <div className="design-205" data-node-id="5:978" data-name="Frame">
                  <p className="design-206" data-node-id="5:979">
                    5
                  </p>
                </div>
                <div className="design-207" data-node-id="5:980" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="5:982" data-name="Frame">
                <div className="design-205" data-node-id="5:983" data-name="Frame">
                  <p className="design-206" data-node-id="5:984">
                    6
                  </p>
                </div>
                <div className="design-207" data-node-id="5:985" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame1} />
                </div>
              </div>
              <div className="design-204" data-node-id="5:987" data-name="Frame">
                <div className="design-205" data-node-id="5:988" data-name="Frame">
                  <p className="design-206" data-node-id="5:989">
                    7
                  </p>
                </div>
                <div className="design-207" data-node-id="5:990" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="5:992" data-name="Frame">
                <div className="design-205" data-node-id="5:993" data-name="Frame">
                  <p className="design-206" data-node-id="5:994">
                    8
                  </p>
                </div>
                <div className="design-209" data-node-id="5:995" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame2} />
                </div>
              </div>
              <div className="design-204" data-node-id="5:998" data-name="Frame">
                <div className="design-205" data-node-id="5:999" data-name="Frame">
                  <p className="design-206" data-node-id="5:1000">
                    9
                  </p>
                </div>
                <div className="design-207" data-node-id="5:1001" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="5:1003" data-name="Frame">
                <div className="design-205" data-node-id="5:1004" data-name="Frame">
                  <p className="design-208" data-node-id="5:1005">
                    10
                  </p>
                </div>
                <div className="design-207" data-node-id="5:1006" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
            </div>
            <div className="design-200" data-node-id="5:1008" data-name="Week 3">
              <div className="design-204" data-node-id="5:1009" data-name="Frame">
                <div className="design-205" data-node-id="5:1010" data-name="Frame">
                  <p className="design-208" data-node-id="5:1011">
                    11
                  </p>
                </div>
                <div className="design-207" data-node-id="5:1012" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame1} />
                </div>
              </div>
              <div className="design-204" data-node-id="5:1014" data-name="Frame">
                <div className="design-205" data-node-id="5:1015" data-name="Frame">
                  <p className="design-206" data-node-id="5:1016">
                    12
                  </p>
                </div>
                <div className="design-207" data-node-id="5:1017" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="5:1019" data-name="Frame">
                <div className="design-205" data-node-id="5:1020" data-name="Frame">
                  <p className="design-206" data-node-id="5:1021">
                    13
                  </p>
                </div>
                <div className="design-207" data-node-id="5:1022" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="5:1024" data-name="Frame">
                <div className="design-205" data-node-id="5:1025" data-name="Frame">
                  <p className="design-206" data-node-id="5:1026">
                    14
                  </p>
                </div>
                <div className="design-207" data-node-id="5:1027" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame1} />
                </div>
              </div>
              <div className="design-204" data-node-id="5:1029" data-name="Frame">
                <div className="design-205" data-node-id="5:1030" data-name="Frame">
                  <p className="design-206" data-node-id="5:1031">
                    15
                  </p>
                </div>
                <div className="design-207" data-node-id="5:1032" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="5:1034" data-name="Frame">
                <div className="design-205" data-node-id="5:1035" data-name="Frame">
                  <p className="design-206" data-node-id="5:1036">
                    16
                  </p>
                </div>
                <div className="design-207" data-node-id="5:1037" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="5:1039" data-name="Frame">
                <div className="design-205" data-node-id="5:1040" data-name="Frame">
                  <p className="design-208" data-node-id="5:1041">
                    17
                  </p>
                </div>
                <div className="design-207" data-node-id="5:1042" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
            </div>
            <div className="design-200" data-node-id="5:1044" data-name="Week 4">
              <div className="design-204" data-node-id="5:1045" data-name="Frame">
                <div className="design-210" data-node-id="5:1046" data-name="Frame">
                  <p className="design-211" data-node-id="5:1047">
                    18
                  </p>
                </div>
                <div className="design-212" data-node-id="5:1048" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame3} />
                </div>
              </div>
              <div className="design-204" data-node-id="5:1052" data-name="Frame">
                <div className="design-205" data-node-id="5:1053" data-name="Frame">
                  <p className="design-206" data-node-id="5:1054">
                    19
                  </p>
                </div>
                <div className="design-207" data-node-id="5:1055" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="5:1057" data-name="Frame">
                <div className="design-205" data-node-id="5:1058" data-name="Frame">
                  <p className="design-206" data-node-id="5:1059">
                    20
                  </p>
                </div>
                <div className="design-207" data-node-id="5:1060" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="5:1062" data-name="Frame">
                <div className="design-205" data-node-id="5:1063" data-name="Frame">
                  <p className="design-206" data-node-id="5:1064">
                    21
                  </p>
                </div>
                <div className="design-207" data-node-id="5:1065" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame1} />
                </div>
              </div>
              <div className="design-204" data-node-id="5:1067" data-name="Frame">
                <div className="design-205" data-node-id="5:1068" data-name="Frame">
                  <p className="design-206" data-node-id="5:1069">
                    22
                  </p>
                </div>
                <div className="design-207" data-node-id="5:1070" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="5:1072" data-name="Frame">
                <div className="design-205" data-node-id="5:1073" data-name="Frame">
                  <p className="design-206" data-node-id="5:1074">
                    23
                  </p>
                </div>
                <div className="design-207" data-node-id="5:1075" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="5:1077" data-name="Frame">
                <div className="design-205" data-node-id="5:1078" data-name="Frame">
                  <p className="design-208" data-node-id="5:1079">
                    24
                  </p>
                </div>
                <div className="design-207" data-node-id="5:1080" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
            </div>
            <div className="design-200" data-node-id="5:1082" data-name="Week 5">
              <div className="design-204" data-node-id="5:1083" data-name="Frame">
                <div className="design-205" data-node-id="5:1084" data-name="Frame">
                  <p className="design-208" data-node-id="5:1085">
                    25
                  </p>
                </div>
                <div className="design-207" data-node-id="5:1086" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame1} />
                </div>
              </div>
              <div className="design-204" data-node-id="5:1088" data-name="Frame">
                <div className="design-205" data-node-id="5:1089" data-name="Frame">
                  <p className="design-206" data-node-id="5:1090">
                    26
                  </p>
                </div>
                <div className="design-207" data-node-id="5:1091" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="5:1093" data-name="Frame">
                <div className="design-205" data-node-id="5:1094" data-name="Frame">
                  <p className="design-206" data-node-id="5:1095">
                    27
                  </p>
                </div>
                <div className="design-207" data-node-id="5:1096" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="5:1098" data-name="Frame">
                <div className="design-205" data-node-id="5:1099" data-name="Frame">
                  <p className="design-206" data-node-id="5:1100">
                    28
                  </p>
                </div>
                <div className="design-207" data-node-id="5:1101" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame1} />
                </div>
              </div>
              <div className="design-204" data-node-id="5:1103" data-name="Frame">
                <div className="design-205" data-node-id="5:1104" data-name="Frame">
                  <p className="design-206" data-node-id="5:1105">
                    29
                  </p>
                </div>
                <div className="design-207" data-node-id="5:1106" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="5:1108" data-name="Frame">
                <div className="design-205" data-node-id="5:1109" data-name="Frame">
                  <p className="design-206" data-node-id="5:1110">
                    30
                  </p>
                </div>
                <div className="design-207" data-node-id="5:1111" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="5:1113" data-name="Frame">
                <div className="design-205" data-node-id="5:1114" data-name="Frame">
                  <p className="design-208" data-node-id="5:1115">
                    31
                  </p>
                </div>
                <div className="design-207" data-node-id="5:1116" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
            </div>
          </div>
          <div className="design-213" data-node-id="5:1118" data-name="선택일 헤더">
            <p className="design-214" data-node-id="5:1119">
              10월 18일 일요일
            </p>
            <p className="design-215" data-node-id="5:1120">
              일정 2개
            </p>
          </div>
          <div className="design-35" data-node-id="5:1121" data-name="일정 목록">
            <a className="design-216" data-node-id="5:1122" data-name="EventItem">
              <div className="design-217" data-node-id="I5:1122;3:151" data-name="icon bubble">
                <div className="design-60" data-node-id="I5:1122;3:152" data-name="icon/pill">
                  <img alt="" className="design-9" src={imgIconPill} />
                </div>
              </div>
              <div className="design-218" data-node-id="I5:1122;3:155" data-name="text">
                <p className="design-190" data-node-id="I5:1122;3:156">
                  저녁 약 복용
                </p>
                <p className="design-219" data-node-id="I5:1122;3:157">
                  오후 7:00 · 매일
                </p>
              </div>
              <div className="design-22" data-node-id="I5:1122;3:158" data-name="check">
                <img alt="" className="design-9" src={imgCheck} />
              </div>
            </a>
            <div className="design-220" data-node-id="5:1123" data-name="EventItem">
              <div className="design-217" data-node-id="I5:1123;3:168" data-name="icon bubble">
                <div className="design-60" data-node-id="I5:1123;3:169" data-name="icon/sun">
                  <img alt="" className="design-9" src={imgIconSun} />
                </div>
              </div>
              <div className="design-221" data-node-id="I5:1123;3:172" data-name="text">
                <p className="design-190" data-node-id="I5:1123;3:173">
                  공원 산책
                </p>
                <p className="design-219" data-node-id="I5:1123;3:174">
                  오후 5:30 · 이모 담당
                </p>
              </div>
              <div className="design-22" data-node-id="I5:1123;3:175" data-name="check">
                <img alt="" className="design-9" src={imgCheck} />
              </div>
            </div>
          </div>
        </div>
        <a className="design-222" data-node-id="77:2063" data-name="말로 추가">
          <div className="design-223" data-node-id="77:2064" data-name="icon/mic">
            <div className="design-125" data-node-id="77:2065" data-name="Group">
              <div className="design-224">
                <img alt="" className="design-28" src={imgGroup1} />
              </div>
            </div>
          </div>
        </a>
      </div>
      <div className="design-75" data-node-id="13:1130" data-name="TabBar (앱 화면)">
        <div className="design-76" data-node-id="I13:1130;13:956" data-name="tab/home">
          <div className="design-77" data-node-id="I13:1130;13:957" data-name="icon/home">
            <div className="design-78" data-node-id="I13:1130;13:958" data-name="Group">
              <div className="design-79">
                <img alt="" className="design-28" src={imgGroup2} />
              </div>
            </div>
          </div>
          <p className="design-80" data-node-id="I13:1130;13:960">
            홈
          </p>
        </div>
        <div className="design-76" data-node-id="I13:1130;13:961" data-name="tab/calendar">
          <div className="design-77" data-node-id="I13:1130;13:962" data-name="icon/calendar">
            <div className="design-81" data-node-id="I13:1130;13:963" data-name="Group">
              <div className="design-82">
                <img alt="" className="design-28" src={imgGroup3} />
              </div>
            </div>
          </div>
          <p className="design-55" data-node-id="I13:1130;13:966">
            캘린더
          </p>
        </div>
        <div className="design-76" data-node-id="I13:1130;13:967" data-name="tab/chat">
          <div className="design-77" data-node-id="I13:1130;13:968" data-name="icon/chat">
            <div className="design-83" data-node-id="I13:1130;13:969" data-name="Group">
              <div className="design-84">
                <img alt="" className="design-28" src={imgGroup4} />
              </div>
            </div>
          </div>
          <p className="design-80" data-node-id="I13:1130;13:971">
            대화
          </p>
        </div>
        <div className="design-76" data-node-id="I13:1130;13:972" data-name="tab/community">
          <div className="design-77" data-node-id="I13:1130;13:973" data-name="icon/community">
            <div className="design-85" data-node-id="I13:1130;13:974" data-name="Group">
              <div className="design-86">
                <img alt="" className="design-28" src={imgGroup5} />
              </div>
            </div>
          </div>
          <p className="design-80" data-node-id="I13:1130;13:977">
            커뮤니티
          </p>
        </div>
        <div className="design-76" data-node-id="I13:1130;13:978" data-name="tab/settings">
          <div className="design-77" data-node-id="I13:1130;13:979" data-name="icon/settings">
            <div className="design-87" data-node-id="I13:1130;13:980" data-name="Group">
              <div className="design-88">
                <img alt="" className="design-28" src={imgGroup6} />
              </div>
            </div>
          </div>
          <p className="design-80" data-node-id="I13:1130;13:983">
            내 설정
          </p>
        </div>
      </div>
    </div>;
}
