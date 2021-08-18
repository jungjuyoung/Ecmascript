// JSON
// Javscript Object Notation

// Object to JOSN
let json = JSON.stringify(true);
let arr = ['apple', 'banana'];
json = JSON.stringify(arr);

const rabbit = {
  name: 'tori',
  color: 'white',
  size: null,
  participants: [{ name: 'namejoon' }, { name: 'jungkook' }],
  birthDate: new Date(),
  jump: () => {
    console.log(`${name} can jump!`);
  },
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

// JSON to String
// console.clear();
const obj = JSON.parse(json, (key, value) => {
  // console.log(`key: ${key}, value: ${value}`);
  return key === 'birthDate' ? new Date(value) : value;
});

// console.log(obj.birthDate.getDate());
