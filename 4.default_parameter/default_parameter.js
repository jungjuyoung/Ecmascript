// default parameter 매개변수 기본값

// 기본값을 지정할수 있는 매개변수
// 기존에 es5에서 기본값을 지정할수 있는 매개변수를 이렇게 썼다면
// x가 truthy한 값이면 x를 넣고 falsy면 4를 넣어라
// y가 truthy하면 y를 쓰고, falsy면 5를 써라
// z가 falsy하면 true로 바꿔서 if문 이 실행되게해서 z = 6 으로 바꿔라

const f = function(x, y, z) {
    x = x ? x : 4;
    y = y || 5;
    if(!z) {
        z = 6;
    }
    console.log(x, y, z) 
}
f(1) // 1, 5, 6
f(0, null) // 4, 5, 6
// 정확성이 떨어짐 0과 null도 값인데 기본값으로 셋팅한 값이 들어감

// 값이 제대로 안넘어 왔을때 undefined인 경우에만 기본값이 들어가게 하려면
// undefined 이거나 누락된 경우에만 기본값으로 지정하게 
const f = function(x, y, z) {
    x = x !== undefined ? x : 4;
    y =  typeof y !== 'undefined' || 5;
    if(!z) {
        z = 6;
    }
    console.log(x, y, z) 
}

// es6에서는 이제 그렇게 수고스럽게 하지 않아도 된다.
const f = function(x = 4, y = 5, z = 6) {
    console.log(x, y, z); // 0, null, 6
}
f(0, null)
const f = function(x = 4, y = 5, z = 6) {
    console.log(x, y, z); // 4, 5, 6
}
f()
const f = function(x = 4, y = 5, z = 6) {
    console.log(x, y, z); // null, 0, false
}
f(null, 0, false)
const f = function(x = 4, y = 5, z = 6) {
    console.log(x, y, z); // 4, 0, false
}
f(undefined, 0, false)
const f = function(x = 4, y = 5, z = 6) {
    console.log(x, y, z); // null, '', false
}
f(null, '', false)

// let 선언과 동일한 효과
// 함수의 인자라는게 기존의 a, b, c를 받는 함수는
// 실행 컨텍스트가 열리는 순간에 인자 하나하나를 변수로 선언헤서 변수에 값을 할당하는걸로 처리를 하니, 
// 내부 인자로서만 사용 가능
function a (a, b, c) {
    var a = 1;
    var b = 2;
    var c = 3;
}
a(1, 2, 3)

// default parameter를 사용하는 순간 let과 동일해짐.
// a가 undefined일때 a, 그렇지 않으면 1을 넣어라.
// default parameter 안에 식이 와도 된다. 
function a (a = 1, b = 2, c = 3) {
    let _a = a === undefined ? a : 1;
    let _b = 2;
    let _c = 3;
}
a(1, 2, 3)

// let과 동일해져서 tdz걸려서 
// 식이 올수 도 있음.
// c가 선언되기 전에 c를 참조하려고 하면 레퍼런스 에러 reference Error: c is not defined
function a (a = 1, b = c + 1, c = 3) {
    let _a;
    let _b = _c + 1;
    let _c = 3;
}
a(1, undefined, 3)

// 비어 있을때 식에 의한 리턴값을 넣을수도 있음
const getDefault = function() {
    console.log('getDefault called.')
    return 10
}
const sum = function(x, y = getDefault()) {
    console.log(x + y)
}
sum(1, 2) // 3
sum(1) // 11

const notValid = function() {
    console.log('notValid called.')
    return 10
}
const sum = function(x = notValid(), y = notValid()) {
    console.log(x + y)
}
sum(1, 2) // 3
sum(1) // 11
sum() // 20

// 기본값으로 할당하고자 하는 값이 변수일 경우에 
// 아래와 같다면
let a = 10;
let b = 20;

function f (aa = a, b = b) {
    console.log(aa, b)
}
f(1, 2) // 1, 2
f(undefined, 2) // 10, 2
f(1) // b is not defined
f()

// f(1) 의 경우 에러남.tdz걸림
// let b;
// b = 20;
// let b = 20 값을 할당하는 곳에서 값 할당이 아루어지는데 
// function f (aa = a, b = b) { 이부분에서 b는 값을 할당하기 전에 b에 넣기때문에 참조할 값이 있는 주소가 없어서 에러 


// 유사배열객체 (array-like objecrt): 객체인데, 각 프로퍼티의 키가 인덱스고, lenght라는 프로퍼티가 있는 객체.
const a = function(a = 1, b = 2, c =3) {
    console.log(arguments); // 유사 배열 객체 {0: 1, 1: 2, 2: 3, length: 3, callee: }
    console.log(a, b, c);
}
a()
a(4)
a(4, 5)
a(4, undefined, 6)
a(4, 5, 6)

const a = function(a = 1, b = 2, c =3) {
    console.log(arguments); // 유사 배열 객체 {0: 1, 1: 2, 2: 3, length: 3, callee: }
    // arguments.pop(); // arguments.pop is not a function 배열이 아니어서 배열표준 메서드인 pop()을 사용할수 없음
    // console.log(Array.prototype.pop.call(arguments)); // 10 그래서 이렇게 썼음
    const arg = Array.prototype.slice.call(arguments);
    console.log(arg); //
    // console.log(a, b, c);
}

a(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
// arguments는 잊어도 됨
// es6에서 안씀