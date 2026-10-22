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
const imgGroup = `/assets/figma/e2493.svg`;
function Button({ className, label = "버튼", type = "primary" }) {
  const isOutline = type === "outline";
  return <div className={className || ` design-46 ${isOutline ? "design-1" : "design-2"}`} id={isOutline ? "node-24_969" : "node-24_967"}>
      {type === "primary" && <p className="design-3" data-node-id="24:968">
          {label}
        </p>}
      {isOutline && <p className="design-4" data-node-id="24:970">
          {label}
        </p>}
    </div>;
}
export default function Component083() {
  return <div className="design-5" data-node-id="77:1776" data-name="08-3 일정 삭제 확인">
      <div className="design-6" data-node-id="77:1777" data-name="Status Bar">
        <div className="design-7" data-node-id="I77:1777;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I77:1777;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I77:1777;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I77:1777;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I77:1777;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I77:1777;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I77:1777;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I77:1777;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I77:1777;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I77:1777;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I77:1777;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I77:1777;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-19" data-node-id="77:1778" data-name="Content">
        <div className="design-20" data-node-id="77:1779" data-name="Header">
          <a className="design-21" data-node-id="77:1780" data-name="뒤로 버튼">
            <div className="design-22" data-node-id="77:1781" data-name="icon/chevL">
              <img alt="" className="design-9" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-23" data-node-id="77:1783">
            일정 상세
          </p>
        </div>
        <div className="design-465" data-node-id="77:1784" data-name="제목">
          <div className="design-361" data-node-id="77:1785" data-name="icon">
            <div className="design-416" data-node-id="77:1786" data-name="icon/pill">
              <div className="design-466" data-node-id="77:1787" data-name="Group">
                <img alt="" className="design-9" src={imgGroup} />
              </div>
            </div>
          </div>
          <p className="design-467" data-node-id="77:1790">
            저녁 약 복용
          </p>
        </div>
        <div className="design-468" data-node-id="77:1791" data-name="정보">
          <div className="design-469" data-node-id="77:1792" data-name="row">
            <p className="design-470" data-node-id="77:1793">
              날짜
            </p>
            <p className="design-129" data-node-id="77:1794">
              10월 18일
            </p>
          </div>
          <div className="design-66" data-node-id="77:1795" data-name="divider" />
          <div className="design-469" data-node-id="77:1796" data-name="row">
            <p className="design-470" data-node-id="77:1797">
              시간
            </p>
            <p className="design-129" data-node-id="77:1798">
              오후 7:00
            </p>
          </div>
          <div className="design-66" data-node-id="77:1799" data-name="divider" />
          <div className="design-469" data-node-id="77:1800" data-name="row">
            <p className="design-470" data-node-id="77:1801">
              반복
            </p>
            <p className="design-129" data-node-id="77:1802">
              매일
            </p>
          </div>
          <div className="design-66" data-node-id="77:1803" data-name="divider" />
          <div className="design-469" data-node-id="77:1804" data-name="row">
            <p className="design-470" data-node-id="77:1805">
              알림
            </p>
            <p className="design-129" data-node-id="77:1806">
              30분 전
            </p>
          </div>
        </div>
        <div className="design-44" data-node-id="77:1807" data-name="spacer" />
        <Button className="design-45" label="수정하기" />
        <Button className="design-43" label="삭제" type="outline" />
      </div>
      <div className="design-471" data-node-id="77:1810" data-name="dim" />
      <div className="design-472" data-node-id="77:1811" data-name="삭제 확인 창">
        <p className="design-473" data-node-id="77:1812">
          이 일정을 지울까요?
        </p>
        <div className="design-297" data-node-id="77:1813">
          <p className="design-122">“저녁 약 복용”이 캘린더에서</p>
          <p className="design-123">사라져요.</p>
        </div>
        <div className="design-474" data-node-id="77:1814" data-name="버튼">
          <Button className="design-379" label="취소" type="outline" />
          <Button className="design-380" label="삭제" />
        </div>
      </div>
    </div>;
}
