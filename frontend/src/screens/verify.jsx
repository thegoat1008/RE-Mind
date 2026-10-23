/** @jsxRuntime classic */
/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from '../designRuntime.jsx'

const imgCharacter = `/assets/figma-v2/efa7a.svg`;
const imgStatusDarkBackgroundMask = `/assets/figma-v2/c9227.svg`;
const imgNetworkSignalDark = `/assets/figma-v2/4c652.svg`;
const imgWiFiSignalDark = `/assets/figma-v2/f883c.svg`;
const imgBatteryDark = `/assets/figma-v2/9efe4.svg`;
const imgTimeDarkBackgroundMask = `/assets/figma-v2/f965f.svg`;
const img941 = `/assets/figma-v2/a1382.svg`;
const imgIconChevL = `/assets/figma-v2/905bb.svg`;
function Character({ className }) {
  return <div className={className || "design-150"} data-node-id="5:332" data-name="온이 (Character)">
      <img alt="" className="design-5" src={imgCharacter} />
    </div>;
}
export default function Component04() {
  return <div className="design-1" data-node-id="179:6912" data-name="04 계정 인증">
      <div className="design-2" data-node-id="179:6913" data-name="Status Bar">
        <div className="design-3" data-node-id="I179:6913;486:2224" data-name="Status">
          <div className="design-3" data-node-id="I179:6913;486:2225" data-name="status/dark">
            <div className="design-4" data-node-id="I179:6913;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-5" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-6" data-node-id="I179:6913;486:2227" data-name="status/dark">
              <div className="design-7" data-node-id="I179:6913;486:2228" data-name="Status Icons">
                <div className="design-8" data-node-id="I179:6913;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-5" src={imgNetworkSignalDark} />
                </div>
                <div className="design-9" data-node-id="I179:6913;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-5" src={imgWiFiSignalDark} />
                </div>
                <div className="design-10" data-node-id="I179:6913;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-5" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-11" data-node-id="I179:6913;486:2249" data-name="Time / Dark">
                <div className="design-12" data-node-id="I179:6913;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-5" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-13" data-node-id="I179:6913;486:2251" data-name="Time / Dark">
                  <div className="design-14" data-node-id="I179:6913;486:2252" data-name="9:41">
                    <img alt="" className="design-5" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-111" data-node-id="179:6914" data-name="Content">
        <div className="design-16" data-node-id="179:6915" data-name="Header">
          <a className="design-17" data-node-id="179:6916" data-name="뒤로 버튼">
            <div className="design-18" data-node-id="179:6917" data-name="icon/chevL">
              <img alt="" className="design-5" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-19" data-node-id="179:6919">
            계정 인증
          </p>
        </div>
        <div className="design-274" data-node-id="179:6920" data-name="온이 안내">
          <Character className="design-266" />
          <div className="design-290" data-node-id="179:6922">
            <p className="design-115">메일로 보낸</p>
            <p className="design-116">숫자 4자리를 알려주세요.</p>
          </div>
        </div>
        <div className="design-291" data-node-id="179:6923" data-name="제목">
          <p className="design-292" data-node-id="179:6924">
            인증 코드를 입력해 주세요
          </p>
        </div>
        <div className="design-177" data-node-id="179:6926" data-name="인증 코드">
          <div className="design-294" data-node-id="179:6927" data-name="code/1">
            <p className="design-295" data-node-id="179:6928">
              4
            </p>
          </div>
          <div className="design-294" data-node-id="179:6929" data-name="code/2">
            <p className="design-295" data-node-id="179:6930">
              8
            </p>
          </div>
          <div className="design-294" data-node-id="179:6931" data-name="code/3">
            <p className="design-295" data-node-id="179:6932">
              2
            </p>
          </div>
          <div className="design-296" data-node-id="179:6933" data-name="code/4">
            <div className="design-297" data-node-id="179:6934" data-name="cursor" />
          </div>
        </div>
        <div className="design-298" data-node-id="179:6935" data-name="재전송">
          <p className="design-299" data-node-id="179:6936">
            코드를 받지 못하셨나요?
          </p>
          <p className="design-300" data-node-id="179:6937">
            00:59 후 재전송
          </p>
        </div>
        <div className="design-45" data-node-id="179:6938" data-name="spacer" />
        <a className="design-124" data-node-id="179:6939" data-name="Button (앱 화면)">
          <p className="design-125" data-node-id="I179:6939;24:968">
            인증하기
          </p>
        </a>
      </div>
    </div>;
}
