// 롯데시네마
// 1. 지역
// 2. 지점
// 3. 상영중인 영화
// 4. 날짜
// 5. 관마다 시간
// 변수, 배열, 객체를 이용한 설계하기
// ------------------
// 인천 부평역사점 범죄도시4 2024-05-25 2관 13:30
// 서울 가양점 드림시나리오 2024-05-27 4관 18:10


/*
    게시판 (네이버 증권 게시판)
        1. 카테고리 / 종목명
        2. 게시물 / 제목, 내용, 작성일, 조회수
        3. 댓글 / 내용, 작성일
*/

// let 카테고리목록 = [
//     { cno: 1, cname: '삼성전자' },
//     { cno: 2, cname: 'LG전자' },
// ];

// let 게시물목록 = [
//     { bno: 1, btitle: '올랐다', bcontent: '좋아요', bpassword: '1234', bdate: '2024-05-28', cno: 1 },
//     { bno: 2, btitle: '내렸다', bcontent: '싫어요', bpassword: '4567', bdate: '2024-05-27', cno: 1 }
// ];

// let 댓글목록 = [
//     { rno: 1, rcontent: '좋겠네', rdate: '2024-05-28', bno: 1 },
//     { rno: 2, rcontent: '싫겠네', rdate: '2024-05-28', bno: 2 },
//     { rno: 3, rcontent: '하하하', rdate: '2024-05-29', bno: 2 }
// ];

// // 1. 1번 게시물의 댓글 출력해보자
// let clickBno = 1;
// for (let i = 0; i < 댓글목록.length; i++) { // 댓글목록 모두 순회
//     if (댓글목록[i].bno == 1) {
//         console.log('1번 게시물의 댓글', 댓글목록[i]);
//     }
// }

// // 2. 삼성전자의 게시물과 댓글 출력해보자 
// let clickCno = 1;
// for (let i = 0; i < 게시물목록.length; i++) { // 게시물목록 모두 순회
//     // 조건: clickCno와 같은 경우만 출력
//     if (게시물목록[i].cno == clickCno) {
//         console.log('삼성전자의 게시물', 게시물목록[i]);
//         console.log('--------------------------');

//         for (let j = 0; j < 댓글목록.length; j++) {
//             // 조건2: 위에 있는 i번째 게시물 번호와 댓글에 있는 게시물 번호와 같으면
//             if (게시물목록[i].bno == 댓글목록[j].bno) {
//                 console.log('삼성전자의 게시물의 댓글', 댓글목록[j]);
//             }

//         } // for2 end
//         console.log('--------------------------');
//     } // if end
// } // for1 end



/*
    실습과제: 키오스크
        실행순서: 1. 카테고리 -> 2. 제품 -> 3. 장바구니 -> 4. 주문
        * 1~4번은 고객이 보는 화면 
        1. 카테고리: 카테고리명 
        2. 제품: 제품명, 가격
        3. 장바구니: 사이즈(M, L) [내가 선택한것만]
        ==================================================================
        # 1. 위와 필수 속성을 이용한 메모리 설계하고 샘플 배열당 3~4개 객체
        # 2. 구현
            1. 카테고리가 출력된 상태에서
            2. 특정 카테고리를 클릭하면 해당 카테고리의 제품 모두 출력
            3. 해당 제품명을 클릭하면 prompt()로 사이즈를 받고 장바구니에 담는다. 
            4. 장바구니 현황을 출력한다. 
        ! 시간이 되면 관리자 입장에서 카테고리 등록, 제품 등록 기능 추가
*/
// 카테고리: 커피, 티, 에이드
// 프로덕트: 커피(연유라떼, 할메가커피, 에스프레소)
// 프로덕트: 티(얼그레이, 사과유자차, 녹차)
// 프로덕트: 에이드(자몽에이드, 레몬에이드, 딸기주스)
// TODO: 사이즈는 S, M, L 입력받는다
// 
let categoryList = [ //카테고리
    { cNo: 1, category: '커피' },
    { cNo: 2, category: '티' },
    { cNo: 3, category: '에이드' }
];
let productList = [ // 메뉴들
    { pNo: 1, product: '연유라떼', price: 1500, cNo: 1 },
    { pNo: 2, product: '할메가커피', price: 1800, cNo: 1 },
    { pNo: 3, product: '에스프레소', price: 2500, cNo: 1 },
    { pNo: 4, product: '얼그레이', price: 1900, cNo: 2 },
    { pNo: 5, product: '사과유자차', price: 2800, cNo: 2 },
    { pNo: 6, product: '녹차', price: 3500, cNo: 2 },
    { pNo: 7, product: '자몽에이드', price: 2500, cNo: 3 },
    { pNo: 8, product: '레몬에이드', price: 3800, cNo: 3 },
    { pNo: 9, product: '딸기주스', price: 4500, cNo: 3 },
];
// 사이즈 : S는 가격 같음 M = +500 L = +800
// 담은상품리스트(배열)
// cart[0].num += 1 // 장바구니로 넘어갈 때
// cart[0].size = 'M' // ''
let cart = []; // 장바구니
// let totalCost = 5300; // 장바구니에서 총합가격 (productList[(pNo=1)].price + size차이) * num, ((1500+500)*1+(2500+800)*1)

