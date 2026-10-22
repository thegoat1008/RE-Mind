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
const imgIconChevL = `/assets/figma/fa782.svg`;
function Character({ className }) {
  return <div className={className || "design-153"} data-node-id="5:332" data-name="온이 (Character)">
      <img alt="" className="design-9" src={imgCharacter} />
    </div>;
}
export default function Component113() {
  return <div className="design-5" data-node-id="47:1196" data-name="11-3 치매 정책 안내">
      <div className="design-6" data-node-id="47:1197" data-name="Status Bar">
        <div className="design-7" data-node-id="I47:1197;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I47:1197;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I47:1197;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I47:1197;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I47:1197;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I47:1197;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I47:1197;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I47:1197;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I47:1197;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I47:1197;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I47:1197;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I47:1197;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-350" data-node-id="47:1229" data-name="Content">
        <div className="design-20" data-node-id="47:1230" data-name="Header">
          <a className="design-21" data-node-id="47:1231" data-name="뒤로 버튼">
            <div className="design-22" data-node-id="47:1232" data-name="icon/chevL">
              <img alt="" className="design-9" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-23" data-node-id="47:1235">
            치매 정책 안내
          </p>
        </div>
        <div className="design-351" data-node-id="47:1236" data-name="Scroll">
          <div className="design-283" data-node-id="47:1237" data-name="온이 안내">
            <Character className="design-276" />
            <div className="design-284" data-node-id="47:1249">
              <p className="design-122">받을 수 있는 지원을</p>
              <p className="design-123">쉽게 모아 봤어요.</p>
            </div>
          </div>
          <div className="design-352" data-node-id="47:1250" data-name="정책 카드">
            <div className="design-98" data-node-id="47:1251" data-name="top">
              <div className="design-353" data-node-id="47:1252" data-name="tag">
                <p className="design-55" data-node-id="47:1253">
                  검진
                </p>
              </div>
              <p className="design-339" data-node-id="47:1254">
                무료 치매조기검진
              </p>
            </div>
            <p className="design-354" data-node-id="47:1255">
              만 60세 이상이면 신분증만 들고 가까운 치매안심센터에서 받을 수 있어요.
            </p>
          </div>
          <div className="design-352" data-node-id="47:1256" data-name="정책 카드">
            <div className="design-98" data-node-id="47:1257" data-name="top">
              <div className="design-353" data-node-id="47:1258" data-name="tag">
                <p className="design-55" data-node-id="47:1259">
                  지원금
                </p>
              </div>
              <p className="design-339" data-node-id="47:1260">
                치매 치료관리비 지원
              </p>
            </div>
            <p className="design-354" data-node-id="47:1261">
              소득 기준을 충족하면 진료비·약제비 본인부담을 월 3만 원 한도로 지원해요.
            </p>
          </div>
          <div className="design-352" data-node-id="47:1262" data-name="정책 카드">
            <div className="design-98" data-node-id="47:1263" data-name="top">
              <div className="design-353" data-node-id="47:1264" data-name="tag">
                <p className="design-55" data-node-id="47:1265">
                  요양
                </p>
              </div>
              <p className="design-339" data-node-id="47:1266">
                장기요양등급 신청
              </p>
            </div>
            <p className="design-354" data-node-id="47:1267">
              국민건강보험공단에 신청하면 요양 서비스를 이용할 수 있어요.
            </p>
          </div>
          <div className="design-352" data-node-id="47:1268" data-name="정책 카드">
            <div className="design-98" data-node-id="47:1269" data-name="top">
              <div className="design-353" data-node-id="47:1270" data-name="tag">
                <p className="design-55" data-node-id="47:1271">
                  안전
                </p>
              </div>
              <p className="design-339" data-node-id="47:1272">
                배회 어르신 인식표
              </p>
            </div>
            <p className="design-354" data-node-id="47:1273">
              길을 잃을 때를 대비해 치매안심센터에서 인식표를 받을 수 있어요.
            </p>
          </div>
          <div className="design-352" data-node-id="47:1274" data-name="정책 카드">
            <div className="design-98" data-node-id="47:1275" data-name="top">
              <div className="design-353" data-node-id="47:1276" data-name="tag">
                <p className="design-55" data-node-id="47:1277">
                  의료비
                </p>
              </div>
              <p className="design-339" data-node-id="47:1278">
                중증치매 산정특례
              </p>
            </div>
            <p className="design-354" data-node-id="47:1279">
              중증 치매로 확인되면 건강보험 의료비 부담이 줄어들어요.
            </p>
          </div>
          <p className="design-355" data-node-id="47:1280">
            지원 조건은 달라질 수 있어요. 가까운 치매안심센터나 치매상담콜센터에서 꼭 확인해 주세요.
          </p>
        </div>
        <div className="design-356" data-node-id="47:1281" data-name="Button (앱 화면)">
          <p className="design-3" data-node-id="I47:1281;24:968">
            치매상담콜센터 1899-9988
          </p>
        </div>
      </div>
    </div>;
}
