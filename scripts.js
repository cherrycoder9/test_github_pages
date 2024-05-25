
const isShowLog = true; // 콘솔로그 출력 여부 
const totalScreenNum = 3; // 총 상영관 갯수 
let selectedScreen = 0; // 선택한 상영관
let pickCount = 0; // 좌석 선택 갯수. 0이면 결제/취소 버튼 비활성화
const totalSeats = 20;
const startTime = [0, 0, 0];
const screenSeatsHTML = ['']; // 선택 상영관 좌석 출력 마크업 저장
let saveOrderMsg = []; // 예매 및 취소 좌석 안내 임시 저장 배열


dataInit(); // 데이터 및 화면 초기값 설정
// 초기값 세팅 
function dataInit() {
    for (let i = 1; i <= totalScreenNum; i++) {
        screenSeatsHTML[i] = ``;
        for (let j = 1; j <= totalSeats; j++) {
            // data-status: 'empty' or 'pending' or 'reserved'
            // data-pw: 'x' or 네자리 숫자
            screenSeatsHTML[i] += `
                    <div id="sc${i}seat${j}" onclick="pickSeat('#sc${i}seat${j}')" data-status="empty" data-pw="x">${j}</div>`.trim();
        }
        logCheck(`상영관${i} 좌석도 마크업`, screenSeatsHTML[i]);
        // 상영시간 초기화
        let hour = Math.floor(Math.random() * (24 - 0)) + 0;
        let minute = Math.floor(Math.random() * (60 - 0)) + 0;
        startTime[i - 1] = `${String(hour)}시 ${String(minute)}분`;
    }

    renderScreenChoice(); // 상단 상영관 선택 화면 갱신 
    renderSeatingChart(0); // 상영관 선택 좌석도 출력 (비어있는 좌석도)

}

// 사용자 정의 콘솔로그 출력 함수  
function logCheck(logMsg, showContent) {
    if (!isShowLog) return;
    // 어떤 역할을 하는 콘솔로그인지 첫라인에 적고 엔터후 변수 내용 출력
    console.log(`${logMsg}:\n` + showContent);
}

// HTML 상영관 리스트에서 리스트를 선택하면 처리하는 함수
function screenChange() {
    saveOrderMsg.length = 0;
    pickCount = 0;
    if (pickCount > 0) {
        document.querySelector('#orderBtn').dataset.seatPicked = 1;
    } else {
        document.querySelector('#orderBtn').dataset.seatPicked = 0;
    }
    // 상영관 선택시 옵션값을 읽어 selectedScreen 변수에 저장 
    selectedScreen = document.querySelector('#screenChoice').value;
    screenSeatsHTML[selectedScreen] = '';
    for (let j = 0; j < totalSeats; j++) {
        screenSeatsHTML[selectedScreen] += `
                    <div id="sc${selectedScreen}seat${j}" onclick="pickSeat('#sc${selectedScreen}seat${j}')" data-status="empty" data-pw="x">${j}</div>`.trim();
    }
    // 다음으로 뭘 해야 할지 안내메시지 창 준비
    let infoMsg = '';
    logCheck('선택한 상영관', selectedScreen);
    if (selectedScreen == 0) {
        infoMsg = `상영관을 선택하세요.`;
    } else {
        infoMsg = `예약 또는 취소할 좌석을 모두 선택하세요.`;
    }
    // 안내 메시지 창 갱신 
    document.querySelector('#helpDialog').innerHTML = infoMsg;
    document.querySelector('#orderMsg').innerHTML = '선택좌석: ';
    logCheck('안내메시지에 출력', infoMsg);
    // 선택한 상영관 인덱스 값을 좌석도 출력 함수에 넘김
    renderSeatingChart(selectedScreen);
}

// 상영관 선택 화면을 갱신하는 함수 
function renderScreenChoice() {
    let screenChoiceList = '';

    for (let i = 0; i <= totalScreenNum; i++) {
        if (i == 0) {
            screenChoiceList += `
                <option value="${i}">상영관 선택</option>`.trim();
        } else {
            // 상영관 선택 옵션 이하 옵션들 출력
            screenChoiceList += `
                <option value="${i}">${i}관 (상영시간: ${startTime[i - 1]})`.trim();
            // 조조할인 적용되는지 계산하고 표시
            let hour = parseInt(startTime[i - 1].split('시')[0].trim());
            logCheck("시간", hour);
            if (hour >= 22 || hour < 9) {
                screenChoiceList += `&nbsp;&nbsp;-&nbsp;&nbsp;조조할인`;
            }
            screenChoiceList += `</option>`;
        }
    }
    logCheck("상영관리스트(마크업)", screenChoiceList);
    // 상영관 선택 화면을 새로 고침 
    document.querySelector('#screenChoice').innerHTML = screenChoiceList;
}

// 개별 좌석을 선택하면 실행되는 동작 함수
function pickSeat(seatID) {
    let pickSeat = document.querySelector(seatID);
    let infoMsg = '';
    logCheck(`선택좌석`, pickSeat.textContent);
    if (pickSeat.dataset.status == 'empty') {
        pickSeat.dataset.status = 'pending';
        screenSeatsHTML[selectedScreen] = document.querySelector('#seatingChart').innerHTML;
        logCheck('좌석상태', pickSeat.dataset.status);
        pickCount++;
        infoMsg = `선택한 좌석을 한번 더 누르면 취소됩니다.`;
        renderOrderDialog(pickSeat.textContent);
    } else if (pickSeat.dataset.status == 'pending') {
        pickSeat.dataset.status = 'empty';
        screenSeatsHTML[selectedScreen] = document.querySelector('#seatingChart').innerHTML;
        logCheck('좌석상태', pickSeat.dataset.status);
        pickCount--;
        infoMsg = `모두 선택하셨으면 예매하기 버튼을 누르세요.`;
        renderOrderDialog(pickSeat.textContent);
    } else if (pickSeat.dataset.status == 'reserved' && pickCount > 0) {
        infoMsg = `예매와 취소를 동시에 할 수 없습니다. 예약된 좌석만 선택하시거나 빈 좌석만 선택하세요.`;
    }
    document.querySelector('#helpDialog').innerHTML = infoMsg;
    if (pickCount > 0) {
        document.querySelector('#orderBtn').dataset.seatPicked = 1;
    } else {
        document.querySelector('#orderBtn').dataset.seatPicked = 0;
    }
    renderSeatingChart(selectedScreen);
}

// 각 상영관의 좌석도를 갱신하는 함수 
function renderSeatingChart(screen) {

    // 선택한 상영관의 좌석도를 새로 고침 
    document.querySelector('#seatingChart').innerHTML = screenSeatsHTML[screen];
}

// 주문 및 취소 관련 화면을 갱신하는 함수 
function renderOrderDialog(seatNum) {
    let index = saveOrderMsg.indexOf(seatNum);
    if (index >= 0) {
        saveOrderMsg.splice(index, 1);
    } else {
        saveOrderMsg.push(seatNum);
    }
    document.querySelector('#orderMsg').innerHTML = `선택좌석: ${saveOrderMsg}`;
    logCheck("배열확인", saveOrderMsg);
}

function orderProcess() {

}
