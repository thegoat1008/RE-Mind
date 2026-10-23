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
export default function Component021() {
  return <div className="design-1" data-node-id="179:6974" data-name="02-1 비밀번호 찾기">
      <div className="design-2" data-node-id="179:6975" data-name="Status Bar">
        <div className="design-3" data-node-id="I179:6975;486:2224" data-name="Status">
          <div className="design-3" data-node-id="I179:6975;486:2225" data-name="status/dark">
            <div className="design-4" data-node-id="I179:6975;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-5" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-6" data-node-id="I179:6975;486:2227" data-name="status/dark">
              <div className="design-7" data-node-id="I179:6975;486:2228" data-name="Status Icons">
                <div className="design-8" data-node-id="I179:6975;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-5" src={imgNetworkSignalDark} />
                </div>
                <div className="design-9" data-node-id="I179:6975;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-5" src={imgWiFiSignalDark} />
                </div>
                <div className="design-10" data-node-id="I179:6975;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-5" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-11" data-node-id="I179:6975;486:2249" data-name="Time / Dark">
                <div className="design-12" data-node-id="I179:6975;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-5" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-13" data-node-id="I179:6975;486:2251" data-name="Time / Dark">
                  <div className="design-14" data-node-id="I179:6975;486:2252" data-name="9:41">
                    <img alt="" className="design-5" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-111" data-node-id="179:6976" data-name="Content">
        <div className="design-16" data-node-id="179:6977" data-name="Header">
          <a className="design-17" data-node-id="179:6978" data-name="뒤로 버튼">
            <div className="design-18" data-node-id="179:6979" data-name="icon/chevL">
              <img alt="" className="design-5" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-19" data-node-id="179:6981">
            비밀번호 찾기
          </p>
        </div>
        <div className="design-274" data-node-id="179:6982" data-name="온이 안내">
          <Character className="design-266" />
          <div className="design-290" data-node-id="179:6984">
            <p className="design-115">가입한 이메일을 알려주세요.</p>
            <p className="design-115">비밀번호를 바꿀 수 있는</p>
            <p className="design-116">링크를 보내드려요.</p>
          </div>
        </div>
        <div className="design-20" data-node-id="179:6985" data-name="field/이메일">
          <p className="design-21" data-node-id="179:6986">
            이메일
          </p>
          <div className="design-112" data-node-id="179:6987" data-name="input">
            <p className="design-91" data-node-id="179:6988">
              이메일을 입력하세요
            </p>
          </div>
        </div>
        <div className="design-45" data-node-id="179:6989" data-name="spacer" />
        <p className="design-315" data-node-id="179:6990">
          메일이 오지 않으면 스팸함도 확인해 주세요.
        </p>
        <a className="design-124" data-node-id="179:6991" data-name="Button (앱 화면)">
          <p className="design-125" data-node-id="I179:6991;24:968">
            링크 보내기
          </p>
        </a>
      </div>
    </div>;
}
