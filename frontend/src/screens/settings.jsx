/** @jsxRuntime classic */
/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "../designRuntime.jsx";

const imgStatusDarkBackgroundMask = `/assets/figma/c9227.svg`;
const imgNetworkSignalDark = `/assets/figma/4c652.svg`;
const imgWiFiSignalDark = `/assets/figma/f883c.svg`;
const imgBatteryDark = `/assets/figma/9efe4.svg`;
const imgTimeDarkBackgroundMask = `/assets/figma/f965f.svg`;
const img941 = `/assets/figma/a1382.svg`;
const imgIconChevR = `/assets/figma/d7e34.svg`;
const imgToggle = `/assets/figma/272c2.svg`;
const imgGroup = `/assets/figma/3bacc.svg`;
const imgGroup1 = `/assets/figma/492e0.svg`;
const imgGroup2 = `/assets/figma/9a8d3.svg`;
const imgGroup3 = `/assets/figma/acaf5.svg`;
const imgGroup4 = `/assets/figma/a95ec.svg`;
const imgGroup5 = `/assets/figma/eb129.svg`;
function Chip({ className, label = "칩", state = "default" }) {
  const isActive = state === "active";
  return <div className={className || ` design-89 ${isActive ? "design-2" : "design-1"}`} id={isActive ? "node-24_976" : "node-24_974"}>
      {state === "default" && <p className="design-47" data-node-id="24:975">
          {label}
        </p>}
      {isActive && <p className="design-48" data-node-id="24:977">
          {label}
        </p>}
    </div>;
}
export default function Component11() {
  return <div className="design-5" data-node-id="16:1350" data-name="11 내 설정">
      <div className="design-6" data-node-id="16:1351" data-name="Status Bar">
        <div className="design-7" data-node-id="I16:1351;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I16:1351;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I16:1351;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I16:1351;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I16:1351;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I16:1351;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I16:1351;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I16:1351;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I16:1351;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I16:1351;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I16:1351;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I16:1351;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-49" data-node-id="16:1383" data-name="Content">
        <p className="design-50" data-node-id="16:1384">
          내 설정
        </p>
        <div className="design-51" data-node-id="29:970" data-name="Scroll">
          <div className="design-52" data-node-id="16:1385" data-name="프로필">
            <div className="design-53" data-node-id="16:1386" data-name="avatar">
              <p className="design-54" data-node-id="16:1387">
                지
              </p>
            </div>
            <div className="design-39" data-node-id="16:1388" data-name="text">
              <p className="design-40" data-node-id="16:1389">
                김지은
              </p>
              <p className="design-41" data-node-id="16:1390">
                jieun.kim@gmail.com
              </p>
            </div>
            <p className="design-55" data-node-id="16:1391">
              수정
            </p>
          </div>
          <p className="design-56" data-node-id="53:1311">
            도움 받기
          </p>
          <div className="design-57" data-node-id="53:1392" data-name="도움 받기">
            <a className="design-58" data-node-id="53:1393" data-name="row">
              <div className="design-59" data-node-id="53:1394" data-name="text">
                <p className="design-40" data-node-id="53:1395">
                  병원 찾기
                </p>
                <p className="design-41" data-node-id="53:1396">
                  가까운 치매안심센터 · 병원
                </p>
              </div>
              <div className="design-60" data-node-id="53:1397" data-name="icon/chevR">
                <img alt="" className="design-9" src={imgIconChevR} />
              </div>
            </a>
            <a className="design-58" data-node-id="53:1399" data-name="row">
              <div className="design-59" data-node-id="53:1400" data-name="text">
                <p className="design-40" data-node-id="53:1401">
                  치매 정책 안내
                </p>
                <p className="design-41" data-node-id="53:1402">
                  받을 수 있는 지원 알아보기
                </p>
              </div>
              <div className="design-60" data-node-id="53:1403" data-name="icon/chevR">
                <img alt="" className="design-9" src={imgIconChevR} />
              </div>
            </a>
            <a className="design-58" data-node-id="53:1405" data-name="row">
              <div className="design-59" data-node-id="53:1406" data-name="text">
                <p className="design-40" data-node-id="53:1407">
                  긴급 안내
                </p>
                <p className="design-41" data-node-id="53:1408">
                  119 · 상담전화 한눈에
                </p>
              </div>
              <div className="design-60" data-node-id="53:1409" data-name="icon/chevR">
                <img alt="" className="design-9" src={imgIconChevR} />
              </div>
            </a>
            <a className="design-58" data-node-id="75:1816" data-name="row">
              <div className="design-59" data-node-id="75:1817" data-name="text">
                <p className="design-40" data-node-id="75:1818">
                  치매 체크
                </p>
                <p className="design-41" data-node-id="75:1819">
                  우리 가족의 요즘 모습 살펴보기
                </p>
              </div>
              <div className="design-60" data-node-id="75:1820" data-name="icon/chevR">
                <img alt="" className="design-9" src={imgIconChevR} />
              </div>
            </a>
          </div>
          <p className="design-56" data-node-id="16:1392">
            돌봄
          </p>
          <div className="design-61" data-node-id="16:1393" data-name="돌봄">
            <div className="design-58" data-node-id="16:1394" data-name="row">
              <div className="design-39" data-node-id="16:1395" data-name="text">
                <p className="design-40" data-node-id="16:1396">
                  돌보는 분
                </p>
                <p className="design-41" data-node-id="16:1397">
                  김순자님 · 어머니
                </p>
              </div>
              <div className="design-60" data-node-id="16:1398" data-name="icon/chevR">
                <img alt="" className="design-9" src={imgIconChevR} />
              </div>
            </div>
            <a className="design-62" data-node-id="16:1400" data-name="row">
              <div className="design-59" data-node-id="16:1401" data-name="text">
                <p className="design-40" data-node-id="16:1402">
                  가족 이메일 · 알림
                </p>
                <p className="design-41" data-node-id="16:1403">
                  2명 · 매일 오전 8시
                </p>
              </div>
              <div className="design-60" data-node-id="16:1404" data-name="icon/chevR">
                <img alt="" className="design-9" src={imgIconChevR} />
              </div>
            </a>
          </div>
          <p className="design-56" data-node-id="16:1406">
            알림
          </p>
          <div className="design-63" data-node-id="16:1407" data-name="알림 설정">
            <div className="design-64" data-node-id="16:1408" data-name="row">
              <div className="design-39" data-node-id="16:1409" data-name="text">
                <p className="design-40" data-node-id="16:1410">
                  일정 알림 받기
                </p>
                <p className="design-41" data-node-id="16:1411">
                  약, 병원 일정을 알려드려요
                </p>
              </div>
              <div className="design-65" data-node-id="16:1412" data-name="toggle">
                <img alt="" className="design-9" src={imgToggle} />
              </div>
            </div>
            <div className="design-66" data-node-id="16:1414" data-name="divider" />
            <div className="design-64" data-node-id="16:1415" data-name="row">
              <div className="design-39" data-node-id="16:1416" data-name="text">
                <p className="design-40" data-node-id="16:1417">
                  가족에게도 알림
                </p>
                <p className="design-41" data-node-id="16:1418">
                  적어 둔 가족 이메일로 알려요
                </p>
              </div>
              <div className="design-65" data-node-id="16:1419" data-name="toggle">
                <img alt="" className="design-9" src={imgToggle} />
              </div>
            </div>
            <div className="design-66" data-node-id="53:1313" data-name="divider" />
            <div className="design-64" data-node-id="53:1314" data-name="row">
              <div className="design-39" data-node-id="53:1315" data-name="text">
                <p className="design-40" data-node-id="53:1316">
                  알림 내용 숨기기
                </p>
                <p className="design-41" data-node-id="53:1317">
                  잠금 화면에 내용이 보이지 않아요
                </p>
              </div>
              <div className="design-65" data-node-id="53:1318" data-name="toggle">
                <img alt="" className="design-9" src={imgToggle} />
              </div>
            </div>
          </div>
          <div className="design-67" data-node-id="53:1320" data-name="개인정보 안내">
            <div className="design-25" data-node-id="53:1321" data-name="icon/lock">
              <div className="design-68" data-node-id="53:1322" data-name="Group">
                <div className="design-69">
                  <img alt="" className="design-28" src={imgGroup} />
                </div>
              </div>
            </div>
            <p className="design-70" data-node-id="53:1325">
              AI 대화는 나만 볼 수 있어요. 가족에게 공유되지 않아요.
            </p>
          </div>
          <p className="design-56" data-node-id="16:1421">
            글자 크기
          </p>
          <div className="design-71" data-node-id="16:1422" data-name="chips">
            <Chip className="design-72 instance-settings-0" label="보통" />
            <Chip className="design-73 instance-settings-1" label="크게" state="active" />
            <Chip className="design-72 instance-settings-2" label="아주 크게" />
          </div>
          <div className="design-63" data-node-id="53:1348" data-name="알림 설정">
            <div className="design-64" data-node-id="53:1349" data-name="row">
              <div className="design-39" data-node-id="53:1350" data-name="text">
                <p className="design-40" data-node-id="53:1351">
                  로그인 유지
                </p>
                <p className="design-41" data-node-id="53:1352">
                  다시 로그인하지 않아도 돼요
                </p>
              </div>
              <div className="design-65" data-node-id="53:1353" data-name="toggle">
                <img alt="" className="design-9" src={imgToggle} />
              </div>
            </div>
          </div>
          <div className="design-74" data-node-id="16:1429" data-name="로그아웃">
            <p className="design-42" data-node-id="16:1430">
              로그아웃
            </p>
          </div>
        </div>
      </div>
      <div className="design-75" data-node-id="16:1431" data-name="TabBar (앱 화면)">
        <div className="design-76" data-node-id="I16:1431;13:1043" data-name="tab/home">
          <div className="design-77" data-node-id="I16:1431;13:1044" data-name="icon/home">
            <div className="design-78" data-node-id="I16:1431;13:1045" data-name="Group">
              <div className="design-79">
                <img alt="" className="design-28" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="design-80" data-node-id="I16:1431;13:1047">
            홈
          </p>
        </div>
        <div className="design-76" data-node-id="I16:1431;13:1048" data-name="tab/calendar">
          <div className="design-77" data-node-id="I16:1431;13:1049" data-name="icon/calendar">
            <div className="design-81" data-node-id="I16:1431;13:1050" data-name="Group">
              <div className="design-82">
                <img alt="" className="design-28" src={imgGroup2} />
              </div>
            </div>
          </div>
          <p className="design-80" data-node-id="I16:1431;13:1053">
            캘린더
          </p>
        </div>
        <div className="design-76" data-node-id="I16:1431;13:1054" data-name="tab/chat">
          <div className="design-77" data-node-id="I16:1431;13:1055" data-name="icon/chat">
            <div className="design-83" data-node-id="I16:1431;13:1056" data-name="Group">
              <div className="design-84">
                <img alt="" className="design-28" src={imgGroup3} />
              </div>
            </div>
          </div>
          <p className="design-80" data-node-id="I16:1431;13:1058">
            대화
          </p>
        </div>
        <div className="design-76" data-node-id="I16:1431;13:1059" data-name="tab/community">
          <div className="design-77" data-node-id="I16:1431;13:1060" data-name="icon/community">
            <div className="design-85" data-node-id="I16:1431;13:1061" data-name="Group">
              <div className="design-86">
                <img alt="" className="design-28" src={imgGroup4} />
              </div>
            </div>
          </div>
          <p className="design-80" data-node-id="I16:1431;13:1064">
            커뮤니티
          </p>
        </div>
        <div className="design-76" data-node-id="I16:1431;13:1065" data-name="tab/settings">
          <div className="design-77" data-node-id="I16:1431;13:1066" data-name="icon/settings">
            <div className="design-87" data-node-id="I16:1431;13:1067" data-name="Group">
              <div className="design-88">
                <img alt="" className="design-28" src={imgGroup5} />
              </div>
            </div>
          </div>
          <p className="design-55" data-node-id="I16:1431;13:1070">
            내 설정
          </p>
        </div>
      </div>
    </div>;
}
