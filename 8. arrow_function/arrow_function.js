// arrow function
// 매개변수가 한개면 괄호 생략가능
// 매개변수가 없거나 두개 이상이면 괄호 필수
// 본문에 내용이 return 값만 있으면  중괄호부터 리턴까지 생략가능
// return 할 값이 객체인경우 괄호를 반드시 써야한다. 객체의 중괄호를 함수 본문으로 인식하기때문에.
// arrow 함수는 기존 함수의 기능을 문법적으로 직관적으로 보기 편하게 하기 위해서 만든것이 아니라, 함수를 가볍게 가져가기 위해서 만든것이다.
// 기존의 함수는 실행하는 순간 데이터를 전부다 들고있는 함수라는 덩어리 객체의 큰 덩어리를 호출해서 컨텍스트를 돌리고 해서 무거웠는데 
// 컴퓨터의 성능이 좋아져서 문제없이 돌아가긴 했지만, 더이상 방치할수 없어서 더 가벼운 함수를 만들고자해서 만들어진것이 arrow함수이다.
// 화살표 함수는 arguments가 없다.
// 화살표 함수는 super가 없다
// 화살표 함수는 new,target도 없다

// const a = function() {
//     return new Date();
// }
const a = () => new Date();

// const b = function(a) {
//     return a * a;
// }
const b = a => a * a;

// const c = function(a, b) {
//     return a + b 
// }
const c = (a, b) => a + b;

// const d= function(a, b) {
//     console.log(a + b);
// }
const d = (a, b) => {
    console.log(a + b);
}
// 객체를 즉시 반환해야하는 경우 객체임을 알려주기 위해서 괄호안에 중괄호를 넣어서 ({}) 반환
// shortand property로 키와 밸류가 같은 이름이면 줄여서 가능
// const e = function(x) {
//     return {x} // x: x; shortand property
// }
const e = x => ({ x })

// const f= function(a) {
//     return function(b) {
//         return a + b
//     }
// }
// 클로저임
const f = a => b => a + b;
// var y = f(1);
// var z = y(2);

// var z = f(1)(2);

console.log(f(3)(2))

// 관행적으로 받아들이기는 하나,  좋은 방법은 아닌 매개변수받기는 하지만 사용하지 않을것은 이렇게 표현.
// const b = function(){
    //     return function(){
        //         return 10
        //     }
        // }
const b = _ => _ => 10;
// 그러나 괄호 괄호를 추천하다.
const b = () => () => 10

// arrow 함수는 실행컨텍스트 생성시 this를 바인딩 하지 않는다.
const obj = {
    a () {
        console.log(this);
        // const b = function(){ //내부함수 일경우 this는 window
        //     console.log(this);
        // }
        // 그래서 이런경우 기존에는 b의 this를 obj로 하려면
        // b.call(this)
        // var self = this;
        // b 안에서 self호출
        // 근데 arrow펑션 쓰면 this바인딩 하지 않아서 스코프 체이닝으로 상위의 this를 찾아서 적용
        const b = () => { //arrow 함수일 경우 this는 obj
            console.log(this); 
        }
        b()
    }
}
obj.a()

// 블록스코프도 this 바인딩 하지 않는데, 그럼 arrow 함수는 블록스코프인가? 아니다.
// var로 선언한 x를 출력해 함수스코프인지 블록스코피인지 확인해보면 함수스코프이다.
// 블록 스코프라면 x값이 나온다. 함수 스코프면 x값이 나오지 않는다. 
// var는 블록스코프의 영향을 받지 않는다. 외부의 스코프에서 선언한 스코프로 인식.
// 함수 스코프라면 함수안에 갇힌 변수이기 때문에 외부에서 찾지 못함. 함수 스코프이다
const a = () => {
    var x = 10;
}
a();
console.log(x) // x is not defined 에러가 나서 함수스코프 이다.

// 기존 함수와 동일하게 함수 스코프인데 다만, 실행 컨텍스트 생성시 this바인딩을 하지 않을뿐.
const obj = {
    grades: [80, 90, 100],
    getTotal (){
        this.total = 0;
        this.grades.forEach(function(v){
            // 여기서 함수는 콜백함수로 동작하여 그냥 함수 실행이기 때문에 this는 window
            // window total은 undefined + 80, + 90, + 100은 NaN
            // 만약 window에 total을 0 으로 선언해두면 아래 this는 270 이 나옴
            this.total += v;
        })
    }
}
obj.getTotal() // undefined
total // 결과는 NaN, undefined + 80 + 90 + 100의 결과는 NaN
console.log(obj.total); // 0

var total = 0;
// forEach의 콜백함수를 arrow함수로 변경하면 쉽게 this가 obj를 바라봄.
// this 바인딩 안하니까 window로 바인딩 되지 않음.
// 즉, this가 obj를 바라봄
const obj = {
    grades: [80, 90, 100],
    getTotal () {
        this.total = 0;
        this.grades.forEach( v => {
            this.total += v;
        })
    }
}

obj.getTotal(); // undefined
total // 270
console.log(obj.total); // 270

// arrow 함수는 this 바인딩 안하니까 this를 다른걸로 바인딩 하는게 안됌.
const a = () => {
    console.log(this)
}
a() // window
a.call({}) // window. 빈객체로 this 바인딩 안됨.

// arrow함수에서 call이나 apply의 본연의 기능은 그대로 사용할수 있다. 다만, this 바인딩이 안될뿐
const a = (...arg) => {
    console.log(this);
    return arg.reduce((p, c) => p + c);
}
a(1,2,3,4,5)// window, 15
a.call({},1,2,3,4,5)// window, 15
// 그러니까 어차피 arrow 함수는 this를 바인딩 하지 않을꺼니까 헷갈리지 않게 기본적으로 빈값인 undefined 나 null을 넘겨서 사용하길 추천.

const sum = function (...arg) {
    console.log(this);
    return arg.reduce((p, c) => p + c);
}
const arrow_sum = (...arg) => {
    console.log(this);
    return arg.reduce((p, c) => p + c);
}
console.log(sum(1,2,3,4,5))
console.log(arrow_sum(1,2,3,4,5))

// concise method(매소드 축약형) 와 arrow 함수의 공통점은
// prototype 프로퍼티가 없다, 그래서  생성자 함수로 사용할수 없다
// arguments, callee가 hidden 되있다, invoke 해야만 값을 얻을수 있다
// conciese method는 메소드로만 사용해야한다. 함수로써 사용할수 없다. 다른곳에 함수를 넘길수는 있다. 객체의 this를 바라보게 하고싶을때 consiese method를 사용
// arrow 함수는 함수로만 사용해야한다. 매소드로서도 사용 가능하다. 객체에서 그냥 함수로서의 동작만 함 객체를 바라보게 this를 바인딩 할수 없음.

const b = {
    name: '하하',
    bb(){
        return this.name;
    },
    a : x => {
        return this.name;
    }
}
b.bb() // 하하
b.a() // ""
// window.name이 존재.
window.name = '바보';
b.a() // 바보


const b = {
    name: '하하',
    bb() {
        const b = () => {
            return this.name
        }
        console.log(b());
    }
}
b.bb() // 하하