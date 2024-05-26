// Seat Status (좌석 상태)
// 1. Available : 이용가능 = able
// 2. Payment Pending : 결제대기 = pend
// 3. Reserved : 예약됨 = rsrv
// 4. Cancellation Pending : 취소대기 canc

const isShowLog = true; // 콘솔로그 on/off
const seatStatus = []; // 좌석 상태 
const seatPassword = []; // 좌석 비밀번호
const totalScreens = 3; // 총 상영관 숫자
const numOfSeats = 20; // 상영관 별 좌석 개수
const pendSeats = []; // 결제 예정인 좌석번호 배열 
const cancSeats = []; // 취소 예정인 좌석번호 배열
let price = 0; // 결제 금액

updateSeatData(); // 좌석 정보 초기화
generateMovieStartTime(); // 상영관 별 영화 시작시간 설정

// 사용자 정의 콘솔로그 출력 함수  
function logCheck(logMsg, showContent) {
    if (!isShowLog) return;
    // 어떤 역할을 하는 콘솔로그인지 첫라인에 적고 줄바꿈후 변수 내용 출력
    console.log(`${logMsg}:\n` + showContent);
}

// 좌석 데이터 갱신 
function updateSeatData() {
    // 상영관 변경시 detailMsgBox에 출력할 저장된 번호 초기화
    pendSeats.length = 0;
    cancSeats.length = 0;
    logCheck('pendSeats Array', pendSeats);
    for (let i = 0; i < numOfSeats; i++) {
        // 새로고침시 저장되는 좌석 기본 정보 입력
        if (seatStatus.length < numOfSeats) {
            seatStatus.push('able-able-able');
            seatPassword.push('xxxx-xxxx-xxxx');
        } else {
            // 주문처리 없이 상영관 변경시 좌석 변경정보 초기화
            let recoverSeats = [];
            // 1관-2관-3관 좌석 상태를 '-'로 구분해 쪼갠 다음 임시 배열에 담음 
            recoverSeats = seatStatus[i].split('-');
            for (let j = 0; j < totalScreens; j++) {
                if (recoverSeats[j] == 'pend') {
                    recoverSeats[j] = 'able';
                } else if (recoverSeats[j] == 'canc') {
                    recoverSeats[j] = 'rsrv';
                }
            }
            // 임시 배열의 각 인덱스에 담긴 상태 정보를 '-'로 이어서 합치고 좌석 데이터 갱신 
            seatStatus[i] = recoverSeats.join('-');
        }
    }
    logCheck('seatStatus Array', seatStatus);
}

// 상영관 선택시 실행되는 프로세스 
function changeScreen() {
    let currentScreen = document.querySelector('#screenSelectionList').value;
    logCheck('currentScreen', currentScreen);
    renderSeats(currentScreen);
}

// 좌석현황 화면 새로고침 
function renderSeats(cS) {
    let newRenderSeats = '';
    if (cS == 0) {
        showHelpDialogBox('상영관을 선택하세요.');
    } else {
        showHelpDialogBox('예매할 좌석 또는 예약 취소할 좌석을 선택하세요.');
        for (let i = 0; i < numOfSeats; i++) {
            // 좌석마다 아이디 속성 추가
            newRenderSeats += `
                <div id="s${cS}seat${i + 1}"
            `.trim();
            // 좌석 상태 변수의 값을 불러와 data 속성에 대입  
            newRenderSeats += `
                data-status="${seatStatus[i].split('-')[cS - 1]}"
            `.trim();
            // 좌석마다 클릭할때 실행될 함수의 인자로 아이디 속성값을 추가해줌
            newRenderSeats += `
                onclick="selectSeat('s${cS}seat${i + 1}')">${i + 1}</div>
            `.trim();
        }
    }
    logCheck('newRenderSeats', newRenderSeats);
    document.querySelector('#seatingStatusBox').innerHTML = newRenderSeats;
}

// 안내창 표시 메시지 함수
function showHelpDialogBox(msg) {
    document.querySelector('#helpDialogBox').innerHTML = msg;
}

// 상영관마다 영화 시작 시간 생성 
function generateMovieStartTime() {
    for (let i = 0; i < totalScreens; i++) {
        let selectedScreenOption = document.querySelector(`#screen${i + 1}`);
        let hour = Math.floor(Math.random() * 24);
        let minute = Math.floor(Math.random() * 60);
        let newHTML = '';

        newHTML = `
            인천CGV ${i + 1}관 (상영시간: ${hour}시 ${minute}분)
        `.trim();

        if (hour >= 22 || hour <= 9) {
            // 조조할인 시간이면 기존 data-discount 값을 1로 변경 
            selectedScreenOption.dataset.discount = 1;
            newHTML += '&nbsp;&nbsp;-&nbsp;&nbsp;[조조할인]';
        }
        selectedScreenOption.innerHTML = newHTML; // 변경할 마크업 저장
    }
}

// 개별 좌석을 선택하면 실행할 함수
function selectSeat(seatID) {
    let sID = document.querySelector(`#${seatID}`);
    let seatStatus = sID.dataset.status;
    logCheck("seatStatus", seatStatus);
    if (true) {

    }
}