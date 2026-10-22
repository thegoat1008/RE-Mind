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
export default function Component073() {
  return <div className="design-5" data-node-id="75:1610" data-name="07-3 치매 상식 · 퀴즈">
      <div className="design-6" data-node-id="75:1611" data-name="Status Bar">
        <div className="design-7" data-node-id="I75:1611;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I75:1611;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I75:1611;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I75:1611;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I75:1611;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I75:1611;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I75:1611;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I75:1611;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I75:1611;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I75:1611;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I75:1611;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I75:1611;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-19" data-node-id="75:1643" data-name="Content">
        <div className="design-20" data-node-id="75:1712" data-name="Header">
          <a className="design-21" data-node-id="75:1713" data-name="뒤로 버튼">
            <div className="design-22" data-node-id="75:1714" data-name="icon/chevL">
              <img alt="" className="design-9" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-23" data-node-id="75:1717">
            치매 상식
          </p>
          <p className="design-80" data-node-id="75:1718">
            1/5
          </p>
        </div>
        <div className="design-448" data-node-id="75:1719" data-name="문제">
          <div className="design-449" data-node-id="75:1720" data-name="tag">
            <p className="design-55" data-node-id="75:1721">
              O / X 퀴즈
            </p>
          </div>
          <div className="design-450" data-node-id="75:1722">
            <p className="design-384">같은 질문을 몇 달째</p>
            <p className="design-384">자꾸 반복하신다면,</p>
            <p className="design-385">상담을 받아 보는 게 좋다.</p>
          </div>
        </div>
        <p className="design-309" data-node-id="75:1723">
          O 또는 X를 눌러 보세요.
        </p>
        <div className="design-451" data-node-id="75:1724" data-name="O X">
          <a className="design-452" data-node-id="75:1725" data-name="버튼 O">
            <p className="design-453" data-node-id="75:1726">
              O
            </p>
          </a>
          <a className="design-452" data-node-id="75:1728" data-name="버튼 X">
            <p className="design-453" data-node-id="75:1729">
              X
            </p>
          </a>
        </div>
        <div className="design-44" data-node-id="75:1731" data-name="spacer" />
        <div className="design-454" data-node-id="75:1732" data-name="건너뛰기">
          <p className="design-42" data-node-id="75:1733">
            다음 퀴즈로 넘어갈게요
          </p>
        </div>
      </div>
    </div>;
}
