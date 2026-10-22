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
const imgGroup = `/assets/figma/11300.svg`;
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
export default function Component074() {
  return <div className="design-5" data-node-id="75:1644" data-name="07-4 치매 상식 · 해설">
      <div className="design-6" data-node-id="75:1645" data-name="Status Bar">
        <div className="design-7" data-node-id="I75:1645;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I75:1645;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I75:1645;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I75:1645;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I75:1645;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I75:1645;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I75:1645;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I75:1645;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I75:1645;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I75:1645;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I75:1645;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I75:1645;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-19" data-node-id="75:1677" data-name="Content">
        <div className="design-20" data-node-id="75:1734" data-name="Header">
          <a className="design-21" data-node-id="75:1735" data-name="뒤로 버튼">
            <div className="design-22" data-node-id="75:1736" data-name="icon/chevL">
              <img alt="" className="design-9" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-23" data-node-id="75:1739">
            치매 상식
          </p>
          <p className="design-80" data-node-id="75:1740">
            1/5
          </p>
        </div>
        <div className="design-455" data-node-id="75:1741" data-name="정답">
          <div className="design-361" data-node-id="75:1742" data-name="O">
            <p className="design-456" data-node-id="75:1743">
              O
            </p>
          </div>
          <div className="design-358" data-node-id="75:1744" data-name="t">
            <p className="design-457" data-node-id="75:1745">
              정답이에요
            </p>
            <p className="design-360" data-node-id="75:1746">
              잘 알고 계세요.
            </p>
          </div>
        </div>
        <div className="design-458" data-node-id="75:1747" data-name="해설">
          <p className="design-391" data-node-id="75:1748">
            왜 그럴까요?
          </p>
          <p className="design-459" data-node-id="75:1749">
            같은 말을 오래 반복하는 모습이 이어지면 치매안심센터에서 상담해 볼 수 있어요. 나이 탓이라고 넘기지 않아도 괜찮아요.
          </p>
        </div>
        <a className="design-460" data-node-id="75:1750" data-name="우리 가족">
          <p className="design-424" data-node-id="75:1751">
            우리 가족도 이런 모습이 있어요
          </p>
          <div className="design-25" data-node-id="75:1752" data-name="icon/chev">
            <div className="design-248" data-node-id="75:1753" data-name="Group">
              <div className="design-249">
                <img alt="" className="design-28" src={imgGroup} />
              </div>
            </div>
          </div>
        </a>
        <div className="design-44" data-node-id="75:1756" data-name="spacer" />
        <Button className="design-45" label="다음 퀴즈" />
        <Button className="design-387" label="그만 볼게요" type="outline" />
      </div>
    </div>;
}
