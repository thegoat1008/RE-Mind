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
const imgIconSearch = `/assets/figma/89d4b.svg`;
const imgIconEdit = `/assets/figma/e0a11.svg`;
const imgIconHeart = `/assets/figma/5aeb7.svg`;
const imgIconMsg = `/assets/figma/0cf73.svg`;
const imgGroup = `/assets/figma/492e0.svg`;
const imgGroup1 = `/assets/figma/9a8d3.svg`;
const imgGroup2 = `/assets/figma/acaf5.svg`;
const imgGroup3 = `/assets/figma/f1834.svg`;
const imgGroup4 = `/assets/figma/07ec0.svg`;
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
export default function Component10() {
  return <div className="design-5" data-node-id="5:1329" data-name="10 커뮤니티">
      <div className="design-131" data-node-id="5:1330" data-name="iPhone 16 & 17 Pro - 2">
        <div className="design-7" data-node-id="I5:1330;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I5:1330;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I5:1330;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I5:1330;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I5:1330;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I5:1330;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I5:1330;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I5:1330;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I5:1330;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I5:1330;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I5:1330;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I5:1330;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-132" data-node-id="5:1331" data-name="Content">
        <div className="design-116" data-node-id="5:1332" data-name="Header">
          <p className="design-133" data-node-id="5:1333">
            보호자 커뮤니티
          </p>
          <div className="design-134" data-node-id="5:1334" data-name="검색">
            <div className="design-94" data-node-id="5:1335" data-name="icon/search">
              <img alt="" className="design-9" src={imgIconSearch} />
            </div>
          </div>
        </div>
        <div className="design-135" data-node-id="5:1338" data-name="카테고리">
          <Chip className="design-73 instance-community-0" label="전체" state="active" />
          <Chip className="design-72 instance-community-1" label="해결책" />
          <Chip className="design-72 instance-community-2" label="공감" />
        </div>
        <a className="design-136" data-node-id="5:1397" data-name="글쓰기 FAB">
          <div className="design-94" data-node-id="5:1398" data-name="icon/edit">
            <img alt="" className="design-9" src={imgIconEdit} />
          </div>
          <p className="design-137" data-node-id="5:1400">
            글쓰기
          </p>
        </a>
        <div className="design-138" data-node-id="29:968" data-name="Scroll">
          <a className="design-139" data-node-id="5:1343" data-name="게시글">
            <div className="design-140" data-node-id="5:1344" data-name="Frame">
              <div className="design-99" data-node-id="5:1345" data-name="tag">
                <p className="design-31" data-node-id="5:1346">
                  해결책을 주세요
                </p>
              </div>
              <div className="design-141" data-node-id="5:1347" data-name="Frame" />
              <p className="design-142" data-node-id="5:1348">
                30분 전
              </p>
            </div>
            <p className="design-143" data-node-id="5:1349">
              밤마다 깨시는 어머니, 이렇게 해봤어요
            </p>
            <p className="design-144" data-node-id="5:1350">
              <span className="original-text-line">저녁 산책을 30분 늘리고 낮잠을 줄였더니 훨씬</span><span className="original-text-line">안정되셨어요. 비슷한 경험 있으신 분 계신가요?</span>
            </p>
            <div className="design-145" data-node-id="5:1351" data-name="Frame">
              <div className="design-146" data-node-id="5:1352" data-name="icon/heart">
                <img alt="" className="design-9" src={imgIconHeart} />
              </div>
              <p className="design-147" data-node-id="5:1354">
                24
              </p>
              <div className="design-148" data-node-id="5:1355" data-name="Rectangle" />
              <div className="design-146" data-node-id="5:1356" data-name="icon/msg">
                <img alt="" className="design-9" src={imgIconMsg} />
              </div>
              <p className="design-147" data-node-id="5:1358">
                8
              </p>
              <div className="design-141" data-node-id="5:1359" data-name="Frame" />
              <p className="design-142" data-node-id="5:1360">
                부끄러운 햄스터
              </p>
            </div>
          </a>
          <div className="design-149" data-node-id="5:1361" data-name="게시글">
            <div className="design-140" data-node-id="5:1362" data-name="Frame">
              <div className="design-99" data-node-id="5:1363" data-name="tag">
                <p className="design-55" data-node-id="5:1364">
                  공감만 해주세요
                </p>
              </div>
              <div className="design-141" data-node-id="5:1365" data-name="Frame" />
              <p className="design-101" data-node-id="5:1366">
                2시간 전
              </p>
            </div>
            <p className="design-150" data-node-id="5:1367">
              혼자 감당하기 지칠 때 어떻게 하세요?
            </p>
            <p className="design-151" data-node-id="5:1368">
              요즘 잠도 못 자고 마음이 무거워요. 다들 어떻게 버티고 계신지 궁금해서 글 남겨요.
            </p>
            <div className="design-145" data-node-id="5:1369" data-name="Frame">
              <div className="design-146" data-node-id="5:1370" data-name="icon/heart">
                <img alt="" className="design-9" src={imgIconHeart} />
              </div>
              <p className="design-80" data-node-id="5:1372">
                41
              </p>
              <div className="design-148" data-node-id="5:1373" data-name="Rectangle" />
              <div className="design-146" data-node-id="5:1374" data-name="icon/msg">
                <img alt="" className="design-9" src={imgIconMsg} />
              </div>
              <p className="design-80" data-node-id="5:1376">
                12
              </p>
              <div className="design-141" data-node-id="5:1377" data-name="Frame" />
              <p className="design-101" data-node-id="5:1378">
                외향적인 고릴라
              </p>
            </div>
          </div>
          <div className="design-149" data-node-id="5:1379" data-name="게시글">
            <div className="design-140" data-node-id="5:1380" data-name="Frame">
              <div className="design-99" data-node-id="5:1381" data-name="tag">
                <p className="design-55" data-node-id="5:1382">
                  해결책을 주세요
                </p>
              </div>
              <div className="design-141" data-node-id="5:1383" data-name="Frame" />
              <p className="design-101" data-node-id="5:1384">
                어제
              </p>
            </div>
            <p className="design-150" data-node-id="5:1385">
              장기요양등급 신청, 이것만 준비하세요
            </p>
            <p className="design-151" data-node-id="5:1386">
              신청 서류와 방문 조사 때 꼭 말씀드려야 할 내용을 정리했어요. 저장해 두세요.
            </p>
            <div className="design-145" data-node-id="5:1387" data-name="Frame">
              <div className="design-146" data-node-id="5:1388" data-name="icon/heart">
                <img alt="" className="design-9" src={imgIconHeart} />
              </div>
              <p className="design-80" data-node-id="5:1390">
                63
              </p>
              <div className="design-148" data-node-id="5:1391" data-name="Rectangle" />
              <div className="design-146" data-node-id="5:1392" data-name="icon/msg">
                <img alt="" className="design-9" src={imgIconMsg} />
              </div>
              <p className="design-80" data-node-id="5:1394">
                17
              </p>
              <div className="design-141" data-node-id="5:1395" data-name="Frame" />
              <p className="design-101" data-node-id="5:1396">
                졸린 판다
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="design-75" data-node-id="13:1188" data-name="TabBar (앱 화면)">
        <div className="design-76" data-node-id="I13:1188;13:1014" data-name="tab/home">
          <div className="design-77" data-node-id="I13:1188;13:1015" data-name="icon/home">
            <div className="design-78" data-node-id="I13:1188;13:1016" data-name="Group">
              <div className="design-79">
                <img alt="" className="design-28" src={imgGroup} />
              </div>
            </div>
          </div>
          <p className="design-80" data-node-id="I13:1188;13:1018">
            홈
          </p>
        </div>
        <div className="design-76" data-node-id="I13:1188;13:1019" data-name="tab/calendar">
          <div className="design-77" data-node-id="I13:1188;13:1020" data-name="icon/calendar">
            <div className="design-81" data-node-id="I13:1188;13:1021" data-name="Group">
              <div className="design-82">
                <img alt="" className="design-28" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="design-80" data-node-id="I13:1188;13:1024">
            캘린더
          </p>
        </div>
        <div className="design-76" data-node-id="I13:1188;13:1025" data-name="tab/chat">
          <div className="design-77" data-node-id="I13:1188;13:1026" data-name="icon/chat">
            <div className="design-83" data-node-id="I13:1188;13:1027" data-name="Group">
              <div className="design-84">
                <img alt="" className="design-28" src={imgGroup2} />
              </div>
            </div>
          </div>
          <p className="design-80" data-node-id="I13:1188;13:1029">
            대화
          </p>
        </div>
        <div className="design-76" data-node-id="I13:1188;13:1030" data-name="tab/community">
          <div className="design-77" data-node-id="I13:1188;13:1031" data-name="icon/community">
            <div className="design-85" data-node-id="I13:1188;13:1032" data-name="Group">
              <div className="design-86">
                <img alt="" className="design-28" src={imgGroup3} />
              </div>
            </div>
          </div>
          <p className="design-55" data-node-id="I13:1188;13:1035">
            커뮤니티
          </p>
        </div>
        <div className="design-76" data-node-id="I13:1188;13:1036" data-name="tab/settings">
          <div className="design-77" data-node-id="I13:1188;13:1037" data-name="icon/settings">
            <div className="design-87" data-node-id="I13:1188;13:1038" data-name="Group">
              <div className="design-88">
                <img alt="" className="design-28" src={imgGroup4} />
              </div>
            </div>
          </div>
          <p className="design-80" data-node-id="I13:1188;13:1041">
            내 설정
          </p>
        </div>
      </div>
    </div>;
}
