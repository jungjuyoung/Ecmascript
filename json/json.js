// JSON
// Javscript Object Notation

// Object to JOSN (오브젝트를 json으로 변환하는 방법)
let json = JSON.stringify(true);
let arr = ['apple', 'banana'];
json = JSON.stringify(arr);

const rabbit = {
  name: 'tori',
  color: 'white',
  size: null,
  participants: [{ name: 'namejoon' }, { name: 'jungkook' }],
  birthDate: new Date(),
  jump: () => { // 이건stringify하면 제외됨. 오브젝트에 있는 데이터가 아니라서 포함되지 않음.
    console.log(`${name} can jump!`);
  },
  symbol: Symbol('id') // 자바스크립트의 특별한 데이터인 Symbol도 변환되지 않음.
};
json = JSON.stringify(rabbit);
// JSON을 통제하고 싶을때 원하는 결과만 추출할때
json = JSON.stringify(rabbit, ['name', 'participants', 'birthDate']);
console.log(json);
json = JSON.stringify(rabbit, (key, value) => {
  // console.log(`key: ${key}, value: ${value}`);
  return value;
  // return key === 'name' ? 'jungkkok' : value;
});

// JSON to String (json을 object로 변환하는 방법)
// console.clear();
const json = JSON.stringify(rabbit)
const obj = JSON.parse(json, (key, value) => {
  // console.log(`key: ${key}, value: ${value}`);
  return key === 'birthDate' ? new Date(value) : value;
});

console.log(obj.birthDate.getDate());
