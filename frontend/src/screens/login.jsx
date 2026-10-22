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
const imgIconGoogle = `/assets/figma/407ae.svg`;
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
export default function Component02() {
  return <div className="design-5" data-node-id="5:1402" data-name="02 로그인">
      <div className="design-6" data-node-id="15:970" data-name="Status Bar">
        <div className="design-7" data-node-id="I15:970;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I15:970;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I15:970;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I15:970;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I15:970;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I15:970;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I15:970;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I15:970;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I15:970;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I15:970;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I15:970;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I15:970;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-115" data-node-id="15:1002" data-name="Content">
        <div className="design-294" data-node-id="15:1015" data-name="center">
          <div className="design-321" data-node-id="15:1003" data-name="logo-badge">
            <Character className="design-240" />
          </div>
        </div>
        <div className="design-322" data-node-id="15:1016" data-name="제목">
          <p className="design-323" data-node-id="15:1017">
            로그인
          </p>
          <div className="design-324" data-node-id="15:1018">
            <p className="design-122">다시 만나서 반가워요.</p>
            <p className="design-123">이메일로 로그인해 주세요.</p>
          </div>
        </div>
        <div className="design-61" data-node-id="15:1019" data-name="field/이메일">
          <p className="design-80" data-node-id="15:1020">
            이메일
          </p>
          <div className="design-118" data-node-id="15:1021" data-name="input">
            <p className="design-119" data-node-id="15:1022">
              이메일을 입력하세요
            </p>
          </div>
        </div>
        <div className="design-61" data-node-id="15:1023" data-name="field/비밀번호">
          <p className="design-80" data-node-id="15:1024">
            비밀번호
          </p>
          <div className="design-282" data-node-id="15:1025" data-name="input">
            <p className="design-119" data-node-id="15:1026">
              비밀번호를 입력하세요
            </p>
            <div className="design-310" data-node-id="31:972" data-name="보기 버튼">
              <p className="design-55" data-node-id="15:1027">
                보기
              </p>
            </div>
          </div>
        </div>
        <div className="design-325" data-node-id="15:1028" data-name="비밀번호 찾기">
          <a className="design-326" data-node-id="15:1029">
            <p className="design-327">비밀번호를 잊으셨나요?</p>
          </a>
        </div>
        <Button className="design-45" label="로그인" />
        <div className="design-328" data-node-id="15:1032" data-name="또는">
          <div className="design-329" data-node-id="15:1033" data-name="line" />
          <p className="design-101" data-node-id="15:1034">
            또는
          </p>
          <div className="design-329" data-node-id="15:1035" data-name="line" />
        </div>
        <div className="design-330" data-node-id="15:1036" data-name="구글 로그인">
          <div className="design-60" data-node-id="15:1037" data-name="icon/google">
            <img alt="" className="design-9" src={imgIconGoogle} />
          </div>
          <p className="design-4" data-node-id="15:1042">
            구글로 로그인
          </p>
        </div>
        <div className="design-44" data-node-id="15:1043" data-name="spacer" />
        <div className="design-331" data-node-id="15:1044" data-name="회원가입 안내">
          <p className="design-257" data-node-id="15:1045">
            처음이신가요?
          </p>
          <a className="design-332" data-node-id="15:1046">
            <p className="design-327">회원가입</p>
          </a>
        </div>
      </div>
    </div>;
}
