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
const imgGroup = `/assets/figma/0072f.svg`;
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
export default function Component052() {
  return <div className="design-5" data-node-id="68:1217" data-name="05-2 치매 체크 · 질문">
      <div className="design-6" data-node-id="68:1218" data-name="Status Bar">
        <div className="design-7" data-node-id="I68:1218;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I68:1218;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I68:1218;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I68:1218;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I68:1218;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I68:1218;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I68:1218;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I68:1218;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I68:1218;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I68:1218;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I68:1218;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I68:1218;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-19" data-node-id="68:1250" data-name="Content">
        <div className="design-20" data-node-id="68:1251" data-name="Header">
          <a className="design-21" data-node-id="68:1252" data-name="뒤로 버튼">
            <div className="design-22" data-node-id="68:1253" data-name="icon/chevL">
              <img alt="" className="design-9" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-23" data-node-id="68:1255">
            치매 체크
          </p>
          <p className="design-80" data-node-id="68:1256">
            3/15
          </p>
        </div>
        <div className="design-388" data-node-id="68:1257" data-name="meter">
          <div className="design-389" data-node-id="68:1258" data-name="fill" />
        </div>
        <div className="design-390" data-node-id="68:1259" data-name="질문">
          <p className="design-391" data-node-id="68:1260">
            요즘 우리 가족은
          </p>
          <div className="design-392" data-node-id="68:1261">
            <p className="design-384">같은 질문을</p>
            <p className="design-385">반복해서 한다</p>
          </div>
          <p className="design-393" data-node-id="68:1262">
            최근 몇 달을 떠올려 보세요.
          </p>
        </div>
        <div className="design-394" data-node-id="68:1263" data-name="선택지">
          <div className="design-395" data-node-id="68:1264" data-name="선택지">
            <div className="design-396" data-node-id="68:1265" data-name="radio" />
            <p className="design-397" data-node-id="68:1266">
              아니다
            </p>
          </div>
          <div className="design-398" data-node-id="68:1267" data-name="선택지">
            <div className="design-399" data-node-id="68:1268" data-name="radio">
              <div className="design-313" data-node-id="68:1269" data-name="icon/check">
                <div className="design-314" data-node-id="68:1270" data-name="Group">
                  <div className="design-400">
                    <img alt="" className="design-28" src={imgGroup} />
                  </div>
                </div>
              </div>
            </div>
            <p className="design-397" data-node-id="68:1272">
              가끔 그렇다
            </p>
          </div>
          <div className="design-395" data-node-id="68:1273" data-name="선택지">
            <div className="design-396" data-node-id="68:1274" data-name="radio" />
            <p className="design-397" data-node-id="68:1275">
              자주 그렇다
            </p>
          </div>
        </div>
        <div className="design-44" data-node-id="68:1276" data-name="spacer" />
        <div className="design-378" data-node-id="68:1277" data-name="이전 다음">
          <Button className="design-379" label="이전" type="outline" />
          <Button className="design-380" label="다음" />
        </div>
        <div className="design-401" data-node-id="68:1282" data-name="건너뛰기">
          <p className="design-42" data-node-id="68:1283">
            이 질문은 건너뛸게요
          </p>
        </div>
      </div>
    </div>;
}
