const s = new WeakSet() // 참조 카운트를 증가시키지 않음
// new WeakSet에는 초기화해서 바로 넣어서 생성하는것을 안하는것이 좋음. 참조카운트를 카운팅하지 않는 목적으로 사용하기 때문에 사용하는 의미가 없어지고 안전성도 떨어짐.
// 참조형 데이터만 요소로 사용할 수 있다.
// 이터러블 하지 않다. 

let o = {}; // o라는 변수에 {}요런 객체를 참조합니다. 참조카운트가 1이 됨.
let o2 = o; // o2라는 변수에 o을 통해서 {}요 객체를 참조합니다. 참조카운트가 2가 됨.

// o2 = null; // o2에 null 이 들어가면서 {}요 객체의 참조카운트가 1이 됨.
// o = null; // o에 null 이 들어가면서 {}요 객체를 참조하는 카운트는 0이 됨. {} reference count: 0 GC 수거 대상이 됩니다.

s.add(o) // o라는 변수가 가르키는 {}를 s에 추가했지만, 참조카운트는 여전히 1개. {}를 참조하는 변수는 o라는 변수 하나밖에 없다고 인식.
s.delete(0) // 할 필요없음.

// set에서는 사용할 수 있던 아래 메소드들을 WeakSet에서는 사용할 수 없음
// set.keys()
// set.values()
// set.entries()
// set.size
// set.forEach
// set for ... of

// 그럼 언제 사용할 수 있을까? 잘모름.
// stackoverflow에서도 weakset의 사용성에 대한 질문이 많음. 그럼 언제 써야 하나?

// WeakSet을 console.dir()해서 보면 가지고 있는 메소드도
// add, delete, has밖에 없음 지금으로서는 has를 사용한것 외에는 사용성을 잘 모르겠음 그러나 has는 set에도 있음.