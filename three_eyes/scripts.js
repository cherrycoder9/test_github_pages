

const 플레이어 = {
    인덱스: 0,
    닉네임: 'P',
    승리: 0,
    내턴: 0
};
const 컴퓨터 = {
    인덱스: 1,
    닉네임: 'C',
    승리: 0,
    내턴: 0,
};
const 시스템 = {
    인덱스: 2,
    닉네임: 'S',
    보드판현황: ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
    이기는조건: [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 4, 8], [2, 4, 6],
        [0, 3, 6], [1, 4, 7], [2, 5, 8]]
};
const P = 플레이어;
const C = 컴퓨터;
