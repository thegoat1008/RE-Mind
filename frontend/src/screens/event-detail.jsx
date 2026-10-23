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
const imgPill = `/assets/figma-v2/67b88.svg`;
export default function Component082() {
  return <div className="design-1" data-node-id="179:7724" data-name="08-2 일정 상세">
      <div className="design-2" data-node-id="179:7725" data-name="Status Bar">
        <div className="design-3" data-node-id="I179:7725;486:2224" data-name="Status">
          <div className="design-3" data-node-id="I179:7725;486:2225" data-name="status/dark">
            <div className="design-4" data-node-id="I179:7725;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-5" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-6" data-node-id="I179:7725;486:2227" data-name="status/dark">
              <div className="design-7" data-node-id="I179:7725;486:2228" data-name="Status Icons">
                <div className="design-8" data-node-id="I179:7725;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-5" src={imgNetworkSignalDark} />
                </div>
                <div className="design-9" data-node-id="I179:7725;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-5" src={imgWiFiSignalDark} />
                </div>
                <div className="design-10" data-node-id="I179:7725;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-5" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-11" data-node-id="I179:7725;486:2249" data-name="Time / Dark">
                <div className="design-12" data-node-id="I179:7725;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-5" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-13" data-node-id="I179:7725;486:2251" data-name="Time / Dark">
                  <div className="design-14" data-node-id="I179:7725;486:2252" data-name="9:41">
                    <img alt="" className="design-5" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-401" data-node-id="179:7726" data-name="Content">
        <div className="design-16" data-node-id="179:7727" data-name="Header">
          <a className="design-17" data-node-id="179:7728" data-name="뒤로 버튼">
            <div className="design-18" data-node-id="179:7729" data-name="icon/chevL">
              <img alt="" className="design-5" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-19" data-node-id="179:7731">
            일정 상세
          </p>
        </div>
        <div className="design-402" data-node-id="179:7732" data-name="제목">
          <div className="design-353" data-node-id="179:7733" data-name="icon">
            <div className="design-61" data-node-id="189:10274" data-name="pill">
              <img alt="" className="design-5" src={imgPill} />
            </div>
          </div>
          <p className="design-129" data-node-id="179:7738">
            저녁 약 복용
          </p>
        </div>
        <div className="design-403" data-node-id="179:7739" data-name="정보">
          <div className="design-404" data-node-id="179:7740" data-name="row">
            <p className="design-405" data-node-id="179:7741">
              날짜
            </p>
            <p className="design-122" data-node-id="179:7742">
              10월 18일
            </p>
          </div>
          <div className="design-65" data-node-id="179:7743" data-name="divider" />
          <div className="design-404" data-node-id="179:7744" data-name="row">
            <p className="design-405" data-node-id="179:7745">
              시간
            </p>
            <p className="design-122" data-node-id="179:7746">
              오후 7:00
            </p>
          </div>
          <div className="design-65" data-node-id="179:7747" data-name="divider" />
          <div className="design-404" data-node-id="179:7748" data-name="row">
            <p className="design-405" data-node-id="179:7749">
              반복
            </p>
            <p className="design-122" data-node-id="179:7750">
              매일
            </p>
          </div>
          <div className="design-65" data-node-id="179:7751" data-name="divider" />
          <div className="design-404" data-node-id="179:7752" data-name="row">
            <p className="design-405" data-node-id="179:7753">
              알림
            </p>
            <p className="design-122" data-node-id="179:7754">
              30분 전
            </p>
          </div>
        </div>
        <div className="design-406" data-node-id="179:7755" data-name="spacer" />
        <a className="design-124" data-node-id="179:7756" data-name="Button (앱 화면)">
          <p className="design-125" data-node-id="I179:7756;24:968">
            수정하기
          </p>
        </a>
        <a className="design-46" data-node-id="179:7757" data-name="Button (앱 화면)">
          <p className="design-47" data-node-id="I179:7757;24:970">
            삭제
          </p>
        </a>
      </div>
    </div>;
}
