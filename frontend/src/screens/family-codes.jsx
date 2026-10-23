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
const imgGroup = `/assets/figma-v2/d29d6.svg`;
const imgGroup1 = `/assets/figma-v2/31c73.svg`;
const imgToggle = `/assets/figma-v2/463bf.svg`;
export default function Component111() {
  return <div className="design-1" data-node-id="179:6078" data-name="11-1 가족 코드 관리">
      <div className="design-2" data-node-id="179:6079" data-name="Status Bar">
        <div className="design-3" data-node-id="I179:6079;486:2224" data-name="Status">
          <div className="design-3" data-node-id="I179:6079;486:2225" data-name="status/dark">
            <div className="design-4" data-node-id="I179:6079;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-5" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-6" data-node-id="I179:6079;486:2227" data-name="status/dark">
              <div className="design-7" data-node-id="I179:6079;486:2228" data-name="Status Icons">
                <div className="design-8" data-node-id="I179:6079;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-5" src={imgNetworkSignalDark} />
                </div>
                <div className="design-9" data-node-id="I179:6079;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-5" src={imgWiFiSignalDark} />
                </div>
                <div className="design-10" data-node-id="I179:6079;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-5" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-11" data-node-id="I179:6079;486:2249" data-name="Time / Dark">
                <div className="design-12" data-node-id="I179:6079;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-5" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-13" data-node-id="I179:6079;486:2251" data-name="Time / Dark">
                  <div className="design-14" data-node-id="I179:6079;486:2252" data-name="9:41">
                    <img alt="" className="design-5" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-15" data-node-id="179:6080" data-name="Content">
        <div className="design-16" data-node-id="179:6081" data-name="Header">
          <a className="design-17" data-node-id="179:6082" data-name="뒤로 버튼">
            <div className="design-18" data-node-id="179:6083" data-name="icon/chevL">
              <img alt="" className="design-5" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-19" data-node-id="179:6085">
            가족 코드
          </p>
        </div>
        <div className="design-20" data-node-id="196:5335" data-name="내 가족 코드">
          <p className="design-21" data-node-id="196:5336">
            내 가족 코드
          </p>
          <div className="design-22" data-node-id="196:5337" data-name="code-card">
            <p className="design-23" data-node-id="196:5338">
              DA-4821
            </p>
            <div className="design-24" data-node-id="196:5339" data-name="복사 공유">
              <div className="design-extra-1" data-node-id="196:5340" data-name="btn 복사">
                <div className="design-25" data-node-id="196:5341" data-name="icon/복사">
                  <div className="design-26" data-node-id="196:5342" data-name="Group">
                    <div className="design-27">
                      <img alt="" className="design-28" src={imgGroup} />
                    </div>
                  </div>
                </div>
                <p className="design-29" data-node-id="196:5345">
                  복사
                </p>
              </div>
              <div className="design-extra-1" data-node-id="196:5346" data-name="btn 공유">
                <div className="design-25" data-node-id="196:5347" data-name="icon/공유">
                  <div className="design-30" data-node-id="196:5348" data-name="Group">
                    <div className="design-31">
                      <img alt="" className="design-28" src={imgGroup1} />
                    </div>
                  </div>
                </div>
                <p className="design-29" data-node-id="196:5351">
                  공유
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="design-32" data-node-id="196:5358" data-name="새 코드">
          <p className="design-33" data-node-id="196:5359">
            새 코드를 만들면 이전 코드는 쓸 수 없어요.
          </p>
          <p className="design-34" data-node-id="196:5360">
            새 코드 만들기
          </p>
        </div>
        <p className="design-35" data-node-id="196:5361">
          연결된 가족 2명
        </p>
        <div className="design-36" data-node-id="196:5362" data-name="목록">
          <div className="design-37" data-node-id="196:5363" data-name="연결된 가족">
            <div className="design-extra-2" data-node-id="196:5364" data-name="avatar">
              <p className="design-38" data-node-id="196:5365">
                민
              </p>
            </div>
            <div className="design-39" data-node-id="196:5366" data-name="text">
              <p className="design-40" data-node-id="196:5367">
                아들 · 김민수
              </p>
              <p className="design-41" data-node-id="196:5368">
                10월 18일 연결
              </p>
            </div>
            <p className="design-42" data-node-id="196:5369">
              연결 해제
            </p>
          </div>
          <div className="design-37" data-node-id="196:5370" data-name="연결된 가족">
            <div className="design-extra-2" data-node-id="196:5371" data-name="avatar">
              <p className="design-38" data-node-id="196:5372">
                이
              </p>
            </div>
            <div className="design-39" data-node-id="196:5373" data-name="text">
              <p className="design-40" data-node-id="196:5374">
                이모 · 이영희
              </p>
              <p className="design-41" data-node-id="196:5375">
                10월 19일 연결
              </p>
            </div>
            <p className="design-42" data-node-id="196:5376">
              연결 해제
            </p>
          </div>
        </div>
        <div className="design-43" data-node-id="196:5377" data-name="공유 범위">
          <div className="design-39" data-node-id="196:5378" data-name="text">
            <p className="design-40" data-node-id="196:5379">
              완료 표시도 보여 주기
            </p>
            <p className="design-41" data-node-id="196:5380">
              약 복용 완료를 가족이 볼 수 있어요
            </p>
          </div>
          <div className="design-44" data-node-id="196:5381" data-name="toggle">
            <img alt="" className="design-5" src={imgToggle} />
          </div>
        </div>
        <div className="design-45" data-node-id="196:5383" data-name="spacer" />
        <a className="design-46" data-node-id="196:5384" data-name="Button (앱 화면)">
          <p className="design-47" data-node-id="I196:5384;24:970">
            + 다른 가족 초대하기
          </p>
        </a>
      </div>
    </div>;
}
