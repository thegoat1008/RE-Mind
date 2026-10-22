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
const imgGroup = `/assets/figma/5218d.svg`;
const imgGroup1 = `/assets/figma/367f7.svg`;
function Character({ className }) {
  return <div className={className || "design-153"} data-node-id="5:332" data-name="온이 (Character)">
      <img alt="" className="design-9" src={imgCharacter} />
    </div>;
}
export default function Component114() {
  return <div className="design-5" data-node-id="47:1283" data-name="11-4 긴급 안내">
      <div className="design-6" data-node-id="47:1284" data-name="Status Bar">
        <div className="design-7" data-node-id="I47:1284;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I47:1284;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I47:1284;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I47:1284;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I47:1284;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I47:1284;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I47:1284;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I47:1284;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I47:1284;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I47:1284;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I47:1284;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I47:1284;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-19" data-node-id="47:1316" data-name="Content">
        <div className="design-20" data-node-id="47:1317" data-name="Header">
          <a className="design-21" data-node-id="47:1318" data-name="뒤로 버튼">
            <div className="design-22" data-node-id="47:1319" data-name="icon/chevL">
              <img alt="" className="design-9" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-23" data-node-id="47:1322">
            긴급 안내
          </p>
        </div>
        <div className="design-283" data-node-id="47:1323" data-name="온이 안내">
          <Character className="design-276" />
          <div className="design-284" data-node-id="47:1335">
            <p className="design-122">침착하게, 하나씩 해요.</p>
            <p className="design-123">필요한 곳에 바로 걸 수 있어요.</p>
          </div>
        </div>
        <div className="design-357" data-node-id="47:1336" data-name="119">
          <div className="design-358" data-node-id="47:1337" data-name="text">
            <p className="design-359" data-node-id="47:1338">
              119
            </p>
            <p className="design-360" data-node-id="47:1339">
              쓰러지거나 크게 다쳤을 때
            </p>
          </div>
          <div className="design-361" data-node-id="47:1340" data-name="call">
            <div className="design-223" data-node-id="47:1341" data-name="icon/phone">
              <div className="design-347" data-node-id="47:1342" data-name="Group">
                <div className="design-362">
                  <img alt="" className="design-28" src={imgGroup} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="design-35" data-node-id="47:1344" data-name="목록">
          <div className="design-363" data-node-id="47:1345" data-name="row">
            <div className="design-39" data-node-id="47:1346" data-name="text">
              <p className="design-40" data-node-id="47:1347">
                환자가 길을 잃었어요
              </p>
              <p className="design-41" data-node-id="47:1348">
                경찰 112 · 실종 신고 182
              </p>
            </div>
            <div className="design-345" data-node-id="47:1349" data-name="전화 버튼">
              <div className="design-346" data-node-id="47:1350" data-name="icon/phone">
                <div className="design-347" data-node-id="47:1351" data-name="Group">
                  <div className="design-348">
                    <img alt="" className="design-28" src={imgGroup1} />
                  </div>
                </div>
              </div>
              <p className="design-349" data-node-id="47:1353">
                전화
              </p>
            </div>
          </div>
          <div className="design-363" data-node-id="47:1354" data-name="row">
            <div className="design-39" data-node-id="47:1355" data-name="text">
              <p className="design-40" data-node-id="47:1356">
                돌봄이 막막해요
              </p>
              <div className="design-364" data-node-id="47:1357">
                <p className="design-365">치매상담콜센터 1899-9988</p>
                <p className="design-262">매일 오전 7시~오후 10시</p>
              </div>
            </div>
            <div className="design-345" data-node-id="47:1358" data-name="전화 버튼">
              <div className="design-346" data-node-id="47:1359" data-name="icon/phone">
                <div className="design-347" data-node-id="47:1360" data-name="Group">
                  <div className="design-348">
                    <img alt="" className="design-28" src={imgGroup1} />
                  </div>
                </div>
              </div>
              <p className="design-349" data-node-id="47:1362">
                전화
              </p>
            </div>
          </div>
          <div className="design-363" data-node-id="47:1363" data-name="row">
            <div className="design-39" data-node-id="47:1364" data-name="text">
              <p className="design-40" data-node-id="47:1365">
                약을 잘못 드셨어요
              </p>
              <div className="design-364" data-node-id="47:1366">
                <p className="design-365">119 또는 가까운 약국·병원에</p>
                <p className="design-262">먼저 문의하세요</p>
              </div>
            </div>
            <div className="design-345" data-node-id="47:1367" data-name="전화 버튼">
              <div className="design-346" data-node-id="47:1368" data-name="icon/phone">
                <div className="design-347" data-node-id="47:1369" data-name="Group">
                  <div className="design-348">
                    <img alt="" className="design-28" src={imgGroup1} />
                  </div>
                </div>
              </div>
              <p className="design-349" data-node-id="47:1371">
                전화
              </p>
            </div>
          </div>
          <div className="design-363" data-node-id="47:1372" data-name="row">
            <div className="design-39" data-node-id="47:1373" data-name="text">
              <p className="design-40" data-node-id="47:1374">
                제 마음이 너무 힘들어요
              </p>
              <div className="design-364" data-node-id="47:1375">
                <p className="design-365">마음 상담 109 · 1577-0199</p>
                <p className="design-262">24시간</p>
              </div>
            </div>
            <div className="design-345" data-node-id="47:1376" data-name="전화 버튼">
              <div className="design-346" data-node-id="47:1377" data-name="icon/phone">
                <div className="design-347" data-node-id="47:1378" data-name="Group">
                  <div className="design-348">
                    <img alt="" className="design-28" src={imgGroup1} />
                  </div>
                </div>
              </div>
              <p className="design-349" data-node-id="47:1380">
                전화
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
}
