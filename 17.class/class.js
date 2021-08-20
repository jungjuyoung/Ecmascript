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

// class 
class Person {
  constructor (name) { this.name = name }
  getName () { return this.name }
  static isPerson (obj) { return obj instanceof this }
}
const jy = new Person('주영');
console.log(jy.getName()); // 주영
console.log(Person.isPerson(jy)); // true
