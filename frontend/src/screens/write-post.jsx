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
const imgGroup = `/assets/figma-v2/f405f.svg`;
const imgGroup1 = `/assets/figma-v2/daa30.svg`;
export default function Component101() {
  return <div className="design-1" data-node-id="179:6265" data-name="10-1 글쓰기">
      <div className="design-2" data-node-id="179:6266" data-name="Status Bar">
        <div className="design-3" data-node-id="I179:6266;486:2224" data-name="Status">
          <div className="design-3" data-node-id="I179:6266;486:2225" data-name="status/dark">
            <div className="design-4" data-node-id="I179:6266;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-5" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-6" data-node-id="I179:6266;486:2227" data-name="status/dark">
              <div className="design-7" data-node-id="I179:6266;486:2228" data-name="Status Icons">
                <div className="design-8" data-node-id="I179:6266;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-5" src={imgNetworkSignalDark} />
                </div>
                <div className="design-9" data-node-id="I179:6266;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-5" src={imgWiFiSignalDark} />
                </div>
                <div className="design-10" data-node-id="I179:6266;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-5" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-11" data-node-id="I179:6266;486:2249" data-name="Time / Dark">
                <div className="design-12" data-node-id="I179:6266;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-5" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-13" data-node-id="I179:6266;486:2251" data-name="Time / Dark">
                  <div className="design-14" data-node-id="I179:6266;486:2252" data-name="9:41">
                    <img alt="" className="design-5" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-111" data-node-id="179:6267" data-name="Content">
        <div className="design-16" data-node-id="179:6268" data-name="Header">
          <a className="design-17" data-node-id="179:6269" data-name="뒤로 버튼">
            <div className="design-18" data-node-id="179:6270" data-name="icon/chevL">
              <img alt="" className="design-5" src={imgIconChevL} />
            </div>
          </a>
          <p className="design-19" data-node-id="179:6272">
            글쓰기
          </p>
        </div>
        <div className="design-20" data-node-id="179:6278" data-name="field/제목">
          <p className="design-21" data-node-id="179:6279">
            제목
          </p>
          <div className="design-112" data-node-id="179:6280" data-name="input">
            <p className="design-91" data-node-id="179:6281">
              제목을 입력하세요
            </p>
          </div>
        </div>
        <div className="design-20" data-node-id="179:6282" data-name="field/내용">
          <p className="design-21" data-node-id="179:6283">
            내용
          </p>
          <div className="design-113" data-node-id="179:6284" data-name="textarea">
            <div className="design-114" data-node-id="179:6285">
              <p className="design-115">마음을 편하게 적어 주세요.</p>
              <p className="design-116">경험을 나누면 다른 보호자에게 큰 힘이 돼요.</p>
            </div>
            <div className="design-117" data-node-id="179:6286" data-name="말로 쓰기">
              <div className="design-67" data-node-id="179:6287" data-name="icon/mic">
                <div className="design-118" data-node-id="179:6288" data-name="Group">
                  <div className="design-119">
                    <img alt="" className="design-28" src={imgGroup} />
                  </div>
                </div>
              </div>
              <p className="design-56" data-node-id="179:6292">
                말로 쓰기
              </p>
            </div>
          </div>
        </div>
        <div className="design-120" data-node-id="179:6293" data-name="익명 닉네임">
          <div className="design-67" data-node-id="179:6294" data-name="icon/lock">
            <div className="design-68" data-node-id="179:6295" data-name="Group">
              <div className="design-69">
                <img alt="" className="design-28" src={imgGroup1} />
              </div>
            </div>
          </div>
          <div className="design-121" data-node-id="179:6298" data-name="t">
            <p className="design-122" data-node-id="179:6299">
              부끄러운 햄스터
            </p>
            <p className="design-123" data-node-id="179:6300">
              익명 닉네임으로 올라가요
            </p>
          </div>
        </div>
        <div className="design-45" data-node-id="179:6301" data-name="spacer" />
        <a className="design-124" data-node-id="179:6302" data-name="Button (앱 화면)">
          <p className="design-125" data-node-id="I179:6302;24:968">
            글 올리기
          </p>
        </a>
      </div>
    </div>;
}
