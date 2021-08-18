// 1. BLock Scope

// 스코프란? 변수가 살수 있는 공간, 유효범위 같은 느낌으로 보면된다.
// 기존의 자바스크립트에서 스코프란 함수 스코프를 말했다.
// 기존의 스코프는 함수의 범위 안에서 만 생겼다.
// 함수 스코프란 함수에 의해서 생기는 변수의 유효범위다.

// 기존의 함수 스코프는 그대로 있고, 거기에 block scope라는 개념이 추가됨.
// block 이란 {} 중괄호 다.
// block scope란 {} 블락에 의해 생기는 유효 범위다.

// 기존의 변수 선언 키워드가 var만 있었는데
// es6에서 let과 const 변수 키워드가 생겼다
// 블록스코프는 this를 바인딩 하지 않아요
// var는 블록스코프에 갇히지 않아요

// 1-1. Block Scope (let 선언)
{
  let a = 10;
  {
    let a = 20;
    console.log(a); // 20
  }
  console.log(a); // 10
}
console.log(a); // Refrerence Error: a is not defined

// 1-2 Block Scope (var 선언)
{
  var a = 10;
  {
    var a = 20;
    console.log(a); // 20
  }
  console.log(a); // 20
}
console.log(a)(
  // 20
  // 호이스팅에 의해 덮어 씌워지는것은 물론이고 전역 window객체에 a가 박혀서 사라지지 않음.
  // var 를 쓰지 맙시다.

  // 1-1 위의 Block scope는 아래의 즉시실행 함수 두개를 생성한 것과 같은 개념으로 보면된다.
  // 즉시 실행함수에서 선언한 var a는 함수안에 있으므로 함수안에 갇혀서 window.a에 박히지 않음.
(function (params) {
  var a = 10;
  (function () {
      var a = 20;
      console.log(a); // 20
    })();
    console.log(a); // 10
})()  

// p가 있으면 blue 아니면 red를 출력하는 함수를 만들고 실행하면.
// var로 선언한 변수는 호이스팅이 되서 함수 내부의 첫째줄 v를 출력하는데 undefiend가 할당
// p가 있으니까 if문으로 들어와서 v변수에 blue를 할당하고 blue출력 else 구문은 실행하지 않고 빠져나가고
// 함수 내부에서 v는 blue
// var로 선언한 변수는 블록스코프에 영향을 받지 않는다.
// var로 선언한 변수는 함수안에 갇힌다.
// 호이스팅이 일어나서 첫뻔째 줄에서 v를 출력하면 undefined가 출력됨
function hasValue(p) {
  // var v; 호이스팅 됨
  console.log(v); // undefined 호이스팅이 되어 v변수가 있기는 하나 값을 할당하기 전. undefined 라는 값을 자바스크립트에서 자동으로 할당.
  if (p) {
    var v = 'blue'; // 호이스팅이 되어 변수가 생기긴 했어도 값은 값을 할당하는 코드가 있는 이곳에서 할당
    console.log(v); // blue
  } else {
    var v = 'red';
    console.log(v);
  }
  console.log(v); // blue
}
hasValue(10);

// 기존의 공부한것을 해치면 안되기 때문에 기존거는 그대로 동작하고
// es6 문법이 추가된다 라는 느낌으로 공부를 해야한다.
// var는 그대로 동작하고, es6에서 추가된 let과 const변수는 블록스코프의 영향을 받게하겠어.

// let으로 선언하면 블록 스코프의 영향을 받는다. const도 마찬가지
// 함수 내부의 첫째줄 v를 출력하는곳에서  v is not defined 에러를 내고 멈춘다. 만약 주석처리하면
// if문 안으로 들어가서 let v에 blue할당, blue출력하고 else 구문 타지않고 나와서
// v is not defined 에러를 내고 멈춘다.
function hasValue(p) {
  console.log(v); // Reference Error : v is not defined 여기서 멈춤 주석처리하면 실행됨
  if (p) {
    let v = 'blue';
    console.log(v); // blue
  } else {
    let v = 'red';
    console.log(v);
  }
  console.log(v); // Reference Error: v is not defined 여기서 멈춤 주석처리 하면 실행됨
}
hasValue(10);

// 1. block scope
// block scope란 let과 const에 대해서만 동작 한다.
// var는 block scope에 영향을 받지 않는다.

// 1-1 var는 block Scope에 영향을 받지 않는다.
// var 는 block scope에 영향을 받지 않을 뿐더러, 호이스팅으로 인해 값도 다 덮어씌워져 버림.
console.log(a); // undefined
if (true) {
  var a = 10;
  if (true) {
    var a = 20;
    console.log(a); // 20
  }
  console.log(a); //20
}
console.log(a); //20

// 1-2 let과 const는 block scope에 영향을 받는다.
console.log(a); // Reference Error: a is not defined 에러를 내고 여기서 멈춤. 주석처리하면 실행됨
if (true) {
  let a = 10;
  if (true) {
    const a = 20;
    console.log(a); // 20
  }
  console.log(a); //10
}
console.log(a); // Reference Error: a is not defined 에러를 내고 여기서 멈춤.

// 2. Hoisting
// block scope는 호이스팅을 할까?
// block scope 라는것은 중괄호에 의해서 영향을 받는다고 했는데,
// 함수에도 중괄호가 았으나 함수에 의한 스코프는 함수 스코프이니 얘는 제외를 하고

// if, for, while, switch,
// if문, for문, while문, switch-case문. 문은  '문단'의 약자.
// 이와 반대되는 개념이 식.
// 식이란? expression. 값이 될 수 있는 경우를 식이라고 한다.
// 예를 들어
// 10 + 20 = 30 30이라는 숫자형 값이 된다.
// 'abc' + 'def' 문자열 두개 더해서 'abcdef'라는 문자형 값이 된다.
// a() 값이 될수 있는것 이런것들이 식

// 마지막으로 값. 모든 데이터는 셋중 하나 값, 식, 문
// 값과 식은 동일하게 간주하고 , 문은 다르다.
// 문은 결과를 리턴하지 않는다. 결과가 존재 하지 않는다.
// 실행하고 끝.
// if문을 실행하고 끝. if문의 결과를 어딘가에 저장할수 없다.
// for문은 10번돌고 돌고난 결과 이거야 하고 반환하는것 없이 다음으로 넘어간다.
// while문도 마찬가지
// switch-case도 실행하고 끝
// 이런 애들이 문

// 문 자체가 하나의 블록 스코프가 된다.
// 스코프가 두개디다 함수스코프와 블록스코프.

// 질문이 호이스팅이 되나?
if (true) {
  // 블록스코프가 열렸어요.
  let a = 10; // let a 에 10 할당.
  if (true) {
    // 내부에서 또 블록스코프가 열렸어요.
    console.log(a); //출력
    const a = 20;
  }
  console.log(a); //츨력
}
console.log(a);
// 만약에 호이스팅이 된다면
// a는 const a 선언이 있으니까 호이스팅 되서 undefined 할당.
// a: undefined

// 만약에 호이스팅이 안된다면?
// const a 의 선언했지만 호이스팅이 안됬어. a의 존재를 모름.
// 스코프란? 자신의 스코프에서 없으면? 스코프 체인닝을 통해 상위의 스코프에서 a를 찾아서 10 출력

// 결과는 Referece Error: a is not defined
// TDZ: temporal dead zone(임시 사각지대)

// TDZ란 let, const에 대해서 실제로 변수를 선언한 위치에 오기 전까지 호출 할수 없다.
// 그 영역을 TDZ라고 한다.

// 기존에 자바스크립트의 문제점들중 하나가 호이스팅인데
// 선언은 아래에 있는데 위에서 호출을 해도 에러없이 undefined만 출력
console.log(a); // undefined
var a = 10;

// 에러가 안나는게 좋은게 아니라 에러가 나서 그걸 찾아내서 그 에러를 고칠수 있어야 좋은데
// 에러 자체를 찾기가 너무 어려워 진다. 디버깅 하기 어렵다.

// 자바스크립트를 잘 모르는 입장에서 호이스팅이란건  학습 해야만 알수있는 것이다.
// 자바스크립트의 암묵적인 룰들을 알아야만 이해할수 있는
// 아래의 코드같은게 정상적으로 실행이 된다라는걸 알수 있는데
console.log(a()); // 1
function a() {
  return 1;
}

// 아래의 코드는 위에서 부터 아래로 읽어 내려가는 자바스크립트에서 당연히 실행이 된다라고 예측이 가능.
function a() {
  return 1;
}
console.log(a());

// 암묵적인 룰, 예상하지 못했던 식으로 동작했던것 들을 암기해야만 했던것들을 최대한 배제하기 위해서 나온게
// es6. 그러나 기존의 것들은 그대로 유지하고 해치치 않고 대신에 새로 만드는 얘들은 그렇게 동작하지 않게 하겠다.

// TDZ
// 호이스팅 의 개념
// 기존 var :
// 1) 변수명만 위로 끌어올리고
// 2) undefined 를 할당

// es6에서는 let과 const는
// 1) 변수명만 위로 끌어올리고 끝.
// 아무것도 매칭하지 않는다. undefined도 매칭하지 않는다.

if (true) {
  let a = 10;
  if (true) {
    // console.log(a); // reference error: a is not defined 에러를 내고 여기서 멈춤. 주석처리하면 실행됨
    const a = 20;
    console.log(a); // 20;
  }
  console.log(a); //10
}
console.log(a); // reference error: a is not definded

// 3. this

// 변수 value 에 0을 넣고
// 변수 obj에 객체를 만들고 value라는 프로퍼티에 1을 할당하고
// 변수 obj에 setValue라는 메소드에는 안쪽에서 this.value라는 변수에 2를 할당
// 즉시 실행함수 안에서 this.value에 3할당
var value = 0;
var obj = {
  value: 1,
  setValue: function () {
    this.value = 2; // this는 obj
    (function () {
      // 즉시실행함수 얘는 메소드가 아니라 그냥 일반함수 호출과 같음.
      this.value = 3; // this는 window. -> window.value = 3;
    })();
  },
};
obj.setValue();
console.log(value); // 3
console.log(obj.value); // 2

// 기존에는 즉시실행 함수 안에서의 this도 obj를 바라보게 하려면
var value = 0;
var obj = {
  value: 1,
  setValue: function () {
    this.value = 2;
    var self = this;
    (function () {
      // 즉시실행함수 얘는 메소드가 아니라 그냥 일반함수 호출과 같음.
      self.value = 3; // this는 window. -> window.value = 3;
    })();
  },
};
obj.setValue();
console.log(value); // 0
console.log(obj.value); // 3

// call 이나 apply에 this를 넘겨주거나
var value = 0;
var obj = {
  value: 1,
  setValue: function () {
    this.value = 2; // this는 obj
    (function () {
      // 즉시실행함수 얘는 메소드가 아니라 그냥 일반함수 호출과 같음.
      this.value = 3; // this는 window. -> window.value = 3;
    }).call(this);
  },
};
obj.setValue();
console.log(value); // 0
console.log(obj.value); // 3

// 그런데 es6에서는 간단하게 {} 블록스코프를 감싸주면 된다.
// block scope는 this의 영향을 받지 않는다.
// block scope는 this 바인딩을 하지 않는다.
// 위위 일반 함수로 작성하면 전역 객체에 this를 바인딩
let value = 0;
const obj = {
  value: 1,
  setValue: function () {
    this.value = 2; // this는 obj
    {
      this.value = 3;
    }
  },
};
obj.setValue();
console.log(value); // 0
console.log(obj.value); // 3

// 4. 모든 문 형태에 적용
var sum = 0;
for (let i = 0; i <= 10; i++) {
  sum += i; // 55
}
console.log(sum);
console.log(i); // reference Error: i is not defiend

// var 로 선언하면 block 스코프에 영향을 받지 않아서 for 스코프밖으로 빠져나간다.
// 전역 window에 i 변수가 박힌다.
var sum = 0;
for (var i = 0; i <= 10; i++) {
  sum += i; // 55
}
console.log(sum);
console.log(i); // 11 윈도우의 i값을 출력
