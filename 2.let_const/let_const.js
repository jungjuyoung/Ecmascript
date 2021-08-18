// let
// let은 var와 같은 개념으로 보되 블록스코프에 영향을 받는다.
// tdz가 존재한다.
// 재할당 가능해 var와 많이 유사해 보인다.
// const는 값을 재할당 할 수 없다. 상수변수 이기 때문에

let a = 1;
function f () {
    console.log(a, b, c); // 1, b레퍼런스 에러
	let b = 2;
	console.log(a, b, c); // 1, 2, c레퍼런스 에러
	if (true) {
		let c = 3;
		console.log(a, b, c); // 1, 2, 3
	}
	console.log(a, b, c); // c 레퍼런스 에러
}
f();

// funcs 변수에 빈 배열을 넣고
// 반복문에 var를 선언하여 각 0 ~ 9 까지 순회하면서 익명함수를 funcs배열에 push 하고 for문 종료
// var로 인해 전역에 i가 심어진 상태. for문 안에서는 인덱스가 0~9까지 10개 
// for문의 i++ 후위증감으로 window에 i 변수는 10이 된상태
// forEach 돌면서 함수 호출하면 i는 사라지고 없는 상태에서 함수는 console.log(i) 출력시도.
// 스코프 체이닝을 통해서 window전역에 심어진 i를 호출 10, 이걸 10번
var funcs = [];
for(var i = 0; i < 10; i++) {
    funcs.push(function(){
        console.log(i);
    });
}

funcs.forEach(function(f){
    f();
});

// 10개
// 배열에 함수를 10개 넣고
[
    function(){ console.log(i);},
    function(){ console.log(i);},
    function(){ console.log(i);},
    function(){ console.log(i);},
    function(){ console.log(i);},
]
// 의도한대로 0~9까지 찍히는것이 아니라 10이 10번 나온다.

// 실행 컨텍스트는 언제 열리나?  함수를 실행 할때 열린다.
// 실행 할때 비로소 변수를 호이스팅하고 this를 바인딩하고 자신한테 없는 변수를 스코프 체이닝한다.
// 이미 for으로 배열에 함수를 다 넣고 for의 실행 컨텐스트는 종료된 상태에서
// forEach가 함수를 호출하면
// 함수에서 i를 출력하려고 시도할때 

// i가 의도한데로 0 ~ 9 까지 나오게 하려면 
// 이미 종료된 컨텍스트에 접근할 수 있도록 클로저를 이용.
// 즉시실행 함수가 익명함수를 리턴하게 해서 종료된 이후에 리턴받은 내부함수를 호출해도
// 클로저를 이용하여 이미 종료된 상위 함수의 변수에 접근하여 i값을 가지고오게 한다.
// forEach에서 debugger로 출력해 보면 f()의 프로퍼티중 [[scope]]라는 프로퍼티에 Closure라는게 생기는데 i값이 살아있다.

var funcs = [];
for( var i = 0; i < 10; i++) {
    funcs.push((function(i) {
        return function() {
            console.log(i);
        }
    })(i));
}
funcs.forEach(function(f) {
    debugger
    f();
});


// es6에서는 블록스코프라는 애가 있으니까 
// var가 아닌 let으로 for문을 선언한 경우에 
// 각각의 i값 마다 블록스코프가 생성.
// for문이 종료된 후에 forEach에서 함수를 호추하고, debugger로 함수내부를 들여다 보면
// f()의 프로퍼티 중 [[scopes]]라는 프로퍼티에 Block이라는게 생기는데 i값이 살아있다.
// 0 ~ 9 까지 출력된다.
let funcs = [];
for (let i = 0; i < 10; i++) {
    funcs.push(function () {
	    console.log(i);
    });
}

funcs.forEach(function (f) {
    debugger
    f();
});

// const
// constant variable의 약자 상수 변수라는 말.. 
// 상수인데 변수... 모순 되는 말인듯 하나...
// 선언하고 값을 지정한 순간부터 상수가 되는것.
// 그래서 선언하고 바로 값을 지정해야하는것이 let과 다른점.
// 그리고 선언후에는 상수이기 때문에 값을 재할당하는것이 불가능.
// 재할당 시도시 타입에러: 상수 변수에 할당하려고 한다라는 에러문구가 뜸.

// 1) const A
const A
// 2) const A = 10; const A에 값은 10으로 지정할래.
const A = 10;
A = 20; // TypeError: Assignment to constant variable.

const OBJ = {
    prop1: 1,
    prop2: 2
}
OBJ = 3; // TypeError: Assignment to cosntant variable

let OBJ = {
    prop1: 1,
    prop2: 2
};
OBJ = 3; //3 정상적으로 적용됨

const OBJ = {
    prop1: 1,
    prop2: 2
};
OBJ.prop1 = 3; // 정상적으로 const로 선언한 OBJ.prop1이 3으로 변경됨
// 참조형 데이터는 OBJ라는걸로 접근이 가능 할 뿐 데이터 자체가 상수가 된것은 아님.
// OBJ는 12번에 메모리에 있고 객체는 20번 메모리에 있다고 하면
// @12: OBJ => 20번을 보렴. 너는 상수가 되었단다.  20번이 아닌 다른 주소를 할당할 수가 없게 됨.
// @20: {} = > 얘는 상수가 아님

let a = {a: 1}
const b = a;
b = 20 // TypeError: Assignment to constant variable.
a = 20;
a // 20;
b // {a: 1}

