// for문 내에서 const

var obj = {
    prop1: 1,
    prop2: 2,
    prop3: 3
}

for(const prop in obj) {
    console.log(prop);
}
// const는 변수에 참조형 데이터가 오면 참조하는 주소값이 바뀔수 없음
// prop이라는 변수가 prop1을 가르켰다가, prop2를 가르켰다가, prop3을 가르키는것이 for in문에서는 된다.(for of도 된다)
// 특이하게 이것만 된다. for는 안된다.

// prop -> prop1 가르켰다가
// prop -> prop2 가르켰다가
// prop -> prop3 가르켰다가

// 이런 개념이다
{
    let keys = Object.keys(obj); //Object.keys는 obj의 키들을 순회해서 문자열로 배열에 넣는다.
    for(let i = 0; i< keys.length; i++) {
        debugger
        const prop = obj[keys[i]];
        debugger
        console.log(prop)
    }
}

// for 문은 안된다
// const는 변수에 참조형 데이터가 오면 참조하는 주소값이 바뀔수 없음
for (const i = 0; i < 5; i++) { // Assignment to constant variable
    console.log(i);
}