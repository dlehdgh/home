/*
  Calendar
  - 시간 : #time
  - 오전/오후 : #noon
  - 연월일 : #date
  - 연 : #year
  - 월 : #month
  - 이전달 : #prev
  - 다음달 : #next
*/

// 매년 반복되는 기념일
var memorialDays = new Array(
	new memorialDay('신정', 1, 1, 1, true),
	new memorialDay('', 12, 0, 2, true, true),
	new memorialDay('설날', 1, 1, 2, true),
	new memorialDay('', 1, 2, 2, true),
	new memorialDay('3·1절', 3, 1, 1, true),
	new memorialDay('식목일', 4, 5, 1, true),
	new memorialDay('석가탄신일', 4, 8, 2, true),
	new memorialDay('어린이날', 5, 5, 1, true),
	new memorialDay('현충일', 6, 6, 1, true),
	new memorialDay('제헌절', 7, 17, 1, true),
	new memorialDay('광복절', 8, 15, 1, true),
	new memorialDay('', 8, 14, 2, true),
	new memorialDay('추석', 8, 15, 2, true),
	new memorialDay('', 8, 16, 2, true),
	new memorialDay('개천절', 10, 3, 1, true),
	new memorialDay('크리스마스', 12, 25, 1, true),
	new memorialDay('정월대보름', 1, 15, 2, false),
	new memorialDay('단오', 5, 5, 2, false),
	new memorialDay('국군의날', 10, 1, 1, false),
	new memorialDay('한글날', 10, 9, 1, false),
	new memorialDay('6·25전쟁일', 6, 25, 1, false),
	new memorialDay('발렌타인데이', 2, 14, 1, false),
	new memorialDay('물의날', 3, 22, 1, false),
	new memorialDay('만우절', 4, 1, 1, false),
	new memorialDay('임시정부수립일', 4, 13, 1 , false),
	new memorialDay('4·19혁명기념일', 4, 19, 1 , false),
	new memorialDay('장애인의날', 4, 20, 1 , false),
	new memorialDay('과학의날', 4, 21, 1 , false),
	new memorialDay('정보통신의날', 4, 22, 1 , false),
	new memorialDay('법의날', 4, 25, 1 , false),
	new memorialDay('충무공탄신일', 4, 28, 1, false),
	new memorialDay('근로자의날', 5, 1, 1, false),
	new memorialDay('어버이날', 5, 8, 1, false),
	new memorialDay('스승의날', 5, 15, 1, false),
	new memorialDay('5·18 민주화운동일', 5, 18, 1, false),
	new memorialDay('발명의날', 5, 19, 1, false),
	new memorialDay('바다의날', 5, 31, 1, false),
	new memorialDay('환경의날', 6, 5, 1, false),
	new memorialDay('칠월칠석', 7, 7, 2, false),
	new memorialDay('노인의날', 10, 2, 1, false),
	new memorialDay('체육의날', 10, 15, 1, false),
	new memorialDay('국제연합일', 10, 24, 1, false),
	new memorialDay('학생독립운동기념일', 11, 3, 1, false),
	new memorialDay('철도의날', 9, 18, 1, false),
	new memorialDay('소방의날', 11, 9, 1, false)
);
// 특정 연도의 날짜로만 된 기념일 또는 매년 반복되더라도 날짜가 불규칙하게 변경되는 기념일
var yearmemorialDays = Array(
	new yearmemorialDay('', 1989, 10, 2, 1, true),
	new yearmemorialDay('제16대 국회의원 선거일', 2000, 4, 13, 1, true),
	new yearmemorialDay('제3대 지방선거일', 2002, 6, 13, 1, true),
	new yearmemorialDay('월드컵기념 임시공휴일', 2002, 7, 1, 1, true),
	new yearmemorialDay('제16대 대통령 선거일', 2002, 12, 19, 1, true),
	new yearmemorialDay('제17대 국회의원 선거일', 2004, 4, 15, 1, true),
	new yearmemorialDay('제4대 지방선거일', 2006, 5, 31, 1, true),
	new yearmemorialDay('제17대 대통령 선거일', 2007, 12, 19, 1, true)
);
// 음력 데이터(평달 - 작은달: 1, 큰달: 2)
var lunarMonthTable = new Array(
	[1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2],
	[2, 1, 2, 5, 2, 1, 2, 1, 2, 1, 2, 1],
	[1, 2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2], /* 1801 */
	[1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1],
	[2, 3, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
	[2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 2],
	[1, 2, 1, 2, 1, 3, 2, 1, 2, 2, 2, 1],
	[2, 2, 1, 2, 1, 1, 1, 2, 1, 2, 2, 1],
	[2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
	[1, 2, 2, 1, 5, 2, 1, 2, 1, 1, 2, 1],
	[2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2],
	[1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2],
	[1, 1, 5, 2, 1, 2, 2, 1, 2, 2, 1, 2], /* 1811 */
	[1, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 1],
	[2, 1, 2, 1, 1, 1, 2, 1, 2, 2, 2, 1],
	[2, 5, 2, 1, 1, 1, 2, 1, 2, 2, 1, 2],
	[2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2],
	[2, 2, 1, 2, 1, 5, 1, 2, 1, 2, 1, 2],
	[2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1],
	[2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2],
	[1, 2, 1, 5, 2, 2, 1, 2, 2, 1, 2, 1],
	[1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
	[1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2], /* 1821 */
	[2, 1, 5, 1, 1, 2, 1, 2, 2, 1, 2, 2],
	[2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 2],
	[2, 1, 2, 1, 2, 1, 4, 1, 2, 1, 2, 2],
	[2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
	[2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],
	[2, 1, 2, 2, 4, 1, 2, 1, 2, 1, 2, 1],
	[2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
	[1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
	[1, 1, 2, 3, 2, 1, 2, 2, 1, 2, 2, 2],
	[1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2], /* 1831 */
	[1, 2, 1, 2, 1, 1, 2, 1, 5, 2, 2, 2],
	[1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
	[1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
	[1, 2, 2, 1, 2, 5, 1, 2, 1, 2, 1, 2],
	[1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
	[2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
	[1, 2, 1, 5, 1, 2, 2, 1, 2, 2, 1, 2],
	[1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
	[2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
	[1, 2, 4, 1, 1, 2, 1, 2, 1, 2, 2, 1], /* 1841 */
	[2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1],
	[2, 2, 2, 1, 2, 1, 4, 1, 2, 1, 2, 1],
	[2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
	[1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
	[2, 1, 2, 1, 5, 2, 1, 2, 2, 1, 2, 1],
	[2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
	[1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
	[2, 1, 2, 3, 2, 1, 2, 1, 2, 1, 2, 2],
	[2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
	[2, 2, 1, 2, 1, 1, 2, 3, 2, 1, 2, 2], /* 1851 */
	[2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 1, 2],
	[2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
	[1, 2, 1, 2, 1, 2, 5, 2, 1, 2, 1, 2],
	[1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1],
	[2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
	[1, 2, 1, 1, 5, 2, 1, 2, 1, 2, 2, 2],
	[1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],
	[2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
	[2, 1, 6, 1, 1, 2, 1, 1, 2, 1, 2, 2],
	[1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2], /* 1861 */
	[2, 1, 2, 1, 2, 2, 1, 5, 2, 1, 1, 2],
	[1, 2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
	[1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
	[2, 1, 1, 2, 4, 1, 2, 2, 1, 2, 2, 1],
	[2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 2],
	[1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2],
	[1, 2, 2, 3, 2, 1, 1, 2, 1, 2, 2, 1],
	[2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1],
	[2, 2, 2, 1, 2, 1, 2, 1, 1, 5, 2, 1],
	[2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2], /* 1871 */
	[1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
	[1, 1, 2, 1, 2, 4, 2, 1, 2, 2, 1, 2],
	[1, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 1],
	[2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
	[2, 2, 1, 1, 5, 1, 2, 1, 2, 2, 1, 2],
	[2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2],
	[2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
	[2, 2, 4, 2, 1, 2, 1, 1, 2, 1, 2, 1],
	[2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2],
	[1, 2, 1, 2, 1, 2, 5, 2, 2, 1, 2, 1], /* 1881 */
	[1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
	[1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
	[2, 1, 1, 2, 3, 2, 1, 2, 2, 1, 2, 2],
	[2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
	[2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
	[2, 2, 1, 5, 2, 1, 1, 2, 1, 2, 1, 2],
	[2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],
	[2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
	[1, 5, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
	[1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2], /* 1891 */
	[1, 1, 2, 1, 1, 5, 2, 2, 1, 2, 2, 2],
	[1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
	[1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
	[2, 1, 2, 1, 5, 1, 2, 1, 2, 1, 2, 1],
	[2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
	[1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
	[2, 1, 5, 2, 2, 1, 2, 1, 2, 1, 2, 1],
	[2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
	[1, 2, 1, 1, 2, 1, 2, 5, 2, 2, 1, 2],
	[1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1], /* 1901 */
	[2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
	[1, 2, 1, 2, 3, 2, 1, 1, 2, 2, 1, 2],
	[2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1],
	[2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2],
	[1, 2, 2, 4, 1, 2, 1, 2, 1, 2, 1, 2],
	[1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
	[2, 1, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
	[1, 5, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
	[1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
	[2, 1, 2, 1, 1, 5, 1, 2, 2, 1, 2, 2], /* 1911 */
	[2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
	[2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
	[2, 2, 1, 2, 5, 1, 2, 1, 2, 1, 1, 2],
	[2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
	[1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
	[2, 3, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1],
	[2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
	[1, 2, 1, 1, 2, 1, 5, 2, 1, 2, 2, 2],
	[1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],
	[2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2], /* 1921 */
	[2, 1, 2, 2, 3, 2, 1, 1, 2, 1, 2, 2],
	[1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
	[2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1],
	[2, 1, 2, 5, 2, 1, 2, 2, 1, 2, 1, 2],
	[1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
	[2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
	[1, 5, 1, 2, 1, 1, 2, 2, 1, 2, 2, 2],
	[1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2],
	[1, 2, 2, 1, 1, 5, 1, 2, 1, 2, 2, 1],
	[2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1], /* 1931 */
	[2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
	[1, 2, 2, 1, 6, 1, 2, 1, 2, 1, 1, 2],
	[1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
	[1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
	[2, 1, 4, 1, 1, 2, 2, 1, 2, 2, 2, 1],
	[2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
	[2, 2, 1, 1, 2, 1, 4, 1, 2, 2, 1, 2],
	[2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2],
	[2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
	[2, 2, 1, 2, 2, 4, 1, 1, 2, 1, 2, 1], /* 1941 */
	[2, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1, 2],
	[1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
	[2, 1, 2, 4, 1, 2, 1, 2, 2, 1, 2, 2],
	[1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
	[2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
	[2, 5, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
	[2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
	[2, 1, 2, 2, 1, 2, 3, 2, 1, 2, 1, 2],
	[1, 2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],
	[2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2], /* 1951 */
	[1, 2, 1, 2, 4, 1, 2, 2, 1, 2, 1, 2],
	[1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2],
	[1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
	[2, 1, 4, 1, 1, 2, 1, 2, 1, 2, 2, 2],
	[1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
	[2, 1, 2, 1, 2, 1, 1, 5, 2, 1, 2, 2],
	[1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
	[1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
	[2, 1, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1],
	[2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2], /* 1961 */
	[1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
	[2, 1, 2, 3, 2, 1, 2, 1, 2, 2, 2, 1],
	[2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
	[1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2],
	[1, 2, 5, 2, 1, 1, 2, 1, 1, 2, 2, 1],
	[2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2],
	[1, 2, 1, 2, 2, 1, 5, 2, 1, 2, 1, 2],
	[1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
	[2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
	[1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1, 2], /* 1971 */
	[1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
	[2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
	[2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1, 2],
	[2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
	[2, 2, 1, 2, 1, 2, 1, 5, 1, 2, 1, 2],
	[2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1],
	[2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1],
	[2, 1, 1, 2, 1, 6, 1, 2, 2, 1, 2, 1],
	[2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
	[1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2], /* 1981 */
	[2, 1, 2, 3, 2, 1, 1, 2, 1, 2, 2, 2],
	[2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
	[2, 1, 2, 2, 1, 1, 2, 1, 1, 5, 2, 2],
	[1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
	[1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1],
	[2, 1, 2, 1, 2, 5, 2, 2, 1, 2, 1, 2],
	[1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
	[2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2],
	[1, 2, 1, 1, 5, 1, 2, 2, 1, 2, 2, 2],
	[1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2], /* 1991 */
	[1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
	[1, 2, 5, 2, 1, 2, 1, 1, 2, 1, 2, 1],
	[2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
	[1, 2, 2, 1, 2, 1, 2, 5, 2, 1, 1, 2],
	[1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 1],
	[2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
	[2, 1, 1, 2, 3, 2, 2, 1, 2, 2, 2, 1],
	[2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
	[2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1],
	[2, 2, 1, 5, 2, 1, 1, 2, 1, 2, 1, 2], /* 2001 */
	[2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
	[2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2],
	[1, 5, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
	[1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
	[2, 1, 2, 1, 2, 1, 5, 2, 2, 1, 2, 2],
	[1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
	[2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
	[2, 2, 1, 1, 5, 1, 2, 1, 2, 1, 2, 2],
	[2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
	[2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1], /* 2011 */
	[2, 1, 2, 5, 2, 2, 1, 1, 2, 1, 2, 1],
	[2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
	[1, 2, 1, 2, 1, 2, 1, 2, 5, 2, 1, 2],
	[1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2, 1],
	[2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
	[1, 2, 1, 2, 1, 4, 1, 2, 1, 2, 2, 2],
	[1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
	[2, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2],
	[2, 1, 2, 5, 2, 1, 1, 2, 1, 2, 1, 2],
	[1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1], /* 2021 */
	[2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
	[1, 5, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
	[1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
	[2, 1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1],
	[2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
	[1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1],
	[2, 2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1],
	[2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2],
	[1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
	[2, 1, 5, 2, 1, 2, 2, 1, 2, 1, 2, 1], /* 2031 */
	[2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
	[1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 5, 2],
	[1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2],
	[2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
	[2, 2, 1, 2, 1, 4, 1, 1, 2, 2, 1, 2],
	[2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
	[2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1],
	[2, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1, 1],
	[2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2, 1],
	[2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2], /* 2041 */
	[1, 5, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
	[1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],
	[2, 1, 2, 1, 1, 2, 3, 2, 1, 2, 2, 2],
	[2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
	[2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
	[2, 1, 2, 2, 4, 1, 2, 1, 1, 2, 1, 2],
	[1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1],
	[2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1],
	[1, 2, 4, 1, 2, 1, 2, 2, 1, 2, 2, 1],
	[2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 2], /* 2051 */
	[1, 2, 1, 1, 2, 1, 1, 5, 2, 2, 2, 2],
	[1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2],
	[1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
	[1, 2, 2, 1, 2, 4, 1, 1, 2, 1, 2, 1],
	[2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
	[1, 2, 2, 1, 2, 1, 2, 2, 1, 1, 2, 1],
	[2, 1, 2, 4, 2, 1, 2, 1, 2, 2, 1, 1],
	[2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
	[2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 1],
	[2, 2, 3, 2, 1, 1, 2, 1, 2, 2, 2, 1], /* 2061 */
	[2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1],
	[2, 2, 1, 2, 1, 2, 3, 2, 1, 2, 1, 2],
	[2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
	[2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2],
	[1, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1, 2],
	[1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
	[2, 1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 2],
	[1, 2, 1, 5, 1, 2, 1, 2, 2, 2, 1, 2],
	[2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
	[2, 1, 2, 1, 2, 1, 1, 5, 2, 1, 2, 2], /* 2071 */
	[2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
	[2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],
	[2, 1, 2, 2, 1, 5, 2, 1, 2, 1, 2, 1],
	[2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
	[1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1],
	[2, 1, 2, 3, 2, 1, 2, 2, 2, 1, 2, 1],
	[2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
	[1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
	[2, 1, 5, 2, 1, 1, 2, 1, 2, 1, 2, 2],
	[1, 2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2], /* 2081 */
	[1, 2, 2, 2, 1, 2, 3, 2, 1, 1, 2, 2],
	[1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
	[2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
	[1, 2, 1, 1, 6, 1, 2, 2, 1, 2, 1, 2],
	[1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
	[2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
	[1, 2, 1, 5, 1, 2, 1, 1, 2, 2, 2, 1],
	[2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1],
	[2, 2, 2, 1, 2, 1, 1, 5, 1, 2, 2, 1],
	[2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1], /* 2091 */
	[2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
	[1, 2, 2, 1, 2, 4, 2, 1, 2, 1, 2, 1],
	[2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
	[1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
	[2, 1, 2, 3, 2, 1, 1, 2, 2, 2, 1, 2],
	[2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
	[2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
	[2, 5, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2],
	[2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1],
	[2, 2, 1, 2, 2, 1, 5, 2, 1, 1, 2, 1]
);

$(document).ready(() => {
	const weeks = new Array('일', '월', '화', '수', '목', '금', '토');
	$('#clock').delay(1000).fadeIn(1000);
	setInterval(() => {
		const date = new ToDay();
		$('#time').html(`${digits(hours(date.hour))}<i class="colon">:</i>${digits(date.min)}<i class="colon">:</i>${digits(date.sec)}`);
		$('#date').html(`${date.year}년 ${date.month + 1}월 ${date.day}일 ${weeks[date.week]}요일`);
	}, 1000);

	// 켈린더
	$('#calendar').on('click', () => {
		const date = new ToDay();
		$('#calendar-modal').modal();
		$('#cal-title').html(`<span id="year">${date.year}</span>.<span id="month">${digits(date.month + 1)}</span>`);
		Calendar();
	});
	// 현제 날짜
	$('#today').on('click', () => {
		const date = new ToDay();
		$('#cal-title').html(`<span id="year">${date.year}</span>.<span id="month">${digits(date.month + 1)}</span>`);
		Calendar();
	});
	// 이전달
	$('#prev').on('click', () => {
		const year = Number($('#year').text());
		const month = Number($('#month').text());
		if(month > 1){
			$('#month').text(digits(month - 1));
		}else{
			$('#month').text('12');
			$('#year').text(year - 1);
		}
		Calendar();
	});
	// 다음달
	$('#next').on('click', () => {
		const year = Number($('#year').text());
		const month = Number($('#month').text());
		if(month < 12){
			$('#month').text(digits(month + 1));
		}else{
			$('#month').text('01');
			$('#year').text(year + 1);
		}
		Calendar();
	});
});

// 현제 날짜 정보 객체
function ToDay(){
	const date = new Date();
	this.year = date.getFullYear(4);
	this.month = date.getMonth();
	this.day = date.getDate();
	this.week = date.getDay();
	this.hour = date.getHours();
	this.min = date.getMinutes();
	this.sec = date.getSeconds();
}

// 양력 날짜 정보 객체
function myDate(year, month, day, leapMonth){
	this.year = year;
	this.month = month;
	this.day = day;
	this.leapMonth = leapMonth;
}

// 매년 반복되는 기념일 정보 객체
function memorialDay(name, month, day, solarLunar, holiday, type){
	this.name = name;
	this.month = month;
	this.day = day;
	this.solarLunar = solarLunar;
	this.holiday = holiday;// true: 휴일, false: 평일
	this.type = type;
	this.techneer = true;
}

// 매년 반복되지 않는 기념일 정보 객체
function yearmemorialDay(name, year, month, day, solarLunar, holiday, type){
	this.name = name;
	this.year = year;
	this.month = month;
	this.day = day;
	this.solarLunar = solarLunar;
	this.holiday = holiday;// true: 휴일, false: 평일
	this.type = type;
	this.techneer = true;
}

// 음력 양력 변환
function lunarConvert(year, month, day, type, leapmonth){
	var solarYear, solarMonth, solarDay;
	var lunarYear, lunarMonth, lunarDay;
	var lunLeapMonth, lunarMonthDay;
	var i, lunarIndex;
	var solarMonthDay = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	if(year < 1800 || year > 2101){
		console.log('1800년부터 2101년까지만 지원합니다.');
		return;
	}
	// 속도 개선을 위해 기준 일자를 여러개로 한다
	if(year >= 2080){
		// 기준일자 양력 2080년 1월 1일 (음력 2079년 12월 10일)
		solarYear = 2080;
		solarMonth = 1;
		solarDay = 1;
		lunYear = 2079;
		lunMonth = 12;
		lunDay = 10;
		lunLeapMonth = 0;
		solMonthDay[1] = 29;// 2080년 2월 28일
		lunMonthDay = 30;// 2079년 12월
	}else if(year >= 2060){
		// 기준일자 양력 2060년 1월 1일 (음력 2059년 11월 28일)
		solarYear = 2060;
		solarMonth = 1;
		solarDay = 1;
		lunarYear = 2059;
		lunarMonth = 11;
		lunarDay = 28;
		lunLeapMonth = 0;
		solarMonthDay[1] = 29;// 2060년 2월 28일
		lunarMonthDay = 30;// 2059년 11월
	}else if(year >= 2040){
		// 기준일자 양력 2040년 1월 1일 (음력 2039년 11월 17일)
		solarYear = 2040;
		solarMonth = 1;
		solarDay = 1;
		lunarYear = 2039;
		lunarMonth = 11;
		lunarDay = 17;
		lunLeapMonth = 0;
		solarMonthDay[1] = 29;// 2040년 2월 28일
		lunarMonthDay = 29;// 2039년 11월
	}else if(year >= 2020){
		// 기준일자 양력 2020년 1월 1일 (음력 2019년 12월 7일)
		solarYear = 2020;
		solarMonth = 1;
		solarDay = 1;
		lunarYear = 2019;
		lunarMonth = 12;
		lunarDay = 7;
		lunLeapMonth = 0;
		solarMonthDay[1] = 29;// 2020년 2월 28일
		lunarMonthDay = 30;// 2019년 12월
	}else if(year >= 2000){
		// 기준일자 양력 2000년 1월 1일 (음력 1999년 11월 25일)
		solarYear = 2000;
		solarMonth = 1;
		solarDay = 1;
		lunarYear = 1999;
		lunarMonth = 11;
		lunarDay = 25;
		lunLeapMonth = 0;
		solarMonthDay[1] = 29;// 2000년 2월 28일
		lunarMonthDay = 30;// 1999년 11월
	}else if(year >= 1980){
		// 기준일자 양력 1980년 1월 1일 (음력 1979년 11월 14일)
		solarYear = 1980;
		solarMonth = 1;
		solarDay = 1;
		lunarYear = 1979;
		lunarMonth = 11;
		lunarDay = 14;
		lunLeapMonth = 0;
		solarMonthDay[1] = 29;// 1980년 2월 28일
		lunarMonthDay = 30;// 1979년 11월
	}else if(year >= 1960){
		// 기준일자 양력 1960년 1월 1일 (음력 1959년 12월 3일)
		solarYear = 1960;
		solarMonth = 1;
		solarDay = 1;
		lunarYear = 1959;
		lunarMonth = 12;
		lunarDay = 3;
		lunLeapMonth = 0;
		solarMonthDay[1] = 29;// 1960년 2월 28일
		lunarMonthDay = 29;// 1959년 12월
	}else if(year >= 1940){
		// 기준일자 양력 1940년 1월 1일 (음력 1939년 11월 22일)
		solarYear = 1940;
		solarMonth = 1;
		solarDay = 1;
		lunarYear = 1939;
		lunarMonth = 11;
		lunarDay = 22;
		lunLeapMonth = 0;
		solarMonthDay[1] = 29;// 1940년 2월 28일
		lunarMonthDay = 29;// 1939년 11월
	}else if(year >= 1920){
		// 기준일자 양력 1920년 1월 1일 (음력 1919년 11월 11일)
		solarYear = 1920;
		solarMonth = 1;
		solarDay = 1;
		lunarYear = 1919;
		lunarMonth = 11;
		lunarDay = 11;
		lunLeapMonth = 0;
		solarMonthDay[1] = 29;// 1920년 2월 28일
		lunarMonthDay = 30;// 1919년 11월
	}else if(year >= 1900){
		// 기준일자 양력 1900년 1월 1일 (음력 1899년 12월 1일)
		solarYear = 1900;
		solarMonth = 1;
		solarDay = 1;
		lunarYear = 1899;
		lunarMonth = 12;
		lunarDay = 1;
		lunLeapMonth = 0;
		solarMonthDay[1] = 28;// 1900년 2월 28일
		lunarMonthDay = 30;// 1899년 12월
	}else if(year >= 1880){
		// 기준일자 양력 1880년 1월 1일 (음력 1879년 11월 20일)
		solarYear = 1880;
		solarMonth = 1;
		solarDay = 1;
		lunarYear = 1879;
		lunarMonth = 11;
		lunarDay = 20;
		lunLeapMonth = 0;
		solarMonthDay[1] = 29;// 1880년 2월 28일
		lunarMonthDay = 30;// 1879년 11월
	}else if(year >= 1860){
		// 기준일자 양력 1860년 1월 1일 (음력 1859년 12월 9일)
		solarYear = 1860;
		solarMonth = 1;
		solarDay = 1;
		lunarYear = 1859;
		lunarMonth = 12;
		lunarDay = 9;
		lunLeapMonth = 0;
		solarMonthDay[1] = 29;// 1860년 2월 28일
		lunarMonthDay = 30;// 1859년 12월
	}else if(year >= 1840){
		// 기준일자 양력 1840년 1월 1일 (음력 1839년 11월 27일)
		solarYear = 1840;
		solarMonth = 1;
		solarDay = 1;
		lunarYear = 1839;
		lunarMonth = 11;
		lunarDay = 27;
		lunLeapMonth = 0;
		solarMonthDay[1] = 29;// 1840 년 2월 28일
		lunarMonthDay = 30;// 1839년 11월
	}else if(year >= 1820){
		// 기준일자 양력 1820년 1월 1일 (음력 1819년 11월 16일)
		solarYear = 1820;
		solarMonth = 1;
		solarDay = 1;
		lunarYear = 1819;
		lunarMonth = 11;
		lunarDay = 16;
		lunLeapMonth = 0;
		solarMonthDay[1] = 29;// 1820년 2월 28일
		lunarMonthDay = 30;// 1819년 11월
	}else if(year >= 1800){
		// 기준일자 양력 1800년 1월 1일 (음력 1799년 12월 7일)
		solarYear = 1800;
		solarMonth = 1;
		solarDay = 1;
		lunarYear = 1799;
		lunarMonth = 12;
		lunarDay = 7;
		lunLeapMonth = 0;
		solarMonthDay[1] = 28;// 1800년 2월 28일
		lunarMonthDay = 30;// 1799년 12월
	}

	lunIndex = lunarYear - 1799;
	while(true){
		if(type == 1 && year == solarYear && month == solarMonth && day == solarDay){
			return new myDate(lunarYear, lunarMonth, lunarDay, lunLeapMonth);
		}else if(type == 2 && year == lunarYear && month == lunarMonth && day == lunarDay && leapmonth == lunLeapMonth){
			return new myDate(solarYear, solarMonth, solarDay, 0);
		}
		// 양력 달력
		if(solarMonth == 12 && solarDay == 31){
			solarYear++;
			solarMonth = 1;
			solarDay = 1;

			// 2월의 일수 설정
			if(solarYear % 400 == 0){
				solarMonthDay[1] = 29;
			}else if(solarYear % 100 == 0){
				solarMonthDay[1] = 28;
			}else if(solarYear % 4 == 0){
				solarMonthDay[1] = 29;
			}else{
				solarMonthDay[1] = 28;
			}
		}else if(solarMonthDay[solarMonth - 1] == solarDay){
			solarMonth++;
			solarDay = 1;
		}else{
			solarDay++;
		}
		// 음력 증가
		if(lunarMonth == 12 && ((lunarMonthTable[lunIndex][lunarMonth - 1] == 1 && lunarDay == 29) || (lunarMonthTable[lunIndex][lunarMonth - 1] == 2 && lunarDay == 30))) {
			lunarYear++;
			lunarMonth = 1;
			lunarDay = 1;
			if(lunarYear > 2101){
				alert("입력하신 날 또는 달은 없습니다. 다시 입력하시기 바랍니다.");
				break;
			}
			lunIndex = lunarYear - 1799;
			if(lunarMonthTable[lunIndex][lunarMonth - 1] == 1){
				lunarMonthDay = 29;
			}else if(lunarMonthTable[lunIndex][lunarMonth - 1] == 2){
				lunarMonthDay = 30;
			}
		}else if(lunarDay == lunarMonthDay){
			if(lunarMonthTable[lunIndex][lunarMonth - 1] >= 3 && lunLeapMonth == 0){
				lunarDay = 1;
				lunLeapMonth = 1;
			}else{
				lunarMonth++;
				lunarDay = 1;
				lunLeapMonth = 0;
			}
			if(lunarMonthTable[lunIndex][lunarMonth - 1] == 1){
				lunarMonthDay = 29;
			}else if(lunarMonthTable[lunIndex][lunarMonth - 1] == 2){
				lunarMonthDay = 30;
			}else if(lunarMonthTable[lunIndex][lunarMonth - 1] == 3){
				lunarMonthDay = 29;
			}else if(lunarMonthTable[lunIndex][lunarMonth - 1] == 4 && lunLeapMonth == 0){
				lunarMonthDay = 29;
			}else if(lunarMonthTable[lunIndex][lunarMonth - 1] == 4 && lunLeapMonth == 1){
				lunarMonthDay = 30;
			}else if(lunarMonthTable[lunIndex][lunarMonth - 1] == 5 && lunLeapMonth == 0){
				lunarMonthDay = 30;
			}else if(lunarMonthTable[lunIndex][lunarMonth - 1] == 5 && lunLeapMonth == 1){
				lunarMonthDay = 29;
			}else if(lunarMonthTable[lunIndex][lunarMonth - 1] == 6){
				lunarMonthDay = 30;
			}
		}else{
			lunarDay++;
		}
	}
}

// 매년 반복되는 기념일 체크
function memorialDayCheck(solarDate, lunarDate){
	var res = new Array();
	$.each(memorialDays, (index, date) => {
		if(date.month == solarDate.month && date.day == solarDate.day && date.solarLunar == 1){
			res.push(date);
		}
		// 윤달의 공휴일 처리에 대한 예외처리
		if(lunarDate.leapMonth && lunarDate.month == 4 && lunarDate.day == 8){
			return null;
		}
		if(lunarDate.leapMonth && lunarDate.month == 8 && lunarDate.day > 13 && lunarDate.day < 17){
			return null;
		}
		if(date.month == lunarDate.month && date.day == lunarDate.day && date.solarLunar == 2 && !date.leapMonth){
			res.push(date);
		}
	});
	return res;
}

// 매년 반복되지 않는 기념일 체크
function yearmemorialDayCheck(solarDate, lunarDate){
	var res = new Array();
	$.each(yearmemorialDays, (index, date) => {
		if(date.year == solarDate.year && date.month == solarDate.month && date.day == solarDate.day && date.solarLunar == 1){
			res.push(date);
		}
		if(date.year == lunarDate.year && date.month == lunarDate.month && date.day == lunarDate.day && date.solarLunar == 2 && !date.leapMonth){
			res.push(date);
		}
	});
	return res;
}

// 시간을 12시간으로 표시
function hours(no){
	if(no > 12){
		$('#noon').text('오후');
		return no - 12;
	}else{
		$('#noon').text('오전');
		return no;
	}
}

// 두자리로 출력
function digits(no){
	return new Array(2 - String(no).length + 1).join('0') + no;
}

// 공휴일과 오늘 날짜 표시
function holiday(memorialDate, date, month, day){
	var count = 0;
	var str = '';
	$.each(memorialDate, (index, item) => {
		if(item.holiday == true){
			count++;
		}
	});
	if(count > 0){
		str += 'holiday';
	}
	if(date.month == month && day == date.day){
		str += (str != '' ? ' ' : '') + 'bg-warning hover';
	}
	if(str != ''){
		return `<td class="${str}">`;
	}else{
		return `<td>`;
	}
}

// 달력 출력
function Calendar(){
	var date = new ToDay();
	var year = $('#year').text();
	var month = Number($('#month').text()) - 1;
	var first = new Date(year, month, 1);
	var weeks = new Date(year, month, 1).getDay();
	var monthDay = new Array(31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);// 월별 일수 배열
	
	// 2월달의 일수 계산
	if(year % 400 == 0){
		monthDay[1] = 29;
	}else if(year % 100 == 0){
		monthDay[1] = 28;
	}else if(year % 4 == 0){
		monthDay[1] = 29;
	}else{
		monthDay[1] = 28;
	}

	// 설날 전후 날짜 지정 
	if(lunarMonthTable[year - 1 - 1799][11] == 1){
		memorialDays[1].day = 29;
	}else if(lunarMonthTable[year - 1 - 1799][11] == 2){
		memorialDays[1].day = 30;
	}

	var table = ``;
	table += `<tr>`;
	for(i=0; i<weeks; i++){
		table += `<td></td>`;
	}
	for(i=1; i<=monthDay[month]; i++){
		var enter = new Date(year, month, i);
		var solarDate = new myDate(year, month + 1, i);
		var lunarDate = lunarConvert(year, month + 1, i, 1);
		var memorial = memorialDayCheck(solarDate, lunarDate);
		var yearmemorial = yearmemorialDayCheck(solarDate, lunarDate);
		if(enter.getDay() === 0){
			table += `</tr><tr>`;
		}
		var holidays = holiday(memorial, date, month, i);
		table += `${holidays}<strong class="solar">${i}</strong><span class="lunar">${(lunarDate.leapMonth ? '윤' : '') + digits(lunarDate.month)}.${digits(lunarDate.day)}</span>`;
	/*
		// 양력 공휴일과 음력 공휴일이 겹치는 경우
		if(solarDate.year == 2000 && solarDate.month == 4 && solarDate.day == 13){
			table += `<span>제16대 국회의원 선거일</span>`;
		}
		if(solarDate.year == 2006 && solarDate.month == 5 && solarDate.day == 31){
			table += `<span>제4대 지방 선거일</span>`;
		}
		if(solarDate.month == 3 && solarDate.day == 1 && lunarDate.month == 1 && lunarDate.day == 15){
			table += `<span>3·1절</span><span>정월대보름</span>`;
		}
		if(solarDate.month == 4 && solarDate.day == 28 && lunarDate.month == 4 && lunarDate.day == 8){
			table += `<span>석가탄신일</span><span>충무공탄신일</span>`;
		}
		if(solarDate.month == 5 && solarDate.day == 1 && lunarDate.month == 4 && lunarDate.day == 8){
			table += `<span>석가탄신일</span><span>근로자의날</span>`;
		}
		if(solarDate.month == 5 && solarDate.day == 5 && lunarDate.month == 4 && lunarDate.day == 8){
			table += `<span>어린이날</span><span>석가탄신일</span>`;
		}
		if(solarDate.month == 5 && solarDate.day == 8 && lunarDate.month == 4 && lunarDate.day == 8){
			table += `<span>석가탄신일</span><span>어버이날</span>`;
		}
		if(solarDate.month == 5 && solarDate.day == 15 && lunarDate.month == 4 && lunarDate.day == 8 && index % 7 == 1){
			table += `<span>석가탄신일</span><span>스승의날</span><span>성년의날</span>`;
		}
		if(solarDate.month == 5 && solarDate.day == 18 && lunarDate.month == 4 && lunarDate.day == 8 && index % 7 == 1){
			table += `<span>석가탄신일</span><span>5·18 민주화운동일</span><span>성년의날</span>`;
		}
		if(solarDate.month == 5 && solarDate.day == 19 && lunarDate.month == 4 && lunarDate.day == 8 && index % 7 == 1){
			table += `<span>석가탄신일</span><span>성년의날</span><span>발명의날</span>`;
		}
		if(solarDate.month == 5 && solarDate.day >= 15 && solarDate.day <= 21 && lunarDate.month == 4 && lunarDate.day == 8 && index % 7 == 1){
			table += `<span>석가탄신일</span><span>성년의날</span>`;
		}
		if(solarDate.month == 5 && solarDate.day == 15 && index % 7 == 1){
			table += `<span>스승의날</span><span>성년의날</span>`;
		}
		if(solarDate.month == 5 && solarDate.day == 18 && index % 7 == 1){
			table += `<span>5·18 민주화운동일</span><span>성년의날</span>`;
		}
		if(solarDate.month == 5 && solarDate.day == 19 && index % 7 == 1){
			table += `<span>성년의날</span><span>발명의날</span>`;
		}
		if(solarDate.month == 5 && solarDate.day == 15 && lunarDate.month == 4 && lunarDate.day == 8){
			table += `<span>석가탄신일</span><span>스승의날</span>`;
		}
		if(solarDate.month == 5 && solarDate.day == 18 && lunarDate.month == 4 && lunarDate.day == 8){
			table += `<span>석가탄신일</span><span>5·18 민주화운동일</span>`;
		}
		if(solarDate.month == 5 && solarDate.day == 19 && lunarDate.month == 4 && lunarDate.day == 8){
			table += `<span>석가탄신일</span><span>발명의날</span>`;
		}
		if(solarDate.month == 5 && solarDate.day == 31 && lunarDate.leapMonth){
			table += `<span>바다의날</span>`;
		}
		if(solarDate.month == 6 && solarDate.day == 5 && lunarDate.month == 5 && lunarDate.day == 5){
			table += `<span>환경의날</span><span>단오</span>`;
		}
		if(solarDate.month == 6 && solarDate.day == 6 && lunarDate.month == 5 && lunarDate.day == 5){
			table += `<span>현충일</span><span>단오</span>`;
		}
		if(solarDate.month == 8 && solarDate.day == 15 && lunarDate.month == 7 && lunarDate.day == 7){
			table += `<span>광복절</span><span>칠월칠석</span>`;
		}
		if(solarDate.month == 9 && solarDate.day == 18 && lunarDate.month == 8 && lunarDate.day == 14 || solarDate.month == 9 && solarDate.day == 18 && lunarDate.month == 8 && lunarDate.day == 16){
			table += `<span>철도의날</span>`;
		}
		if(solarDate.month == 10 && solarDate.day == 1 && lunarDate.month == 8 && lunarDate.day == 14 || solarDate.month == 10 && solarDate.day == 1 && lunarDate.month == 8 && lunarDate.day == 16){
			table += `<span>국군의날</span>`;
		}
		if(solarDate.month == 10 && solarDate.day == 2 && lunarDate.month == 8 && lunarDate.day == 14 || solarDate.month == 10 && solarDate.day == 2 && lunarDate.month == 8 && lunarDate.day == 16){
			table += `<span>노인의날</span>`;
		}
		if(solarDate.month == 10 && solarDate.day == 3 && lunarDate.month == 8 && lunarDate.day == 14 || solarDate.month == 10 && solarDate.day == 3 && lunarDate.month == 8 && lunarDate.day == 16){
			table += `<span>개천절</span>`;
		}
		if(solarDate.month == 9 && solarDate.day == 18 && lunarDate.month == 8 && lunarDate.day == 15){
			table += `<span>추석</span><span>철도의날</span>`;
		}
		if(solarDate.month == 10 && solarDate.day == 1 && lunarDate.month == 8 && lunarDate.day == 15){
			table += `<span>추석</span><span>국군의날</span>`;
		}
		if(solarDate.month == 10 && solarDate.day == 2 && lunarDate.month == 8 && lunarDate.day == 15){
			table += `<span>추석</span><span>노인의날</span>`;
		}
		if(solarDate.month == 10 && solarDate.day == 3 && lunarDate.month == 8 && lunarDate.day == 15){
			table += `<span>개천절</span><span>추석</span>`;
		}
		if(solarDate.month == 10 && solarDate.day == 9 && lunarDate.month == 8 && lunarDate.day == 16){
			table += `<span>한글날</span><span>연휴</span>`;
		}
		if(solarDate.month == 10 && solarDate.day == 9 && lunarDate.leapMonth){
			table += `<span>한글날</span>`;
		}
		if(solarDate.month == 5 && solarDate.day >= 15 && solarDate.day <= 21 && index % 7 == 1){
			table += `<span>성년의날</span>`;
		}
	*/
		// 겹치지 않는 기념일
		table += `<ul class="eventday list-unstyled">`
		$.each(memorial, (index, date) => {
			table += `<li${date.holiday == true ? ' class="holiday"' : ''}>${date.name}</li>`;
		});
		$.each(yearmemorial, (index, date) => {
			table += `<li>${date.name}</li>`;
		});
		table += `</ul></td>`;
	}
	var cell = (7 * Math.ceil((weeks + monthDay[month]) / 7)) - (weeks + monthDay[month]);
	for(k=0; k<cell; k++){
		table += `<td></td>`;
	}
	var line = 42 - (7 * Math.ceil((weeks + monthDay[month]) / 7))
	if(line == 7){
		table += `</tr><tr>`;
		for(l=0; l<7; l++){
			table += `<td></td>`;
		}
	}
	table += `</tr>`;
	$('#cal-table tbody').html(table);
}