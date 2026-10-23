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
export default function Component01ReMind() {
  return <div className="design-1" data-node-id="179:7029" data-name="01 RE:MIND">
      <div className="design-2" data-node-id="179:7030" data-name="Status Bar">
        <div className="design-3" data-node-id="I179:7030;486:2224" data-name="Status">
          <div className="design-3" data-node-id="I179:7030;486:2225" data-name="status/dark">
            <div className="design-4" data-node-id="I179:7030;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-5" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-6" data-node-id="I179:7030;486:2227" data-name="status/dark">
              <div className="design-7" data-node-id="I179:7030;486:2228" data-name="Status Icons">
                <div className="design-8" data-node-id="I179:7030;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-5" src={imgNetworkSignalDark} />
                </div>
                <div className="design-9" data-node-id="I179:7030;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-5" src={imgWiFiSignalDark} />
                </div>
                <div className="design-10" data-node-id="I179:7030;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-5" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-11" data-node-id="I179:7030;486:2249" data-name="Time / Dark">
                <div className="design-12" data-node-id="I179:7030;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-5" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-13" data-node-id="I179:7030;486:2251" data-name="Time / Dark">
                  <div className="design-14" data-node-id="I179:7030;486:2252" data-name="9:41">
                    <img alt="" className="design-5" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-extra-5" data-node-id="179:7031" data-name="Content">
        <div className="design-286" data-node-id="179:7032" data-name="center">
          <Character className="design-328" />
        </div>
        <div className="design-329" data-node-id="179:7034">
          <p className="design-330" data-node-id="179:7035">
            RE:MIND
          </p>
        </div>
        <div className="design-331" data-node-id="179:7036">
          <div className="design-289" data-node-id="179:7037">
            <p className="design-115">치매 가족을 돌보는 보호자를</p>
            <p className="design-116">혼자 두지 않을게요</p>
          </div>
          <div className="design-282" data-node-id="179:7038" data-name="버튼">
            <a className="design-283" data-node-id="179:7039" data-name="Button (앱 화면)">
              <p className="design-125" data-node-id="I179:7039;24:968">
                시작하기
              </p>
            </a>
            <a className="design-284" data-node-id="179:7040" data-name="Button (앱 화면)">
              <p className="design-47" data-node-id="I179:7040;24:970">
                이미 계정이 있어요
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>;
}
