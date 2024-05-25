
const isShowLog = true; // 콘솔로그 출력 여부 
const totalScreenNum = 3; // 총 상영관 갯수 
const screenSeatsHTML = ['']; // 선택 상영관 좌석 출력 마크업 저장
// 세가지 상태값: 'empty', 'pending', 'reserved'


dataInit();


// 새로고침시 데이터값 초기 세팅 
function dataInit() {
    renderScreenChoice();
}

// 사용자 정의 콘솔로그 출력 함수  
function logCheck(logMsg, showContent) {
    if (!isShowLog) return;
    console.log(`${logMsg}:\n` + showContent);
}

// 상영관 리스트에서 리스트를 선택하면 처리하는 함수
function screenChange() {
    let selectedScreen = document.querySelector('#screenChoice').value;
    logCheck('선택한 상영관', selectedScreen);
    renderSeatingChart();
}

function renderScreenChoice() {
    let screenChoiceList = document.querySelector('#screenChoice').innerHTML;
    screenChoiceList = '';
    for (let i = 0; i <= totalScreenNum; i++) {
        if (i == 0) {
            screenChoiceList += `<option value="${i}">상영관 선택</option>`;
        } else {
            screenChoiceList += `<option value="${i}">인천CGV ${i}관</option>`;
        }
        logCheck("상영관리스트", screenChoiceList);
    }
}

function renderSeatingChart() {
    let seatingChart = document.querySelector('#seatingChart');
}

function renderOrderDialog() {

}

