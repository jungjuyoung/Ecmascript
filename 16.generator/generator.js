// generator
// 중간에서 멈췄다가 이어서 실행할 수 있는 함수.
// function키워드 뒤에 *를 붙여서 표현, 함수 내부에는 yield 키워드를 활용한다.
// 함수 실행결과에 대해 next() 메소드를 호출할 때마다 순차적으로 제네레이터 함수 내부의 yield 키워드를 만나기 전까지 실행하고, yield 키워드에서 일시정지 한다.
// 다시 next() 메소드를 호출하면 그 다음 yield 키워드를 만날 때까지 함수 내부의 내용을 진행하는 식이다.

function* generator() {
  console.log(1); // 1.
  yield 1 // 2.
  console.log(2); // 3.
  yield 2 // 4. 
  console.log(3); // 5.
}
const gen = generator()
gen.next() // yield키워드를 만나기 전까지 실행하고 정지.
// 1 이건 1.번 console.log(1)에서 넘긴값
// {value: 1, done:false} // 2.번 yield에서 반환해준 값.

gen.next() // yield키워드를 만나기 전까지 실행하고 정지.
// 2 이건 3.번 console.log(2)에서 넘긴값
// {value: 2, done: false} // 4.번 yield에서 반환해준 값.

gen.next() // yield키워드를 만나기 전까지 실행하고 정지.
// 3 이건 5.번 console.log(3)에서 넘긴 값.
// 넘겨주는 값 없이 done이 true
// {value: undefined, done: true} 

// 선언문 방식으로 
function* gene() { yield }

// 표현식 방식으로
const gen = function* () { yield }

// 객체 메소드로 할당
const obj = {
  gene: function* () { yield }, // 기존 메소드 방식일때 
  *gene() {yield } // 메소드 축약형일때 이름앞에 *
}
// 클래스 일때
class A {
  *gene() { yield} // 객체 메소드 축약형처럼 이름앞에 *
}

// 이터레이터로서의 제네레이터
function* generator() {
  console.log(1); // 1.
  yield 1 // 2.
  console.log(2); // 3.
  yield 2 // 4. 
  console.log(3); // 5.
}
const gen = generator()
// 펼치기 연산자
console.log(...gen); // 1 2 3 1 2

// for...of
function* generator() {
  console.log(1); // 1.
  yield 1 // 2.
  console.log(2); // 3.
  yield 2 // 4. 
  console.log(3); // 5.
}
for (const o of gen) {
  console.log(o); // 11 22 33
}

// 기존에 이터러블한 객체를 만들어 줄때의 규칙이 generator로 만들게 되면 더 간단해 진다.
// 이터러블한 객체의 규칙은 Sybol.iterator라는 메소드가 있고
// 그 메소드는 객체를 반환해야 했고, 그 반환한 객체 안에는 next()라는 메소드가 있고
// next()라는 메소드는 다시 done프로퍼티가 있는 객체를 반환해야 했다...
[Symbol.iterator](){
  return {
    next() {
      return {
        done,
        value
      }
    }
  }
}
// 이걸 generator로 만들면 yield만 만들어 주면 된다.
const obj = {
  a: 1,
  b: 2,
  c: 3,
  *[Symbol.iterator]() {
    for (const prop in this) {
      yield [prop, this[prop]]
    }
  }
}
console.log(...obj); // (2) ["a", 1] (2) ["b", 2] (2) ["c", 3]
// for of도 돌릴수 있다.
for (const p of obj) {
  console.log(p);
}
// (2) ["a", 1]
// (2) ["b", 2]
// (2) ["c", 3]

// yield* 이 있으면 뒤에 이터러블한것을 받아서 하나씩 꺼내고 멈춘다. 
function* gene() {
  yield* [1, 2, 3]
  yield // **
  yield* 'abc'
}
// 1, 2, 3 출력하고 
// **부분에서 value는 undefined를 출력하지만 done은 false
// 'a' 'b' 'c' 출력하고 
// {value: undefined, done: true}


// 외부와의 소통 
function* gene() {
  let first = yield 1 // ** a
  console.log(first);
  let second = yield first + 2; // **
  console.log(second);
  yield second + 3
}
const gen = gene()
gen.next() // {value: 1, done: false} ** a부분의 yield가 실행되고 멈춤.
// 즉 외부로 값을 넘기고 멈춤
gen.next() // undefined {value: NaN, done: false} **부분에서 first에 undefined가 넘어온 상태에서 +2라는 연산을 했기때문에 NaN이 value에 들어간다.

// gen.next()를 호출하면 yield를 실행하고 멈추고 
// 두번째 gen.next()를 실행하면 let first = 를 만나는데 yield는 밖으로 값을 내보내고 끝.
// let first = 에 할당하는것이 없으니 undefined. undefined+2 = NaN

// 외부와의 소통 
function* gene() {
  let first = yield 1 // ** a
  console.log(first);
  let second = yield first + 2; // **
  console.log(second);
  yield second + 3
}
const gen = gene()
gen.next() // 처음 호출 다음에 다시 호출을 할때 first변수에 넘겨줄 인자값을 넘김
// {value: 1, done: false}
gen.next(10) // 10을 first변수에 넘긴다.
// 10
// {value: 12, done: false}
gen.next(20)
// 20
// {value: 23, done: false}
gen.next() 
// {value: undefined, done: true}