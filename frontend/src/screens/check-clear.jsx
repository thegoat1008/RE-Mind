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
  return <div className={className || "design-113"} data-node-id="24:967">
      <p className="design-3" data-node-id="24:968">
        {label}
      </p>
    </div>;
}
function Character({ className }) {
  return <div className={className || "design-153"} data-node-id="5:332" data-name="온이 (Character)">
      <img alt="" className="design-9" src={imgCharacter} />
    </div>;
}
export default function Component054() {
  return <div className="design-5" data-node-id="68:1356" data-name="05-4 치매 체크 · 결과 (이상 없음)">
      <div className="design-6" data-node-id="68:1357" data-name="Status Bar">
        <div className="design-7" data-node-id="I68:1357;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I68:1357;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I68:1357;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I68:1357;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I68:1357;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I68:1357;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I68:1357;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I68:1357;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I68:1357;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I68:1357;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I68:1357;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I68:1357;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-19" data-node-id="68:1389" data-name="Content">
        <div className="design-20" data-node-id="68:1390" data-name="Header">
          <a className="design-21" data-node-id="68:1391" data-name="뒤로 버튼">
            <div className="design-22" data-node-id="68:1392" data-name="icon/chevL">
              <img alt="" className="design-9" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-23" data-node-id="68:1394">
            체크 결과
          </p>
        </div>
        <div className="design-402" data-node-id="68:1395" data-name="결과 카드">
          <Character className="design-403" />
          <div className="design-231" data-node-id="68:1407" data-name="text">
            <p className="design-391" data-node-id="68:1408">
              3점 / 30점
            </p>
            <div className="design-392" data-node-id="68:1409">
              <p className="design-384">지금은 특이 소견이</p>
              <p className="design-385">없어요</p>
            </div>
          </div>
        </div>
        <div className="design-61" data-node-id="68:1410" data-name="점수">
          <div className="design-388" data-node-id="68:1411" data-name="meter">
            <div className="design-408" data-node-id="68:1412" data-name="fill" />
          </div>
          <div className="design-405" data-node-id="68:1413" data-name="구간">
            <p className="design-407" data-node-id="68:1414">
              0~5점 · 특이 소견 없음
            </p>
            <p className="design-406" data-node-id="68:1415">
              6~30점 · 전문의 상담
            </p>
          </div>
        </div>
        <p className="design-105" data-node-id="68:1416">
          변화가 느껴지면 언제든 다시 해 볼 수 있어요. 설정의 “치매 체크”에서 다시 할 수 있어요.
        </p>
        <div className="design-363" data-node-id="68:1417" data-name="참고 설정">
          <div className="design-39" data-node-id="68:1418" data-name="text">
            <p className="design-40" data-node-id="68:1419">
              AI 대화에서 참고하기
            </p>
            <p className="design-41" data-node-id="68:1420">
              언제든 설정에서 끌 수 있어요
            </p>
          </div>
          <div className="design-65" data-node-id="68:1421" data-name="toggle">
            <img alt="" className="design-9" src={imgToggle} />
          </div>
        </div>
        <div className="design-44" data-node-id="68:1423" data-name="spacer" />
        <Button className="design-45" label="다음" />
      </div>
    </div>;
}
