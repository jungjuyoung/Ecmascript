// iterable
// 내부 요소들을 공개적으로 탐색(반복) 할 수 있는 데이터 구조.
// Symbol.iterator라는 메소드를 가지고있는 모든 객체를 이터러블 하다.
// Symbol.iterator라는 메소드를 호출한 결과가 next()라는 메소드를 호출할 수 있는 Iterator{next()} 라는 객체가 있으면 된다.
// 대표적으로 array, string, map, set

const arr = ['a', 'b', 'c', 'd'];
const set = new Set([arr]);
const map = new Map([[false, 'no'], [true, 'yes'], ['well', 'soso']]);
const str = '문자열도 이터러블하다'

console.log(arr); // 프로토타입에 들어가보면 Symbol(Symbol.iterator)가 있다

// 객체를 배열로 변환 Array.from(이터러블한 값)
const map = new Map([[false, 'no'], [true, 'yes'], ['well', 'soso']]);
const arr = Array.from(map)
// (3) [Array(2), Array(2), Array(2)]
// 0: (2) [false, "no"]
// 1: (2) [true, "yes"]

const gene = (function* () {
  yield 1
  yield 2
  yield 3
})()
Array.from(gene) // [1, 2, 3]

// 펼치기 연산자 가능
const arr = ['a', 'b', 'c', 'd'];
console.log(...arr); // a b c d
console.log(...gene); // 1 2 3
const map = new Map([[false, 'no'], [true, 'yes'], ['well', 'soso']]);
console.log(...map)
// (2) [false, "no"] (2) [true, "yes"] (2) ["well", "soso"]

// 해체할당 가능
const arr = ['a', 'b', 'c', 'd'];
const [arrA, arrC] = arr;
// arrA "a"
// arrC "b"

// for ... of
const arr = ['a', 'b', 'c', 'd'];
for (const x of arr) {
  console.log(x) // 'a', 'b', 'c', 'd'
}
// forEach

// generator
const gene = (function* () {
  yield 1
  yield 2
  yield 3
})()
console.log(...gene) // 1 2 3
  
// Array.from도 되고, 해체할당도 되고, for...of, forEach, generator, 펼치기연산자도 되는 이유는 Symbol.iterator와 관련이 있다.
const arr = [1, 2, 3]
console.dir(arr) // Array(3)
const iter = arr[Symbol.iterator]();
iter // Array Iterator{}안에는  next란 메소드가 있다.
// [[Prototype]]: Array Iterator
// next: ƒ next()
// Symbol(Symbol.toStringTag): "Array Iterator"

// Symbol.iterator라는 메소드를 호출한 결과가 next를 호출할 수 있는 Iterator{next()} 라는 객체가 있으면 된다.
iter.next() // 호출하면 {value: 1, done: false}
iter.next() // 호출하면 {value: 2, done: false}
iter.next() // 호출하면 {value: 3, done: false}
iter.next() // 호출하면 {value: undefined, done: true}
// next()라는 메소드는 done이 true가 될때까지 호출할 수 있다.

// Array.from도 되고, 해체할당도 되고, 펼치기연산자는 동작원리가 모두 같다.
const a = iterable[Symbol.iterator]() // Iterator{}
// a.next() => 반복 호출. done이 true가 되기 전까지.

// iterable한 객체를 인자로 받을 수 있는 개체
new Map()
new Set()
new WeakMap() //참조형 데이터를 받음. 이터러블 하지 않지만 인자는 이터러블한 객체를 받을 수 있음
new WeakSet() //참조형 데이터를 받음. 이터러블 하지 않지만 인자는 이터러블한 객체를 받을 수 있음
Promise.all()
Promise.race()
Array.from()
generator()
