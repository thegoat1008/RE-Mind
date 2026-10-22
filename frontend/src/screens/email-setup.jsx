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
const imgGroup = `/assets/figma/e5f20.svg`;
const imgGroup1 = `/assets/figma/38c83.svg`;
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
function Character({ className }) {
  return <div className={className || "design-153"} data-node-id="5:332" data-name="온이 (Character)">
      <img alt="" className="design-9" src={imgCharacter} />
    </div>;
}
export default function Component06() {
  return <div className="design-5" data-node-id="5:1523" data-name="06 가족 이메일 설정">
      <div className="design-6" data-node-id="69:1313" data-name="Status Bar">
        <div className="design-7" data-node-id="I69:1313;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I69:1313;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I69:1313;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I69:1313;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I69:1313;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I69:1313;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I69:1313;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I69:1313;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I69:1313;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I69:1313;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I69:1313;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I69:1313;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-19" data-node-id="69:1345" data-name="Content">
        <div className="design-20" data-node-id="69:1346" data-name="Header">
          <a className="design-21" data-node-id="69:1347" data-name="뒤로 버튼">
            <div className="design-22" data-node-id="69:1348" data-name="icon/chevL">
              <img alt="" className="design-9" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-23" data-node-id="69:1351">
            가족 이메일
          </p>
          <p className="design-80" data-node-id="69:1352">
            3/3
          </p>
        </div>
        <div className="design-283" data-node-id="69:1353" data-name="온이 안내">
          <Character className="design-276" />
          <div className="design-284" data-node-id="69:1365">
            <p className="design-122">가족에게 오늘의 일정을</p>
            <p className="design-123">이메일로 보내 드려요.</p>
          </div>
        </div>
        <div className="design-61" data-node-id="69:1366" data-name="field/가족 이메일">
          <p className="design-80" data-node-id="69:1367">
            받는 가족 이메일
          </p>
          <div className="design-118" data-node-id="69:1368" data-name="input">
            <p className="design-119" data-node-id="69:1369">
              family@email.com
            </p>
          </div>
          <p className="design-285" data-node-id="69:1370">
            여러 명은 나중에 설정에서 추가할 수 있어요.
          </p>
        </div>
        <div className="design-61" data-node-id="69:1371" data-name="보내는 주기">
          <p className="design-80" data-node-id="69:1372">
            얼마나 자주 보낼까요?
          </p>
          <div className="design-71" data-node-id="69:1373" data-name="chips">
            <Chip className="design-286 instance-email-setup-0" label="매일" state="active" />
            <Chip className="design-287 instance-email-setup-1" label="매주" />
          </div>
        </div>
        <div className="design-61" data-node-id="69:1378" data-name="field/시간">
          <p className="design-80" data-node-id="69:1379">
            몇 시에 보낼까요?
          </p>
          <div className="design-282" data-node-id="69:1380" data-name="input">
            <p className="design-288" data-node-id="69:1381">
              오전 8:00
            </p>
            <div className="design-77" data-node-id="69:1382" data-name="icon/clock">
              <div className="design-81" data-node-id="69:1383" data-name="Group">
                <div className="design-289">
                  <img alt="" className="design-28" src={imgGroup} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="design-290" data-node-id="69:1386" data-name="요약">
          <div className="design-25" data-node-id="69:1387" data-name="icon/mail">
            <div className="design-26" data-node-id="69:1388" data-name="Group">
              <div className="design-27">
                <img alt="" className="design-28" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="design-288" data-node-id="69:1391">
            매일 오전 8시에 오늘 일정을 보내요.
          </p>
        </div>
        <div className="design-44" data-node-id="69:1392" data-name="spacer" />
        <div className="design-291" data-node-id="69:1393" data-name="버튼">
          <Button className="design-292" label="저장하기" />
          <Button className="design-43" label="나중에 할게요" type="outline" />
        </div>
      </div>
    </div>;
}
