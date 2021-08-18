// primitive type 유일무이하고 고유한 존재.
// 암묵적 형변환 불가. 다른 형으로 자동 형 변환되지 않음.
// 비공개 멤버에 대한 needs에서 탄생. 숨김 프로퍼티를 만들수 있다. 현재는 private 지원.
// 숨김 프로퍼티는 외부 코드에서 접근 불가, 값도 덮어쓸수 없다.
// 기본적인 열거대상에서 제외. for..in문이나 프로퍼티를 순회하면서 값을 출력하는데서 해당프로퍼티 접근 불가.
// 객체 프로퍼티로 사용. 객체 프로퍼티 키로는 오직 문자형과 심볼형만 허용.
// ** 출력해보고 싶으면 ** 
// let id = Symbol("id"); 
// console.log(id.toString()) 으로 출력.
// console.log(id.description) 으로 출력.

const sb1 = Symbol()
const sb2 = Symbol()
sb1 == sb2 // false
sb1 === sb2 // false
console.log(sb1, sb2);

// symbol에는 설명(이름)을 넣을 수 있다.
// symbol은 유일성이 보장되기 때문에 이름이 동일한 심볼을 여려개 만들어도 심볼값이 다르다.
const a = Symbol('a')
const b = Symbol('a')
a == b // false
a === b // false
const c = b;
c === b // true 같은것을 참조하는것은 true
console.log(a == b);

// 프로퍼티 은닉화 (지금은 class private 지원됨.)
const x = () => {
  const a = Symbol('a')
  return {
    [a]: 10
  }
}
const y = x();
console.log(y) // {Symbol(a): 10}

// y의 Symbol(a)에 접근할 수 없다.
// y.a, y['a'], y[Symbol('a')] 다 안됨.

// 프로퍼티 은닉화 한 프로퍼티의 유일한 접근 가능한 방법은 리턴할때 접근가능한 프로퍼티를 제공해주는것.
const x = () => {
  const a = Symbol('a')
  return {
    [a]: 10,
    a // 접근 가능한 접근자를 제공. a: a를 shorthand property로 축약.
  }
}
const y = x();
console.log(y) // {Symbol(a): 10}
y.a; // Symbol(a)
y[y.a] // 10

// Reflect.ownKeys로도 접근가능
const b = Reflect.ownKeys(y) //["a", Symbol(a)]
y[b[0]] // 10
// 하지만 이것도 개발용으로 출력하는것 뿐, 접근해서 값을 사용하는것은 불가능.

// 주요 사용처는 프로퍼티 은닉화
// 그렇게 때문제 주로 const와 함께 상수로써 사용.
// 열거대상에서 제외되서 프로퍼티를 순회하면서 값에 접근해서 사용할 일이 없기때문에 객체의 식별자로만 사용
// 스코프 내에서 접근 가능한 상태에서는 접근하여 사용할 수 있지만 그외에는 ....
const NAME = Symbol('이름')
const GENDER = Symbol('성별')

const iu = {
  [NAME]: '아이유',
  [GENDER]: 'female',
  age: 26
}
const suzi = {
  [NAME]: '수지',
  [GENDER]: 'female',
  age: 26
}
const rm = {
  [NAME]: '알엠',
  [GENDER]: 'male',
  age: 25
}
console.log(iu, suzi, rm);
// iu: {age: 26, Symbol(이름): "아이유", Symbol(성별): "female"} 
// suzi: { age: 26, Symbol(이름): "수지", Symbol(성별): "female" } 
// rm: { age: 25, Symbol(이름): "알엠", Symbol(성별): "male" }
console.log(iu[NAME], suzi[NAME], rm[NAME]); // 아이유, 수지, rm

for (const prop in rm) {
  console.log(prop, rm[prop]); // age 25
}
Object.keys(rm).forEach( prop => console.log(prop, rm[prop])) // age 25
Object.getOwnPropertyNames(rm).forEach(prop => console.log(prop, rm[prop])) // age 25

// 얘는 심볼에 접근가능. 심볼만 접근가능. 하지만 age 25는 출력이 안됨.
Object.getOwnPropertySymbols(rm).forEach(prop => console.log(prop, rm[prop]))
// Symbol(이름) "알엠"
// Symbol(성별) "male"

// 모두 접근 가능한게 Reflect.ownKeys
Reflect.ownKeys(rm).forEach( prop => console.log(prop, rm[prop]))
// age 25
// Symbol(이름) "알엠"
// Symbol(성별) "male"

