// class

// 기존에 프로토타입으로 인스턴스 객체를 만들때
function Person (name) {
  this.name = name
}
Person.prototype.getName = function () { // 이런걸 prototype method
  return this.name
}
Person.isPerson = function (obj) { // 이런걸 static method라고 함.
  return obj instanceof this
}
// Person.staticMethod = function (params) {
//   return `params: ${params}`

const jy = new Person('주영');
console.log(jy.getName()); // 주영
console.log(Person.isPerson(jy)); // true
// static method는 생성자 함수에서는 호출할 수 있지만 생성자 함수로 만들어진 인스턴스에서는 static method를 바로 호출할 수 없음.
// console.log(jy.staticMethod()); 
// console.log(Person.staticMethod(jy)); // true
// 반대로 프로토타입 메소드는 생성자 함수로부터 만들어진 인스턴스에서는 호출할 수 있지만 생성자 함수에서는 바로 호출할 수 없음. 
jy.getName() // "주영"
Person.getName() // Uncaught TypeError: Person.getName is not a function at <anonymous>
// Person.prototype
// (new)
// jy.__proto__ === Person.prototype
// jy.__proto__.getName === Person.prototype.getName
// this는 .앞에까지라 아래는 다르다.
// .__proto__는 생략가능하니까 jy.getName이때 this jy고 
// Person은 Person.prototype.getName 이때 this가 Person.prototype이 됨.
// Person.prototype.name = '임의'
// jy.getName()은 "임의"가 나옴.(jy.__proto__.getName)

// Person.prototype.constructor === Person // true
class Person {
  static create(name) {
    return new this(name)
  }
  constructor(name) {
    this.name = name;
   }
}
const jy = Person.create('주영');
console.log(jy)
// 결국 static method는 생성자 함수만 호출할 수 있다. 우회해서 아래와 같이 호출을 해도 
// this가 가르키는것이 달라져 그 사용목적이 무의미해짐.
// jy.__proto__.constructor === Person 니까 그럼 Person.create()호출 가능하니까 
// jy.__proto__.constructor.create('JK') 할수 있다. 그러나 여기서 this는 jy._proto__ 


// class 
class Person {
  constructor (name) { this.name = name }
  getName () { return this.name }
  static isPerson (obj) { return obj instanceof this }
}
const jy = new Person('주영');
console.log(jy.getName()); // 주영
console.log(Person.isPerson(jy)); // true

// class는 new 연산자 없이 호출할 수 없다
// new.target으로 new없이 호출하면 에러를 띄움.

A.prototype.constructor === A // true
class A {
  a() { }
}
// 클래스 A의 메소드 a()를 통째로 b()로 바꿔치기하려고 할 경우 읽기전용이라 안됨.
A.prototype = {
  b() {console.log(1)}
}

// class 내부에 generator
// 객체 메소드로 할당
const obj = {
  // gene: function* () { yield }, // 기존 메소드 방식일때 
  *gene() {yield } // 메소드 축약형일때 이름앞에 *
}
// 클래스 일때
class A {
  *gene() { yield} // 객체 메소드 축약형처럼 이름앞에 *
}
