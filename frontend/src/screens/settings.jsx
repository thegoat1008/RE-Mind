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
const imgIconChevR = `/assets/figma-v2/d7e34.svg`;
const imgToggle = `/assets/figma-v2/463bf.svg`;
const imgGroup = `/assets/figma-v2/daa30.svg`;
const imgGroup1 = `/assets/figma-v2/492e0.svg`;
const imgGroup2 = `/assets/figma-v2/9a8d3.svg`;
const imgGroup3 = `/assets/figma-v2/acaf5.svg`;
const imgGroup4 = `/assets/figma-v2/90d71.svg`;
const imgGroup5 = `/assets/figma-v2/0d8b1.svg`;
function Chip({ className, nodeId, label = "칩", state = "default" }) {
  return <div className={className || "design-48"} data-node-id={nodeId} data-name="Chip (앱 화면)">
      <p className="design-49" data-node-id="24:975">
        {label}
      </p>
    </div>;
}
export default function Component11() {
  return <div className="design-1" data-node-id="179:6116" data-name="11 내 설정">
      <div className="design-2" data-node-id="179:6117" data-name="Status Bar">
        <div className="design-3" data-node-id="I179:6117;486:2224" data-name="Status">
          <div className="design-3" data-node-id="I179:6117;486:2225" data-name="status/dark">
            <div className="design-4" data-node-id="I179:6117;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-5" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-6" data-node-id="I179:6117;486:2227" data-name="status/dark">
              <div className="design-7" data-node-id="I179:6117;486:2228" data-name="Status Icons">
                <div className="design-8" data-node-id="I179:6117;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-5" src={imgNetworkSignalDark} />
                </div>
                <div className="design-9" data-node-id="I179:6117;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-5" src={imgWiFiSignalDark} />
                </div>
                <div className="design-10" data-node-id="I179:6117;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-5" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-11" data-node-id="I179:6117;486:2249" data-name="Time / Dark">
                <div className="design-12" data-node-id="I179:6117;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-5" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-13" data-node-id="I179:6117;486:2251" data-name="Time / Dark">
                  <div className="design-14" data-node-id="I179:6117;486:2252" data-name="9:41">
                    <img alt="" className="design-5" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-50" data-node-id="179:6118" data-name="Content">
        <p className="design-51" data-node-id="179:6119">
          내 설정
        </p>
        <div className="design-52" data-node-id="179:6120" data-name="Scroll">
          <div className="design-53" data-node-id="179:6121" data-name="프로필">
            <div className="design-54" data-node-id="179:6122" data-name="avatar">
              <p className="design-55" data-node-id="179:6123">
                지
              </p>
            </div>
            <div className="design-39" data-node-id="179:6124" data-name="text">
              <p className="design-40" data-node-id="179:6125">
                김지은
              </p>
              <p className="design-41" data-node-id="179:6126">
                jieun.kim@gmail.com
              </p>
            </div>
            <p className="design-56" data-node-id="179:6127">
              수정
            </p>
          </div>
          <p className="design-57" data-node-id="179:6128">
            도움 받기
          </p>
          <div className="design-58" data-node-id="179:6129" data-name="도움 받기">
            <a className="design-59" data-node-id="179:6130" data-name="row">
              <div className="design-60" data-node-id="179:6131" data-name="text">
                <p className="design-40" data-node-id="179:6132">
                  병원 찾기
                </p>
                <p className="design-41" data-node-id="179:6133">
                  가까운 치매안심센터 · 병원
                </p>
              </div>
              <div className="design-61" data-node-id="179:6134" data-name="icon/chevR">
                <img alt="" className="design-5" src={imgIconChevR} />
              </div>
            </a>
            <a className="design-59" data-node-id="179:6136" data-name="row">
              <div className="design-60" data-node-id="179:6137" data-name="text">
                <p className="design-40" data-node-id="179:6138">
                  치매 정책 안내
                </p>
                <p className="design-41" data-node-id="179:6139">
                  받을 수 있는 지원 알아보기
                </p>
              </div>
              <div className="design-61" data-node-id="179:6140" data-name="icon/chevR">
                <img alt="" className="design-5" src={imgIconChevR} />
              </div>
            </a>
            <a className="design-59" data-node-id="179:6142" data-name="row">
              <div className="design-60" data-node-id="179:6143" data-name="text">
                <p className="design-40" data-node-id="179:6144">
                  긴급 안내
                </p>
                <p className="design-41" data-node-id="179:6145">
                  119 · 상담전화 한눈에
                </p>
              </div>
              <div className="design-61" data-node-id="179:6146" data-name="icon/chevR">
                <img alt="" className="design-5" src={imgIconChevR} />
              </div>
            </a>
          </div>
          <p className="design-57" data-node-id="179:6154">
            돌봄
          </p>
          <div className="design-20" data-node-id="179:6155" data-name="돌봄">
            <div className="design-59" data-node-id="179:6156" data-name="row">
              <div className="design-39" data-node-id="179:6157" data-name="text">
                <p className="design-40" data-node-id="179:6158">
                  돌보는 분
                </p>
                <p className="design-41" data-node-id="179:6159">
                  김순자님 · 어머니
                </p>
              </div>
              <div className="design-61" data-node-id="179:6160" data-name="icon/chevR">
                <img alt="" className="design-5" src={imgIconChevR} />
              </div>
            </div>
            <a className="design-62" data-node-id="179:6162" data-name="row">
              <div className="design-60" data-node-id="179:6163" data-name="text">
                <p className="design-40" data-node-id="179:6164">
                  가족 코드 · 함께 보기
                </p>
                <p className="design-41" data-node-id="179:6165">
                  가족 2명 연결됨
                </p>
              </div>
              <div className="design-61" data-node-id="179:6166" data-name="icon/chevR">
                <img alt="" className="design-5" src={imgIconChevR} />
              </div>
            </a>
          </div>
          <p className="design-57" data-node-id="179:6168">
            알림
          </p>
          <div className="design-63" data-node-id="179:6169" data-name="알림 설정">
            <div className="design-64" data-node-id="179:6170" data-name="row">
              <div className="design-39" data-node-id="179:6171" data-name="text">
                <p className="design-40" data-node-id="179:6172">
                  일정 알림 받기
                </p>
                <p className="design-41" data-node-id="179:6173">
                  약, 병원 일정을 알려드려요
                </p>
              </div>
              <div className="design-44" data-node-id="179:6174" data-name="toggle">
                <img alt="" className="design-5" src={imgToggle} />
              </div>
            </div>
            <div className="design-65" data-node-id="179:6176" data-name="divider" />
            <div className="design-64" data-node-id="179:6177" data-name="row">
              <div className="design-39" data-node-id="179:6178" data-name="text">
                <p className="design-40" data-node-id="179:6179">
                  가족에게도 알림
                </p>
                <p className="design-41" data-node-id="179:6180">
                  연결된 가족에게도 알려요
                </p>
              </div>
              <div className="design-44" data-node-id="179:6181" data-name="toggle">
                <img alt="" className="design-5" src={imgToggle} />
              </div>
            </div>
            <div className="design-65" data-node-id="179:6183" data-name="divider" />
            <div className="design-64" data-node-id="179:6184" data-name="row">
              <div className="design-39" data-node-id="179:6185" data-name="text">
                <p className="design-40" data-node-id="179:6186">
                  알림 내용 숨기기
                </p>
                <p className="design-41" data-node-id="179:6187">
                  잠금 화면에 내용이 보이지 않아요
                </p>
              </div>
              <div className="design-44" data-node-id="179:6188" data-name="toggle">
                <img alt="" className="design-5" src={imgToggle} />
              </div>
            </div>
          </div>
          <div className="design-66" data-node-id="179:6190" data-name="개인정보 안내">
            <div className="design-67" data-node-id="179:6191" data-name="icon/lock">
              <div className="design-68" data-node-id="179:6192" data-name="Group">
                <div className="design-69">
                  <img alt="" className="design-28" src={imgGroup} />
                </div>
              </div>
            </div>
            <p className="design-70" data-node-id="179:6195">
              AI 대화는 나만 볼 수 있어요. 가족에게 공유되지 않아요.
            </p>
          </div>
          <p className="design-57" data-node-id="179:6196">
            글자 크기
          </p>
          <div className="design-24" data-node-id="179:6197" data-name="chips">
            <Chip nodeId="179:6198" className="design-71" label="보통" />
            <div className="design-72" data-node-id="179:6199" data-name="Chip (앱 화면)">
              <p className="design-73" data-node-id="I179:6199;24:977">
                크게
              </p>
            </div>
            <Chip nodeId="179:6200" className="design-71" label="아주 크게" />
          </div>
          <div className="design-63" data-node-id="179:6201" data-name="알림 설정">
            <div className="design-64" data-node-id="179:6202" data-name="row">
              <div className="design-39" data-node-id="179:6203" data-name="text">
                <p className="design-40" data-node-id="179:6204">
                  로그인 유지
                </p>
                <p className="design-41" data-node-id="179:6205">
                  다시 로그인하지 않아도 돼요
                </p>
              </div>
              <div className="design-44" data-node-id="179:6206" data-name="toggle">
                <img alt="" className="design-5" src={imgToggle} />
              </div>
            </div>
          </div>
          <div className="design-74" data-node-id="179:6208" data-name="로그아웃">
            <p className="design-42" data-node-id="179:6209">
              로그아웃
            </p>
          </div>
        </div>
      </div>
      <div className="design-75" data-node-id="179:6210" data-name="TabBar (앱 화면)">
        <div className="design-76" data-node-id="I179:6210;13:1043" data-name="tab/home">
          <div className="design-77" data-node-id="I179:6210;13:1044" data-name="icon/home">
            <div className="design-78" data-node-id="I179:6210;13:1045" data-name="Group">
              <div className="design-79">
                <img alt="" className="design-28" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="design-21" data-node-id="I179:6210;13:1047">
            홈
          </p>
        </div>
        <div className="design-76" data-node-id="I179:6210;13:1048" data-name="tab/calendar">
          <div className="design-77" data-node-id="I179:6210;13:1049" data-name="icon/calendar">
            <div className="design-80" data-node-id="I179:6210;13:1050" data-name="Group">
              <div className="design-81">
                <img alt="" className="design-28" src={imgGroup2} />
              </div>
            </div>
          </div>
          <p className="design-21" data-node-id="I179:6210;13:1053">
            캘린더
          </p>
        </div>
        <div className="design-76" data-node-id="I179:6210;13:1054" data-name="tab/chat">
          <div className="design-77" data-node-id="I179:6210;13:1055" data-name="icon/chat">
            <div className="design-82" data-node-id="I179:6210;13:1056" data-name="Group">
              <div className="design-83">
                <img alt="" className="design-28" src={imgGroup3} />
              </div>
            </div>
          </div>
          <p className="design-21" data-node-id="I179:6210;13:1058">
            대화
          </p>
        </div>
        <div className="design-76" data-node-id="I179:6210;13:1059" data-name="tab/community">
          <div className="design-77" data-node-id="I179:6210;13:1060" data-name="icon/community">
            <div className="design-84" data-node-id="I179:6210;13:1061" data-name="Group">
              <div className="design-85">
                <img alt="" className="design-28" src={imgGroup4} />
              </div>
            </div>
          </div>
          <p className="design-21" data-node-id="I179:6210;13:1064">
            커뮤니티
          </p>
        </div>
        <div className="design-76" data-node-id="I179:6210;13:1065" data-name="tab/settings">
          <div className="design-77" data-node-id="I179:6210;13:1066" data-name="icon/settings">
            <div className="design-86" data-node-id="I179:6210;13:1067" data-name="Group">
              <div className="design-87">
                <img alt="" className="design-28" src={imgGroup5} />
              </div>
            </div>
          </div>
          <p className="design-56" data-node-id="I179:6210;13:1070">
            내 설정
          </p>
        </div>
      </div>
    </div>;
}
