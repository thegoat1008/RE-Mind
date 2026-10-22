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
function Character({ className }) {
  return <div className={className || "design-153"} data-node-id="5:332" data-name="온이 (Character)">
      <img alt="" className="design-9" src={imgCharacter} />
    </div>;
}
export default function Component041() {
  return <div className="design-5" data-node-id="16:1077" data-name="04-1 가입 완료">
      <div className="design-6" data-node-id="16:1078" data-name="Status Bar">
        <div className="design-7" data-node-id="I16:1078;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I16:1078;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I16:1078;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I16:1078;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I16:1078;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I16:1078;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I16:1078;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I16:1078;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I16:1078;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I16:1078;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I16:1078;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I16:1078;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-293" data-node-id="16:1110" data-name="Content">
        <div className="design-294" data-node-id="16:1111" data-name="center">
          <Character className="design-295" />
        </div>
        <p className="design-296" data-node-id="16:1123">
          가입을 환영해요, 지은님!
        </p>
        <div className="design-297" data-node-id="16:1124">
          <p className="design-122">온이가 곁에서 함께할게요.</p>
          <p className="design-123">먼저 돌보시는 분을 알려 주세요.</p>
        </div>
        <div className="design-44" data-node-id="16:1125" data-name="spacer" />
        <div className="design-291" data-node-id="16:1126" data-name="버튼">
          <Button className="design-292" label="돌봄 대상 등록하기" />
          <Button className="design-43" label="나중에 할게요" type="outline" />
        </div>
      </div>
    </div>;
}
