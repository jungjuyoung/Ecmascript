// 함수의 나머지 기능... 
// 1. name property 
// 2. new.garget
// 3. 블록스크포 내에서의 함수 선언과 호이스팅(브라우저별 상이)

// a 라는 기명함수의 함수프로퍼티 name은 함수의 이름 a가 나온다.
function a() {}
console.log(a.name) // a

// 익명함수를 변수 b에 담아 호출하는 네임프로퍼티는 값을 할당하지 않았는데, 브라우저에서 편의상 변수명을 
// 네임프로퍼티에 할당하는것을 규칙으로 앞의 변수명을 네임 프로퍼티에 할당하게 됬었다.
const b = function(){}
console.log(b.name); // b

// 기명 함수의 프로퍼티는 기존데로 cc 가된다.
const c = function cc (){}
console.log(c.name) // cc

// arrow 함수도 익명이기에 변수명이 네임 프로퍼티에 할당
const c = () => {}
console.log(c.name)// c

// 매소드는?
const e = {
    om1: function(){}, // 기존에 있던 매소드 표현식
    om2(){}, // concise method()
    om3: () => {} //arrow 함수
}
console.log(e.om1.name, e.om2.name, e.om3.name)// om1, om2, om3 

// class
class F {
    static method1() {}
    method2() {}

}

function G(){} //생성자 함수로서 선언했지만 1급 객체 이기때문에 method1의 프로퍼티를 동적으로 할당 가능.
G.method1 = function(){} // method1을 name으로 할당할것이냐 헷갈려서 할당안함.
G.prototype.method2 = function(){} // prototype.method2 까지 name으로 할당할 것이냐 헷갈림 할당안함.

const f = new F();
console.log(F.method1.name, f.method2.name) // method1, method2

const g = new G();
console.log(G.method1.name, g.method1, g.method2.name) // 아무것도 안나옴

//bind
function a (x,y,z){
    console.log(this, x, y, z);
}
const b = function(){}
const h = a.bind(b)

a.call({}, 1, 2, 3) // this를 {}로 해서 a를 호출. 1,2,3 을 a함수에 인자로 넘기면서 바로 실행하는 메소드들 
//결과: {}, 1, 2, 3
a.apply({}, [1, 2, 3]) // this를 {}로 해서 a를 호출. [1,2,3]을 a 함수에 인자로 넘기면서 바로 실행하는 메소드들
//결과: {}, 1, 2, 3
// call, apply는 this 및 인자들을 넘김과 동시에 바로 실행해주는 메소드 인데 

// bind는 내가 넘기고 싶은 인자를 넘긴 새로운 함수를 만들어서 그걸 실행. 
const c = a.bind({a: 1}) // bind는 바로 실행되지 않고, 결과를 c에 담아라. c를 실행하면 this를 {a: 1}로 해 라
const c = a.bind({}, 1, 2) 
c() // {} 1, 2
c(3) // {} 1, 2, 3

console.log(c) //c라는 함수는 바인딩을 걸었는데, a를 가지고 바인딩이 걸린상태의 함수다.
// name 프로퍼티에 bound a라고 써있다.

const person = {
    _name: '주영',
    get name(){
        return this._name
    },
    set name(v) {
        this._name = v
    }
}
const descriptor = Object.getOwnPropertyDescriptor(person, 'name')
console.dir(person);

// new.target
function Person(name) { // 생성자 함수에 name이라는 인자를 받을건데
    if(this instanceof Person) { // this가 Person의 인스턴스이면 this.name에 name을 넣고
        this.name = name;
    } else { // 아니면, new 연산자로 사용하세요 라는 에러를 던지게 함.
        throw new Error('new 연산자로 사용하세요.')
    }
}
Person(1) // 일반 함수로 호출하면 에러 일반 함수로 사용하면 this는 window가 되기때문에 Person의 인스턴스가 아니라서 else문을 통과하여 에러를 내게됨.
new Person(1) // 생성자 함수를 일반 함수로 사용하지 말고, new 연산자를 사용하여 인스턴스를 만드는 생성자 함수로써 사용하게 강제 하기위해 주로 사용하는 문법
// this가 뭘까? new 연산를 가지고 새로 생성될 인스턴스 자체가 this가 된다. 
// 그 인스턴스는 Person의 인스턴스이다.

const p1 = new Person('주영')
console.log(p1)

const p2 = Person.call(p1, '곰')  
console.log(p2) // 아무것도 없음. Person함수에서 return 하는것이 없으니까. new로 인스턴스를 return 하는게 아니라 call로 일반함수 호출하듯 호출한것이기 때문에 return 한게 없음.
console.log(p1) // 곰으로 바뀌어 있음.
// call로 호출을 하더라도 Person함수 안의 조건문에 성공하여 의도한 바와 다르게 동작. 
// 에러없이 이렇게 우회해서 잘못 사용되더라도 캐치 하기 어려웠던것들이 

