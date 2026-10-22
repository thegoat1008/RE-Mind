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
function Button({ className, label = "버튼", type = "primary" }) {
  return <div className={className || "design-113"} data-node-id="24:967">
      <p className="design-3" data-node-id="24:968">
        {label}
      </p>
    </div>;
}
function Character({ className }) {
  return <div className={className || "design-153"} data-node-id="5:332" data-name="온이 (Character)">
      <img alt="" className="design-9" src={imgCharacter} />
    </div>;
}
export default function Component021() {
  return <div className="design-5" data-node-id="16:1018" data-name="02-1 비밀번호 찾기">
      <div className="design-6" data-node-id="16:1019" data-name="Status Bar">
        <div className="design-7" data-node-id="I16:1019;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I16:1019;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I16:1019;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I16:1019;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I16:1019;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I16:1019;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I16:1019;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I16:1019;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I16:1019;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I16:1019;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I16:1019;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I16:1019;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-115" data-node-id="16:1051" data-name="Content">
        <div className="design-20" data-node-id="16:1052" data-name="Header">
          <a className="design-21" data-node-id="31:978" data-name="뒤로 버튼">
            <div className="design-22" data-node-id="16:1053" data-name="icon/chevL">
              <img alt="" className="design-9" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-23" data-node-id="16:1055">
            비밀번호 찾기
          </p>
        </div>
        <div className="design-283" data-node-id="16:1056" data-name="온이 안내">
          <Character className="design-276" />
          <div className="design-284" data-node-id="16:1068">
            <p className="design-122">가입한 이메일을 알려주세요.</p>
            <p className="design-122">비밀번호를 바꿀 수 있는</p>
            <p className="design-123">링크를 보내드려요.</p>
          </div>
        </div>
        <div className="design-61" data-node-id="16:1069" data-name="field/이메일">
          <p className="design-80" data-node-id="16:1070">
            이메일
          </p>
          <div className="design-118" data-node-id="16:1071" data-name="input">
            <p className="design-119" data-node-id="16:1072">
              이메일을 입력하세요
            </p>
          </div>
        </div>
        <div className="design-44" data-node-id="16:1073" data-name="spacer" />
        <p className="design-320" data-node-id="16:1074">
          메일이 오지 않으면 스팸함도 확인해 주세요.
        </p>
        <Button className="design-45" label="링크 보내기" />
      </div>
    </div>;
}
