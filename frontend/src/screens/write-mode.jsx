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
const imgGroup = `/assets/figma-v2/81955.svg`;
const imgGroup1 = `/assets/figma-v2/daa30.svg`;
export default function Component103() {
  return <div className="design-1" data-node-id="179:7522" data-name="10-3 글쓰기 · 모드 선택">
      <div className="design-2" data-node-id="179:7523" data-name="Status Bar">
        <div className="design-3" data-node-id="I179:7523;486:2224" data-name="Status">
          <div className="design-3" data-node-id="I179:7523;486:2225" data-name="status/dark">
            <div className="design-4" data-node-id="I179:7523;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-5" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-6" data-node-id="I179:7523;486:2227" data-name="status/dark">
              <div className="design-7" data-node-id="I179:7523;486:2228" data-name="Status Icons">
                <div className="design-8" data-node-id="I179:7523;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-5" src={imgNetworkSignalDark} />
                </div>
                <div className="design-9" data-node-id="I179:7523;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-5" src={imgWiFiSignalDark} />
                </div>
                <div className="design-10" data-node-id="I179:7523;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-5" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-11" data-node-id="I179:7523;486:2249" data-name="Time / Dark">
                <div className="design-12" data-node-id="I179:7523;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-5" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-13" data-node-id="I179:7523;486:2251" data-name="Time / Dark">
                  <div className="design-14" data-node-id="I179:7523;486:2252" data-name="9:41">
                    <img alt="" className="design-5" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-398" data-node-id="179:7524" data-name="Content">
        <div className="design-16" data-node-id="179:7525" data-name="Header">
          <a className="design-17" data-node-id="179:7526" data-name="뒤로 버튼">
            <div className="design-18" data-node-id="179:7527" data-name="icon/chevL">
              <img alt="" className="design-5" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-19" data-node-id="179:7529">
            글쓰기
          </p>
        </div>
        <div className="design-291" data-node-id="179:7530" data-name="제목">
          <p className="design-292" data-node-id="179:7531">
            어떤 이야기를 나눌까요?
          </p>
          <p className="design-381" data-node-id="179:7532">
            글을 쓰기 전에 하나만 골라 주세요.
          </p>
        </div>
        <div className="design-382" data-node-id="179:7533" data-name="선택">
          <a className="design-399" data-node-id="179:7534" data-name="모드 카드">
            <div className="design-384" data-node-id="179:7535" data-name="icon">
              <p className="design-extra-6" data-node-id="196:5770">
                💡
              </p>
            </div>
            <div className="design-400" data-node-id="179:7539" data-name="text">
              <p className="design-386" data-node-id="179:7540">
                해결책을 주세요
              </p>
              <p className="design-41" data-node-id="179:7541">
                조언을 댓글로 받아요
              </p>
            </div>
            <div className="design-67" data-node-id="179:7542" data-name="icon/chev">
              <div className="design-387" data-node-id="179:7543" data-name="Group">
                <div className="design-388">
                  <img alt="" className="design-28" src={imgGroup} />
                </div>
              </div>
            </div>
          </a>
          <a className="design-399" data-node-id="179:7545" data-name="모드 카드">
            <div className="design-384" data-node-id="179:7546" data-name="icon">
              <p className="design-extra-6" data-node-id="196:5771">
                💛
              </p>
            </div>
            <div className="design-400" data-node-id="179:7550" data-name="text">
              <p className="design-386" data-node-id="179:7551">
                공감만 해주세요
              </p>
              <p className="design-41" data-node-id="179:7552">
                공감의 말만 댓글로 받아요
              </p>
            </div>
            <div className="design-67" data-node-id="179:7553" data-name="icon/chev">
              <div className="design-387" data-node-id="179:7554" data-name="Group">
                <div className="design-388">
                  <img alt="" className="design-28" src={imgGroup} />
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="design-66" data-node-id="179:7556" data-name="익명 안내">
          <div className="design-67" data-node-id="179:7557" data-name="icon/lock">
            <div className="design-68" data-node-id="179:7558" data-name="Group">
              <div className="design-69">
                <img alt="" className="design-28" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="design-70" data-node-id="179:7561">
            “부끄러운 햄스터”처럼 익명 닉네임으로 올라가요.
          </p>
        </div>
      </div>
    </div>;
}
