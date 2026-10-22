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
const imgGroup = `/assets/figma/35307.svg`;
function Button({ className, label = "버튼", type = "primary" }) {
  return <div className={className || "design-113"} data-node-id="24:967">
      <p className="design-3" data-node-id="24:968">
        {label}
      </p>
    </div>;
}
export default function Component085() {
  return <div className="design-5" data-node-id="74:1577" data-name="08-5 이메일로 보내기">
      <div className="design-6" data-node-id="74:1578" data-name="Status Bar">
        <div className="design-7" data-node-id="I74:1578;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I74:1578;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I74:1578;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I74:1578;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I74:1578;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I74:1578;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I74:1578;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I74:1578;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I74:1578;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I74:1578;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I74:1578;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I74:1578;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-19" data-node-id="74:1610" data-name="Content">
        <div className="design-20" data-node-id="74:1684" data-name="Header">
          <a className="design-21" data-node-id="74:1685" data-name="뒤로 버튼">
            <div className="design-22" data-node-id="74:1686" data-name="icon/chevL">
              <img alt="" className="design-9" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-23" data-node-id="74:1689">
            이메일로 보내기
          </p>
        </div>
        <p className="design-56" data-node-id="74:1690">
          보낼 기간
        </p>
        <div className="design-61" data-node-id="74:1691" data-name="기간">
          <div className="design-445" data-node-id="74:1692" data-name="기간 선택">
            <div className="design-399" data-node-id="74:1693" data-name="radio">
              <div className="design-313" data-node-id="74:1694" data-name="icon/check">
                <div className="design-314" data-node-id="74:1695" data-name="Group">
                  <div className="design-315">
                    <img alt="" className="design-28" src={imgGroup} />
                  </div>
                </div>
              </div>
            </div>
            <div className="design-128" data-node-id="74:1697" data-name="text">
              <p className="design-40" data-node-id="74:1698">
                오늘
              </p>
              <p className="design-41" data-node-id="74:1699">
                10월 20일 · 일정 2개
              </p>
            </div>
          </div>
          <div className="design-446" data-node-id="74:1700" data-name="기간 선택">
            <div className="design-396" data-node-id="74:1701" data-name="radio" />
            <div className="design-128" data-node-id="74:1702" data-name="text">
              <p className="design-40" data-node-id="74:1703">
                이번 주
              </p>
              <p className="design-41" data-node-id="74:1704">
                10월 19일 ~ 25일 · 일정 6개
              </p>
            </div>
          </div>
          <div className="design-446" data-node-id="74:1705" data-name="기간 선택">
            <div className="design-396" data-node-id="74:1706" data-name="radio" />
            <div className="design-128" data-node-id="74:1707" data-name="text">
              <p className="design-40" data-node-id="74:1708">
                이번 달
              </p>
              <p className="design-41" data-node-id="74:1709">
                10월 · 일정 21개
              </p>
            </div>
          </div>
        </div>
        <p className="design-56" data-node-id="74:1710">
          받는 가족
        </p>
        <div className="design-61" data-node-id="74:1711" data-name="받는 가족">
          <div className="design-447" data-node-id="74:1712" data-name="가족">
            <div className="design-312" data-node-id="74:1713" data-name="check">
              <div className="design-313" data-node-id="74:1714" data-name="icon/check">
                <div className="design-314" data-node-id="74:1715" data-name="Group">
                  <div className="design-315">
                    <img alt="" className="design-28" src={imgGroup} />
                  </div>
                </div>
              </div>
            </div>
            <p className="design-288" data-node-id="74:1717">
              minsu@email.com
            </p>
          </div>
          <div className="design-447" data-node-id="74:1718" data-name="가족">
            <div className="design-312" data-node-id="74:1719" data-name="check">
              <div className="design-313" data-node-id="74:1720" data-name="icon/check">
                <div className="design-314" data-node-id="74:1721" data-name="Group">
                  <div className="design-315">
                    <img alt="" className="design-28" src={imgGroup} />
                  </div>
                </div>
              </div>
            </div>
            <p className="design-288" data-node-id="74:1723">
              younghee@email.com
            </p>
          </div>
        </div>
        <div className="design-44" data-node-id="74:1724" data-name="spacer" />
        <p className="design-320" data-node-id="74:1725">
          선택한 기간의 일정이 이메일로 전달돼요.
        </p>
        <Button className="design-45" label="보내기" />
      </div>
    </div>;
}
