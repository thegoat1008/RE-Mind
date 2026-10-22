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
const imgGroup = `/assets/figma/5e22c.svg`;
const img = `/assets/figma/06064.svg`;
const imgGroup1 = `/assets/figma/367f7.svg`;
function Chip({ className, label = "칩", state = "default" }) {
  const isActive = state === "active";
  return <div className={className || ` design-89 ${isActive ? "design-2" : "design-1"}`} id={isActive ? "node-24_976" : "node-24_974"}>
      {state === "default" && <p className="design-47" data-node-id="24:975">
          {label}
        </p>}
      {isActive && <p className="design-48" data-node-id="24:977">
          {label}
        </p>}
    </div>;
}
export default function Component112() {
  return <div className="design-5" data-node-id="47:1101" data-name="11-2 병원 찾기">
      <div className="design-6" data-node-id="47:1102" data-name="Status Bar">
        <div className="design-7" data-node-id="I47:1102;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I47:1102;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I47:1102;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I47:1102;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I47:1102;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I47:1102;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I47:1102;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I47:1102;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I47:1102;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I47:1102;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I47:1102;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I47:1102;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-19" data-node-id="47:1134" data-name="Content">
        <div className="design-20" data-node-id="47:1135" data-name="Header">
          <a className="design-21" data-node-id="47:1136" data-name="뒤로 버튼">
            <div className="design-22" data-node-id="47:1137" data-name="icon/chevL">
              <img alt="" className="design-9" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-23" data-node-id="47:1140">
            병원 찾기
          </p>
        </div>
        <div className="design-282" data-node-id="47:1141" data-name="검색">
          <div className="design-25" data-node-id="47:1142" data-name="icon/search">
            <div className="design-340" data-node-id="47:1143" data-name="Group">
              <div className="design-341">
                <img alt="" className="design-28" src={imgGroup} />
              </div>
            </div>
          </div>
          <p className="design-119" data-node-id="47:1146">
            치매안심센터 · 병원 검색
          </p>
        </div>
        <div className="design-71" data-node-id="47:1147" data-name="필터">
          <Chip className="design-73 instance-hospitals-0" label="전체" state="active" />
          <Chip className="design-72 instance-hospitals-1" label="치매안심센터" />
          <Chip className="design-72 instance-hospitals-2" label="병원" />
        </div>
        <div className="design-342" data-node-id="47:1154" data-name="지도">
          <div className="design-343" data-node-id="47:1155" data-name="지도 그림">
            <img alt="" className="design-9" src={img} />
          </div>
        </div>
        <div className="design-35" data-node-id="47:1168" data-name="목록">
          <div className="design-344" data-node-id="47:1169" data-name="병원 카드">
            <div className="design-39" data-node-id="47:1170" data-name="text">
              <p className="design-40" data-node-id="47:1171">
                행복동 치매안심센터
              </p>
              <p className="design-41" data-node-id="47:1172">
                치매안심센터 · 350m
              </p>
            </div>
            <div className="design-345" data-node-id="47:1173" data-name="전화 버튼">
              <div className="design-346" data-node-id="47:1174" data-name="icon/phone">
                <div className="design-347" data-node-id="47:1175" data-name="Group">
                  <div className="design-348">
                    <img alt="" className="design-28" src={imgGroup1} />
                  </div>
                </div>
              </div>
              <p className="design-349" data-node-id="47:1177">
                전화
              </p>
            </div>
          </div>
          <div className="design-344" data-node-id="47:1178" data-name="병원 카드">
            <div className="design-39" data-node-id="47:1179" data-name="text">
              <p className="design-40" data-node-id="47:1180">
                서울행복병원
              </p>
              <p className="design-41" data-node-id="47:1181">
                신경과 · 1.2km
              </p>
            </div>
            <div className="design-345" data-node-id="47:1182" data-name="전화 버튼">
              <div className="design-346" data-node-id="47:1183" data-name="icon/phone">
                <div className="design-347" data-node-id="47:1184" data-name="Group">
                  <div className="design-348">
                    <img alt="" className="design-28" src={imgGroup1} />
                  </div>
                </div>
              </div>
              <p className="design-349" data-node-id="47:1186">
                전화
              </p>
            </div>
          </div>
          <div className="design-344" data-node-id="47:1187" data-name="병원 카드">
            <div className="design-39" data-node-id="47:1188" data-name="text">
              <p className="design-40" data-node-id="47:1189">
                푸른 신경과의원
              </p>
              <p className="design-41" data-node-id="47:1190">
                신경과 · 1.8km
              </p>
            </div>
            <div className="design-345" data-node-id="47:1191" data-name="전화 버튼">
              <div className="design-346" data-node-id="47:1192" data-name="icon/phone">
                <div className="design-347" data-node-id="47:1193" data-name="Group">
                  <div className="design-348">
                    <img alt="" className="design-28" src={imgGroup1} />
                  </div>
                </div>
              </div>
              <p className="design-349" data-node-id="47:1195">
                전화
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
}
