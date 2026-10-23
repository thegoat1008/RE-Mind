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
const imgEllipse = `/assets/figma-v2/e30d9.svg`;
const imgIconMic = `/assets/figma-v2/4bcbe.svg`;
const imgIconSend = `/assets/figma-v2/7e014.svg`;
const imgGroup = `/assets/figma-v2/492e0.svg`;
const imgGroup1 = `/assets/figma-v2/9a8d3.svg`;
const imgGroup2 = `/assets/figma-v2/e4e9b.svg`;
const imgGroup3 = `/assets/figma-v2/90d71.svg`;
const imgGroup4 = `/assets/figma-v2/07ec0.svg`;
const imgGroup6 = `/assets/figma-v2/f591b.svg`;
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
export default function Component091Ai() {
  return <div className="design-1" data-node-id="220:7537" data-name="09 AI 챗팅">
      <div className="design-126" data-node-id="179:7202" data-name="iPhone 16 & 17 Pro - 2">
        <div className="design-3" data-node-id="I179:7202;486:2224" data-name="Status">
          <div className="design-3" data-node-id="I179:7202;486:2225" data-name="status/dark">
            <div className="design-4" data-node-id="I179:7202;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-5" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-6" data-node-id="I179:7202;486:2227" data-name="status/dark">
              <div className="design-7" data-node-id="I179:7202;486:2228" data-name="Status Icons">
                <div className="design-8" data-node-id="I179:7202;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-5" src={imgNetworkSignalDark} />
                </div>
                <div className="design-9" data-node-id="I179:7202;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-5" src={imgWiFiSignalDark} />
                </div>
                <div className="design-10" data-node-id="I179:7202;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-5" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-11" data-node-id="I179:7202;486:2249" data-name="Time / Dark">
                <div className="design-12" data-node-id="I179:7202;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-5" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-13" data-node-id="I179:7202;486:2251" data-name="Time / Dark">
                  <div className="design-14" data-node-id="I179:7202;486:2252" data-name="9:41">
                    <img alt="" className="design-5" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-151" data-node-id="179:7203" data-name="Content">
        <div className="design-152" data-node-id="179:7204" data-name="Header">
          <Character className="design-153" />
          <div className="design-154" data-node-id="179:7206" data-name="Frame">
            <p className="design-38" data-node-id="179:7207">
              온이
            </p>
            <div className="design-155" data-node-id="179:7208" data-name="Frame">
              <div className="design-156" data-node-id="179:7209" data-name="Ellipse">
                <img alt="" className="design-5" src={imgEllipse} />
              </div>
              <p className="design-157" data-node-id="179:7210">
                보호자님 곁에 있어요
              </p>
            </div>
          </div>
        </div>
        <p className="design-357" data-node-id="179:7211">
          온이는 의료 전문가를 대신하지 않아요
        </p>
        <div className="design-159" data-node-id="179:7212" data-name="입력창">
          <div className="design-90" data-node-id="179:7213" data-name="input">
            <p className="design-91" data-node-id="179:7214">
              온이에게 편하게 물어보세요
            </p>
            <div className="design-92" data-node-id="179:7215" data-name="icon/mic">
              <img alt="" className="design-5" src={imgIconMic} />
            </div>
          </div>
          <div className="design-93" data-node-id="179:7218" data-name="보내기">
            <div className="design-92" data-node-id="179:7219" data-name="icon/send">
              <img alt="" className="design-5" src={imgIconSend} />
            </div>
          </div>
        </div>
        <div className="design-358" data-node-id="179:7222" data-name="Scroll">
          <div className="design-162" data-node-id="179:7223" data-name="온이 메시지">
            <Character className="design-163" />
            <div className="design-359" data-node-id="179:7225" data-name="bubble">
              <p className="design-165" data-node-id="179:7226">
                안녕하세요, 지은님. 오늘 어머니와 어떤 일이 있었나요?
              </p>
            </div>
          </div>
          <div className="design-166" data-node-id="179:7227" data-name="내 메시지">
            <div className="design-360" data-node-id="179:7228" data-name="bubble">
              <div className="design-168" data-node-id="179:7229">
                <p className="design-115">엄마가 같은 질문을</p>
                <p className="design-115">계속 반복하세요.</p>
                <p className="design-116">어떻게 대답해야 할까요?</p>
              </div>
            </div>
          </div>
          <div className="design-162" data-node-id="179:7230" data-name="온이 메시지">
            <Character className="design-163" />
            <div className="design-359" data-node-id="179:7232" data-name="bubble">
              <div className="design-169" data-node-id="179:7233">
                <p className="design-170">많이 지치셨죠.</p>
                <p className="design-170">같은 말을 반복하는 건</p>
                <p className="design-170">흔히 있는 증상이에요.</p>
                <p className="design-170">​</p>
                <p className="design-170">· 처음 듣는 것처럼 차분하게</p>
                <p className="design-170">· 설명보다 감정에 공감하기</p>
                <p className="design-171">· 메모나 시계로 시선 돌리기</p>
              </div>
            </div>
          </div>
          <div className="design-271" data-node-id="179:7234" data-name="빠른 질문">
            <Chip nodeId="179:7235" className="design-71" label="밤에 배회하세요" />
            <Chip nodeId="179:7236" className="design-71" label="약을 거부하세요" />
          </div>
        </div>
      </div>
      <div className="design-75" data-node-id="179:7237" data-name="TabBar (앱 화면)">
        <div className="design-76" data-node-id="I179:7237;13:985" data-name="tab/home">
          <div className="design-77" data-node-id="I179:7237;13:986" data-name="icon/home">
            <div className="design-78" data-node-id="I179:7237;13:987" data-name="Group">
              <div className="design-79">
                <img alt="" className="design-28" src={imgGroup} />
              </div>
            </div>
          </div>
          <p className="design-21" data-node-id="I179:7237;13:989">
            홈
          </p>
        </div>
        <div className="design-76" data-node-id="I179:7237;13:990" data-name="tab/calendar">
          <div className="design-77" data-node-id="I179:7237;13:991" data-name="icon/calendar">
            <div className="design-80" data-node-id="I179:7237;13:992" data-name="Group">
              <div className="design-81">
                <img alt="" className="design-28" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="design-21" data-node-id="I179:7237;13:995">
            캘린더
          </p>
        </div>
        <div className="design-76" data-node-id="I179:7237;13:996" data-name="tab/chat">
          <div className="design-77" data-node-id="I179:7237;13:997" data-name="icon/chat">
            <div className="design-82" data-node-id="I179:7237;13:998" data-name="Group">
              <div className="design-83">
                <img alt="" className="design-28" src={imgGroup2} />
              </div>
            </div>
          </div>
          <p className="design-56" data-node-id="I179:7237;13:1000">
            대화
          </p>
        </div>
        <div className="design-76" data-node-id="I179:7237;13:1001" data-name="tab/community">
          <div className="design-77" data-node-id="I179:7237;13:1002" data-name="icon/community">
            <div className="design-84" data-node-id="I179:7237;13:1003" data-name="Group">
              <div className="design-85">
                <img alt="" className="design-28" src={imgGroup3} />
              </div>
            </div>
          </div>
          <p className="design-21" data-node-id="I179:7237;13:1006">
            커뮤니티
          </p>
        </div>
        <div className="design-76" data-node-id="I179:7237;13:1007" data-name="tab/settings">
          <div className="design-77" data-node-id="I179:7237;13:1008" data-name="icon/settings">
            <div className="design-86" data-node-id="I179:7237;13:1009" data-name="Group">
              <div className="design-87">
                <img alt="" className="design-28" src={imgGroup4} />
              </div>
            </div>
          </div>
          <p className="design-21" data-node-id="I179:7237;13:1012">
            내 설정
          </p>
        </div>
      </div>
      <div className="design-361" data-node-id="179:7238" data-name="dim" />
      <div className="design-362" data-node-id="179:7239" data-name="음성 입력 시트">
        <div className="design-363" data-node-id="179:7240" data-name="handle" />
        <p className="design-364" data-node-id="179:7241">
          말씀해 주세요. 듣고 있어요.
        </p>
        <p className="design-365" data-node-id="179:7242">
          “엄마가 오늘도 같은 질문을 계속 하세요…”
        </p>
        <div className="design-369" data-node-id="179:7260" data-name="mic ring">
          <div className="design-370" data-node-id="179:7261" data-name="mic">
            <div className="design-371" data-node-id="179:7262" data-name="icon/mic">
              <div className="design-118" data-node-id="179:7263" data-name="Group">
                <div className="design-372">
                  <img alt="" className="design-28" src={imgGroup6} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="design-373" data-node-id="179:7267" data-name="버튼">
          <a className="design-374" data-node-id="179:7268" data-name="Button (앱 화면)">
            <p className="design-47" data-node-id="I179:7268;24:970">
              취소
            </p>
          </a>
          <a className="design-375" data-node-id="179:7269" data-name="Button (앱 화면)">
            <p className="design-125" data-node-id="I179:7269;24:968">
              다 말했어요
            </p>
          </a>
        </div>
      </div>
    </div>;
}
