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
const imgGroup = `/assets/figma/35307.svg`;
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
export default function Component075() {
  return <div className="design-5" data-node-id="75:1678" data-name="07-5 치매 상식 · 우리 가족 기록">
      <div className="design-6" data-node-id="75:1679" data-name="Status Bar">
        <div className="design-7" data-node-id="I75:1679;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I75:1679;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I75:1679;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I75:1679;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I75:1679;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I75:1679;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I75:1679;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I75:1679;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I75:1679;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I75:1679;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I75:1679;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I75:1679;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-19" data-node-id="75:1711" data-name="Content">
        <div className="design-20" data-node-id="75:1763" data-name="Header">
          <a className="design-21" data-node-id="75:1764" data-name="뒤로 버튼">
            <div className="design-22" data-node-id="75:1765" data-name="icon/chevL">
              <img alt="" className="design-9" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-23" data-node-id="75:1768">
            우리 가족 기록
          </p>
        </div>
        <p className="design-461" data-node-id="75:1769">
          “같은 질문을 반복해요”
        </p>
        <p className="design-309" data-node-id="75:1770">
          우리 가족은 어떤가요?
        </p>
        <div className="design-61" data-node-id="75:1771" data-name="선택">
          <div className="design-462" data-node-id="75:1772" data-name="선택지">
            <div className="design-396" data-node-id="75:1773" data-name="radio" />
            <p className="design-397" data-node-id="75:1774">
              자주 그래요
            </p>
          </div>
          <div className="design-463" data-node-id="75:1775" data-name="선택지">
            <div className="design-399" data-node-id="75:1776" data-name="radio">
              <div className="design-313" data-node-id="75:1777" data-name="icon/check">
                <div className="design-314" data-node-id="75:1778" data-name="Group">
                  <div className="design-315">
                    <img alt="" className="design-28" src={imgGroup} />
                  </div>
                </div>
              </div>
            </div>
            <p className="design-397" data-node-id="75:1780">
              가끔 그래요
            </p>
          </div>
          <div className="design-462" data-node-id="75:1781" data-name="선택지">
            <div className="design-396" data-node-id="75:1782" data-name="radio" />
            <p className="design-397" data-node-id="75:1783">
              처음 봤어요
            </p>
          </div>
        </div>
        <div className="design-61" data-node-id="75:1784" data-name="field/메모">
          <p className="design-80" data-node-id="75:1785">
            더 남기고 싶은 말 (선택)
          </p>
          <div className="design-464" data-node-id="75:1786" data-name="textarea">
            <p className="design-309" data-node-id="75:1787">
              예: 저녁 때 더 자주 물어보세요.
            </p>
          </div>
        </div>
        <p className="design-355" data-node-id="75:1788">
          저장하면 AI 대화에서 참고해요. 설정에서 언제든 끌 수 있어요.
        </p>
        <div className="design-44" data-node-id="75:1789" data-name="spacer" />
        <Button className="design-45" label="저장하고 대화하기" />
        <Button className="design-387" label="건너뛰기" type="outline" />
      </div>
    </div>;
}
