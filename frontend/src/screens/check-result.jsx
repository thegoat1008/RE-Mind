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
const imgToggle = `/assets/figma/272c2.svg`;
function Button({ className, label = "버튼", type = "primary" }) {
  const isOutline = type === "outline";
  return <div className={className || ` design-46 ${isOutline ? "design-1" : "design-2"}`} id={isOutline ? "node-24_969" : "node-24_967"}>
      {type === "primary" && <p className="design-3" data-node-id="24:968">
          {label}
        </p>}
      {isOutline && <p className="design-4" data-node-id="24:970">
          {label}
        </p>}
    </div>;
}
function Character({ className }) {
  return <div className={className || "design-153"} data-node-id="5:332" data-name="온이 (Character)">
      <img alt="" className="design-9" src={imgCharacter} />
    </div>;
}
export default function Component053() {
  return <div className="design-5" data-node-id="68:1284" data-name="05-3 치매 체크 · 결과 (상담 권장)">
      <div className="design-6" data-node-id="68:1285" data-name="Status Bar">
        <div className="design-7" data-node-id="I68:1285;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I68:1285;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I68:1285;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I68:1285;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I68:1285;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I68:1285;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I68:1285;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I68:1285;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I68:1285;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I68:1285;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I68:1285;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I68:1285;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-19" data-node-id="68:1317" data-name="Content">
        <div className="design-20" data-node-id="68:1318" data-name="Header">
          <a className="design-21" data-node-id="68:1319" data-name="뒤로 버튼">
            <div className="design-22" data-node-id="68:1320" data-name="icon/chevL">
              <img alt="" className="design-9" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-23" data-node-id="68:1322">
            체크 결과
          </p>
        </div>
        <div className="design-402" data-node-id="68:1323" data-name="결과 카드">
          <Character className="design-403" />
          <div className="design-231" data-node-id="68:1335" data-name="text">
            <p className="design-391" data-node-id="68:1336">
              9점 / 30점
            </p>
            <div className="design-392" data-node-id="68:1337">
              <p className="design-384">전문의 상담을</p>
              <p className="design-385">권해요</p>
            </div>
          </div>
        </div>
        <div className="design-61" data-node-id="68:1338" data-name="점수">
          <div className="design-388" data-node-id="68:1339" data-name="meter">
            <div className="design-404" data-node-id="68:1340" data-name="fill" />
          </div>
          <div className="design-405" data-node-id="68:1341" data-name="구간">
            <p className="design-406" data-node-id="68:1342">
              0~5점 · 특이 소견 없음
            </p>
            <p className="design-407" data-node-id="68:1343">
              6~30점 · 전문의 상담
            </p>
          </div>
        </div>
        <p className="design-105" data-node-id="68:1344">
          진단은 아니에요. 걱정되는 모습이 있다면 가까운 치매안심센터에서 상담과 검진을 받아 보세요.
        </p>
        <div className="design-363" data-node-id="68:1345" data-name="참고 설정">
          <div className="design-39" data-node-id="68:1346" data-name="text">
            <p className="design-40" data-node-id="68:1347">
              AI 대화에서 참고하기
            </p>
            <p className="design-41" data-node-id="68:1348">
              언제든 설정에서 끌 수 있어요
            </p>
          </div>
          <div className="design-65" data-node-id="68:1349" data-name="toggle">
            <img alt="" className="design-9" src={imgToggle} />
          </div>
        </div>
        <div className="design-44" data-node-id="68:1351" data-name="spacer" />
        <Button className="design-45" label="가까운 치매안심센터 찾기" />
        <Button className="design-387" label="다음에 할게요" type="outline" />
      </div>
    </div>;
}
