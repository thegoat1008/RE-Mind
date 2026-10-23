/** @jsxRuntime classic */
/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from '../designRuntime.jsx'

const imgStatusDarkBackgroundMask = `/assets/figma-v2/c9227.svg`;
const imgNetworkSignalDark = `/assets/figma-v2/4c652.svg`;
const imgWiFiSignalDark = `/assets/figma-v2/f883c.svg`;
const imgBatteryDark = `/assets/figma-v2/9efe4.svg`;
const imgTimeDarkBackgroundMask = `/assets/figma-v2/f965f.svg`;
const img941 = `/assets/figma-v2/a1382.svg`;
const imgIconChevL = `/assets/figma-v2/905bb.svg`;
const imgGroup = `/assets/figma-v2/5e22c.svg`;
const img = `/assets/figma-v2/bc033.svg`;
const imgGroup1 = `/assets/figma-v2/367f7.svg`;
function Chip({ className, nodeId, label = "칩", state = "default" }) {
  return <div className={className || "design-48"} data-node-id={nodeId} data-name="Chip (앱 화면)">
      <p className="design-49" data-node-id="24:975">
        {label}
      </p>
    </div>;
}
export default function Component112() {
  return <div className="design-1" data-node-id="179:7041" data-name="11-2 병원 찾기">
      <div className="design-2" data-node-id="179:7042" data-name="Status Bar">
        <div className="design-3" data-node-id="I179:7042;486:2224" data-name="Status">
          <div className="design-3" data-node-id="I179:7042;486:2225" data-name="status/dark">
            <div className="design-4" data-node-id="I179:7042;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-5" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-6" data-node-id="I179:7042;486:2227" data-name="status/dark">
              <div className="design-7" data-node-id="I179:7042;486:2228" data-name="Status Icons">
                <div className="design-8" data-node-id="I179:7042;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-5" src={imgNetworkSignalDark} />
                </div>
                <div className="design-9" data-node-id="I179:7042;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-5" src={imgWiFiSignalDark} />
                </div>
                <div className="design-10" data-node-id="I179:7042;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-5" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-11" data-node-id="I179:7042;486:2249" data-name="Time / Dark">
                <div className="design-12" data-node-id="I179:7042;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-5" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-13" data-node-id="I179:7042;486:2251" data-name="Time / Dark">
                  <div className="design-14" data-node-id="I179:7042;486:2252" data-name="9:41">
                    <img alt="" className="design-5" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-15" data-node-id="179:7043" data-name="Content">
        <div className="design-16" data-node-id="179:7044" data-name="Header">
          <a className="design-17" data-node-id="179:7045" data-name="뒤로 버튼">
            <div className="design-18" data-node-id="179:7046" data-name="icon/chevL">
              <img alt="" className="design-5" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-19" data-node-id="179:7048">
            병원 찾기
          </p>
        </div>
        <div className="design-303" data-node-id="179:7049" data-name="검색">
          <div className="design-67" data-node-id="179:7050" data-name="icon/search">
            <div className="design-332" data-node-id="179:7051" data-name="Group">
              <div className="design-333">
                <img alt="" className="design-28" src={imgGroup} />
              </div>
            </div>
          </div>
          <p className="design-91" data-node-id="179:7054">
            치매안심센터 · 병원 검색
          </p>
        </div>
        <div className="design-24" data-node-id="179:7055" data-name="필터">
          <div className="design-72" data-node-id="179:7056" data-name="Chip (앱 화면)">
            <p className="design-73" data-node-id="I179:7056;24:977">
              전체
            </p>
          </div>
          <Chip nodeId="179:7057" className="design-71" label="치매안심센터" />
          <Chip nodeId="179:7058" className="design-71" label="병원" />
        </div>
        <div className="design-334" data-node-id="179:7059" data-name="지도">
          <div className="design-335" data-node-id="179:7060" data-name="지도 그림">
            <img alt="" className="design-5" src={img} />
          </div>
        </div>
        <div className="design-36" data-node-id="179:7073" data-name="목록">
          <div className="design-43" data-node-id="179:7074" data-name="병원 카드">
            <div className="design-39" data-node-id="179:7075" data-name="text">
              <p className="design-40" data-node-id="179:7076">
                행복동 치매안심센터
              </p>
              <p className="design-41" data-node-id="179:7077">
                치매안심센터 · 350m
              </p>
            </div>
            <div className="design-336" data-node-id="179:7078" data-name="전화 버튼">
              <div className="design-25" data-node-id="179:7079" data-name="icon/phone">
                <div className="design-337" data-node-id="179:7080" data-name="Group">
                  <div className="design-338">
                    <img alt="" className="design-28" src={imgGroup1} />
                  </div>
                </div>
              </div>
              <p className="design-339" data-node-id="179:7082">
                전화
              </p>
            </div>
          </div>
          <div className="design-43" data-node-id="179:7083" data-name="병원 카드">
            <div className="design-39" data-node-id="179:7084" data-name="text">
              <p className="design-40" data-node-id="179:7085">
                서울행복병원
              </p>
              <p className="design-41" data-node-id="179:7086">
                신경과 · 1.2km
              </p>
            </div>
            <div className="design-336" data-node-id="179:7087" data-name="전화 버튼">
              <div className="design-25" data-node-id="179:7088" data-name="icon/phone">
                <div className="design-337" data-node-id="179:7089" data-name="Group">
                  <div className="design-338">
                    <img alt="" className="design-28" src={imgGroup1} />
                  </div>
                </div>
              </div>
              <p className="design-339" data-node-id="179:7091">
                전화
              </p>
            </div>
          </div>
          <div className="design-43" data-node-id="179:7092" data-name="병원 카드">
            <div className="design-39" data-node-id="179:7093" data-name="text">
              <p className="design-40" data-node-id="179:7094">
                푸른 신경과의원
              </p>
              <p className="design-41" data-node-id="179:7095">
                신경과 · 1.8km
              </p>
            </div>
            <div className="design-336" data-node-id="179:7096" data-name="전화 버튼">
              <div className="design-25" data-node-id="179:7097" data-name="icon/phone">
                <div className="design-337" data-node-id="179:7098" data-name="Group">
                  <div className="design-338">
                    <img alt="" className="design-28" src={imgGroup1} />
                  </div>
                </div>
              </div>
              <p className="design-339" data-node-id="179:7100">
                전화
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
}
