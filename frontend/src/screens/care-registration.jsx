/** @jsxRuntime classic */
/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from '../designRuntime.jsx'

const imgCharacter = `/assets/figma-v2/efa7a.svg`;
const imgStatusDarkBackgroundMask = `/assets/figma-v2/c9227.svg`;
const imgNetworkSignalDark = `/assets/figma-v2/c9609.svg`;
const imgWiFiSignalDark = `/assets/figma-v2/f883c.svg`;
const imgBatteryDark = `/assets/figma-v2/9efe4.svg`;
const imgTimeDarkBackgroundMask = `/assets/figma-v2/f965f.svg`;
const img941 = `/assets/figma-v2/a1382.svg`;
const imgIconChevL = `/assets/figma-v2/3eadc.svg`;
function Chip({ className, nodeId, label = "칩", state = "default" }) {
  return <div className={className || "design-48"} data-node-id={nodeId} data-name="Chip (앱 화면)">
      <p className="design-49" data-node-id="24:975">
        {label}
      </p>
    </div>;
}
function Character({ className }) {
  return <div className={className || "design-150"} data-node-id="5:332" data-name="온이 (Character)">
      <img alt="" className="design-5" src={imgCharacter} />
    </div>;
}
export default function Component05() {
  return <div className="design-1" data-node-id="179:6819" data-name="05 돌봄 대상 등록">
      <div className="design-126" data-node-id="179:6820" data-name="iPhone 16 & 17 Pro - 2">
        <div className="design-3" data-node-id="I179:6820;486:2224" data-name="Status">
          <div className="design-3" data-node-id="I179:6820;486:2225" data-name="status/dark">
            <div className="design-4" data-node-id="I179:6820;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-5" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-6" data-node-id="I179:6820;486:2227" data-name="status/dark">
              <div className="design-7" data-node-id="I179:6820;486:2228" data-name="Status Icons">
                <div className="design-8" data-node-id="I179:6820;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-5" src={imgNetworkSignalDark} />
                </div>
                <div className="design-9" data-node-id="I179:6820;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-5" src={imgWiFiSignalDark} />
                </div>
                <div className="design-10" data-node-id="I179:6820;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-5" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-11" data-node-id="I179:6820;486:2249" data-name="Time / Dark">
                <div className="design-12" data-node-id="I179:6820;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-5" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-13" data-node-id="I179:6820;486:2251" data-name="Time / Dark">
                  <div className="design-14" data-node-id="I179:6820;486:2252" data-name="9:41">
                    <img alt="" className="design-5" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-264" data-node-id="179:6821" data-name="Content">
        <div className="design-16" data-node-id="179:6822" data-name="Header">
          <a className="design-17" data-node-id="179:6823" data-name="뒤로 버튼">
            <div className="design-18" data-node-id="179:6824" data-name="icon/chevL">
              <img alt="" className="design-5" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-19" data-node-id="179:6826">
            돌봄 대상 등록
          </p>
          <p className="design-49" data-node-id="179:6827">
            1/2
          </p>
        </div>
        <div className="design-265" data-node-id="179:6828" data-name="온이 안내">
          <Character className="design-266" />
          <div className="design-267" data-node-id="179:6830">
            <p className="design-268">어떤 분을 돌보고 계신가요?</p>
            <p className="design-269">알려주시면 맞춤으로 도와드릴게요.</p>
          </div>
        </div>
        <div className="design-20" data-node-id="179:6831" data-name="field/이름">
          <p className="design-21" data-node-id="179:6832">
            이름
          </p>
          <div className="design-112" data-node-id="179:6833" data-name="input">
            <p className="design-270" data-node-id="179:6834">
              김순자
            </p>
          </div>
        </div>
        <div className="design-20" data-node-id="179:6835" data-name="field/관계">
          <p className="design-21" data-node-id="179:6836">
            나와의 관계
          </p>
          <div className="design-271" data-node-id="179:6837" data-name="Frame">
            <div className="design-272" data-node-id="179:6838" data-name="Chip (앱 화면)">
              <p className="design-73" data-node-id="I179:6838;24:977">
                어머니
              </p>
            </div>
            <div className="design-273" data-node-id="179:6839" data-name="Chip (앱 화면)">
              <p className="design-49" data-node-id="I179:6839;24:975">
                아버지
              </p>
            </div>
            <div className="design-273" data-node-id="179:6840" data-name="Chip (앱 화면)">
              <p className="design-49" data-node-id="I179:6840;24:975">
                배우자
              </p>
            </div>
            <div className="design-273" data-node-id="179:6841" data-name="Chip (앱 화면)">
              <p className="design-49" data-node-id="I179:6841;24:975">
                기타
              </p>
            </div>
          </div>
        </div>
        <div className="design-20" data-node-id="179:6842" data-name="field/나이">
          <p className="design-21" data-node-id="179:6843">
            나이
          </p>
          <div className="design-112" data-node-id="179:6844" data-name="input">
            <p className="design-270" data-node-id="179:6845">
              78세
            </p>
          </div>
        </div>
        <div className="design-20" data-node-id="179:6848" data-name="field/진행 단계">
          <p className="design-21" data-node-id="179:6849">
            현재 단계 (알고 있는 만큼만 선택해요)
          </p>
          <div className="design-181" data-node-id="179:6850" data-name="Frame">
            <Chip nodeId="179:6851" className="design-71" label="초기" />
            <div className="design-72" data-node-id="179:6852" data-name="Chip (앱 화면)">
              <p className="design-73" data-node-id="I179:6852;24:977">
                중기
              </p>
            </div>
            <Chip nodeId="179:6853" className="design-71" label="후기" />
            <Chip nodeId="179:6854" className="design-71" label="모르겠어요" />
          </div>
        </div>
        <div className="design-20" data-node-id="179:6855" data-name="field/돌봄 시 주의할 점">
          <p className="design-21" data-node-id="179:6856">
            돌봄 시 주의할 점
          </p>
          <div className="design-112" data-node-id="179:6857" data-name="input">
            <p className="design-270" data-node-id="179:6858">
              같은 질문을 자주 반복하세요
            </p>
          </div>
        </div>
        <div className="design-45" data-node-id="179:6859" data-name="spacer" />
        <a className="design-124" data-node-id="179:6860" data-name="Button (앱 화면)">
          <p className="design-125" data-node-id="I179:6860;24:968">
            다음
          </p>
        </a>
      </div>
    </div>;
}
