/** @jsxRuntime classic */
/** @jsx h */
/** @jsxFrag Fragment */
import { useContext } from 'react'
import { h, Fragment, DesignContext } from '../designRuntime.jsx'

const imgStatusDarkBackgroundMask = `/assets/figma-v2/c9227.svg`;
const imgNetworkSignalDark = `/assets/figma-v2/4c652.svg`;
const imgWiFiSignalDark = `/assets/figma-v2/f883c.svg`;
const imgBatteryDark = `/assets/figma-v2/9efe4.svg`;
const imgTimeDarkBackgroundMask = `/assets/figma-v2/f965f.svg`;
const img941 = `/assets/figma-v2/a1382.svg`;
const imgIconChevL = `/assets/figma-v2/905bb.svg`;
const imgPill = `/assets/figma-v2/67b88.svg`;
const imgPlus = `/assets/figma-v2/096a7.svg`;
export default function Component072() {
  const { notificationsRead, markAllNotificationsRead } = useContext(DesignContext)
  return <div className="design-1" data-node-id="179:6671" data-name="07-2 알림">
      <div className="design-2" data-node-id="179:6672" data-name="Status Bar">
        <div className="design-3" data-node-id="I179:6672;486:2224" data-name="Status">
          <div className="design-3" data-node-id="I179:6672;486:2225" data-name="status/dark">
            <div className="design-4" data-node-id="I179:6672;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-5" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-6" data-node-id="I179:6672;486:2227" data-name="status/dark">
              <div className="design-7" data-node-id="I179:6672;486:2228" data-name="Status Icons">
                <div className="design-8" data-node-id="I179:6672;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-5" src={imgNetworkSignalDark} />
                </div>
                <div className="design-9" data-node-id="I179:6672;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-5" src={imgWiFiSignalDark} />
                </div>
                <div className="design-10" data-node-id="I179:6672;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-5" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-11" data-node-id="I179:6672;486:2249" data-name="Time / Dark">
                <div className="design-12" data-node-id="I179:6672;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-5" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-13" data-node-id="I179:6672;486:2251" data-name="Time / Dark">
                  <div className="design-14" data-node-id="I179:6672;486:2252" data-name="9:41">
                    <img alt="" className="design-5" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-222" data-node-id="179:6673" data-name="Content">
        <div className="design-223" data-node-id="179:6674" data-name="Header">
          <div className="design-224" data-node-id="179:6675" data-name="뒤로 버튼">
            <div className="design-18" data-node-id="179:6676" data-name="icon/chevL">
              <img alt="" className="design-5" src={imgIconChevL} />
            </div>
          </div>
          <p className="design-225" data-node-id="179:6678">
            알림
          </p>
          <button type="button" className="design-226" data-node-id="179:6679"
            data-interactive="true" onClick={markAllNotificationsRead}>
            모두 읽음
          </button>
        </div>
        <p className="design-35" data-node-id="179:6680">
          오늘
        </p>
        <div className="design-36" data-node-id="179:6681" data-name="list">
          <div className="design-227" data-node-id="179:6682" data-name="알림">
            <div className="design-210" data-node-id="179:6683" data-name="Frame">
              <div className="design-61" data-node-id="189:10266" data-name="pill">
                <img alt="" className="design-5" src={imgPill} />
              </div>
            </div>
            <div className="design-228" data-node-id="179:6686" data-name="text">
              <p className="design-40" data-node-id="179:6687">
                저녁 약 복용 30분 전이에요
              </p>
              <p className="design-41" data-node-id="179:6688">
                오후 6:30
              </p>
            </div>
            {!notificationsRead && <div className="design-229" data-node-id="179:6689" data-name="unread" />}
          </div>
          <div className="design-227" data-node-id="179:6690" data-name="알림">
            <div className="design-210" data-node-id="179:6691" data-name="Frame">
              <div className="design-61" data-node-id="179:6692" data-name="plus">
                <img alt="" className="design-5" src={imgPlus} />
              </div>
            </div>
            <div className="design-228" data-node-id="179:6694" data-name="text">
              <p className="design-40" data-node-id="179:6695">
                민수님이 일정을 추가했어요
              </p>
              <p className="design-41" data-node-id="179:6696">
                서울행복병원 진료 · 오전 9:12
              </p>
            </div>
            {!notificationsRead && <div className="design-229" data-node-id="179:6697" data-name="unread" />}
          </div>
        </div>
        <p className="design-35" data-node-id="179:6698">
          어제
        </p>
        <div className="design-36" data-node-id="179:6699" data-name="list">
          <div className="design-227" data-node-id="179:6700" data-name="알림">
            <div className="design-210" data-node-id="179:6701" data-name="Frame">
              <p className="design-55" data-node-id="186:10135">
                이
              </p>
            </div>
            <div className="design-228" data-node-id="179:6704" data-name="text">
              <p className="design-40" data-node-id="179:6705">
                가족에 이영희님이 가입했어요
              </p>
              <p className="design-41" data-node-id="179:6706">
                어제 오후 3:40
              </p>
            </div>
          </div>
          <div className="design-227" data-node-id="179:6707" data-name="알림">
            <div className="design-210" data-node-id="179:6708" data-name="Frame">
              <div className="design-61" data-node-id="179:6709" data-name="pill">
                <img alt="" className="design-5" src={imgPill} />
              </div>
            </div>
            <div className="design-228" data-node-id="179:6711" data-name="text">
              <p className="design-40" data-node-id="179:6712">
                아침 약 복용을 완료했어요
              </p>
              <p className="design-41" data-node-id="179:6713">
                어제 오전 8:05
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
}
