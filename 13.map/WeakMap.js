// Map 비교 참조카운트를 증가시키지 않음.
// Map 객체를 키로하는 데이터를 추가할 경우 Map 도 해당 객체에 참조가 연결되어, 
// 참조형 데이터만 키에 올수 있다. value에는 아무거나 와도됨.
// 다른 참조가 없어지더라도 Map에는 객체가 여전히 살아있음.
// 그럼에도 WeakMap은 객체에 대한 참조카운트를 올리지 않아 (약한참조), 여타의 참조가 없어질 경우
// WeakMap내의 객체는 GC대상이 됨.

// WeakSet과 마찬가지로 아래 메소드들 사용할 수 없음
// keys()
// values()
// entries()
// size
// forEach
// for ... of

let obj1 = { a: 1 } // obj1이라는 변수에 요{ a: 1 } 객체를 할당 { a: 1 } 객체의 참조카운팅이 1.
const map = new Map()
map.set(obj1, 10) // map에 obj1를 키로 10을 할당함. obj1의 변수에 의해 참조카운트가 2가 됨.
obj1 = null // obj1에 null을 줘서 { a: 1 }의 객체 카운트가 다시 1.

let obj2 = { b: 2} // obj3이라는 변수에 요{b: 2} 객체를 할당 참조카운팅이 1.
const weakMap = new WeakMap()
weakMap.set(obj2, 10) // weakMap에 obj2를 키로 10을 할당함. 참조카운트는 여전히 1.
obj2 = null // obj2에 null을 줘서  {b: 2}의 객체 카운트가 0.