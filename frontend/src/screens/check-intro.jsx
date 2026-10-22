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
const imgIconChevL = `/assets/figma/fa782.svg`;
const imgGroup = `/assets/figma/848b4.svg`;
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
export default function Component051() {
  return <div className="design-5" data-node-id="68:1151" data-name="05-1 치매 체크 · 안내">
      <div className="design-6" data-node-id="68:1152" data-name="Status Bar">
        <div className="design-7" data-node-id="I68:1152;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I68:1152;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I68:1152;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I68:1152;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I68:1152;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I68:1152;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I68:1152;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I68:1152;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I68:1152;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I68:1152;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I68:1152;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I68:1152;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-19" data-node-id="68:1184" data-name="Content">
        <div className="design-20" data-node-id="68:1185" data-name="Header">
          <a className="design-21" data-node-id="68:1186" data-name="뒤로 버튼">
            <div className="design-22" data-node-id="68:1187" data-name="icon/chevL">
              <img alt="" className="design-9" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-23" data-node-id="68:1189">
            치매 체크
          </p>
          <p className="design-80" data-node-id="68:1190">
            2/3
          </p>
        </div>
        <div className="design-381" data-node-id="68:1191" data-name="온이">
          <Character className="design-382" />
        </div>
        <div className="design-383" data-node-id="68:1203">
          <p className="design-384">우리 가족의 요즘 모습을</p>
          <p className="design-385">한 번 살펴볼까요?</p>
        </div>
        <div className="design-297" data-node-id="68:1204">
          <p className="design-122">15개의 짧은 질문이에요.</p>
          <p className="design-123">정답은 없고, 건너뛰어도 괜찮아요.</p>
        </div>
        <div className="design-67" data-node-id="68:1205" data-name="안내">
          <div className="design-25" data-node-id="68:1206" data-name="icon/info">
            <div className="design-81" data-node-id="68:1207" data-name="Group">
              <div className="design-386">
                <img alt="" className="design-28" src={imgGroup} />
              </div>
            </div>
          </div>
          <p className="design-70" data-node-id="68:1211">
            진단이 아니라 참고용이에요. 결과는 내가 허락할 때만 AI 대화에서 참고해요.
          </p>
        </div>
        <div className="design-44" data-node-id="68:1212" data-name="spacer" />
        <Button className="design-45" label="시작하기" />
        <Button className="design-387" label="나중에 할게요" type="outline" />
      </div>
    </div>;
}
