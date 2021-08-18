// 해체 할당, 구조분해 할당. 디스트럭처링 (destructuring assignment)
// um.. 에뤼카 말 어렵다. 뭐라고 부를까요? 저는 그냥 해체할당 이라고 할꼐요.
// 배열 해체할당

// 기존에는 colors배열의 각 색상을 접근하려면 아래같이 해야했는데
const colors = ['red', 'white', 'orange'];
const first = colors[0];
const second = colors[1];
const third = colors[2];

console.log(first, second, third); // red, white, orange

// 이제는 해체할당으로 이렇게 간결해 졌어요
// 해체해서 const에 선언한 변수명에 재 할당 한다
// 변수명은 값을 담고있는 데이터 타입으로 감싼다. []
const colors = ['red', 'white', 'orange'];
const [first, second, third] = colors;

console.log(first, second, third); // red, white, orange 출력

// const 변수로 선언되어있어 재할당 안됨 이라는 에러가 뜬다.
first = 10; // Assignment to constant variable
second = 20; // Assignment to constant variable
third = 30 // Assignment to constant variable

const colors = ['red', 'white', 'orange'];

const first = colors[0];
const second = colors[1];
const third = colors[2];
// 위랑 아래랑 완전 같음
const [first, second, third] = colors;

// 해체할당의 좋은점은 내가 원하는 것만 사용할 수 있음.

const colors = ['red', 'white', 'orange'];
const [, second] = colors;
console.log(second) // white
const [, ,second] = colors;
console.log(second) // orange

// 이렇게도 가능
const [, , second] = ['red', 'white', 'orange'];
console.log(second)// orange;

// 만약 없는 원소에 접근하려고 하면?
// 없는 것에 접근하려고 하면 매칭할 값이 없으니 undefined 매칭
const [, , third, forth] = ['red', 'white', 'orange'];
console.log(forth) // undefiend;
forth = 10; // Assignment to constant variable

// spread operater 펼치기 연산자
const arr = [1, 2, 3, 4, 5];
const [a, ...b] = arr; // 1, (4) 2, 3, 4, 5
const [, , ...c] = arr; // (3) 3, 4, 5
console.log(a, b); // 1, 4) 2, 3, 4, 5
console.log(a, b, c); // 1, (4) 2, 3, 4, 5, (3) 3, 4, 5

// default parameter와 결합하면?
// 값이 없으면 기본값을 할당해놓은 값이 적용, 값이 있으면 해체하여 할당한 값이 들어감
const [a = 10, b = 20] = [5]; // 5, 20
const [a = 10, b = 20] = [5, undefined]; // 5, 20
console.log(a, b) //5, 20

const [c, d = c * 2] = [5];
console.log(c) // 5
console.log(d) // 5 * 2 = 10;

// tdz
const [e = f, f] = [undefined, 5];
console.log(e) // undefined니까 default parameter로 동작을 하는데 f는 뒤에있는 f를 가지고오니 tdz에 걸려 
// f is not defined 에러  뜸.

// 다차원 배열
const arr = [1, [2, [3,4], 5], 6];
const [a, [b, [ ,c], ], d] = arr;
console.log(a, b, c, d) // 1, 2, 4, 6;

const arr = [1, [2, [3, 4], 5], 6];
const [a, [b ],d] = arr;
console.log(a, b, d); // 1, 2, 6

// 값 교환
// a의 값을 b에 넣고 b의 값을 a에 넣고싶을때 기존에는
// temp같은 빈 변수 하나 생성해서 그걸 매개체로 값을 교환했었는데 
let a = 10;
let b = 20;
let temp = a;
console.log(temp, a) // 10, 10
a = b ;
console.log(a, b) // 20, 20
b = temp;
console.log(b, temp) // 10, 10
console.log(a, b, temp) // 20, 10, 10 

// 근데 이제는 이렇게 간단해 졌다
[a ,b] = [b, a];
console.log(a, b);


// 객체 해체할당 (아주 중요, 실무에서 가장 많이 쓰는, es6 역량을 결정짓는 기능 갱장히 중요)
const im = {
    name : '주영',
    age: 30,
    gender: 'female'
}
const {
    name: n,
    age: a,
    gender: g ,
    job: j
} = im 
console.log(n, a, g); //주영, 30, female, undefined
// 배열은 인덱스에 매칭시켜줘서 변수명에 값을 할당 해주면 되는데 마찬가지로 
// 오브젝트도 키를 매칭시켜서 변수명에 값을 할당
// im의 name과 name을 매칭시켜서 name키를 변수 n에다가 담겠다. 
// im의 age와 age를 매칭시켜서 age키를 변수 a에 담겠다. 
// im의 gender와 gender를 매칭시켜서 gender키를 변수 g에 담겠다. 

// const로 선언하면, const로 let으로 선언하면 재할당 가능한 let 으로 기능을 함.
n = 10; //Assignment to constant variable;

// property 축약형으로 
const im = {
    name : '주영',
    age: 30,
    gender: 'female'
}
const {
    name,
    age,
    gender 
} = im 
// name 키를 name과 매칭해서 name 변수에 담겠다. 
// age 키를 age와 매칭해서 age 변수에 담겠다.
// gender키를 gender와 매칭해서 gender 변수에 담겠다.
console.log(name, age, gender); // 주영, 30, female

