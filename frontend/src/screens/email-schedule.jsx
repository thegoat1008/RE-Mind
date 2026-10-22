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
const imgIconChevL = `/assets/figma/fa782.svg`;
const imgGroup = `/assets/figma/c8c7b.svg`;
const imgGroup1 = `/assets/figma/e5f20.svg`;
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
export default function Component115() {
  return <div className="design-5" data-node-id="74:1543" data-name="11-5 자동 발송 수정">
      <div className="design-6" data-node-id="74:1544" data-name="Status Bar">
        <div className="design-7" data-node-id="I74:1544;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I74:1544;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I74:1544;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I74:1544;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I74:1544;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I74:1544;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I74:1544;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I74:1544;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I74:1544;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I74:1544;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I74:1544;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I74:1544;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-19" data-node-id="74:1576" data-name="Content">
        <div className="design-20" data-node-id="74:1729" data-name="Header">
          <a className="design-21" data-node-id="74:1730" data-name="뒤로 버튼">
            <div className="design-22" data-node-id="74:1731" data-name="icon/chevL">
              <img alt="" className="design-9" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-23" data-node-id="74:1734">
            자동 발송 수정
          </p>
        </div>
        <p className="design-56" data-node-id="74:1735">
          받는 가족 이메일
        </p>
        <div className="design-439" data-node-id="74:1736" data-name="이메일">
          <div className="design-440" data-node-id="74:1737" data-name="input">
            <p className="design-441" data-node-id="74:1738">
              minsu@email.com
            </p>
            <p className="design-442" data-node-id="74:1739">
              삭제
            </p>
          </div>
          <div className="design-440" data-node-id="74:1740" data-name="input">
            <p className="design-441" data-node-id="74:1741">
              younghee@email.com
            </p>
            <p className="design-442" data-node-id="74:1742">
              삭제
            </p>
          </div>
        </div>
        <div className="design-443" data-node-id="74:1743" data-name="추가">
          <div className="design-346" data-node-id="74:1744" data-name="icon/plus">
            <div className="design-270" data-node-id="74:1745" data-name="Group">
              <div className="design-444">
                <img alt="" className="design-28" src={imgGroup} />
              </div>
            </div>
          </div>
          <p className="design-55" data-node-id="74:1747">
            이메일 추가
          </p>
        </div>
        <div className="design-61" data-node-id="74:1748" data-name="주기">
          <p className="design-80" data-node-id="74:1749">
            얼마나 자주 보낼까요?
          </p>
          <div className="design-71" data-node-id="74:1750" data-name="chips">
            <Chip className="design-286 instance-email-schedule-0" label="매일" state="active" />
            <Chip className="design-287 instance-email-schedule-1" label="매주" />
          </div>
        </div>
        <div className="design-61" data-node-id="74:1755" data-name="시간">
          <p className="design-80" data-node-id="74:1756">
            몇 시에 보낼까요?
          </p>
          <div className="design-282" data-node-id="74:1757" data-name="input">
            <p className="design-288" data-node-id="74:1758">
              오전 8:00
            </p>
            <div className="design-77" data-node-id="74:1759" data-name="icon/clock">
              <div className="design-81" data-node-id="74:1760" data-name="Group">
                <div className="design-289">
                  <img alt="" className="design-28" src={imgGroup1} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="design-44" data-node-id="74:1763" data-name="spacer" />
        <p className="design-320" data-node-id="74:1764">
          바뀐 설정은 다음 발송부터 적용돼요.
        </p>
        <Button className="design-45" label="저장하기" />
      </div>
    </div>;
}
