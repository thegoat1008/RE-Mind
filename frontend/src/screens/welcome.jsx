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
const imgIconCheck = `/assets/figma/37d20.svg`;
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
export default function Component01ReMind() {
  return <div className="design-5" data-node-id="5:848" data-name="01 RE:MIND">
      <div className="design-6" data-node-id="15:896" data-name="Status Bar">
        <div className="design-7" data-node-id="I15:896;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I15:896;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I15:896;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I15:896;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I15:896;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I15:896;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I15:896;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I15:896;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I15:896;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I15:896;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I15:896;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I15:896;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-333" data-node-id="15:928" data-name="Content">
        <div className="design-294" data-node-id="15:940" data-name="center">
          <Character className="design-334" />
        </div>
        <p className="design-335" data-node-id="15:941">
          RE:MIND
        </p>
        <div className="design-297" data-node-id="15:942">
          <p className="design-122">치매 가족을 돌보는 보호자를</p>
          <p className="design-123">혼자 두지 않을게요</p>
        </div>
        <div className="design-336" data-node-id="15:943" data-name="기능 목록">
          <div className="design-328" data-node-id="15:944" data-name="row">
            <div className="design-337" data-node-id="15:945" data-name="check">
              <div className="design-338" data-node-id="15:946" data-name="icon/check">
                <img alt="" className="design-9" src={imgIconCheck} />
              </div>
            </div>
            <p className="design-339" data-node-id="15:948">
              함께 쓰는 돌봄 캘린더
            </p>
          </div>
          <div className="design-328" data-node-id="15:949" data-name="row">
            <div className="design-337" data-node-id="15:950" data-name="check">
              <div className="design-338" data-node-id="15:951" data-name="icon/check">
                <img alt="" className="design-9" src={imgIconCheck} />
              </div>
            </div>
            <p className="design-339" data-node-id="15:953">
              가족·보호자 연결
            </p>
          </div>
          <div className="design-328" data-node-id="15:954" data-name="row">
            <div className="design-337" data-node-id="15:955" data-name="check">
              <div className="design-338" data-node-id="15:956" data-name="icon/check">
                <img alt="" className="design-9" src={imgIconCheck} />
              </div>
            </div>
            <p className="design-339" data-node-id="15:958">
              온이와 마음을 나누는 대화
            </p>
          </div>
          <div className="design-328" data-node-id="15:959" data-name="row">
            <div className="design-337" data-node-id="15:960" data-name="check">
              <div className="design-338" data-node-id="15:961" data-name="icon/check">
                <img alt="" className="design-9" src={imgIconCheck} />
              </div>
            </div>
            <p className="design-339" data-node-id="15:963">
              보호자 커뮤니티
            </p>
          </div>
        </div>
        <div className="design-44" data-node-id="15:964" data-name="spacer" />
        <div className="design-291" data-node-id="15:965" data-name="버튼">
          <Button className="design-292" label="시작하기" />
          <Button className="design-43" label="이미 계정이 있어요" type="outline" />
        </div>
      </div>
    </div>;
}
