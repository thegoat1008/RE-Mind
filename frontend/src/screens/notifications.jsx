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
const imgPill = `/assets/figma/b27e0.svg`;
const imgPlus = `/assets/figma/9a463.svg`;
const imgSun = `/assets/figma/be1bd.svg`;
export default function Component072() {
  return <div className="design-5" data-node-id="16:1277" data-name="07-2 알림">
      <div className="design-6" data-node-id="16:1278" data-name="Status Bar">
        <div className="design-7" data-node-id="I16:1278;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I16:1278;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I16:1278;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I16:1278;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I16:1278;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I16:1278;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I16:1278;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I16:1278;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I16:1278;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I16:1278;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I16:1278;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I16:1278;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-225" data-node-id="16:1310" data-name="Content">
        <a className="design-226" data-node-id="16:1311" data-name="Header">
          <div className="design-227" data-node-id="31:984" data-name="뒤로 버튼">
            <div className="design-22" data-node-id="16:1312" data-name="icon/chevL">
              <img alt="" className="design-9" src={imgIconChevL} />
            </div>
          </div>
          <p className="design-228" data-node-id="16:1314">
            알림
          </p>
          <p className="design-31" data-node-id="16:1315">
            모두 읽음
          </p>
        </a>
        <p className="design-34" data-node-id="16:1316">
          오늘
        </p>
        <div className="design-35" data-node-id="16:1317" data-name="list">
          <div className="design-229" data-node-id="16:1318" data-name="알림">
            <div className="design-230" data-node-id="16:1319" data-name="Frame">
              <div className="design-60" data-node-id="16:1320" data-name="pill">
                <img alt="" className="design-9" src={imgPill} />
              </div>
            </div>
            <div className="design-231" data-node-id="16:1322" data-name="text">
              <p className="design-40" data-node-id="16:1323">
                저녁 약 복용 30분 전이에요
              </p>
              <p className="design-41" data-node-id="16:1324">
                오후 6:30
              </p>
            </div>
            <div className="design-232" data-node-id="16:1325" data-name="unread" />
          </div>
          <div className="design-229" data-node-id="16:1326" data-name="알림">
            <div className="design-230" data-node-id="16:1327" data-name="Frame">
              <div className="design-60" data-node-id="16:1328" data-name="plus">
                <img alt="" className="design-9" src={imgPlus} />
              </div>
            </div>
            <div className="design-231" data-node-id="16:1330" data-name="text">
              <p className="design-40" data-node-id="16:1331">
                민수님이 일정을 추가했어요
              </p>
              <p className="design-41" data-node-id="16:1332">
                서울행복병원 진료 · 오전 9:12
              </p>
            </div>
            <div className="design-232" data-node-id="16:1333" data-name="unread" />
          </div>
        </div>
        <p className="design-34" data-node-id="16:1334">
          어제
        </p>
        <div className="design-35" data-node-id="16:1335" data-name="list">
          <div className="design-229" data-node-id="16:1336" data-name="알림">
            <div className="design-230" data-node-id="16:1337" data-name="Frame">
              <div className="design-60" data-node-id="16:1338" data-name="sun">
                <img alt="" className="design-9" src={imgSun} />
              </div>
            </div>
            <div className="design-231" data-node-id="16:1340" data-name="text">
              <p className="design-40" data-node-id="16:1341">
                이영희님이 가족이 되었어요
              </p>
              <p className="design-41" data-node-id="16:1342">
                어제 오후 3:40
              </p>
            </div>
          </div>
          <div className="design-229" data-node-id="16:1343" data-name="알림">
            <div className="design-230" data-node-id="16:1344" data-name="Frame">
              <div className="design-60" data-node-id="16:1345" data-name="pill">
                <img alt="" className="design-9" src={imgPill} />
              </div>
            </div>
            <div className="design-231" data-node-id="16:1347" data-name="text">
              <p className="design-40" data-node-id="16:1348">
                아침 약 복용을 완료했어요
              </p>
              <p className="design-41" data-node-id="16:1349">
                어제 오전 8:05
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
}
