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
export default function Component04() {
  return <div className="design-5" data-node-id="5:1469" data-name="04 계정 인증">
      <div className="design-6" data-node-id="15:1108" data-name="Status Bar">
        <div className="design-7" data-node-id="I15:1108;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I15:1108;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I15:1108;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I15:1108;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I15:1108;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I15:1108;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I15:1108;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I15:1108;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I15:1108;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I15:1108;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I15:1108;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I15:1108;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-115" data-node-id="15:1140" data-name="Content">
        <div className="design-20" data-node-id="15:1141" data-name="Header">
          <a className="design-21" data-node-id="31:976" data-name="뒤로 버튼">
            <div className="design-22" data-node-id="15:1142" data-name="icon/chevL">
              <img alt="" className="design-9" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-23" data-node-id="15:1144">
            계정 인증
          </p>
        </div>
        <div className="design-283" data-node-id="15:1145" data-name="온이 안내">
          <Character className="design-276" />
          <div className="design-284" data-node-id="15:1157">
            <p className="design-122">메일로 보낸 숫자 4자리를</p>
            <p className="design-123">알려주시면 돼요.</p>
          </div>
        </div>
        <div className="design-298" data-node-id="15:1158" data-name="제목">
          <p className="design-299" data-node-id="15:1159">
            인증 코드를 입력해 주세요
          </p>
          <p className="design-300" data-node-id="15:1160">
            jieun.kim@gmail.com
          </p>
        </div>
        <div className="design-184" data-node-id="15:1161" data-name="인증 코드">
          <div className="design-301" data-node-id="15:1162" data-name="code/1">
            <p className="design-302" data-node-id="15:1163">
              4
            </p>
          </div>
          <div className="design-301" data-node-id="15:1164" data-name="code/2">
            <p className="design-302" data-node-id="15:1165">
              8
            </p>
          </div>
          <div className="design-301" data-node-id="15:1166" data-name="code/3">
            <p className="design-302" data-node-id="15:1167">
              2
            </p>
          </div>
          <div className="design-303" data-node-id="15:1168" data-name="code/4">
            <div className="design-304" data-node-id="15:1169" data-name="cursor" />
          </div>
        </div>
        <div className="design-305" data-node-id="15:1170" data-name="재전송">
          <p className="design-306" data-node-id="15:1171">
            코드를 받지 못하셨나요?
          </p>
          <p className="design-307" data-node-id="15:1172">
            00:59 후 재전송
          </p>
        </div>
        <div className="design-44" data-node-id="15:1173" data-name="spacer" />
        <Button className="design-45" label="인증하기" />
      </div>
    </div>;
}
