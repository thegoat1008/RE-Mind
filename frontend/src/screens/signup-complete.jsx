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
function Character({ className }) {
  return <div className={className || "design-150"} data-node-id="5:332" data-name="온이 (Character)">
      <img alt="" className="design-5" src={imgCharacter} />
    </div>;
}
export default function Component041() {
  return <div className="design-1" data-node-id="179:6901" data-name="04-1 가입 완료">
      <div className="design-2" data-node-id="179:6902" data-name="Status Bar">
        <div className="design-3" data-node-id="I179:6902;486:2224" data-name="Status">
          <div className="design-3" data-node-id="I179:6902;486:2225" data-name="status/dark">
            <div className="design-4" data-node-id="I179:6902;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-5" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-6" data-node-id="I179:6902;486:2227" data-name="status/dark">
              <div className="design-7" data-node-id="I179:6902;486:2228" data-name="Status Icons">
                <div className="design-8" data-node-id="I179:6902;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-5" src={imgNetworkSignalDark} />
                </div>
                <div className="design-9" data-node-id="I179:6902;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-5" src={imgWiFiSignalDark} />
                </div>
                <div className="design-10" data-node-id="I179:6902;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-5" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-11" data-node-id="I179:6902;486:2249" data-name="Time / Dark">
                <div className="design-12" data-node-id="I179:6902;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-5" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-13" data-node-id="I179:6902;486:2251" data-name="Time / Dark">
                  <div className="design-14" data-node-id="I179:6902;486:2252" data-name="9:41">
                    <img alt="" className="design-5" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-285" data-node-id="179:6903" data-name="Content">
        <div className="design-286" data-node-id="179:6904" data-name="center">
          <Character className="design-287" />
        </div>
        <p className="design-288" data-node-id="179:6906">
          가입을 환영해요, 지은님!
        </p>
        <div className="design-289" data-node-id="179:6907">
          <p className="design-115">온이가 곁에서 함께할게요.</p>
          <p className="design-116">먼저 돌보시는 분을 알려 주세요.</p>
        </div>
        <div className="design-45" data-node-id="179:6908" data-name="spacer" />
        <div className="design-282" data-node-id="179:6909" data-name="버튼">
          <a className="design-283" data-node-id="179:6910" data-name="Button (앱 화면)">
            <p className="design-125" data-node-id="I179:6910;24:968">
              돌봄 대상 등록하기
            </p>
          </a>
          <a className="design-284" data-node-id="179:6911" data-name="Button (앱 화면)">
            <p className="design-47" data-node-id="I179:6911;24:970">
              나중에 할게요
            </p>
          </a>
        </div>
      </div>
    </div>;
}
