// iterator
// 반복문을 위해 설계된 특별한 인터페이스를 가진 "객체".

// - 객체 내부에는 next()라는 메소드가 있는데,
// - 이 메소드는 value와 done 프로퍼티를 지닌 객체를 반환한다.
// - done 프로퍼티는 필수고 boolean값이다. value는 생략 가능.
// - done은 언젠가 꼭 false로 변경되서 무한정 실행되는것을 막아주는것이 좋음.


// 일반 객체에다가 iterator가 요구하는 객체내에 next()라는 메소드가 있고 
// next()호출할때 반환하는 객체에는 done과 value프로퍼티를 반환한다는 규칙을 지켜서 정의해주면
// iterable한 객체를 만들수 있다.
const iter = { // iterator 효과를 낸다.
  items: [10, 20, 30],
  count: 0,
  next() {
    const done = this.count >= this.items.length
    return {
      done,
      value: !done ? this.items[this.count++] : undefined
    }
  }
}
console.log(iter.next()); // {done: false, value: 10}
console.log(iter.next()); // {done: false, value: 20}
console.log(iter.next()); // {done: false, value: 30}
console.log(iter.next()); // {done: true, value: undefined}
// iterator 효과를 낸다.

const iter = { 
  items: [10, 20, 30],
  count: 0,
  next() {
    const done = this.count >= this.items.length
    return {
      done,
      value: !done ? this.items[this.count++] : undefined
    }
  }
}

const obj = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.iterator]() {
    return iter
  }
}
// [...obj] // (3) [10, 20, 30]

// 객체가 이터레이터한지 확인하는 방법은 Symbol.iterator가 있느냐 그게 함수로 되어있느냐를 확인하면 된다.
// 아래 두개가 같은 함수
const iterable = target => typeof target[Symbol.iterator] === 'function';
const iterable = target => !!target[Symbol.iterator];
iterable([])// true
iterable({})// false
