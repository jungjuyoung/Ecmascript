// spread operator
// spread: 쳘치기 , operator: 연산자

var bird = ['eagle', 'pigeon'];
var mamals = ['rabbit', 'cat'];
// es5에서는 
const animals = bird.concat('whale').concat(mamals);

// es6에서는 이제 concat 잊어벼러도됨. 필요없어졌음.
const animals =  [...bird, 'while', ...mamals];
console.log(animals)

const animals2 = [...bird, 'while', ...animals];
console.log(animals2)

const animals3 = [...bird, ...animals, 'while'];
console.log(animals2)

// 배열의 각 인자를 펼친 효과
const arr = [1, 2, 3, 4, 5]
console.log(1, 2, 3, 4, 5);
console.log(...[1, 2, 3, 4, 5]);
console.log(...[arr]);

// 가장 큰 값, 가장 작은 값 구하는 Math.max 와 Math.min을 쓸때 
// 값을 콤마로 구분지어 줄수 밖에 없는데 배열인게 좋다..
const values = [20, 10, 30, 50, 40, 60];
console.log(Math.max(20, 10, 30, 50, 40, 60))
// 그래서 변수에 담아서 이렇게 썼었는데 
console.log(Math.max.apply(null, values))
console.log(Math.max.call(null, ...values))
// 펼치기 연산자 쓰니 간단.
console.log(Math.max(...values));

// reset parameter는 인자의 맨 끝에 한번만 됐었는데 spread operator는 
// 뭘 받는게 아니라 주는 입장이라 위치가 어디든 노 상관. 몇번을 해도 노 상관.
// 몇번을, 어느 위치에서 사용해도 된다.
const values = [3, 4, 5, 6, 7, 8];
const sum = (...args) => args.reduce((p, c) => p + c);
console.log(sum(1, 2, ...values, 9, 10));

// rest parameter와 spread operator 모두 ...을 쓰는데 어떤때는 나머지고 어떤때는 펼치기 일까 ??
// getter: 나머지 / 받는 입장
// setter: 펼치기 / 주는 입장

// iterable 한(반복할 수 있는) 데이터는 펼칠 수 있다. 배열같은
const str = 'Hello!';
const splitArr = str.split('');
const restArr = [...str];
console.log(splitArr, restArr);

// Set은 나중에 다시 배울껀데 배열이랑 비슷
// Set은 중복된 값이 들어가지 못한다.
// Enteries라는 프로퍼티에 배열로 들어가는데 
// 중복이 허용되지 않아서 
const set = new Set();
set.add(1).add(3).add(5).add(2).add(8)
// set.add(5) 해도 안됨 중복 허용 안함.
// 얘도 펼칠수 있다
// set도 펼칠수 있다
console.log(...set) // 1, 3, 5, 2, 8

// push, unshift, concat 등의 기능을 대체할 수 있다.
// 새로운 배열이다.
let originalArr = [2, 3];
const preArr = [-2, -1];
const sufArr = [6, 7];

originalArr.unshift(1) // 배열의 맨앞에 전달한 인자 추가
// originalArr.push(1) // 배열의 맨뒤에 전달한 인자 추가
// originalArr.shift() // 배열의 맨앞에 위치한 인자 삭제
// originalArr.pop() // 배열의 맨뒤에 위치한 인자 삭제
originalArr.push(4);

originalArr = [0, ...originalArr, 5];

// 위를 잘 살펴 보면 
// originalArr.unshift(1) 은 원래 배열
// originalArr.push(4) 도 원래 배열
// originalArr = [0, ...originaArr, 5] 만 새로운 배열
// 새로운 배열을 만드는것이 오히려 메모리 관리에 효과적 
// 원래 있던 배열들은 오히려 메모리 낭비 왜냐하면
// 원래 있던 배열에서 unshift(1) 하면 원래 배열의 맨 앞에 인자를 추가하고 기존에 있던 인자들을 뒤로 밀어야 하는데 
// 배열전체를 읽고 다시 써야함 비용이 큼.
// push의 경우 그렇게 메모리 낭비가 되지는 않음. 왜냐면 맨 뒤에 추가해주면 되기 때문에. 맨뒤에 추가하고, length만 바꿔주면 됨.
// 새로운 배열은 메모리 하나를 새로 만들어서 쓰기는 하나 기존에 배열을 더이상 매칭해서 쓰는것이 없다면 가비지 컬렉터에 의해 자동으로 삭제가 되므로
// 알아서 메모리 관리가 된다.

// 얕은 복사만 수행한다.
let originaArr = [{
    first: 'hello',
    second: 'world!'
},{
    first: 'welcome',
    second: 'ES6!'
}];

let copiedArr = [...originaArr];
copiedArr[0].first = 'hi'; // copiedArr 뿐만 아니라 origianlArr도 바뀜
// 그럼 깊은 복사를 하려면? 펼칠기로는 안될것
// 각각의 객체를 찾아가서 각 객체의 프로퍼티 복사해오고 그걸 가지고 새 배열을 만들어야 완전히 새로운 배열이 될것.