const loginInfo = {
    device: {
        createdAt: '2017-12-06T00:14:04+0000',
        deviceId: '0000000000004Vx',
        deviceType: 'desktop'
    },
    user: {
        createdAt: '2017-03-08T18:00:28+0000',
        email: 'power4ce@gmail.com',
        name: '정재남',
        nickname: 'gomugom',
        phoneNumber: '010-9185-9155'
    }
};

const {
    device,
    user: userInfo,
} = loginInfo;
// device는 loginInfo의 device 매칭시키고 device변수에 담은것,
// user는 loginInfo의 user와 매칭시키고 userInfo변수에 담은것
console.log(userInfo)

// device 안쪽에 있는것만 뽑아 내려면?
// user는 userInfo로 할껀데 user를 다시 뽑아낼수 있음
// user user 겹쳐도됨 user는 접근자 일뿐
const {
    device: {
        createdAt,
        deviceId,
        deviceType
    },
    user: userInfo,
    user: {
        createdAt: userCreatedAt,
        email,
        name,
        nickname
    }
} = loginInfo;
console.log(createdAt) // '2017-12-06T00:14:04+0000'
console.log(deviceId) // '0000000000004Vx'
console.log(deviceType) // 'desktop'
console.log(userInfo) // user 전체 다나옴

console.log(userCreatedAt) // '2017-03-08T18:00:28+0000'

const {
    device,
    user: {
        name,
        nickname,
        phoneNumber: phone
    }
} = loginInfo
console.log(phone) // '010-9185-0155'

// default parameter와 연동
// phone 이라는 객체에 name은 iPhone, color는 값이 undefined
// 그 상태에서 값을 추출할껀데 
const phone = {
    name: 'iPhone',
    color: undefined
} 
// name name 매칭해서 변수n에 담고
// version매칭해서 v에 담는데 version값이 없으면 default로 '6+'값을 v변수에 넣어라, color에 값이 없으면 c변수에 'silver' 담아라
const {
    name: n,
    version: v = '6+',
    color: c = 'silver'
} = phone
console.log(n, v, c) //iPhone 6+ silver

// server에서 정보를 주는데 올수도 있고 안올수도 있는 property가 있다면 그럴때 default로 에러 없이 간단한게 해결.

// 사용예
// 만약에 Ajax를 통신해서 deliveryProduct라는 객체를 서버에서 받았다면
// 이 객체를 받아오는 함수에서 date변수에 담고 그 날짜가 뭐와 같으면
// var date = deliveryProduct.orderedDate
// if (date === '') 이런식으로 일을 했다면 지금은

const deliveryProduct = {
    orderedDate: '2018-01-15',
    estimatedDate: '2018-01-20',
    status: '배송중',
    items: [
        {name: '사과', price: 1000, quantity: 3},
        {name: '배', price: 1500, quantity: 2},
        {name: '딸기', price: 2000, quantity: 4}
    ]
};

// 받아온 객체를 바로 할당해서 사용할 수 있다
// 몇번째 값 부터 추출해서 사용하는 것도 가능
const {
    estimatedDate: esti,
    status,
    items: [ , ...products]
} = deliveryProduct;
console.log(esti, status, products); // 2018-01-20 배송중 (2) 배, 딸기

// getArea라는 얘는 info라는 객체를 받아요. 그 객체에서 width height를 추출해서 제곱하여 리턴
const getArea = (info) => {
    const { width, height } = info; // 함수 내부에서 info를 추출했는데 
    return width * height
}
getArea({width: 10, height: 10}) // 100

// 함수 내부에서 info를 추출하지 말고 getArea함수의 매개변수에 info를 추출하면
// getArea({width: 10, height: 10}) getArea 괄호 안의 info값과 info가 같음
// 매개변수에서 info쓰지 말고 매개변수에서 바로 객체를 받고 값을 추출
const getArea = ({width, height}) => {
    return width * height
}
getArea({width: 10, height: 10}) // 100

// 만약에 객체가 안넘어 왔으면 default 값으로 넣어준다.
const getArea = ({width, height} = {width: 0, height: 0}) => {
    debugger
    console.log(height)
    return width * height
}
getArea({width: 10, height: 10}) // 100
getArea({width: 10, a: 100, c: 300}) // 10 * undefined = NaN
getArea() // 0

// 만약에 객체가 안왔을때 프포퍼티중 필요한 프로퍼티가 안왔을때 에러를 띄울것이냐, 에러를 띄우지 않고 기본값으로 함수가 실행되도록 할것이냐는
// 개인이 선택 할 문제지만.. 활용 범위가 무궁무진하다.
// 서버에 보통 데이터가 올때는 많은 데이터를 갖고있는 객체일 경우가 많은데
// 객체는 실제로 필요한 프로퍼티가 몇개 안되는 경우가 많음.
// 그럴때 이 프로퍼티를 다 받아서 함수안에서 다 들고있는 상태에서 매번 접근해서 쓸 필요가 없음
// 오자마자 필요한 프로퍼티를 바로 추출하면된다.

// 서버에서 유저정보를 받아온다고 하면 user { name : '주영', nickname: ''} 이런 데이터가 넘어온다고 하면
// nickname에 값이 없으면 name프로퍼티를 쓰겠따 하면 아래와같이 
function ({name, nickname = name}) {

}

// 작업량을 현저히 줄이고, 안전정으로 코드를 짜는 
// block scope,
// let, const
// template literal
// default parameter
// rest parameter
// spread operaer
// enhanced object functionalities
// arrow function
// destructuring assignment

// Symbol
// Set, WeakSet
// Map, WeakMap
// iterable, iterator, generator
// class
// promise
// Proxy, Reflection
// Module
// 