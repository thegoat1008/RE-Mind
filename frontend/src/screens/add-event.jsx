/** @jsxRuntime classic */
/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "../designRuntime.jsx";

const imgStatusDarkBackgroundMask = `/assets/figma/c9227.svg`;
const imgNetworkSignalDark = `/assets/figma/c9609.svg`;
const imgWiFiSignalDark = `/assets/figma/f883c.svg`;
const imgBatteryDark = `/assets/figma/9efe4.svg`;
const imgTimeDarkBackgroundMask = `/assets/figma/f965f.svg`;
const img941 = `/assets/figma/a1382.svg`;
const imgIconX = `/assets/figma/008c0.svg`;
const imgIconCal = `/assets/figma/2f575.svg`;
const imgIconClock = `/assets/figma/6cdc4.svg`;
const imgToggle = `/assets/figma/272c2.svg`;
function Button({ className, label = "버튼", type = "primary" }) {
  return <div className={className || "design-113"} data-node-id="24:967">
      <p className="design-3" data-node-id="24:968">
        {label}
      </p>
    </div>;
}
function Chip({ className, label = "칩", state = "default" }) {
  const isActive = state === "active";
  return <div className={className || ` design-89 ${isActive ? "design-2" : "design-1"}`} id={isActive ? "node-24_976" : "node-24_974"}>
      {state === "default" && <p className="design-47" data-node-id="24:975">
          {label}
        </p>}
      {isActive && <p className="design-48" data-node-id="24:977">
          {label}
        </p>}
    </div>;
}
export default function Component081() {
  return <div className="design-5" data-node-id="5:1129" data-name="08-1 일정 추가">
      <div className="design-131" data-node-id="5:1130" data-name="iPhone 16 & 17 Pro - 2">
        <div className="design-7" data-node-id="I5:1130;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I5:1130;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I5:1130;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I5:1130;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I5:1130;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I5:1130;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I5:1130;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I5:1130;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I5:1130;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I5:1130;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I5:1130;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I5:1130;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-178" data-node-id="5:1131" data-name="Content">
        <div className="design-20" data-node-id="5:1132" data-name="Header">
          <a className="design-21" data-node-id="31:968" data-name="뒤로 버튼">
            <div className="design-22" data-node-id="5:1133" data-name="icon/x">
              <img alt="" className="design-9" src={imgIconX} />
            </div>
          </a>
          <p className="design-179" data-node-id="5:1135">
            일정 추가
          </p>
          <div className="design-180" data-node-id="5:1136" data-name="Rectangle" />
        </div>
        <div className="design-61" data-node-id="5:1137" data-name="field/제목">
          <p className="design-181" data-node-id="5:1138">
            제목
          </p>
          <div className="design-182" data-node-id="5:1139" data-name="input">
            <p className="design-183" data-node-id="5:1140">
              저녁 약 복용
            </p>
          </div>
        </div>
        <div className="design-184" data-node-id="5:1148" data-name="날짜·시간">
          <div className="design-185" data-node-id="5:1149" data-name="field/날짜">
            <p className="design-181" data-node-id="5:1150">
              날짜
            </p>
            <div className="design-186" data-node-id="5:1151" data-name="input">
              <p className="design-183" data-node-id="5:1152">
                10월 18일
              </p>
              <div className="design-94" data-node-id="5:1153" data-name="icon/cal">
                <img alt="" className="design-9" src={imgIconCal} />
              </div>
            </div>
          </div>
          <div className="design-185" data-node-id="5:1156" data-name="field/시간">
            <p className="design-181" data-node-id="5:1157">
              시간
            </p>
            <div className="design-186" data-node-id="5:1158" data-name="input">
              <p className="design-183" data-node-id="5:1159">
                오후 7:00
              </p>
              <div className="design-94" data-node-id="5:1160" data-name="icon/clock">
                <img alt="" className="design-9" src={imgIconClock} />
              </div>
            </div>
          </div>
        </div>
        <div className="design-61" data-node-id="5:1163" data-name="field/반복">
          <p className="design-181" data-node-id="5:1164">
            반복
          </p>
          <div className="design-187" data-node-id="5:1165" data-name="Frame">
            <Chip className="design-72 instance-add-event-0" label="안 함" />
            <Chip className="design-73 instance-add-event-1" label="매일" state="active" />
            <Chip className="design-72 instance-add-event-2" label="매주" />
            <Chip className="design-72 instance-add-event-3" label="매월" />
          </div>
        </div>
        <div className="design-188" data-node-id="5:1176" data-name="알림 설정">
          <div className="design-189" data-node-id="5:1177" data-name="Frame">
            <p className="design-190" data-node-id="5:1178">
              알림 받기
            </p>
            <p className="design-191" data-node-id="5:1179">
              30분 전에 알려드려요
            </p>
          </div>
          <div className="design-65" data-node-id="5:1180" data-name="toggle">
            <img alt="" className="design-9" src={imgToggle} />
          </div>
        </div>
        <div className="design-44" data-node-id="5:1182" data-name="spacer" />
        <Button className="design-45" label="저장하기" />
      </div>
    </div>;
}
