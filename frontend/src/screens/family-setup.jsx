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
const imgGroup = `/assets/figma-v2/d29d6.svg`;
const imgGroup1 = `/assets/figma-v2/31c73.svg`;
const imgGroup2 = `/assets/figma-v2/8cb8b.svg`;
function Character({ className }) {
  return <div className={className || "design-150"} data-node-id="5:332" data-name="온이 (Character)">
      <img alt="" className="design-5" src={imgCharacter} />
    </div>;
}
export default function Component06() {
  return <div className="design-1" data-node-id="179:6861" data-name="06 가족 코드">
      <div className="design-2" data-node-id="179:6862" data-name="Status Bar">
        <div className="design-3" data-node-id="I179:6862;486:2224" data-name="Status">
          <div className="design-3" data-node-id="I179:6862;486:2225" data-name="status/dark">
            <div className="design-4" data-node-id="I179:6862;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-5" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-6" data-node-id="I179:6862;486:2227" data-name="status/dark">
              <div className="design-7" data-node-id="I179:6862;486:2228" data-name="Status Icons">
                <div className="design-8" data-node-id="I179:6862;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-5" src={imgNetworkSignalDark} />
                </div>
                <div className="design-9" data-node-id="I179:6862;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-5" src={imgWiFiSignalDark} />
                </div>
                <div className="design-10" data-node-id="I179:6862;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-5" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-11" data-node-id="I179:6862;486:2249" data-name="Time / Dark">
                <div className="design-12" data-node-id="I179:6862;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-5" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-13" data-node-id="I179:6862;486:2251" data-name="Time / Dark">
                  <div className="design-14" data-node-id="I179:6862;486:2252" data-name="9:41">
                    <img alt="" className="design-5" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-15" data-node-id="179:6863" data-name="Content">
        <div className="design-16" data-node-id="179:6864" data-name="Header">
          <a className="design-17" data-node-id="179:6865" data-name="뒤로 버튼">
            <div className="design-18" data-node-id="179:6866" data-name="icon/chevL">
              <img alt="" className="design-5" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-19" data-node-id="179:6868">
            가족 코드
          </p>
          <p className="design-21" data-node-id="179:6869">
            2/2
          </p>
        </div>
        <div className="design-274" data-node-id="179:6870" data-name="온이 안내">
          <Character className="design-266" />
          <div className="design-extra-4" data-node-id="179:6872">
            <p className="design-268">{`가족을 연결해 볼까요? `}</p>
            <p className="design-269">함께 돌봄 정보를 공유해요.</p>
          </div>
        </div>
        <div className="design-20" data-node-id="195:5934" data-name="내 가족 코드">
          <p className="design-21" data-node-id="195:5935">
            내 가족 코드
          </p>
          <div className="design-22" data-node-id="195:5936" data-name="code-card">
            <p className="design-23" data-node-id="195:5937">
              DA-4821
            </p>
            <div className="design-24" data-node-id="195:5938" data-name="복사 공유">
              <div className="design-extra-1" data-node-id="195:5939" data-name="btn 복사">
                <div className="design-25" data-node-id="195:5940" data-name="icon/복사">
                  <div className="design-26" data-node-id="195:5941" data-name="Group">
                    <div className="design-27">
                      <img alt="" className="design-28" src={imgGroup} />
                    </div>
                  </div>
                </div>
                <p className="design-29" data-node-id="195:5944">
                  복사
                </p>
              </div>
              <div className="design-extra-1" data-node-id="195:5945" data-name="btn 공유">
                <div className="design-25" data-node-id="195:5946" data-name="icon/공유">
                  <div className="design-30" data-node-id="195:5947" data-name="Group">
                    <div className="design-31">
                      <img alt="" className="design-28" src={imgGroup1} />
                    </div>
                  </div>
                </div>
                <p className="design-29" data-node-id="195:5950">
                  공유
                </p>
              </div>
            </div>
            <div className="design-16" data-node-id="195:5951" data-name="안내">
              <div className="design-275" data-node-id="195:5952" data-name="icon/lock">
                <div className="design-68" data-node-id="195:5953" data-name="Group">
                  <div className="design-276">
                    <img alt="" className="design-28" src={imgGroup2} />
                  </div>
                </div>
              </div>
              <div className="design-277" data-node-id="195:5956">
                <p className="design-278">코드를 입력한 가족은 일정만 볼 수 있어요.</p>
                <p className="design-248">대화 내용은 보이지 않아요.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="design-20" data-node-id="195:5957" data-name="받은 코드 입력">
          <p className="design-21" data-node-id="195:5958">
            가족에게 받은 코드가 있나요?
          </p>
          <div className="design-24" data-node-id="195:5959" data-name="row">
            <div className="design-279" data-node-id="195:5960" data-name="input">
              <p className="design-91" data-node-id="195:5961">
                코드 입력
              </p>
            </div>
            <div className="design-280" data-node-id="195:5962" data-name="Button (앱 화면)">
              <p className="design-281" data-node-id="I195:5962;24:970">
                연결하기
              </p>
            </div>
          </div>
        </div>
        <div className="design-45" data-node-id="179:6897" data-name="spacer" />
        <div className="design-282" data-node-id="195:5964" data-name="버튼">
          <a className="design-283" data-node-id="195:5930" data-name="Button (앱 화면)">
            <p className="design-125" data-node-id="I195:5930;24:968">
              시작하기
            </p>
          </a>
          <a className="design-284" data-node-id="195:5932" data-name="Button (앱 화면)">
            <p className="design-47" data-node-id="I195:5932;24:970">
              나중에 할게요
            </p>
          </a>
        </div>
      </div>
    </div>;
}
