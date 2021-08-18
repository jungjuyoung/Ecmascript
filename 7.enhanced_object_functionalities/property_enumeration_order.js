// property enumeration order

const obj = {
    c:1,
    2:2,
    a:3,
    0:4,
    b:5,
    1:6
}
const keys = [];
for(const key in obj) {
    keys.push(key)
}
// 숫자가 먼저오고, 작은수에서 큰수의 순서로, 문자열이 입력된 순서 그대로
console.lpg(keys) // [0, 1, 2, c, a, b]
console.lpg(Object.keys(obj)) // [0, 1, 2, c, a, b]
console.lpg(Object.getOwnPropertyNames(obj)) // [0, 1, 2, c, a, b]

const obj2 = {
    [Symbol('2')]: true,
    '02': true,
    '10': true,
    '01': true,
    '2': true,
    [Symbol('1')]: true
};
const keys2= [];
for(const key in obj2) {
    keys2.push(key);
}
// 객체 프로퍼티는 원래 문자로 인식, 앞에 0이 없을떄는 숮자로 인식하고 그걸 제외하고 나머지는 문자로 인식해서
// 문자는 입력된 순서에 맞게 나옴
console.log(keys2); // [2, 10, 02, 01]
console.log(Object.keys(obj2)); // [2, 10, 02, 01]
console.log(Object.getOwnPropertyNames(obj2)); // p2, 10, 02, 01]
console.log(Reflect.ownKeys(obj2)); // [2, 10, 02, 01, symbol(2), symbol(1)]

const obj = {
    c:1,
    2:2,
    a:3,
    0:4,
    b:5,
    1:6
};
const obj2 = {
    [Symbol('2')]: true,
    '02': true,
    '10': true,
    '01': true,
    '2': true,
    [Symbol('1')]: true
};
const obj3 = Object.assign({}, obj, obj2);
const keys3 = [];
for(const key in obj3) {
    keys3.push(key);
}
console.log(keys3); // ["0", "1", "2", "10", "c", "a", "b", "02", "01"]
console.log(Object.keys(obj3)); // ["0", "1", "2", "10", "c", "a", "b", "02", "01"]
console.log(Object.getOwnPropertyNames(obj3)); // ["0", "1", "2", "10", "c", "a", "b", "02", "01"]
// 심볼이 계속 무시되고 있고 출력되는 순서는 같음
// 콘솔로 ojb3 디버그 할때는 출력하는 순서가 보장되지 않음
// 프로그래밍적으로 값을 쓸때만 순서보장, 열거를 해서 열거한걸 쓸때는 순서 보장
// 그리고 심볼도 나옴. 심볼은 열거 대상에서 제외된다.
// 심볼이 열거대상에서 제외되지만, 심볼까지 열거의 대상이 되게 하는것이 있음
console.log(Reflect.ownKeys(obj3));// ["0", "1", "2", "10", "c", "a", "b", "02", "01", Symbol(2), Symbol(1)]
// 객체의 열거 순서: 숫자를 오름차순. 문자열을 입력된 순서. 심볼을 입력된 순서.
// es5 하위 문법인 경우에는 정합성을 보장하지 않는다.
// 새로 등장한 메소드들은 규칙을 따른다.