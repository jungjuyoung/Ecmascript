// 기존의 상속 그리고 문제점

function Square(width) {
  this.width = width
}

Square.prototype.getArea = function () {
  return this.width * (this.height || this.width)
}

function Rectangle (width, height) {
  Square.call(this, width)
  this.height = height
}

function F() { } // 빈 함수 만들어서 

F.prototype = Square.prototype // 프로토타입을 덮어 씌우고
Rectangle.prototype = new F() // 생성자 함수로 인스터스를 만든것을 프로토타입에 넣고
Rectangle.prototype.constructor = Rectangle // 그 과정에서 날라간 constructor를 다시 만들어주는 등... 이런식으로 프로토타입의 체이닝을 이용해서 클래스를 흉내내서 작업했던 지난날들...

const square = Square(3)
const rect = new Rectangle(3, 4)

console.log(rect.getArea())
console.log(rect instanceof Rectangle)
console.log(rect instanceof Square)


// 상속
class Square {
  constructor (width) {
    this.width = width
  }
  getArea() {
    console.log(`Square this.width: ${this.width}, this.height: ${this.height}`);
    // Square this.width: 3, this.height: 4
    return this.width * (this.height || this.width)
  }
}
class Rectangle extends Square {
  constructor (width, height) {
    super(width) // 상위클래스의 constructor를 호출하는 함수. 오직 constructor안에서만 호출가능. 오직 생성자 함수 안에서만 super키워드를 사용할 수 있음.
    this.height = height
  }
}

const rect = new Rectangle(3, 4) // ** 여기서 넘겨준 3,4가 Square의 width, height로 사용됨.
console.log(rect.getArea())
// getArea를 찾는 과정
// react.(__proto__) === Rectangle.prototype
// react.(__proto__).(__proto__) === Square.prototype
// react.(__proto__).(__proto__).getArea() __proto__ 생략가능하니까
// react.getArea()
console.log(rect instanceof Rectangle)
console.log(rect instanceof Square)

// super (내부키워드로써, 허용된 동작 외엔 활용 불가)

// - (1) constructor 내부에서
//   - 수퍼클래스의 constructor를 호출하는 함수 개념.
//   - 서브클래스의 constructor 내부에서 `this`에 접근하려 할 때는 **가장 먼저** super함수를 호출해야만 한다.
//   - 서브클래스에서 constructor를 사용하지 않는다면 무관. (이 경우 상위클래스의 constructor만 실행된다.)거나, 내부에서 `this`에 접근하지 않는다면 무관.

// - (2) - 메소드 내부에서
//   - 수퍼클래스의 프로토타입 객체 개념.
//   - 메소드 오버라이드 또는 상위 메소드 호출 목적으로 활용.

// 오버라이드
class Rectangle {
  constructor (width, height) {
    this.width = width
    this.height = height
  }
  getArea () {
    return this.width * this.height
  }
}
class Square extends Rectangle {
  constructor (width) {
    // console.log(super) // 접근 불가능. 내부에서 접근 불가능하도록 설계해둠. 그냥 써먹을수만 있음.
    super(width, width)
  }
  getArea () {
    console.log('get area of square.')
    // console.dir(super)// 접근 불가능. 내부에서 접근 불가능하도록 설계해둠. 그냥 써먹을수만 있음.
    return super.getArea() // 상위클래스의 메소드에 접근하기 위한.
  }
}
const square = new Square(3)
console.log(square.getArea())
// get area of square.
// 9
// 하위클래스에서 상위클래스의 getArea를 상속받아서 사용할때 하위에서 그보다 더 많은 기능이 필요할때 오버라이드 처럼 응용할 수 있음. 또 다른 방법으로는 이름이 같을 필요가 없음.

class Rectangle {
  constructor (width, height) {
    this.width = width
    this.height = height
  }
  getArea () {
    return this.width * this.height
  }
}
class Square extends Rectangle {
  constructor (width) {
    super(width, width)
  }
  getArea () {
    console.log('get area of square.')
    return super.getArea() // 상위클래스의 메소드에 접근하기 위한.
  }
  getX() {
    return super.getArea()
  }
}

const square = new Square(3)
square.getX()
// 9

// 추상클래스 흉내
// `new.target`을 활용한 abstract class 흉내

class Shape {
  constructor () {
    if(new.target === Shape) {
      throw new Error('이 클래스는 직접 인스턴스화할 수 없는 추상클래스입니다.') // ** a.
    }
  }
  getSize () {}
}
class Rectangle extends Shape {
  constructor (width, height) {
    super()
    this.width = width
    this.height = height
  }
  getSize () {
    return this.width * this.height
  }
}
// const s = new Shape() // ** a.의 에러가 출력.
const r = new Rectangle(4, 5)
console.log(r); // Rectangle {width: 4, height: 5}