// reduce란?
// es5에서 등장
// es6에서 또는 프론트엔드에서 배열을 다루는 일이 많기 때문에 forEach, map, reduce를 꼭 알아야 한다.

// 배열의 모든 메소드는 중요한 순서대로 나열되어있다.
// 앞의 것일 수록 중요도가 높다.
// 제이쿼리에선 인덱스가 먼저오고 나중에 값이 오는데
// $('li').each(function(index, item) {});
// 자바스트립트에선 값이 먼저오고 인덱스는 나중에
// [1,2,3].forEach(function(item, index) {});
// 공식 문서 보는 법
// 메타 표기법 읽는법
// 대괄호 안의 인자는 옵션, 생략가능

// forEach란?
// for문 편하게 돌리게 해주는거
// MDN - Array.prototype.forEach
// 어레이에 있는 프로토타입에 있는 포이치는 인자를 두개를 받을건데 callback함수를 인자로 받는데 이건 반드시, thisArg라는 인자는 생략가능.
// Array.prototype.forEach(callback[, thisArg])
// 콜백은 반드시 함수여야하고 첫번째 인자 currentValue는 반드시 필수, index라는 인자는 생략가능, originalArray도 생략가능 
// callback : function(currentValue[, index[, originalArray]]])
//     currentValue: 현재값(필수)
//     index: 현재 인덱스
//     originalArray: 원본배열
// thisArg: this에 할당할 대상. 생략시 global객체

const a = [1, 2, 3];
a.forEach(function (v, i , arr) {
    console.log(v, i, arr, this)
}, [10, 20, 30]);
// 1 0 (3) [1, 2, 3] (3) [10, 20, 30]
// 2 1 (3) [1, 2, 3] (3) [10, 20, 30]
// 3 2 (3) [1, 2, 3] (3) [10, 20, 30]


// map란?
// for문을 돌려서 새로운 배열을 만드는 목적. 새로운 뭔가를 만드니 반드시 뭔가를 return
// MDN-Array.prototype.map
// Array.prototype.map(callback[, thisArg])
// callback: function(currentValue[, index[, originalArray]])
//     currentValue: 현재값(필수),
//     index: 현재 인덱스,
//     originalArray: 원본배열
// thisArg: this에 할당할 대상. 생략시 global객체

const a = [1, 2, 3];
const b = a.map(function(v, i, arr) {
    console.log(v, i, arr, this, this[0] + v);
    return this[0] + v
}, [10])
b // 11, 12, 13
// 1 0 (3) [1, 2, 3] [10] 11
// 2 1 (3) [1, 2, 3] [10] 12
// 3 2 (3) [1, 2, 3] [10] 13
// (3) [11, 12, 13]


// reduce란?
// for문을 돌려서 최종적으로 다른 무언갈르 만드는 목적. 새로운 뭔가를 만드니 반드시 뭔가를 return
// MDN-Array.prototype.reduce
// Array.prototype.reduce(callback[, initialValue])
// initialValue: 초기값, 생략시 첫번째 인자가 자동 지정되며, 
// 이경우 currentValue는 두번째 인자부터 배정된다. 순회도 두번째 부터 돔.
// callback: function(accumulator, currentValue[, currentIndex[, originalArray]])
//     accumulator: 누적된 계산값(필수),
//     currentValue: 현재값 (필수),
//     currentIndex: 현재 인덱스,
//     originalArray: 원본배열


// 제일 처음에 p는 누적된 계산값으로 10이 들어간다
// c에는 1이 들어간다. 10(p) + 1(c) = 11반환
// p에 11이 들어가고 c에는 2가 들어가서 11(p) + 2(c)= 13
// p에 13이 들어가고 c에는 3이 들어가서 13(p) + 3(c) = 16
// 16이 반환 되고 끝.
const a = [1, 2, 3];
const res = a.reduce(function(p, c, i, arr) {
    console.log(p, c, i, arr, this);
    return p + c
}, 10)
res // 16

// 10 1 0 (3) [1, 2, 3] Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
// 11 2 1 (3) [1, 2, 3] Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
// 13 3 2 (3) [1, 2, 3] Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
// 16

// 근데 initialValue를 지워보면 6이 나오는데 순회를 두번만 돔
// initaiValue가 없으면 p에 들어갈 값이 첫번째 인덱스 값이 들어감
// 순회를 두번째 부터 돔.
// 제일 처음 p는 1이 들어간다. c에는 2가 들어간다
// p에 1이 들어간다. 1(p) + 2(c) = 3
// p에 3이 들어가고 c에는 3이 들어간다. 3(p) + 3(c) = 6
const a = [1, 2, 3];
const res = a.reduce(function(p, c, i, arr) {
    console.log(p, c, i, arr, this);
    return p + c
})
res // 6
// 1 2 1 (3) [1, 2, 3] Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
// 3 3 2 (3) [1, 2, 3] Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
// 6

const arr = ['a', 'b', 'c', 'd'];
const str = arr.reduce(function(res, item, index, array) {
    return res + item;
})
str // 'abcd'

// res: {},                  item: arr의 0번 'a' {a:'a'}
// res: {a:'a'},             item: arr의 1번 'b' {b:'b'}
// res: {a:'a',b:'b'},       item: arr의 2번 'c' {c:'c'}
// res: {a:'a',b:'b',c:'c'}, item: arr의 3번 'd' {d:'d'}
// res: {a:'a',b:'b',c:'c',d:'d'}
const arr = ['a', 'b', 'c', 'd'];
const str = arr.reduce(function (res, item, index, array) {
    debugger
    res[item] = item;
    return res
}, {})
str // {a: 'a', b: 'b', c: 'c', d: 'd'}

