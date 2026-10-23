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
const imgGroup = `/assets/figma-v2/1b4f7.svg`;
const imgGroup1 = `/assets/figma-v2/367f7.svg`;
function Character({ className }) {
  return <div className={className || "design-150"} data-node-id="5:332" data-name="온이 (Character)">
      <img alt="" className="design-5" src={imgCharacter} />
    </div>;
}
export default function Component114() {
  return <div className="design-1" data-node-id="179:7145" data-name="11-4 긴급 안내">
      <div className="design-2" data-node-id="179:7146" data-name="Status Bar">
        <div className="design-3" data-node-id="I179:7146;486:2224" data-name="Status">
          <div className="design-3" data-node-id="I179:7146;486:2225" data-name="status/dark">
            <div className="design-4" data-node-id="I179:7146;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-5" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-6" data-node-id="I179:7146;486:2227" data-name="status/dark">
              <div className="design-7" data-node-id="I179:7146;486:2228" data-name="Status Icons">
                <div className="design-8" data-node-id="I179:7146;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-5" src={imgNetworkSignalDark} />
                </div>
                <div className="design-9" data-node-id="I179:7146;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-5" src={imgWiFiSignalDark} />
                </div>
                <div className="design-10" data-node-id="I179:7146;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-5" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-11" data-node-id="I179:7146;486:2249" data-name="Time / Dark">
                <div className="design-12" data-node-id="I179:7146;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-5" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-13" data-node-id="I179:7146;486:2251" data-name="Time / Dark">
                  <div className="design-14" data-node-id="I179:7146;486:2252" data-name="9:41">
                    <img alt="" className="design-5" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-15" data-node-id="179:7147" data-name="Content">
        <div className="design-16" data-node-id="179:7148" data-name="Header">
          <a className="design-17" data-node-id="179:7149" data-name="뒤로 버튼">
            <div className="design-18" data-node-id="179:7150" data-name="icon/chevL">
              <img alt="" className="design-5" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-19" data-node-id="179:7152">
            긴급 안내
          </p>
        </div>
        <div className="design-274" data-node-id="179:7153" data-name="온이 안내">
          <Character className="design-266" />
          <div className="design-290" data-node-id="179:7155">
            <p className="design-115">침착하게, 하나씩 해요.</p>
            <p className="design-116">필요한 곳에 바로 걸 수 있어요.</p>
          </div>
        </div>
        <div className="design-349" data-node-id="179:7156" data-name="119">
          <div className="design-350" data-node-id="179:7157" data-name="text">
            <p className="design-351" data-node-id="179:7158">
              119
            </p>
            <p className="design-352" data-node-id="179:7159">
              쓰러지거나 크게 다쳤을 때
            </p>
          </div>
          <div className="design-353" data-node-id="179:7160" data-name="call">
            <div className="design-220" data-node-id="179:7161" data-name="icon/phone">
              <div className="design-337" data-node-id="179:7162" data-name="Group">
                <div className="design-354">
                  <img alt="" className="design-28" src={imgGroup} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="design-36" data-node-id="179:7164" data-name="목록">
          <div className="design-355" data-node-id="179:7165" data-name="row">
            <div className="design-39" data-node-id="179:7166" data-name="text">
              <p className="design-40" data-node-id="179:7167">
                환자가 길을 잃었어요
              </p>
              <p className="design-41" data-node-id="179:7168">
                경찰 112 · 실종 신고 182
              </p>
            </div>
            <div className="design-336" data-node-id="179:7169" data-name="전화 버튼">
              <div className="design-25" data-node-id="179:7170" data-name="icon/phone">
                <div className="design-337" data-node-id="179:7171" data-name="Group">
                  <div className="design-338">
                    <img alt="" className="design-28" src={imgGroup1} />
                  </div>
                </div>
              </div>
              <p className="design-339" data-node-id="179:7173">
                전화
              </p>
            </div>
          </div>
          <div className="design-355" data-node-id="179:7174" data-name="row">
            <div className="design-39" data-node-id="179:7175" data-name="text">
              <p className="design-40" data-node-id="179:7176">
                돌봄이 막막해요
              </p>
              <div className="design-356" data-node-id="179:7177">
                <p className="design-278">치매상담콜센터 1899-9988</p>
                <p className="design-248">매일 오전 7시~오후 10시</p>
              </div>
            </div>
            <div className="design-336" data-node-id="179:7178" data-name="전화 버튼">
              <div className="design-25" data-node-id="179:7179" data-name="icon/phone">
                <div className="design-337" data-node-id="179:7180" data-name="Group">
                  <div className="design-338">
                    <img alt="" className="design-28" src={imgGroup1} />
                  </div>
                </div>
              </div>
              <p className="design-339" data-node-id="179:7182">
                전화
              </p>
            </div>
          </div>
          <div className="design-355" data-node-id="179:7183" data-name="row">
            <div className="design-39" data-node-id="179:7184" data-name="text">
              <p className="design-40" data-node-id="179:7185">
                약을 잘못 드셨어요
              </p>
              <div className="design-356" data-node-id="179:7186">
                <p className="design-278">119 또는 가까운 약국·병원에</p>
                <p className="design-248">먼저 문의하세요</p>
              </div>
            </div>
            <div className="design-336" data-node-id="179:7187" data-name="전화 버튼">
              <div className="design-25" data-node-id="179:7188" data-name="icon/phone">
                <div className="design-337" data-node-id="179:7189" data-name="Group">
                  <div className="design-338">
                    <img alt="" className="design-28" src={imgGroup1} />
                  </div>
                </div>
              </div>
              <p className="design-339" data-node-id="179:7191">
                전화
              </p>
            </div>
          </div>
          <div className="design-355" data-node-id="179:7192" data-name="row">
            <div className="design-39" data-node-id="179:7193" data-name="text">
              <p className="design-40" data-node-id="179:7194">
                제 마음이 너무 힘들어요
              </p>
              <div className="design-356" data-node-id="179:7195">
                <p className="design-278">마음 상담 109 · 1577-0199</p>
                <p className="design-248">24시간</p>
              </div>
            </div>
            <div className="design-336" data-node-id="179:7196" data-name="전화 버튼">
              <div className="design-25" data-node-id="179:7197" data-name="icon/phone">
                <div className="design-337" data-node-id="179:7198" data-name="Group">
                  <div className="design-338">
                    <img alt="" className="design-28" src={imgGroup1} />
                  </div>
                </div>
              </div>
              <p className="design-339" data-node-id="179:7200">
                전화
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
}
