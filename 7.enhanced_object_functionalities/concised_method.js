// concise method (간결한 메소드)
// 콜론부터 function 키워드 까지 제거
// :function
const obj = {
    name: 'foo',
    getName() {
        return this.name
    },
    getName2: function() {
        return this.name
    }
}
obj.getName() // foo
obj.getName2() // foo
console.dir(obj.getName)
// arguments도 숨김처리 되어서 invoke해야만 보여
// caller도 숨김처리 되어서 invoke 해야만 보임
// 둘다 실행이 종료된 이후에 접근하니 에러를 띄어준것
// prototype이 없음 이말은 생성자 함수로써 사용할수 없음, 메소드 축약형은 생성자 함수로서 기능을 제한한것.
// 그래서 함수가 가벼워짐
console.dir(obj.getName2)
// 실행이 종료된 이후에 접근해도 값이 null 일뿐 접근 가능했었음
// argument
// caller
// prototype 있음 이말은 생성자 함수로써도 사용할수있음
// 생성자 함수 역할이 생성자 함수로 인스턴스를 만들어 생상정 함수 안에 prototype안에 있는 내용을 인스턴스에 __proto__로 연결해주는것
// prototype이 객체인데 이것이 빠지면 빨라짐

// 메소드로써의 함수는 메소드로서의 기능
// prototype 프로퍼티가 없어졌다 그래서 생성자 함수로 쓸수 없고 오로지 함수 본연의 기능만 할 수있게 되었다
// 메소드로서 호출할때는 메소드 본연의 기능, 콜백함수로 넘겼을때는 함수로서의 본연의 기능 그것만 된다.

// supur: 상위의
// sub: 하위의
// super 명령어로 상위 클래스에 접근 가능

// ㅇㅏ래 두가지가 같다.
// const Person = {
//     greeting: function() {return 'hello'}
// }
// const friend = {
//     greeting: function() {
//         return 'hi, ' + super.greeting() // super로 자신의 상위의 생성자 함수 Person의 greeting호출 concised메서드로 upser 상위 호출 가능
//     }
// }
// Object.setPrototypeOf(friend, Person);// frined라는 애를 인스턴스로 하고, person이라는 애를 생성자 함수로 지정해라
// 이렇게 들어감 friend.__proto__ = {greeting: function() {}}

// -----------------------------------

const Person = {
    greeting() { return 'hello'}
}
const friend = {
    greeting() {
        return 'hi, '+super.greeting()
    }
}
Object.setPrototypeOf(friend, Person);// frined라는 애를 인스턴스로 하고, person이라는 애를 생성자 함수로 지정해라
friend.greeting() // "hi, hello"

const Person = function () {}
Person.prototype.greeting = function() {return 'hello'}

const friend = new Person()
friend.greeting = function () {
    return 'hi, '+this.__proto__.greeting();
}