/*
    커피V    티      에이드

    연유라떼 할메가커피 에스프레소

 -> 연유라떼 고르면 사이즈 prompt() -> 사이즈 안내문 포함 L M S
 -> 선택 -> 연유라떼의 pNo, 선택한 사이즈, 주문갯수가 장바구니 cart[]로
 -> 장바구니 현황을 출력

 관리자메뉴 (아이디, 비밀번호 prompt())
 카테고리 추가 > categoryList.push() (cNo 자동 할당)
 제품 추가 > productList.push() (prompt로 제품명, 가격, 카테고리 선택, pNo는 자동 할당)
*/

function categoryPrint() { // 카테고리 칸 출력
    let html = '';

    for (let i = 0; i < categoryList.length; i++) {
        html += `<div id="${categoryList[i].cNo}" onclick="productPrint(${categoryList[i].cNo})">${categoryList[i].category}</div>`;
    }

    document.querySelector('#category').innerHTML = html;
}

function productPrint(cNo) { // 제품 칸 출력
    let num = cNo;
    let html = '';
    for (let i = 0; i < productList.length; i++) {
        if (productList[i].cNo == num) { // cNo 일치하는 제품들만 출력
            html += `<div id="product${i + 1}" onclick='cartSend(${i + 1})'>${productList[i].product}</div>`;
        }
    }
    document.querySelector('#productList').innerHTML = html;
}
console.log();
function cartSend(pNo) { // 장바구니에 담기 버튼 함수, 받는 값: pNo, size
    let got_pNo = pNo; // 함수 패러미터에서 pNo
    let got_size = prompt('사이즈를 선택해 주세요: S M L'); // size 프롬프트
    let tempMenu = { pNo: got_pNo, size: got_size, num: 1 }; // 임시 프리셋
    let added = 0;
    console.log('tempMenu= ', tempMenu);
    if (cart.length == 0) {
        cart.push(tempMenu); added = 1;
    } else {
        for (let i = 0; i < cart.length; i++) { // pNo & size 비교 -> num만 증가해도 되나?
            console.log('cartNum', cart[i].num);
            console.log('i =', i, 'cart pNo', cart[i].pNo, got_pNo, 'cart size', cart[i].size, got_size);
            if (cart[i].pNo == got_pNo && cart[i].size == got_size) {
                console.log('중복 주문');
                cart[i].num++; added = 1;
                console.log('cartNum++', cart[i].num);
            }
        }
    }
    if (added == 0) { cart.push(tempMenu); }
    console.log('cartsend succeed');
    cartPrint(); //업데이트된 장바구니 출력
}

function cartPrint() { // 장바구니 현황 출력하기
    // 받은 값 : [0] = { pNo: 1, size: 'M', num: 1 }
    console.log('cart= ', cart);
    html = '';
    for (let i = 0; i < cart.length; i++) {
        cartProd = cart[i]; // = cart[0] { pNo: 1, size: 'M', num: 1 }
        html += `<div>
                        ${productList[(cartProd.pNo - 1)].product} 
                        ${cartProd.size} 
                        ${cartProd.num}
                </div>`; // 제품명, 사이즈, 갯수
    }
    document.querySelector('#cartList').innerHTML = html;

}

function buy() {
    let cost = 0;
    let sizeCost = 0;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].size == 'S') { sizeCost = 0; }
        else if (cart[i].size == 'M') { sizeCost = 500; }
        else if (cart[i].size == 'L') { sizeCost = 800; }
        cost += (productList[cart[i].pNo].price + sizeCost) * cart[i].num;
    }

    // 장바구니에서 총합가격 (productList[(pNo=1)].price + size차이) * num,
    // (1500 + 500) * 1 + (2500 + 800) * 1)
    alert(`결제금액은 ${cost}원입니다`);
}


function adminMenu() {
    let id = prompt('관리자 아이디를 입력하세요: '); // id = admin
    let pass = prompt('관리자 비밀번호를 입력하세요: '); // pass = 1234
    if (id == admin && pass == '1234') {
        let select = prompt('카테고리 추가 : 1, 메뉴 추가 : 2');
        if (select == 1) { }

    } else { alert('아이디 혹은 비밀번호가 틀립니다.'); }
}
