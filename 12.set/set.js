// 배열안의 중복검사
const a = [1, 2, 3, 4, 5, 4, 3, 2, 1]
const b = a.reduce((a, v) => {
    if(a.includes(v)) return a;
    a.push(v)
    return a;
}, [])
console.log(b); // [1, 2, 3, 4, 5]

// 중복이 허용되지 않음, 순서를 보장.
// 추가, 삭제, 초기화, 요소의 총 개수, 포함여부 확인
const c = new Set(a) // {1, 2, 3, 4, 5}

// 배열에는 push가 있는데 Set은 add
const set = new Set() // 비어있는 Set
// 초기화를 배열로 하면 초기값이 셋팅된 set 생성 괄호안에 배열 뿐만 아니라 이터러블한 모든 개체가 올수있음.
// 대표적으로 이터러블한 개체는 array, string, map, set
// const set = new Set([1, 2, 3, 4, 5, 4, 3, 2, 1])
// Set(5) {1, 2, 3, 4, 5}
set.add(1)
set.add(2)
set.add('3')
set.add(+0) // -0, +0 중복
set.add(-0) // -0, +0 중복
// 총개수
set.size // 4  {1, 2, "3", 0}
// 배열에는 includes라는 메소드로 포함여부를 확인했는데 set에는 has라는 메소드가 있다.
set.has('3') // true
// 배열에서의 삭제는 splice를 해서 배열의 인덱스 값부터 몇개를 삭제 했는데 set에서는 delete메소드를 사용.
set.delete(0) //{1, 2, "3"}
set.clear() // 요소 전부 삭제 Set(0){}

const set = new Set()
set.add(1)
set.add(2)
set.add('3')
set.add(+0) // -0, +0 중복
set.add(-0) // -0, +0 중복
// Set(4) {1, 2, "3", 0}
// entires, keys, values 모두 같은 값 출력.
set.entries() // SetIterator {1 => 1, 2 => 2, "3" => "3", 0 => 0}
set.keys() //SetIterator {1, 2, "3", 0}
set.values() //SetIterator {1, 2, "3", 0}

// 이터러블 하기 때문에 펼칠수 있음.
const ss = new Set([...set]) //Set(4) {1, 2, "3", 0}

// values, keys, entries
const set = new Set([1, 2, 3, 4, 5, 4, 3, 2, 1])
set.forEach(function (key, value, ownerSet) {
 console.log(key, value, this); 
}, {})
console.log(set);// Set(5) {1, 2, 3, 4, 5}
// forEach도 사용할 수 있고 인덱스가 없다 중복을 무시한다는 것 외에 배열과 비슷한 느낌이 있지만
// set[4] 이렇게 접근할 수 없음.
// 인덱스값을 몰라도 되고, set안을 전부 순회하면서 어떤 동작들을 하고싶을때 배열보다 더 빠르게 할수 있다.
// 배열도 순회를 돌면서 어떤 동작을 하는데 set은 그것에 좀더 특화된 것.
// 순서는 보장하지만 인덱스가 없다.. key와 value 값이 같다.
// 1 1 {}
// 2 2 {}
// 3 3 {}
// 4 4 {}
// 5 5 {}

// 이터러블 하니까 배열에 펼치면 배열이 됨.
const set = new Set([1, 2, 3, 4, 5, 4, 3, 2, 1])
console.log(set); // Set(5) { 1, 2, 3, 4, 5 }
console.log([...set]) // (5) [1, 2, 3, 4, 5]

// 실무에서는 이럴때 사용
// 1. 중복제거
// 2. 전체순회할 필요성이 있는 경우
// 3. 값의 유무 판단

// 이럴경우 안됨.
// x) 특정 인덱스에 접근
// x) 인덱스가 필요한 경우