// es5에서 기존에는 이렇게 사용해도 의도한 new 연산자로 강제하여 사용하게 함수안에 조건문들을 넣어도
// 완벽하지 않더라. 원래 의도했던 바와 다르게 동작하는 등 문제가 많아 new.target이 나옴.
// this가 생성자 함수의 Person의 인스턴스냐 아니냐로 판단했는데
function Person(name) {
    console.dir(new.target);
    if(new.target !== undefined) { // new.target은 new 연산자로 쓰지 않으면 undefined가 들어가니까 
        this.name = name;
    } else {
        throw new Error('new 연산자로 사용하세요.')
    }
}
Person() // 일반 함수 호출하듯이 호출을 하면 undefind가 나오고, 에러가 나옴.
new Person(1)// ƒ Person(name) 생성자 함수 그자체가 나오고, Person{name: 1}이 나옴
// new.target을 이용하면 Person.call(p1, '곰')으로 호출해도 에러없이 동작하던것과 달리 
// new 연산자로 호출하지 않으면 undefined가 할당됨. 그래서 조건문을 통과 하지 못하므로 
// new 연산자로 사용하세요 라는 Error가 나타남. 
// new Person(1) -> new 연산자를 붙여서 호출한 Person이라는 함수 자체가 new.target이 됨.
// 이렇게 하면 아까 this instanceof Person보다 낫긴한데 그마저도 ...

// 조금더 명확하게 new.target이 Person을 바라보게 하면 
function Person(name) {
    console.log(new.target);
    if(new.target === Person) { // 조건문을 new.target을 undefined가 아니라 Person과 비교 
        this.name = name;
    } else {
        throw new Error('new 연산자로 사용하세요.')
    }
}

class A { // 추상클래스처럼 흉내
    constructor(){
        if(new.target === A) {
            throw new Error('얘는 추상클래스 란다.');
        }
    }
}// 이렇게 하면 A자체를 클래스로 호출 할 수 없음. 인스턴스로. 오직 B에 의해서 호출 할 수 있음.

class B extends A{
    constructor(){
        super();
    }
}
const b = new B(); // B{}
const a = new A(); // Reference Error: a is not defined


// arrow 함수에서 this 바인딩 안됨.
function Person2(name) {
    const af = n => {
        this.name = n;
        console.log(new.target);
    }
    af(name)
}
const p1 = new Person2('주영') // Person2함수가 나온다.
const p2 = Person2('김사랑') // undefined 가 나온다.

// 함수 선언문과 스코프 
if( true ) { // if문 블록스크프 열림
    a(); // 1번 호출. 호이스팅
    function a(){console.log(true)} // 함수 선언문
}
a() // 2번 호출. 함수 선언문은 블록스코프에 영향을 받는 let, const가 아니므로 나와야함.

// true 1번 호출
// true 2번 호출 나옴 예상대로 동작

// 그럼 이건?

// 크롬, 파폭
a() // a is not a function 에러뜸 뭐야??
if( true) { // if문 블록스코프 열림
    a(); // 호출 호이스팅
    function a(){console.log(true)} // 함수 선언문
}
a() // 함수 선언문은 블록스코프에 영향을 받지 않는다. let, const가 아니므로.

// 사파리는 true, true, true
// 크롬 브라우저를 전적으로 믿으면 안된다는 것이 확인됨.
// es5개념으로 볼때 전혀 문제가 되지 않지만, es6로 볼때는 function 이라는 얘가
// 이걸 과연 블록 스코프로 볼지, 함수 스코프로 볼지 판단이 달라지는 구간이 있는데 그게 브라우저 별로 판단 기준이 다름.
// use strict 모드를 사용하면
'use strict';
a() // 에러
if( true ) { // if문 블록스크프 열림
    a(); // 호출. 호이스팅
    function a(){console.log(true)} // 함수 선언문
}
a() // 에러
// 'use strict' 모드를 사용하면 함수 선언문이 블록 스코프에 갇힌다는걸 확인.
// 'use strict' 모드를 사용하면 크롬, 파폭, 사파리 모두 다 똑같이 동작.

// 'use strict' 모드가 아닌 경우 이것을 'sloppy mode' 라고 부르는데 
// 'sloppy mode' 일때, 브라우저마다 동작이 다 다름. 브라우저마다 다른 동작. 예상이 안됨..
// 'use strict' : 함수 선언문도 블록 스코프에 갇힌다.
// es6로 넘어오면서 strict mode를 사용하면 함수 선언문도 블록 스코프 안에 갇히게 만들려고 하는데
// strict mode를 제외한 코드는 어떻게 하냐? 그런 코드들을 해석하는게 브라우저마다 다 다른데, 각 브라우저가
// 제대로 구현을 안해놓은것... 그래서 레거시 코드들에서 문제가 터지는데
// es6로 작성하지않은 es5에서도 잘 못 작성한, 별로 추천하지 않는 방식으로 작성했던 코드들은 이제 에러가 나기 시작한다.
// 기존의 문법은 잘 못 작성하거나, 별로 추천되지 않는 방식으로 작성한 코드도 에러없이 잘 동작 하였기때문에 
// 이런걸 다 일일이 기억하지 마시고, 속 편하게 그냥 이렇게 합시다.

// es6에서는 함수 선언문을 사용하지 마세요.
// arrow 함수 쓰세요.
// 객체에서는 method 축약형 쓰세요 (concise method)
// 생성자 함수로 인스턴스 만드는건 class 쓰세요
// 이렇게 하면 funciton이라는 키워드 자체가 generator를 사용 할때만 나오고 그외에는 나올일이 없어요.
// 심지어 generator는 function*으로 뒤에 *이 붙기때문에 
// 오롯이 function 키워드만 나오는 경우는 아예 없어요
// 어디서? es6에서...
// 어떻게든 앞으로 function자체를 안 쓸 수 있도록 고민을 하세요. 약속~
