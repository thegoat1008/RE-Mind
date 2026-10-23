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
const imgIconSearch = `/assets/figma-v2/6edbc.svg`;
const imgIconEdit = `/assets/figma-v2/e0a11.svg`;
const imgIconHeart = `/assets/figma-v2/e6117.svg`;
const imgIconMsg = `/assets/figma-v2/0cf73.svg`;
const imgGroup = `/assets/figma-v2/492e0.svg`;
const imgGroup1 = `/assets/figma-v2/9a8d3.svg`;
const imgGroup2 = `/assets/figma-v2/acaf5.svg`;
const imgGroup3 = `/assets/figma-v2/611ff.svg`;
const imgGroup4 = `/assets/figma-v2/07ec0.svg`;
function Chip({ className, nodeId, label = "칩", state = "default" }) {
  return <div className={className || "design-48"} data-node-id={nodeId} data-name="Chip (앱 화면)">
      <p className="design-49" data-node-id="24:975">
        {label}
      </p>
    </div>;
}
export default function Component10() {
  return <div className="design-1" data-node-id="179:6303" data-name="10 커뮤니티">
      <div className="design-126" data-node-id="179:6304" data-name="iPhone 16 & 17 Pro - 2">
        <div className="design-3" data-node-id="I179:6304;486:2224" data-name="Status">
          <div className="design-3" data-node-id="I179:6304;486:2225" data-name="status/dark">
            <div className="design-4" data-node-id="I179:6304;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-5" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-6" data-node-id="I179:6304;486:2227" data-name="status/dark">
              <div className="design-7" data-node-id="I179:6304;486:2228" data-name="Status Icons">
                <div className="design-8" data-node-id="I179:6304;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-5" src={imgNetworkSignalDark} />
                </div>
                <div className="design-9" data-node-id="I179:6304;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-5" src={imgWiFiSignalDark} />
                </div>
                <div className="design-10" data-node-id="I179:6304;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-5" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-11" data-node-id="I179:6304;486:2249" data-name="Time / Dark">
                <div className="design-12" data-node-id="I179:6304;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-5" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-13" data-node-id="I179:6304;486:2251" data-name="Time / Dark">
                  <div className="design-14" data-node-id="I179:6304;486:2252" data-name="9:41">
                    <img alt="" className="design-5" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-127" data-node-id="179:6305" data-name="Content">
        <div className="design-128" data-node-id="179:6306" data-name="Header">
          <p className="design-129" data-node-id="179:6307">
            보호자 커뮤니티
          </p>
          <div className="design-130" data-node-id="179:6308" data-name="검색">
            <div className="design-92" data-node-id="179:6309" data-name="icon/search">
              <img alt="" className="design-5" src={imgIconSearch} />
            </div>
          </div>
        </div>
        <div className="design-131" data-node-id="179:6312" data-name="카테고리">
          <div className="design-132" data-node-id="179:6313" data-name="Chip (앱 화면)">
            <p className="design-133" data-node-id="I179:6313;24:977">{`👀  전체`}</p>
          </div>
          <Chip nodeId="179:6314" className="design-134" label="🔥  인기" />
          <Chip nodeId="179:6315" className="design-134" label="👍  추천" />
        </div>
        <a className="design-135" data-node-id="179:6316" data-name="글쓰기 FAB">
          <div className="design-92" data-node-id="179:6317" data-name="icon/edit">
            <img alt="" className="design-5" src={imgIconEdit} />
          </div>
          <p className="design-136" data-node-id="179:6319">
            글쓰기
          </p>
        </a>
        <div className="design-137" data-node-id="179:6320" data-name="Scroll">
          <a className="design-138" data-node-id="179:6321" data-name="게시글">
            <div className="design-139" data-node-id="179:6322" data-name="Frame">
              <div className="design-140" data-node-id="179:6323" data-name="tag">
                <p className="design-141" data-node-id="179:6324">
                  🔥 인기
                </p>
              </div>
              <div className="design-98" data-node-id="179:6325" data-name="Frame" />
              <p className="design-142" data-node-id="179:6326">
                30분 전
              </p>
            </div>
            <p className="design-143" data-node-id="179:6327">
              밤마다 깨시는 어머니, 이렇게 해봤어요
            </p>
            <div className="design-144" data-node-id="179:6328" data-name="Frame">
              <div className="design-145" data-node-id="179:6329" data-name="icon/heart">
                <img alt="" className="design-5" src={imgIconHeart} />
              </div>
              <p className="design-146" data-node-id="179:6331">
                24
              </p>
              <div className="design-147" data-node-id="179:6332" data-name="Rectangle" />
              <div className="design-145" data-node-id="179:6333" data-name="icon/msg">
                <img alt="" className="design-5" src={imgIconMsg} />
              </div>
              <p className="design-146" data-node-id="179:6335">
                8
              </p>
              <div className="design-98" data-node-id="179:6336" data-name="Frame" />
              <p className="design-142" data-node-id="179:6337">
                부끄러운 햄스터
              </p>
            </div>
          </a>
          <div className="design-148" data-node-id="179:6338" data-name="게시글">
            <div className="design-139" data-node-id="179:6339" data-name="Frame">
              <div className="design-140" data-node-id="179:6340" data-name="tag">
                <p className="design-149" data-node-id="179:6341">
                  👍 추천
                </p>
              </div>
              <div className="design-98" data-node-id="179:6342" data-name="Frame" />
              <p className="design-99" data-node-id="179:6343">
                2시간 전
              </p>
            </div>
            <p className="design-35" data-node-id="179:6344">
              혼자 감당하기 지칠 때 어떻게 하세요?
            </p>
            <div className="design-144" data-node-id="179:6345" data-name="Frame">
              <div className="design-145" data-node-id="179:6346" data-name="icon/heart">
                <img alt="" className="design-5" src={imgIconHeart} />
              </div>
              <p className="design-21" data-node-id="179:6348">
                41
              </p>
              <div className="design-147" data-node-id="179:6349" data-name="Rectangle" />
              <div className="design-145" data-node-id="179:6350" data-name="icon/msg">
                <img alt="" className="design-5" src={imgIconMsg} />
              </div>
              <p className="design-21" data-node-id="179:6352">
                12
              </p>
              <div className="design-98" data-node-id="179:6353" data-name="Frame" />
              <p className="design-99" data-node-id="179:6354">
                외향적인 고릴라
              </p>
            </div>
          </div>
          <div className="design-148" data-node-id="179:6355" data-name="게시글">
            <div className="design-139" data-node-id="179:6356" data-name="Frame">
              <div className="design-140" data-node-id="179:6357" data-name="tag">
                <p className="design-149" data-node-id="179:6358">
                  👍 추천
                </p>
              </div>
              <div className="design-98" data-node-id="179:6359" data-name="Frame" />
              <p className="design-99" data-node-id="179:6360">
                어제
              </p>
            </div>
            <p className="design-35" data-node-id="179:6361">
              장기요양등급 신청, 이것만 준비하세요
            </p>
            <div className="design-144" data-node-id="179:6362" data-name="Frame">
              <div className="design-145" data-node-id="179:6363" data-name="icon/heart">
                <img alt="" className="design-5" src={imgIconHeart} />
              </div>
              <p className="design-21" data-node-id="179:6365">
                63
              </p>
              <div className="design-147" data-node-id="179:6366" data-name="Rectangle" />
              <div className="design-145" data-node-id="179:6367" data-name="icon/msg">
                <img alt="" className="design-5" src={imgIconMsg} />
              </div>
              <p className="design-21" data-node-id="179:6369">
                17
              </p>
              <div className="design-98" data-node-id="179:6370" data-name="Frame" />
              <p className="design-99" data-node-id="179:6371">
                졸린 판다
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="design-75" data-node-id="179:6372" data-name="TabBar (앱 화면)">
        <div className="design-76" data-node-id="I179:6372;13:1014" data-name="tab/home">
          <div className="design-77" data-node-id="I179:6372;13:1015" data-name="icon/home">
            <div className="design-78" data-node-id="I179:6372;13:1016" data-name="Group">
              <div className="design-79">
                <img alt="" className="design-28" src={imgGroup} />
              </div>
            </div>
          </div>
          <p className="design-21" data-node-id="I179:6372;13:1018">
            홈
          </p>
        </div>
        <div className="design-76" data-node-id="I179:6372;13:1019" data-name="tab/calendar">
          <div className="design-77" data-node-id="I179:6372;13:1020" data-name="icon/calendar">
            <div className="design-80" data-node-id="I179:6372;13:1021" data-name="Group">
              <div className="design-81">
                <img alt="" className="design-28" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="design-21" data-node-id="I179:6372;13:1024">
            캘린더
          </p>
        </div>
        <div className="design-76" data-node-id="I179:6372;13:1025" data-name="tab/chat">
          <div className="design-77" data-node-id="I179:6372;13:1026" data-name="icon/chat">
            <div className="design-82" data-node-id="I179:6372;13:1027" data-name="Group">
              <div className="design-83">
                <img alt="" className="design-28" src={imgGroup2} />
              </div>
            </div>
          </div>
          <p className="design-21" data-node-id="I179:6372;13:1029">
            대화
          </p>
        </div>
        <div className="design-76" data-node-id="I179:6372;13:1030" data-name="tab/community">
          <div className="design-77" data-node-id="I179:6372;13:1031" data-name="icon/community">
            <div className="design-84" data-node-id="I179:6372;13:1032" data-name="Group">
              <div className="design-85">
                <img alt="" className="design-28" src={imgGroup3} />
              </div>
            </div>
          </div>
          <p className="design-56" data-node-id="I179:6372;13:1035">
            커뮤니티
          </p>
        </div>
        <div className="design-76" data-node-id="I179:6372;13:1036" data-name="tab/settings">
          <div className="design-77" data-node-id="I179:6372;13:1037" data-name="icon/settings">
            <div className="design-86" data-node-id="I179:6372;13:1038" data-name="Group">
              <div className="design-87">
                <img alt="" className="design-28" src={imgGroup4} />
              </div>
            </div>
          </div>
          <p className="design-21" data-node-id="I179:6372;13:1041">
            내 설정
          </p>
        </div>
      </div>
    </div>;
}
