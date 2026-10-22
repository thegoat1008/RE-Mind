/** @jsxRuntime classic */
/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "../designRuntime.jsx";

const imgCharacter = `/assets/figma/efa7a.svg`;
const imgStatusDarkBackgroundMask = `/assets/figma/c9227.svg`;
const imgNetworkSignalDark = `/assets/figma/c9609.svg`;
const imgWiFiSignalDark = `/assets/figma/f883c.svg`;
const imgBatteryDark = `/assets/figma/9efe4.svg`;
const imgTimeDarkBackgroundMask = `/assets/figma/f965f.svg`;
const img941 = `/assets/figma/a1382.svg`;
const imgIconChevL = `/assets/figma/fa782.svg`;
const imgIconChevR = `/assets/figma/90f42.svg`;
function Button({ className, label = "버튼", type = "primary" }) {
  return <div className={className || "design-113"} data-node-id="24:967">
      <p className="design-3" data-node-id="24:968">
        {label}
      </p>
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
export default function Component05() {
  return <div className="design-5" data-node-id="5:882" data-name="05 돌봄 대상 등록">
      <div className="design-131" data-node-id="5:883" data-name="iPhone 16 & 17 Pro - 2">
        <div className="design-7" data-node-id="I5:883;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I5:883;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I5:883;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I5:883;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I5:883;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I5:883;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I5:883;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I5:883;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I5:883;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I5:883;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I5:883;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I5:883;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-272" data-node-id="5:884" data-name="Content">
        <div className="design-20" data-node-id="5:885" data-name="Header">
          <a className="design-21" data-node-id="31:966" data-name="뒤로 버튼">
            <div className="design-22" data-node-id="5:886" data-name="icon/chevL">
              <img alt="" className="design-9" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-273" data-node-id="5:888">
            돌봄 대상 등록
          </p>
          <p className="design-274" data-node-id="5:889">
            1/3
          </p>
        </div>
        <div className="design-275" data-node-id="5:890" data-name="온이 안내">
          <Character className="design-276" />
          <div className="design-277" data-node-id="5:892">
            <p className="design-278">어떤 분을 돌보고 계신가요?</p>
            <p className="design-279">알려주시면 맞춤으로 도와드릴게요.</p>
          </div>
        </div>
        <div className="design-61" data-node-id="5:893" data-name="field/이름">
          <p className="design-181" data-node-id="5:894">
            이름
          </p>
          <div className="design-118" data-node-id="5:895" data-name="input">
            <p className="design-183" data-node-id="5:896">
              김순자
            </p>
          </div>
        </div>
        <div className="design-61" data-node-id="5:897" data-name="field/관계">
          <p className="design-181" data-node-id="5:898">
            나와의 관계
          </p>
          <div className="design-177" data-node-id="5:899" data-name="Frame">
            <div className="design-280" data-node-id="24:985" data-name="Chip (앱 화면)">
              <p className="design-48" data-node-id="I24:985;24:977">
                어머니
              </p>
            </div>
            <div className="design-281" data-node-id="24:987" data-name="Chip (앱 화면)">
              <p className="design-47" data-node-id="I24:987;24:975">
                아버지
              </p>
            </div>
            <div className="design-281" data-node-id="24:989" data-name="Chip (앱 화면)">
              <p className="design-47" data-node-id="I24:989;24:975">
                배우자
              </p>
            </div>
            <div className="design-281" data-node-id="24:991" data-name="Chip (앱 화면)">
              <p className="design-47" data-node-id="I24:991;24:975">
                기타
              </p>
            </div>
          </div>
        </div>
        <div className="design-61" data-node-id="5:904" data-name="field/나이">
          <p className="design-181" data-node-id="5:905">
            나이
          </p>
          <div className="design-282" data-node-id="5:906" data-name="input">
            <p className="design-183" data-node-id="5:907">
              78세
            </p>
            <div className="design-60" data-node-id="5:908" data-name="icon/chevR">
              <img alt="" className="design-9" src={imgIconChevR} />
            </div>
          </div>
        </div>
        <div className="design-61" data-node-id="5:910" data-name="field/진행 단계">
          <p className="design-181" data-node-id="5:911">
            현재 단계 (알고 있는 만큼만 선택해요)
          </p>
          <div className="design-187" data-node-id="5:912" data-name="Frame">
            <Chip className="design-72 instance-care-registration-0" label="초기" />
            <Chip className="design-73 instance-care-registration-1" label="중기" state="active" />
            <Chip className="design-72 instance-care-registration-2" label="후기" />
            <Chip className="design-72 instance-care-registration-3" label="모르겠어요" />
          </div>
        </div>
        <div className="design-61" data-node-id="5:917" data-name="field/돌봄 시 주의할 점">
          <p className="design-181" data-node-id="5:918">
            돌봄 시 주의할 점
          </p>
          <div className="design-118" data-node-id="5:919" data-name="input">
            <p className="design-183" data-node-id="5:920">
              같은 질문을 자주 반복하세요
            </p>
          </div>
        </div>
        <div className="design-44" data-node-id="5:921" data-name="spacer" />
        <Button className="design-45" label="다음" />
      </div>
    </div>;
}