// 변수 a 선언, 변수 a를 @10번 메모리에 넣어.
// @10: a => @30번을 보렴 객체를 만들어서 객체를 @30번 메모리에 넣었어.
// @30:  {a: 1}
// b를 선언했어. b는 @11번 메모리에 있어. b는 a를 볼꺼야. a는 @10번에 있고 @10번은 @30번을 보고있음.
// b는 최종적으로 @30번을 본다.
// @11: b => a => 30
// a 에다가 20을 넣었어. 20이라는 값은  @1020 메모리에 있어.
// @1020: 20
// a가 있는 @10메모리에 20이 있는 @1020을 넣는다.
// @10: @1020: 20

// b의 @11번에 다른걸 넣을수 있다면 (const라서 안되겠지만) 다른게 들어가게되면 @30번을 참조하던얘가 @50으로 바껴서 참조하는 것이 더이상 없을경우 가비지 컬렉터의 대상이되어 사라진다.
// 이렇게 메모리 관리가 된다. 자바스크립트는 메모리관리가 되는 언어. 메모리 관리가 안되는 언어는 대표적으로 C가 있다.

// 상수변수에 참조형 데이터를 할당할 경우에는 참조형 데이터 내부에 있는 프로퍼티들은 상수가 된게 아니다.

// 그래서 Object.freeze라는 걸 이용해서 참조형 데이터의 내부 프로퍼티를 얼려서 재할당이나 수정이 불가능하게 한다.
const OBJ = {
    prop1: 1,
    prop2: [1, 2, 3]
}
Object.freeze(OBJ);
OBJ.prop1 = 10; // 에러는 나지 않지만 OBJ.prop1의 값이 변하지 않았음.
OBJ.prop2[0] = 10; // 변함 [10, 2, 3]

// 참조형 데이터 안에 또 참조형 데이터가 있으면 Object.freeze로 1 depth 프로퍼티는 얼려도 2 depth까지 얼리지 못함.
// 2 depth를 또한번  Object.freeze 해서 얼려준다
Object.freeze(OBJ.prop2) // OBJ.prop2가 얼어서 값이 변하지 않음.
OBJ.prop2[0] = 1; // 변함지 않음 [10, 2, 3]

// 객체 안에 있는 모든 프로퍼티를 모두 얼리고싶다면
// 1) OBJ 객체 자체를 얼린다.
// 2) OBJ내부의 프로피티들을 순회하면서, 혹시 그 값이 참조형일 경우 1)을 재귀
// 이런걸 Deep freezing이라고 한다.
// Deep freezing
// 얕은 freezing: 객체의 1 depth까지만 얼린다.
// 깊은 freezing: 객체의 모든 depth까지 얼린다.

//  Deep copy
// 얕은 복사 : 객체의 프로퍼티들을 복사(depth 1단계까지만)
// 깊은 복사 : 객체의 프로퍼티들을 복사 (모든 depth에 대해서)

// 1) 프로퍼티들을 복사한다.
// 2) 프로퍼티들 중에 참조형이 있으면 1) 재귀

// 객체를 복사를 한다고 하면 Object.assign((), target)
const OBJ = {
    a: 1,
    b: [1, 2, 3],
    c: {d: 1, e: 2}
}
const OBJ2 = Object.assign({}, OBJ); // 얕은 복사
// 얕은 복사가 되서 OBJ2.b[1]의 값을 바꾸면 OBJ.b[1]의 값도 바뀐다. 
OBJ2; // {a: 1, b: [1, 2, 3], c: {d: 1, e: 2}}
OBJ2.b[1] = 20; // {a: 1, b: [1, 20, 3], c: {d: 1, e: 2}}
// OBJ 와 OBJ2의 값이 모두 바뀜
OBJ // {a: 1, b: [1, 20, 3], c: {d: 1, e: 2}}

// 깊은 복사를 해서 OBJ와 OBJ2가 다른 상태를 유지할수 있도록 하려면 Object.freeze 했던 것 처럼 한번더 Object.assign 한다.
OBJ2.b = Object.assign([], OBJ.b);
OBJ2.b[1] = 2;
OBJ2 // {a: 1, b: [1, 2, 3], c: {d: 1, e: 2}}
OBJ // {a: 1, b: [1, 20, 3], c: {d: 1, e: 2}}

// 깊은 복사르 해야만 immutable(불변) 하다.
// 불변 객체 

// let 과 const 공통사항
// 블록 스코프에 영향을 받는다
// tdz가 존재한다
// 재선언
// var 쓰지 않도록 한다
// let 과 const만 쓴다
// var, let, const 섞어 쓰지 않도록한다. let, const만 쓰도록 
// 근데 어지간 하면 const를 쓴다.
// 프론트 엔드 개발 환경에서는 주로 객체를 다루는데, 객체를 다루지 않는 별도의 변수를 쓰더라도 변수의 값을 바꿔치기 할 일이 별로 없다.
// let: 값 자체의 변경이 필요한 예외적인 경우
// const: 웬만하면 변수를 const를 쓴다.
// 초기화 되기 전에 호출하면 에러가 발생한다

// 전역 공간에서 var로 선언한 변수는 전역 변수임과 동시에 전역 객체의 프로퍼티가 된다.
// 이렇게 동시에 전역 변수임과 동시에 전역 객체인걸 delete 할수 가 없다고 지우질 못한다.
// 그러므로 전역 변수 선언을 최소화 해라.
// 전역 공간을 침범하지 않게 하기 위해서 웬만하면 즉시실행함수를 실행하고, 함수스코프로 감싸고, 레디가 될때 돌리고 이런동작을 했었는데 이젠
// let과 const가 생기므로 이런 생각을 안해도된다.