// 예외
// Object.assign은 키가 심볼인 프로퍼티를 배제하지 않고 객체 내 모든 프로퍼티를 복사합니다.
// 모순같아 보이지만, 이는 의도적으로 설계된 것입니다. 객체를 복사하거나 병합할때 
// id같은 심볼을 포함한 프로퍼티 전부를 사용하고 싶어 할 것이라는 생각에서 이렇게 설계되었습니다.
const cloneRM = Object.assign({}, rm)
console.log(cloneRM); // {age: 25, Symbol(이름): "알엠", Symbol(성별): "male"}
console.log(cloneRM[NAME]); // "알엠"
console.log(cloneRM[GENDER]); // "male"

// #private변수 이전에 프라이빗 프로퍼티로 사용하던 방법
const obj = (() => {
  const _privateMemeber1 = Symbol('private1')
  const _privateMemeber2 = Symbol('private1')
  return {
    [_privateMemeber1]: '외부에서 보이긴 하는데 접근할 방법이 마땅찮네',
    [_privateMemeber2]: 10,
    publicMemeger1: '외부에서 보이고 접근할 수 있는 멤버변수',
    publicMemeger2: 10
  }
})()
console.log(obj);
// {publicMemeger1: "외부에서 보이고 접근할 수 있는 멤버변수", publicMemeger2: 10, Symbol(private1): "외부에서 보이긴 하는데 접근할 방법이 마땅찮네", Symbol(private1): 10}
console.log(obj[Symbol('private1')]); //undefined
console.log(obj[_privateMemeber1]); //undefined

for (const prop in obj) {
  console.log(prop, obj[prop]);
  // publicMemeger1: 외부에서 보이고 접근할 수 있는 멤버변수
  // publicMemeger2: 10
}

Object.keys(obj).forEach(prop => console.log(prop, obj[prop]))
// publicMemeger1: 외부에서 보이고 접근할 수 있는 멤버변수
// publicMemeger2: 10

Object.getOwnPropertyNames(obj).forEach(prop => console.log(prop, obj[prop]))
// publicMemeger1: 외부에서 보이고 접근할 수 있는 멤버변수
// publicMemeger2: 10

Object.getOwnPropertySymbols(obj).forEach(prop => console.log(prop, obj[prop]))
// Symbol(private1): "외부에서 보이긴 하는데 접근할 방법이 마땅찮네"
// Symbol(private1): 10

// 모두 접근 가능한게 Reflect.ownKeys
Reflect.ownKeys(obj).forEach(prop => console.log(prop, obj[prop]))
// publicMemeger1: 외부에서 보이고 접근할 수 있는 멤버변수
// publicMemeger2: 10
// Symbol(private1): "외부에서 보이긴 하는데 접근할 방법이 마땅찮네"
// Symbol(private1): 10

// 전역심볼 (공용) Symbol.for()
// 사용방법: Symbol.for('반드시 안에 설명이 들어와야함')
// Symbol.for() 이렇게 생성하면 자동으로 undefined가 들어간 심볼이 생성 Symbol(undefined)
// Symbol.for로 생성한 심볼은 전역공간에서 다 모여있음.
// Symbol.for('id') for안의 스트링을 기준으로 찾는다.
// 그래서 Symbol.for로 생성한 심볼은 Symbol.for('id') 이걸 처음 사용했으면 전역공간에 저장.
// 다시한번 같은 Symbol.for('id')로 생성하면 기존에 전역공간에서 for('id')를 기준으로 찾아서 동일한 심볼 리턴
const a = Symbol.for('Id')
const b = Symbol.for('Id')
a === b // true

const obj = (() => {
  const COMMON = Symbol.for('공유심볼') // 외부에서 접근 불가능 하지만
  return {
    [COMMON]: '공유할 프로퍼티 키값이에요. 어디서든 접근 가능합니다.'
  }
})()
const COMMON = Symbol.for('공유심볼') // 함수스코프 내에 COMMON은 외부에서 접근 불가능 하지만 공유심볼라는 설명글을 알기만하면 접근가능.
console.log(obj[COMMON]); // 공유할 프로퍼티 키값이에요. 어디서든 접근 가능합니다.

// Symbol.keyFor()
// 전역 심볼 레지스트리 공간에 있는 전역심볼 Symbol.for()로 만들어진 애들의 이름을 찾을 때 사용.
// 검색 범위가 전역 심볼 레지스트리이기 때문에 전역 심볼이 아닌 심볼에는 사용할 수 없다.
// 전역심볼이 아닌 심볼에서 이름을 얻고 싶으면 description 프로퍼티를 사용합면 된다.
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

console.log(Symbol.keyFor(globalSymbol)) // name, 전역 심볼
console.log(Symbol.keyFor(localSymbol)) // undefined, 전역 심볼이 아님
console.log(localSymbol.description); // name

