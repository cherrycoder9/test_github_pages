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
let currentScreen = 0;

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
    resetSeatSelections();
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

// 상영관 선택(변경)시 실행되는 프로세스 
function changeScreen() {
    currentScreen = document.querySelector('#screenSelectionList').value;
    logCheck('currentScreen', currentScreen);
    resetSeatSelections();
    renderSeats(currentScreen);
    updateButtonActivate();
    renderDetailMsgBox();
}

// 좌석현황 표시화면 갱신 
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
        const selectedScreenOption = document.querySelector(`#screen${i + 1}`);
        const hour = Math.floor(Math.random() * 24);
        const minute = Math.floor(Math.random() * 60);
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

// 개별 좌석을 클릭하면 실행할 함수
function selectSeat(seatID) {
    const sID = document.querySelector(`#${seatID}`);
    const seatStatus = sID.dataset.status; // 좌석상태 저장 변수 
    const seatNumber = parseInt(sID.textContent); // 좌석번호 저장 변수 
    logCheck("seatStatus", seatStatus);
    if (seatStatus == 'able' && cancSeats.length == 0) { // 선택한 좌석이 'able' 상태이면서 cancSeats에 담긴 좌석이 하나도 없는 경우 
        sID.dataset.status = 'pend';
        pendSeats.push(seatNumber); // 결제대기 배열에 좌석 추가 
        logCheck("pendSeats", pendSeats);
        showHelpDialogBox('예매할 좌석 또는 예약 취소할 좌석을 선택하세요.');
    } else if (seatStatus == 'pend' && cancSeats.length == 0) {
        sID.dataset.status = 'able';
        pendSeats.splice(pendSeats.indexOf(seatNumber), 1); // 결제대기 배열에서 좌석 삭제 
        logCheck("pendSeats", pendSeats);
        showHelpDialogBox('예매할 좌석 또는 예약 취소할 좌석을 선택하세요.');
    } else if (seatStatus == 'rsrv' && pendSeats.length == 0) {
        sID.dataset.status = 'canc';
        cancSeats.push(seatNumber); // 취소대기 배열에 좌석 추가 
        showHelpDialogBox('예매할 좌석 또는 예약 취소할 좌석을 선택하세요.');
    } else if (seatStatus == 'canc' && pendSeats.length == 0) {
        sID.dataset.status = 'rsrv';
        cancSeats.splice(cancSeats.indexOf(seatNumber), 1); // 취소대기 배열에서 좌석 삭제 
        showHelpDialogBox('예매할 좌석 또는 예약 취소할 좌석을 선택하세요.');
    } else {
        showHelpDialogBox('예약과 취소를 동시에 할 수 없습니다.');
    }
    renderDetailMsgBox();
    updateButtonActivate();
}

// 버튼 활성화/비활성화
function updateButtonActivate() {
    // 예매 버튼 활성화/비활성화
    if (pendSeats.length == 0) {
        document.querySelector('#reservationBtn').dataset.btnActivate = 0;
    } else {
        document.querySelector('#reservationBtn').dataset.btnActivate = 1;
    }
    // 취소 버튼 활성화/비활성화
    if (cancSeats.length == 0) {
        document.querySelector('#cancelBtn').dataset.btnActivate = 0;
    } else {
        document.querySelector('#cancelBtn').dataset.btnActivate = 1;
    }
}

// 선택만 해놓고 좌석 예매하기나 취소하기를 하지 않는 경우 임시 저장된 배열 비우기
function resetSeatSelections() {
    pendSeats.length = 0;
    cancSeats.length = 0;
}

