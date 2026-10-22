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
const imgGroup = `/assets/figma/38c83.svg`;
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
export default function Component111() {
  return <div className="design-5" data-node-id="5:1239" data-name="11-1 가족 이메일 관리">
      <div className="design-6" data-node-id="74:1611" data-name="Status Bar">
        <div className="design-7" data-node-id="I74:1611;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I74:1611;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I74:1611;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I74:1611;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I74:1611;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I74:1611;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I74:1611;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I74:1611;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I74:1611;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I74:1611;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I74:1611;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I74:1611;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-19" data-node-id="74:1643" data-name="Content">
        <div className="design-20" data-node-id="74:1644" data-name="Header">
          <a className="design-21" data-node-id="74:1645" data-name="뒤로 버튼">
            <div className="design-22" data-node-id="74:1646" data-name="icon/chevL">
              <img alt="" className="design-9" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-23" data-node-id="74:1649">
            가족 이메일
          </p>
        </div>
        <div className="design-24" data-node-id="74:1650" data-name="자동 발송">
          <div className="design-20" data-node-id="74:1651" data-name="top">
            <div className="design-25" data-node-id="74:1652" data-name="icon/mail">
              <div className="design-26" data-node-id="74:1653" data-name="Group">
                <div className="design-27">
                  <img alt="" className="design-28" src={imgGroup} />
                </div>
              </div>
            </div>
            <p className="design-29" data-node-id="74:1656">
              자동 발송
            </p>
            <a className="design-30" data-node-id="74:1657" data-name="수정">
              <p className="design-31" data-node-id="74:1658">
                수정
              </p>
            </a>
          </div>
          <p className="design-32" data-node-id="74:1660">
            매일 오전 8시
          </p>
          <p className="design-33" data-node-id="74:1661">
            오늘의 일정을 이메일로 보내요.
          </p>
        </div>
        <p className="design-34" data-node-id="74:1662">
          받는 가족 2명
        </p>
        <div className="design-35" data-node-id="74:1663" data-name="목록">
          <div className="design-36" data-node-id="74:1664" data-name="받는 가족">
            <div className="design-37" data-node-id="74:1665" data-name="avatar">
              <p className="design-38" data-node-id="74:1666">
                민
              </p>
            </div>
            <div className="design-39" data-node-id="74:1667" data-name="text">
              <p className="design-40" data-node-id="74:1668">
                아들 · 김민수
              </p>
              <p className="design-41" data-node-id="74:1669">
                minsu@email.com
              </p>
            </div>
            <p className="design-42" data-node-id="74:1670">
              삭제
            </p>
          </div>
          <div className="design-36" data-node-id="74:1671" data-name="받는 가족">
            <div className="design-37" data-node-id="74:1672" data-name="avatar">
              <p className="design-38" data-node-id="74:1673">
                이
              </p>
            </div>
            <div className="design-39" data-node-id="74:1674" data-name="text">
              <p className="design-40" data-node-id="74:1675">
                이모 · 이영희
              </p>
              <p className="design-41" data-node-id="74:1676">
                younghee@email.com
              </p>
            </div>
            <p className="design-42" data-node-id="74:1677">
              삭제
            </p>
          </div>
        </div>
        <Button className="design-43" label="+ 가족 이메일 추가" type="outline" />
        <div className="design-44" data-node-id="74:1680" data-name="spacer" />
        <Button className="design-45" label="지금 보내기" />
      </div>
    </div>;
}
