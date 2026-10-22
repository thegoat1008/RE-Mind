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
const imgGroup = `/assets/figma/2b65f.svg`;
const imgIconPlus = `/assets/figma/caf6b.svg`;
const imgIconChevL = `/assets/figma/85afe.svg`;
const imgIconChevR = `/assets/figma/4691a.svg`;
const imgFrame = `/assets/figma/78f72.svg`;
const imgFrame1 = `/assets/figma/a8a27.svg`;
const imgFrame2 = `/assets/figma/608b1.svg`;
const imgFrame3 = `/assets/figma/5b087.svg`;
const imgIconPill = `/assets/figma/1ac1b.svg`;
const imgCheck = `/assets/figma/bb471.svg`;
const imgIconSun = `/assets/figma/e1d97.svg`;
const imgGroup1 = `/assets/figma/492e0.svg`;
const imgGroup2 = `/assets/figma/aeb75.svg`;
const imgGroup3 = `/assets/figma/acaf5.svg`;
const imgGroup4 = `/assets/figma/a95ec.svg`;
const imgGroup5 = `/assets/figma/07ec0.svg`;
const imgGroup6 = `/assets/figma/f094b.svg`;
function Button({ className, label = "버튼", type = "primary" }) {
  const isOutline = type === "outline";
  return <div className={className || ` design-46 ${isOutline ? "design-1" : "design-2"}`} id={isOutline ? "node-24_969" : "node-24_967"}>
      {type === "primary" && <p className="design-3" data-node-id="24:968">
          {label}
        </p>}
      {isOutline && <p className="design-4" data-node-id="24:970">
          {label}
        </p>}
    </div>;
}
function Chip({ className, label = "칩", state = "active" }) {
  return <div className={className || "design-114"} data-node-id="24:976">
      <p className="design-48" data-node-id="24:977">
        {label}
      </p>
    </div>;
}
export default function Component084() {
  return <div className="design-5" data-node-id="77:1822" data-name="08-4 말로 일정 추가">
      <div className="design-131" data-node-id="77:1823" data-name="iPhone 16 & 17 Pro - 2">
        <div className="design-7" data-node-id="I77:1823;486:2224" data-name="Status">
          <div className="design-7" data-node-id="I77:1823;486:2225" data-name="status/dark">
            <div className="design-8" data-node-id="I77:1823;486:2226" data-name="status/dark (Background/Mask)">
              <img alt="" className="design-9" src={imgStatusDarkBackgroundMask} />
            </div>
            <div className="design-10" data-node-id="I77:1823;486:2227" data-name="status/dark">
              <div className="design-11" data-node-id="I77:1823;486:2228" data-name="Status Icons">
                <div className="design-12" data-node-id="I77:1823;486:2229" data-name="Network Signal / Dark">
                  <img alt="" className="design-9" src={imgNetworkSignalDark} />
                </div>
                <div className="design-13" data-node-id="I77:1823;486:2238" data-name="WiFi Signal / Dark">
                  <img alt="" className="design-9" src={imgWiFiSignalDark} />
                </div>
                <div className="design-14" data-node-id="I77:1823;486:2243" data-name="Battery / Dark">
                  <img alt="" className="design-9" src={imgBatteryDark} />
                </div>
              </div>
              <div className="design-15" data-node-id="I77:1823;486:2249" data-name="Time / Dark">
                <div className="design-16" data-node-id="I77:1823;486:2250" data-name="Time / Dark (Background/Mask)">
                  <img alt="" className="design-9" src={imgTimeDarkBackgroundMask} />
                </div>
                <div className="design-17" data-node-id="I77:1823;486:2251" data-name="Time / Dark">
                  <div className="design-18" data-node-id="I77:1823;486:2252" data-name="9:41">
                    <img alt="" className="design-9" src={img941} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-192" data-node-id="77:1824" data-name="Content">
        <div className="design-140" data-node-id="77:1825" data-name="Header">
          <p className="design-133" data-node-id="77:1826">
            돌봄 캘린더
          </p>
          <a className="design-193" data-node-id="77:1827" data-name="이메일 보내기">
            <div className="design-77" data-node-id="77:1828" data-name="icon/mail">
              <div className="design-26" data-node-id="77:1829" data-name="Group">
                <div className="design-194">
                  <img alt="" className="design-28" src={imgGroup} />
                </div>
              </div>
            </div>
          </a>
          <Chip className="design-73 instance-event-voice-0" label="오늘" />
        </div>
        <a className="design-475" data-node-id="77:1833" data-name="일정 추가 FAB">
          <div className="design-60" data-node-id="77:1834" data-name="icon/plus">
            <img alt="" className="design-9" src={imgIconPlus} />
          </div>
          <p className="design-196" data-node-id="77:1836">
            일정 추가
          </p>
        </a>
        <div className="design-197" data-node-id="77:1837" data-name="Scroll">
          <div className="design-198" data-node-id="77:1838" data-name="월간 캘린더">
            <div className="design-199" data-node-id="77:1839" data-name="월 이동">
              <div className="design-60" data-node-id="77:1840" data-name="icon/chevL">
                <img alt="" className="design-9" src={imgIconChevL} />
              </div>
              <p className="design-179" data-node-id="77:1842">
                2026년 10월
              </p>
              <div className="design-60" data-node-id="77:1843" data-name="icon/chevR">
                <img alt="" className="design-9" src={imgIconChevR} />
              </div>
            </div>
            <div className="design-200" data-node-id="77:1845" data-name="요일">
              <div className="design-201" data-node-id="77:1846" data-name="Frame">
                <p className="design-202" data-node-id="77:1847">
                  일
                </p>
              </div>
              <div className="design-201" data-node-id="77:1848" data-name="Frame">
                <p className="design-181" data-node-id="77:1849">
                  월
                </p>
              </div>
              <div className="design-201" data-node-id="77:1850" data-name="Frame">
                <p className="design-181" data-node-id="77:1851">
                  화
                </p>
              </div>
              <div className="design-201" data-node-id="77:1852" data-name="Frame">
                <p className="design-181" data-node-id="77:1853">
                  수
                </p>
              </div>
              <div className="design-201" data-node-id="77:1854" data-name="Frame">
                <p className="design-181" data-node-id="77:1855">
                  목
                </p>
              </div>
              <div className="design-201" data-node-id="77:1856" data-name="Frame">
                <p className="design-181" data-node-id="77:1857">
                  금
                </p>
              </div>
              <div className="design-201" data-node-id="77:1858" data-name="Frame">
                <p className="design-202" data-node-id="77:1859">
                  토
                </p>
              </div>
            </div>
            <div className="design-200" data-node-id="77:1860" data-name="Week 1">
              <div className="design-203" data-node-id="77:1861" data-name="Frame" />
              <div className="design-203" data-node-id="77:1862" data-name="Frame" />
              <div className="design-203" data-node-id="77:1863" data-name="Frame" />
              <div className="design-203" data-node-id="77:1864" data-name="Frame" />
              <div className="design-204" data-node-id="77:1865" data-name="Frame">
                <div className="design-205" data-node-id="77:1866" data-name="Frame">
                  <p className="design-206" data-node-id="77:1867">
                    1
                  </p>
                </div>
                <div className="design-207" data-node-id="77:1868" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="77:1870" data-name="Frame">
                <div className="design-205" data-node-id="77:1871" data-name="Frame">
                  <p className="design-206" data-node-id="77:1872">
                    2
                  </p>
                </div>
                <div className="design-207" data-node-id="77:1873" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame1} />
                </div>
              </div>
              <div className="design-204" data-node-id="77:1875" data-name="Frame">
                <div className="design-205" data-node-id="77:1876" data-name="Frame">
                  <p className="design-208" data-node-id="77:1877">
                    3
                  </p>
                </div>
                <div className="design-207" data-node-id="77:1878" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
            </div>
            <div className="design-200" data-node-id="77:1880" data-name="Week 2">
              <div className="design-204" data-node-id="77:1881" data-name="Frame">
                <div className="design-205" data-node-id="77:1882" data-name="Frame">
                  <p className="design-208" data-node-id="77:1883">
                    4
                  </p>
                </div>
                <div className="design-207" data-node-id="77:1884" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="77:1886" data-name="Frame">
                <div className="design-205" data-node-id="77:1887" data-name="Frame">
                  <p className="design-206" data-node-id="77:1888">
                    5
                  </p>
                </div>
                <div className="design-207" data-node-id="77:1889" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="77:1891" data-name="Frame">
                <div className="design-205" data-node-id="77:1892" data-name="Frame">
                  <p className="design-206" data-node-id="77:1893">
                    6
                  </p>
                </div>
                <div className="design-207" data-node-id="77:1894" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame1} />
                </div>
              </div>
              <div className="design-204" data-node-id="77:1896" data-name="Frame">
                <div className="design-205" data-node-id="77:1897" data-name="Frame">
                  <p className="design-206" data-node-id="77:1898">
                    7
                  </p>
                </div>
                <div className="design-207" data-node-id="77:1899" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="77:1901" data-name="Frame">
                <div className="design-205" data-node-id="77:1902" data-name="Frame">
                  <p className="design-206" data-node-id="77:1903">
                    8
                  </p>
                </div>
                <div className="design-209" data-node-id="77:1904" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame2} />
                </div>
              </div>
              <div className="design-204" data-node-id="77:1907" data-name="Frame">
                <div className="design-205" data-node-id="77:1908" data-name="Frame">
                  <p className="design-206" data-node-id="77:1909">
                    9
                  </p>
                </div>
                <div className="design-207" data-node-id="77:1910" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="77:1912" data-name="Frame">
                <div className="design-205" data-node-id="77:1913" data-name="Frame">
                  <p className="design-208" data-node-id="77:1914">
                    10
                  </p>
                </div>
                <div className="design-207" data-node-id="77:1915" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
            </div>
            <div className="design-200" data-node-id="77:1917" data-name="Week 3">
              <div className="design-204" data-node-id="77:1918" data-name="Frame">
                <div className="design-205" data-node-id="77:1919" data-name="Frame">
                  <p className="design-208" data-node-id="77:1920">
                    11
                  </p>
                </div>
                <div className="design-207" data-node-id="77:1921" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame1} />
                </div>
              </div>
              <div className="design-204" data-node-id="77:1923" data-name="Frame">
                <div className="design-205" data-node-id="77:1924" data-name="Frame">
                  <p className="design-206" data-node-id="77:1925">
                    12
                  </p>
                </div>
                <div className="design-207" data-node-id="77:1926" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="77:1928" data-name="Frame">
                <div className="design-205" data-node-id="77:1929" data-name="Frame">
                  <p className="design-206" data-node-id="77:1930">
                    13
                  </p>
                </div>
                <div className="design-207" data-node-id="77:1931" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="77:1933" data-name="Frame">
                <div className="design-205" data-node-id="77:1934" data-name="Frame">
                  <p className="design-206" data-node-id="77:1935">
                    14
                  </p>
                </div>
                <div className="design-207" data-node-id="77:1936" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame1} />
                </div>
              </div>
              <div className="design-204" data-node-id="77:1938" data-name="Frame">
                <div className="design-205" data-node-id="77:1939" data-name="Frame">
                  <p className="design-206" data-node-id="77:1940">
                    15
                  </p>
                </div>
                <div className="design-207" data-node-id="77:1941" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="77:1943" data-name="Frame">
                <div className="design-205" data-node-id="77:1944" data-name="Frame">
                  <p className="design-206" data-node-id="77:1945">
                    16
                  </p>
                </div>
                <div className="design-207" data-node-id="77:1946" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="77:1948" data-name="Frame">
                <div className="design-205" data-node-id="77:1949" data-name="Frame">
                  <p className="design-208" data-node-id="77:1950">
                    17
                  </p>
                </div>
                <div className="design-207" data-node-id="77:1951" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
            </div>
            <div className="design-200" data-node-id="77:1953" data-name="Week 4">
              <div className="design-204" data-node-id="77:1954" data-name="Frame">
                <div className="design-210" data-node-id="77:1955" data-name="Frame">
                  <p className="design-211" data-node-id="77:1956">
                    18
                  </p>
                </div>
                <div className="design-212" data-node-id="77:1957" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame3} />
                </div>
              </div>
              <div className="design-204" data-node-id="77:1961" data-name="Frame">
                <div className="design-205" data-node-id="77:1962" data-name="Frame">
                  <p className="design-206" data-node-id="77:1963">
                    19
                  </p>
                </div>
                <div className="design-207" data-node-id="77:1964" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="77:1966" data-name="Frame">
                <div className="design-205" data-node-id="77:1967" data-name="Frame">
                  <p className="design-206" data-node-id="77:1968">
                    20
                  </p>
                </div>
                <div className="design-207" data-node-id="77:1969" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="77:1971" data-name="Frame">
                <div className="design-205" data-node-id="77:1972" data-name="Frame">
                  <p className="design-206" data-node-id="77:1973">
                    21
                  </p>
                </div>
                <div className="design-207" data-node-id="77:1974" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame1} />
                </div>
              </div>
              <div className="design-204" data-node-id="77:1976" data-name="Frame">
                <div className="design-205" data-node-id="77:1977" data-name="Frame">
                  <p className="design-206" data-node-id="77:1978">
                    22
                  </p>
                </div>
                <div className="design-207" data-node-id="77:1979" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="77:1981" data-name="Frame">
                <div className="design-205" data-node-id="77:1982" data-name="Frame">
                  <p className="design-206" data-node-id="77:1983">
                    23
                  </p>
                </div>
                <div className="design-207" data-node-id="77:1984" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="77:1986" data-name="Frame">
                <div className="design-205" data-node-id="77:1987" data-name="Frame">
                  <p className="design-208" data-node-id="77:1988">
                    24
                  </p>
                </div>
                <div className="design-207" data-node-id="77:1989" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
            </div>
            <div className="design-200" data-node-id="77:1991" data-name="Week 5">
              <div className="design-204" data-node-id="77:1992" data-name="Frame">
                <div className="design-205" data-node-id="77:1993" data-name="Frame">
                  <p className="design-208" data-node-id="77:1994">
                    25
                  </p>
                </div>
                <div className="design-207" data-node-id="77:1995" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame1} />
                </div>
              </div>
              <div className="design-204" data-node-id="77:1997" data-name="Frame">
                <div className="design-205" data-node-id="77:1998" data-name="Frame">
                  <p className="design-206" data-node-id="77:1999">
                    26
                  </p>
                </div>
                <div className="design-207" data-node-id="77:2000" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="77:2002" data-name="Frame">
                <div className="design-205" data-node-id="77:2003" data-name="Frame">
                  <p className="design-206" data-node-id="77:2004">
                    27
                  </p>
                </div>
                <div className="design-207" data-node-id="77:2005" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="77:2007" data-name="Frame">
                <div className="design-205" data-node-id="77:2008" data-name="Frame">
                  <p className="design-206" data-node-id="77:2009">
                    28
                  </p>
                </div>
                <div className="design-207" data-node-id="77:2010" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame1} />
                </div>
              </div>
              <div className="design-204" data-node-id="77:2012" data-name="Frame">
                <div className="design-205" data-node-id="77:2013" data-name="Frame">
                  <p className="design-206" data-node-id="77:2014">
                    29
                  </p>
                </div>
                <div className="design-207" data-node-id="77:2015" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="77:2017" data-name="Frame">
                <div className="design-205" data-node-id="77:2018" data-name="Frame">
                  <p className="design-206" data-node-id="77:2019">
                    30
                  </p>
                </div>
                <div className="design-207" data-node-id="77:2020" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
              <div className="design-204" data-node-id="77:2022" data-name="Frame">
                <div className="design-205" data-node-id="77:2023" data-name="Frame">
                  <p className="design-208" data-node-id="77:2024">
                    31
                  </p>
                </div>
                <div className="design-207" data-node-id="77:2025" data-name="Frame">
                  <img alt="" className="design-9" src={imgFrame} />
                </div>
              </div>
            </div>
          </div>
          <div className="design-213" data-node-id="77:2027" data-name="선택일 헤더">
            <p className="design-214" data-node-id="77:2028">
              10월 18일 일요일
            </p>
            <p className="design-215" data-node-id="77:2029">
              일정 2개
            </p>
          </div>
          <div className="design-35" data-node-id="77:2030" data-name="일정 목록">
            <div className="design-220" data-node-id="77:2031" data-name="EventItem">
              <div className="design-217" data-node-id="I77:2031;3:151" data-name="icon bubble">
                <div className="design-60" data-node-id="I77:2031;3:152" data-name="icon/pill">
                  <img alt="" className="design-9" src={imgIconPill} />
                </div>
              </div>
              <div className="design-221" data-node-id="I77:2031;3:155" data-name="text">
                <p className="design-190" data-node-id="I77:2031;3:156">
                  저녁 약 복용
                </p>
                <p className="design-219" data-node-id="I77:2031;3:157">
                  오후 7:00 · 매일
                </p>
              </div>
              <div className="design-22" data-node-id="I77:2031;3:158" data-name="check">
                <img alt="" className="design-9" src={imgCheck} />
              </div>
            </div>
            <div className="design-220" data-node-id="77:2032" data-name="EventItem">
              <div className="design-217" data-node-id="I77:2032;3:168" data-name="icon bubble">
                <div className="design-60" data-node-id="I77:2032;3:169" data-name="icon/sun">
                  <img alt="" className="design-9" src={imgIconSun} />
                </div>
              </div>
              <div className="design-221" data-node-id="I77:2032;3:172" data-name="text">
                <p className="design-190" data-node-id="I77:2032;3:173">
                  공원 산책
                </p>
                <p className="design-219" data-node-id="I77:2032;3:174">
                  오후 5:30 · 이모 담당
                </p>
              </div>
              <div className="design-22" data-node-id="I77:2032;3:175" data-name="check">
                <img alt="" className="design-9" src={imgCheck} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="design-75" data-node-id="77:2033" data-name="TabBar (앱 화면)">
        <div className="design-76" data-node-id="I77:2033;13:956" data-name="tab/home">
          <div className="design-77" data-node-id="I77:2033;13:957" data-name="icon/home">
            <div className="design-78" data-node-id="I77:2033;13:958" data-name="Group">
              <div className="design-79">
                <img alt="" className="design-28" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="design-80" data-node-id="I77:2033;13:960">
            홈
          </p>
        </div>
        <div className="design-76" data-node-id="I77:2033;13:961" data-name="tab/calendar">
          <div className="design-77" data-node-id="I77:2033;13:962" data-name="icon/calendar">
            <div className="design-81" data-node-id="I77:2033;13:963" data-name="Group">
              <div className="design-82">
                <img alt="" className="design-28" src={imgGroup2} />
              </div>
            </div>
          </div>
          <p className="design-55" data-node-id="I77:2033;13:966">
            캘린더
          </p>
        </div>
        <div className="design-76" data-node-id="I77:2033;13:967" data-name="tab/chat">
          <div className="design-77" data-node-id="I77:2033;13:968" data-name="icon/chat">
            <div className="design-83" data-node-id="I77:2033;13:969" data-name="Group">
              <div className="design-84">
                <img alt="" className="design-28" src={imgGroup3} />
              </div>
            </div>
          </div>
          <p className="design-80" data-node-id="I77:2033;13:971">
            대화
          </p>
        </div>
        <div className="design-76" data-node-id="I77:2033;13:972" data-name="tab/community">
          <div className="design-77" data-node-id="I77:2033;13:973" data-name="icon/community">
            <div className="design-85" data-node-id="I77:2033;13:974" data-name="Group">
              <div className="design-86">
                <img alt="" className="design-28" src={imgGroup4} />
              </div>
            </div>
          </div>
          <p className="design-80" data-node-id="I77:2033;13:977">
            커뮤니티
          </p>
        </div>
        <div className="design-76" data-node-id="I77:2033;13:978" data-name="tab/settings">
          <div className="design-77" data-node-id="I77:2033;13:979" data-name="icon/settings">
            <div className="design-87" data-node-id="I77:2033;13:980" data-name="Group">
              <div className="design-88">
                <img alt="" className="design-28" src={imgGroup5} />
              </div>
            </div>
          </div>
          <p className="design-80" data-node-id="I77:2033;13:983">
            내 설정
          </p>
        </div>
      </div>
      <div className="design-366" data-node-id="77:2034" data-name="dim" />
      <div className="design-476" data-node-id="77:2035" data-name="음성 일정 시트">
        <div className="design-368" data-node-id="77:2036" data-name="handle" />
        <p className="design-369" data-node-id="77:2037">
          일정을 말씀해 주세요
        </p>
        <div className="design-477" data-node-id="77:2038" data-name="인식 결과">
          <div className="design-478" data-node-id="77:2039">
            <p className="design-122">“내일 오전 9시에 병원 가기,</p>
            <p className="design-123">30분 전에 알려 줘”</p>
          </div>
        </div>
        <div className="design-479" data-node-id="77:2040" data-name="정리">
          <div className="design-71" data-node-id="77:2041" data-name="r">
            <p className="design-480" data-node-id="77:2042">
              일정
            </p>
            <p className="design-481" data-node-id="77:2043">
              병원 가기
            </p>
          </div>
          <div className="design-71" data-node-id="77:2044" data-name="r">
            <p className="design-480" data-node-id="77:2045">
              날짜 · 시간
            </p>
            <p className="design-481" data-node-id="77:2046">
              내일 오전 9:00
            </p>
          </div>
          <div className="design-71" data-node-id="77:2047" data-name="r">
            <p className="design-480" data-node-id="77:2048">
              알림
            </p>
            <p className="design-481" data-node-id="77:2049">
              30분 전
            </p>
          </div>
        </div>
        <div className="design-482" data-node-id="77:2050" data-name="mic ring">
          <div className="design-483" data-node-id="77:2051" data-name="mic">
            <div className="design-484" data-node-id="77:2052" data-name="icon/mic">
              <div className="design-125" data-node-id="77:2053" data-name="Group">
                <div className="design-485">
                  <img alt="" className="design-28" src={imgGroup6} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="design-184" data-node-id="77:2057" data-name="버튼">
          <Button className="design-379" label="다시 말하기" type="outline" />
          <Button className="design-486" label="저장하기" />
        </div>
      </div>
    </div>;
}
