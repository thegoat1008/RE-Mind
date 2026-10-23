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
const imgIconChevL = `/assets/figma-v2/905bb.svg`;
function Character({ className }) {
  return <div className={className || "design-150"} data-node-id="5:332" data-name="온이 (Character)">
      <img alt="" className="design-5" src={imgCharacter} />
    </div>;
}
export default function Component113() {
  return <div className="design-1" data-node-id="179:7101" data-name="11-3 치매 정책 안내">
      <div className="design-2" data-node-id="179:7102" data-name="Status Bar">
        <div className="design-3" data-node-id="I179:7102;486:2224" data-name="Status">
          <div className="design-3" data-node-id="I179:7102;486:2225" data-name="status/dark">
            <div className="design-4" data-node-id="I179:7102;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-5" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-6" data-node-id="I179:7102;486:2227" data-name="status/dark">
              <div className="design-7" data-node-id="I179:7102;486:2228" data-name="Status Icons">
                <div className="design-8" data-node-id="I179:7102;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-5" src={imgNetworkSignalDark} />
                </div>
                <div className="design-9" data-node-id="I179:7102;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-5" src={imgWiFiSignalDark} />
                </div>
                <div className="design-10" data-node-id="I179:7102;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-5" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-11" data-node-id="I179:7102;486:2249" data-name="Time / Dark">
                <div className="design-12" data-node-id="I179:7102;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-5" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-13" data-node-id="I179:7102;486:2251" data-name="Time / Dark">
                  <div className="design-14" data-node-id="I179:7102;486:2252" data-name="9:41">
                    <img alt="" className="design-5" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-340" data-node-id="179:7103" data-name="Content">
        <div className="design-16" data-node-id="179:7104" data-name="Header">
          <a className="design-17" data-node-id="179:7105" data-name="뒤로 버튼">
            <div className="design-18" data-node-id="179:7106" data-name="icon/chevL">
              <img alt="" className="design-5" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-19" data-node-id="179:7108">
            치매 정책 안내
          </p>
        </div>
        <div className="design-341" data-node-id="179:7109" data-name="Scroll">
          <div className="design-274" data-node-id="179:7110" data-name="온이 안내">
            <Character className="design-266" />
            <div className="design-290" data-node-id="179:7112">
              <p className="design-115">받을 수 있는 지원을</p>
              <p className="design-116">쉽게 모아 봤어요.</p>
            </div>
          </div>
          <div className="design-342" data-node-id="179:7113" data-name="정책 카드">
            <div className="design-96" data-node-id="179:7114" data-name="top">
              <div className="design-343" data-node-id="179:7115" data-name="tag">
                <p className="design-56" data-node-id="179:7116">
                  검진
                </p>
              </div>
              <p className="design-344" data-node-id="179:7117">
                무료 치매조기검진
              </p>
            </div>
            <p className="design-345" data-node-id="179:7118">
              만 60세 이상이면 신분증만 들고 가까운 치매안심센터에서 받을 수 있어요.
            </p>
          </div>
          <div className="design-342" data-node-id="179:7119" data-name="정책 카드">
            <div className="design-96" data-node-id="179:7120" data-name="top">
              <div className="design-343" data-node-id="179:7121" data-name="tag">
                <p className="design-56" data-node-id="179:7122">
                  지원금
                </p>
              </div>
              <p className="design-344" data-node-id="179:7123">
                치매 치료관리비 지원
              </p>
            </div>
            <p className="design-345" data-node-id="179:7124">
              소득 기준을 충족하면 진료비·약제비 본인부담을 월 3만 원 한도로 지원해요.
            </p>
          </div>
          <div className="design-342" data-node-id="179:7125" data-name="정책 카드">
            <div className="design-96" data-node-id="179:7126" data-name="top">
              <div className="design-343" data-node-id="179:7127" data-name="tag">
                <p className="design-56" data-node-id="179:7128">
                  요양
                </p>
              </div>
              <p className="design-344" data-node-id="179:7129">
                장기요양등급 신청
              </p>
            </div>
            <p className="design-345" data-node-id="179:7130">
              국민건강보험공단에 신청하면 요양 서비스를 이용할 수 있어요.
            </p>
          </div>
          <div className="design-342" data-node-id="179:7131" data-name="정책 카드">
            <div className="design-96" data-node-id="179:7132" data-name="top">
              <div className="design-343" data-node-id="179:7133" data-name="tag">
                <p className="design-56" data-node-id="179:7134">
                  안전
                </p>
              </div>
              <p className="design-344" data-node-id="179:7135">
                배회 어르신 인식표
              </p>
            </div>
            <p className="design-345" data-node-id="179:7136">
              길을 잃을 때를 대비해 치매안심센터에서 인식표를 받을 수 있어요.
            </p>
          </div>
          <div className="design-342" data-node-id="179:7137" data-name="정책 카드">
            <div className="design-96" data-node-id="179:7138" data-name="top">
              <div className="design-343" data-node-id="179:7139" data-name="tag">
                <p className="design-56" data-node-id="179:7140">
                  의료비
                </p>
              </div>
              <p className="design-344" data-node-id="179:7141">
                중증치매 산정특례
              </p>
            </div>
            <p className="design-345" data-node-id="179:7142">
              중증 치매로 확인되면 건강보험 의료비 부담이 줄어들어요.
            </p>
          </div>
          <p className="design-346" data-node-id="179:7143">
            지원 조건은 달라질 수 있어요. 가까운 치매안심센터나 치매상담콜센터에서 꼭 확인해 주세요.
          </p>
        </div>
        <div className="design-347" data-node-id="179:7144" data-name="Button (앱 화면)">
          <p className="design-348" data-node-id="I179:7144;24:968">
            치매상담콜센터 1899-9988
          </p>
        </div>
      </div>
    </div>;
}
