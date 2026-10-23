/** @jsxRuntime classic */
/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from '../designRuntime.jsx'

const imgCharacter = `/assets/figma-v2/efa7a.svg`;
const imgStatusDarkBackgroundMask = `/assets/figma-v2/c9227.svg`;
const imgNetworkSignalDark = `/assets/figma-v2/4c652.svg`;
const imgWiFiSignalDark = `/assets/figma-v2/f883c.svg`;
const imgBatteryDark = `/assets/figma-v2/9efe4.svg`;
const imgTimeDarkBackgroundMask = `/assets/figma-v2/f965f.svg`;
const img941 = `/assets/figma-v2/a1382.svg`;
const imgIconGoogle = `/assets/figma-v2/407ae.svg`;
function Character({ className }) {
  return <div className={className || "design-150"} data-node-id="5:332" data-name="온이 (Character)">
      <img alt="" className="design-5" src={imgCharacter} />
    </div>;
}
export default function Component02() {
  return <div className="design-1" data-node-id="179:6992" data-name="02 로그인">
      <div className="design-2" data-node-id="179:6993" data-name="Status Bar">
        <div className="design-3" data-node-id="I179:6993;486:2224" data-name="Status">
          <div className="design-3" data-node-id="I179:6993;486:2225" data-name="status/dark">
            <div className="design-4" data-node-id="I179:6993;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-5" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-6" data-node-id="I179:6993;486:2227" data-name="status/dark">
              <div className="design-7" data-node-id="I179:6993;486:2228" data-name="Status Icons">
                <div className="design-8" data-node-id="I179:6993;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-5" src={imgNetworkSignalDark} />
                </div>
                <div className="design-9" data-node-id="I179:6993;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-5" src={imgWiFiSignalDark} />
                </div>
                <div className="design-10" data-node-id="I179:6993;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-5" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-11" data-node-id="I179:6993;486:2249" data-name="Time / Dark">
                <div className="design-12" data-node-id="I179:6993;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-5" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-13" data-node-id="I179:6993;486:2251" data-name="Time / Dark">
                  <div className="design-14" data-node-id="I179:6993;486:2252" data-name="9:41">
                    <img alt="" className="design-5" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-111" data-node-id="179:6994" data-name="Content">
        <div className="design-286" data-node-id="179:6995" data-name="center">
          <div className="design-316" data-node-id="179:6996" data-name="logo-badge">
            <Character className="design-237" />
          </div>
        </div>
        <div className="design-317" data-node-id="179:6998" data-name="제목">
          <p className="design-318" data-node-id="179:6999">
            로그인
          </p>
          <div className="design-319" data-node-id="179:7000">
            <p className="design-115">다시 만나서 반가워요.</p>
            <p className="design-116">이메일로 로그인해 주세요.</p>
          </div>
        </div>
        <div className="design-20" data-node-id="179:7001" data-name="field/이메일">
          <p className="design-21" data-node-id="179:7002">
            이메일
          </p>
          <div className="design-112" data-node-id="179:7003" data-name="input">
            <p className="design-91" data-node-id="179:7004">
              이메일을 입력하세요
            </p>
          </div>
        </div>
        <div className="design-20" data-node-id="179:7005" data-name="field/비밀번호">
          <p className="design-21" data-node-id="179:7006">
            비밀번호
          </p>
          <div className="design-303" data-node-id="179:7007" data-name="input">
            <p className="design-91" data-node-id="179:7008">
              비밀번호를 입력하세요
            </p>
            <div className="design-304" data-node-id="179:7009" data-name="보기 버튼">
              <p className="design-56" data-node-id="179:7010">
                보기
              </p>
            </div>
          </div>
        </div>
        <div className="design-320" data-node-id="179:7011" data-name="비밀번호 찾기">
          <a className="design-321" data-node-id="179:7012">
            <p className="design-322">비밀번호를 잊으셨나요?</p>
          </a>
        </div>
        <a className="design-124" data-node-id="179:7013" data-name="Button (앱 화면)">
          <p className="design-125" data-node-id="I179:7013;24:968">
            로그인
          </p>
        </a>
        <div className="design-323" data-node-id="179:7014" data-name="또는">
          <div className="design-324" data-node-id="179:7015" data-name="line" />
          <p className="design-99" data-node-id="179:7016">
            또는
          </p>
          <div className="design-324" data-node-id="179:7017" data-name="line" />
        </div>
        <div className="design-325" data-node-id="179:7018" data-name="구글 로그인">
          <div className="design-61" data-node-id="179:7019" data-name="icon/google">
            <img alt="" className="design-5" src={imgIconGoogle} />
          </div>
          <p className="design-281" data-node-id="179:7024">
            구글로 로그인
          </p>
        </div>
        <div className="design-45" data-node-id="179:7025" data-name="spacer" />
        <div className="design-326" data-node-id="179:7026" data-name="회원가입 안내">
          <p className="design-213" data-node-id="179:7027">
            처음이신가요?
          </p>
          <a className="design-327" data-node-id="179:7028">
            <p className="design-322">회원가입</p>
          </a>
        </div>
      </div>
    </div>;
}
