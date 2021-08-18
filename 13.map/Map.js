// map은 객체와 비교가 됨. 객체의 단점을 보완한 것이 map.  set은 배열과 비교가 됨.

// 객체의 단점
// 1. 객체는 이터러블 하지 않다. 또한 순서를 보장하지 않는다.
// 2. hasOwnProperty로 객체자체의 프로퍼티인지 아닌지를 판단해야만 한다.
// 3. 키를 문자열로 취급한다. 따라서 키값의 unique함을 완벽히 보장하지 못한다.
// 4. 갯수를 파악하고 싶을때 length 같은 프로퍼티 갯수를 파악할 수 있는것이 없기때문에 파악하기 힘듬.
// Object.keys(o).length or Object.values(o).length로 바꿔서 길이값을 알아냈음.

const o = { name: 'namjoon', age: 28, gender: 'male', award:true }
for (const key in o) {
  console.log(key); // name, age, gender, award
}

Object.prototype.method = function (params) {
  for (const key in o) {
    console.log(Key, o[Key]); // name, age, gender, award, method
  }
}

for (const key in o) {
  if (o.hasOwnProperty(key)) {
    console.log(key); // name, age, gender, award
  }
}

// 객체를 배열로 변환하는 방법
const objToArray = obj => {
  const arr = []
  for (const key in obj) {
    if(obj.hasOwnProperty(key)) arr.push(key, obj[key])
  }
  return arr;
}
objToArray(o)
//(8) ["name", "namjoon", "age", 28, "gender", "male", "award", true]
// 0: "name"
// 1: "namjoon"
// 2: "age"
// 3: 28
// 4: "gender"
// 5: "male"
// 6: "award"

// 최근에는 entries를 사용해서 객체를 배열로 변환가능.
Object.entries(o)
//(4) [Array(2), Array(2), Array(2), Array(2)]
// 0: (2) ["name", "namjoon"]
// 1: (2) ["age", 28]
// 2: (2) ["gender", "male"]
// 또는 펼치기로
const keys = [...Object.keys(o)]; //(4) ["name", "age", "gender", "award"]
const values = [...Object.values(o)]; //(4) ["namjoon", 28, "male", true]

// map
// [Key, value]의 쌍(pair)로 이루어진 요소들의 집합.
// 순서를 보장하며 iterable하다.
// 키에는 어떤 데이터타입도 저장할 수 있으며, 문자열로 취급하지 않는다.
const map = new Map()
// 추가 set
map.set(1,10) // 1 과 01 둘다 number로 인식.
map.set(01,20) // 1 과 01 둘다 number로 인식. 그래서 앞서 1의 키값에 20의 값이 대입
map.set('1', 30)
map.set({}, 40)
map.set(function () { }, 50)
console.log(map);

// 가저오기 get, 
const map = new Map()
// 초기화를 배열로 초기값 설정을할 수 있는데 set과 마찬가지로 이터러블한 값만 들어올수 있다.
const iterable = [['id', {id:1, lv: 10}],['age', 10],['group', true]]
// const map = new Map(iterable)
const o = {}
map.set('name', 'namjoon')
map.set('age', 28)
map.set('gender', 'male')
map.set('award', true)
map.set(o, 11111)
map.get('name') // "namjoon"
map.get(o) // 1111

// 삭제 delete
map.delete(o)

// has
map.has(o)

//길이 size
map.size

