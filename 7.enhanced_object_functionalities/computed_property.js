// computed property 계산된 프로퍼티 명
// obj 생성시 프로퍼티 키 값에 대괄호 표기로 접근가능
// 대괄호 내에 값 또는 식을 넣어 조합할수 있음.

let suffix = ' name';
let iu = {
    ['last' + suffix]: '이',
    ['first' + suffix]: '지은'
};
console.log(iu);

const count = ((c) => () => c++)(0);
var obj = {
    [`a_${count()}`]: count(),
    [`a_${count()}`]: count(),
    [`a_${count()}`]: count()
}
console.log(obj)
// { a_0: 1, a_2: 3, a_4: 5}