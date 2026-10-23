/** @jsxRuntime classic */
/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from '../designRuntime.jsx'

const imgStatusDarkBackgroundMask = `/assets/figma-v2/c9227.svg`;
const imgNetworkSignalDark = `/assets/figma-v2/4c652.svg`;
const imgWiFiSignalDark = `/assets/figma-v2/f883c.svg`;
const imgBatteryDark = `/assets/figma-v2/9efe4.svg`;
const imgTimeDarkBackgroundMask = `/assets/figma-v2/f965f.svg`;
const img941 = `/assets/figma-v2/a1382.svg`;
const imgIconChevL = `/assets/figma-v2/905bb.svg`;
const imgGroup = `/assets/figma-v2/35307.svg`;
export default function Component03() {
  return <div className="design-1" data-node-id="179:6940" data-name="03 회원가입">
      <div className="design-2" data-node-id="179:6941" data-name="Status Bar">
        <div className="design-3" data-node-id="I179:6941;486:2224" data-name="Status">
          <div className="design-3" data-node-id="I179:6941;486:2225" data-name="status/dark">
            <div className="design-4" data-node-id="I179:6941;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-5" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-6" data-node-id="I179:6941;486:2227" data-name="status/dark">
              <div className="design-7" data-node-id="I179:6941;486:2228" data-name="Status Icons">
                <div className="design-8" data-node-id="I179:6941;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-5" src={imgNetworkSignalDark} />
                </div>
                <div className="design-9" data-node-id="I179:6941;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-5" src={imgWiFiSignalDark} />
                </div>
                <div className="design-10" data-node-id="I179:6941;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-5" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-11" data-node-id="I179:6941;486:2249" data-name="Time / Dark">
                <div className="design-12" data-node-id="I179:6941;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-5" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-13" data-node-id="I179:6941;486:2251" data-name="Time / Dark">
                  <div className="design-14" data-node-id="I179:6941;486:2252" data-name="9:41">
                    <img alt="" className="design-5" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-301" data-node-id="179:6942" data-name="Content">
        <div className="design-16" data-node-id="179:6943" data-name="Header">
          <a className="design-17" data-node-id="179:6944" data-name="뒤로 버튼">
            <div className="design-18" data-node-id="179:6945" data-name="icon/chevL">
              <img alt="" className="design-5" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-19" data-node-id="179:6947">
            회원가입
          </p>
        </div>
        <p className="design-302" data-node-id="179:6948">{`몇 가지만 적어 주세요. `}</p>
        <div className="design-20" data-node-id="179:6949" data-name="field/이름">
          <p className="design-21" data-node-id="179:6950">
            이름
          </p>
          <div className="design-112" data-node-id="179:6951" data-name="input">
            <p className="design-91" data-node-id="179:6952">
              이름을 입력하세요
            </p>
          </div>
        </div>
        <div className="design-20" data-node-id="179:6953" data-name="field/이메일">
          <p className="design-21" data-node-id="179:6954">
            이메일
          </p>
          <div className="design-112" data-node-id="179:6955" data-name="input">
            <p className="design-91" data-node-id="179:6956">
              이메일을 입력하세요
            </p>
          </div>
        </div>
        <div className="design-20" data-node-id="179:6957" data-name="field/비밀번호">
          <p className="design-21" data-node-id="179:6958">
            비밀번호
          </p>
          <div className="design-303" data-node-id="179:6959" data-name="input">
            <p className="design-91" data-node-id="179:6960">
              8자 이상 입력하세요
            </p>
            <div className="design-304" data-node-id="179:6961" data-name="보기 버튼">
              <p className="design-56" data-node-id="179:6962">
                보기
              </p>
            </div>
          </div>
          <p className="design-305" data-node-id="179:6963">
            8자 이상 입력해 주세요.
          </p>
        </div>
        <div className="design-45" data-node-id="179:6964" data-name="spacer" />
        <a className="design-124" data-node-id="179:6965" data-name="Button (앱 화면)">
          <p className="design-125" data-node-id="I179:6965;24:968">
            계정 만들기
          </p>
        </a>
        <div className="design-306" data-node-id="179:6966" data-name="개인정보 동의">
          <div className="design-307" data-node-id="179:6967" data-name="check">
            <div className="design-308" data-node-id="179:6968" data-name="icon/check">
              <div className="design-309" data-node-id="179:6969" data-name="Group">
                <div className="design-310">
                  <img alt="" className="design-28" src={imgGroup} />
                </div>
              </div>
            </div>
          </div>
          <p className="design-270" data-node-id="179:6971">
            개인정보 수집·이용 동의
          </p>
          <p className="design-311" data-node-id="179:6972">
            보기
          </p>
        </div>
        <div className="design-312" data-node-id="179:6973">
          <p className="design-313">
            <span className="design-248">가입하면</span>
            <span className="design-314">{` 서비스 이용약관`}</span>
            <span className="design-248">{`과 `}</span>
            <span className="design-314">개인정보 처리방침</span>
            <span className="design-248">에</span>
          </p>
          <p className="design-248">동의하신 것으로 봅니다.</p>
        </div>
      </div>
    </div>;
}
