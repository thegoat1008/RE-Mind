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
export default function Component03() {
  return <div className="design-5" data-node-id="5:1430" data-name="03 회원가입">
      <div className="design-6" data-node-id="15:1047" data-name="Status Bar">
        <div className="design-7" data-node-id="I15:1047;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I15:1047;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I15:1047;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I15:1047;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I15:1047;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I15:1047;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I15:1047;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I15:1047;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I15:1047;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I15:1047;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I15:1047;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I15:1047;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-308" data-node-id="15:1079" data-name="Content">
        <div className="design-20" data-node-id="15:1080" data-name="Header">
          <a className="design-21" data-node-id="31:973" data-name="뒤로 버튼">
            <div className="design-22" data-node-id="15:1081" data-name="icon/chevL">
              <img alt="" className="design-9" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-23" data-node-id="15:1083">
            회원가입
          </p>
        </div>
        <p className="design-309" data-node-id="15:1084">{`몇 가지만 적어 주세요. `}</p>
        <div className="design-61" data-node-id="15:1085" data-name="field/이름">
          <p className="design-80" data-node-id="15:1086">
            이름
          </p>
          <div className="design-118" data-node-id="15:1087" data-name="input">
            <p className="design-119" data-node-id="15:1088">
              이름을 입력하세요
            </p>
          </div>
        </div>
        <div className="design-61" data-node-id="15:1089" data-name="field/이메일">
          <p className="design-80" data-node-id="15:1090">
            이메일
          </p>
          <div className="design-118" data-node-id="15:1091" data-name="input">
            <p className="design-119" data-node-id="15:1092">
              이메일을 입력하세요
            </p>
          </div>
        </div>
        <div className="design-61" data-node-id="15:1093" data-name="field/비밀번호">
          <p className="design-80" data-node-id="15:1094">
            비밀번호
          </p>
          <div className="design-282" data-node-id="15:1095" data-name="input">
            <p className="design-119" data-node-id="15:1096">
              8자 이상 입력하세요
            </p>
            <div className="design-310" data-node-id="31:975" data-name="보기 버튼">
              <p className="design-55" data-node-id="15:1097">
                보기
              </p>
            </div>
          </div>
          <p className="design-285" data-node-id="15:1098">
            8자 이상 입력해 주세요.
          </p>
        </div>
        <div className="design-44" data-node-id="15:1104" data-name="spacer" />
        <Button className="design-45" label="계정 만들기" />
        <div className="design-311" data-node-id="75:1823" data-name="개인정보 동의">
          <div className="design-312" data-node-id="75:1824" data-name="check">
            <div className="design-313" data-node-id="75:1825" data-name="icon/check">
              <div className="design-314" data-node-id="75:1826" data-name="Group">
                <div className="design-315">
                  <img alt="" className="design-28" src={imgGroup} />
                </div>
              </div>
            </div>
          </div>
          <p className="design-288" data-node-id="75:1828">
            개인정보 수집·이용 동의
          </p>
          <p className="design-316" data-node-id="75:1829">
            보기
          </p>
        </div>
        <div className="design-317" data-node-id="15:1107">
          <p className="design-318">
            <span className="design-262">가입하면</span>
            <span className="design-319">{` 서비스 이용약관`}</span>
            <span className="design-262">{`과 `}</span>
            <span className="design-319">개인정보 처리방침</span>
            <span className="design-262">에</span>
          </p>
          <p className="design-262">동의하신 것으로 봅니다.</p>
        </div>
      </div>
    </div>;
}