function renderDetailMsgBox() {
    let newDetailMsgBox = '';
    const isDiscount = document.querySelector(`#screen${currentScreen}`).dataset.discount; // 조조할인 체크
    logCheck('isDiscount', isDiscount);
    if (pendSeats.length > 0) {
        // 예매할 좌석 출력
        newDetailMsgBox += `예매할 좌석: `;
        for (let i = 0; i < pendSeats.length; i++) {
            if (i == 0) {
                newDetailMsgBox += `${pendSeats[i]}`;
            } else {
                newDetailMsgBox += `, ${pendSeats[i]}`;
            }
        }
        newDetailMsgBox += `<br /><br />`;
        // 결제할 금액 출력
        if (isDiscount == 0) {
            newDetailMsgBox += `결제금액: ${pendSeats.length * 10000}`;
        } else {
            newDetailMsgBox += `결제금액: ${pendSeats.length * 5000}`;
        }
    } else if (cancSeats.length > 0) {
        // 예매할 좌석 출력
        newDetailMsgBox += `취소할 좌석: `;
        for (let i = 0; i < cancSeats.length; i++) {
            if (i == 0) {
                newDetailMsgBox += `${cancSeats[i]}`;
            } else {
                newDetailMsgBox += `, ${cancSeats[i]}`;
            }
        }
        newDetailMsgBox += `<br /><br />`;
        // 환불할 금액 출력
        if (isDiscount == 0) {
            newDetailMsgBox += `환불금액: ${cancSeats.length * 10000}`;
        } else {
            newDetailMsgBox += `환불금액: ${cancSeats.length * 5000}`;
        }
    }

    document.querySelector('#detailMsgBox').innerHTML = newDetailMsgBox;
}

// 예매하기 버튼 클릭시 동작되는 함수 
function reserveSeats() {
    if (pendSeats.length == 0) {
        return; // 예매좌석 없으면 무효처리
    } else {
        const pw = String(Math.floor(Math.random() * 9000) + 1000);
        logCheck('typeof pw', typeof pw);
        alert(`예매 성공\n비밀번호: ${pw}`);
        while (pendSeats.length != 0) {
            let seatNum = pendSeats.pop();
            let newSeatStatus = [];
            let newSeatPassword = [];
            newSeatStatus = seatStatus[seatNum - 1].split('-');
            newSeatStatus[currentScreen - 1] = 'rsrv'; // 좌석 상태변경
            seatStatus[seatNum - 1] = newSeatStatus.join('-');
            newSeatPassword = seatPassword[seatNum - 1].split('-');
            newSeatPassword[currentScreen - 1] = pw; // 비밀번호 해당 좌석에 저장
            seatPassword[seatNum - 1] = newSeatPassword.join('-');
            logCheck('newSeatStatus Array', newSeatStatus);
            logCheck('pendSeats Array', pendSeats);
            logCheck('newSeatPassword Array', newSeatPassword);
        }

    }
    resetSeatSelections();
    renderSeats(currentScreen);
    renderDetailMsgBox();
    updateButtonActivate();
}

// 취소하기 버튼 클릭시 동작되는 함수
function cancelSeats() {
    if (cancSeats.length == 0) {
        return; // 취소좌석 없으면 무효처리
    } else {
        const inputPassword = prompt('비밀번호를 입력하세요.');
        if (inputPassword == null) {
            alert('사용자가 비밀번호를 입력하지 않아 취소됩니다.');
            resetSeatSelections();
            renderSeats(currentScreen);
            renderDetailMsgBox();
            updateButtonActivate();
            return;
        }
        // 취소할 좌석이 사라질 때까지 반복 
        while (cancSeats.length != 0) {
            let seatNum = cancSeats.pop();
            let existingPw = [];
            existingPw = seatPassword[seatNum - 1].split('-');
            logCheck('inputPassword', typeof inputPassword);
            logCheck('existingPw[currentScreen - 1]', typeof existingPw[currentScreen - 1]);
            if (existingPw[currentScreen - 1] != inputPassword) {
                alert('비밀번호가 일치하지 않은 좌석이 있습니다');
                break;
            } else { // 비밀번호가 일치한다면 
                let newSeatStatus = [];
                newSeatStatus = seatStatus[seatNum - 1].split('-');
                newSeatStatus[currentScreen - 1] = 'able'; // 취소된 좌석 이용가능으로 상태변경 
                seatStatus[seatNum - 1] = newSeatStatus.join('-');
                if (cancSeats.length == 0) { // 마지막 남은 좌석 비밀번호 검증 
                    alert('선택한 모든 좌석(들)의 비밀번호가 일치합니다.');
                }
            }
        }
    }
    resetSeatSelections();
    renderSeats(currentScreen);
    renderDetailMsgBox();
    updateButtonActivate();
}