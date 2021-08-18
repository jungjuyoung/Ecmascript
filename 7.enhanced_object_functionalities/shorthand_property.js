// enhanced object functionalities 객체의 향상된 기능들
// shorthand property 프로퍼티 축약

// 프로퍼티의 key 와 value에 할당 할 변수명이 동일한 경우 value 생략 가능해짐
var x = 10;
var y = 20;
const obj = {
    x: x,
    y: y
}
// es6 에서 이렇게 간단해짐.
const x = 10;
const y = 20
const obj = {
    x,
    y
}

const convertExtension = (fullFileName) => {
    const fullFileNameArr = fullFileName.split('.');
    const filename = fullFileNameArr[0];
    const ext = fullFileNameArr[1] && fullFileNameArr[1] === 'png' ? 'jpg' : 'gif';
    return {
        filename,
        ext
    }
}
convertExtension('abc.png'); // {filename: 'abc', ext: 'jpg'}

// name에 '주영'을 넣고 age에 30을 name을 name이랑 매칭, age를 age에 매칭해서 할당
const {
    name,
    age
} = {
    name: '주영',
    age: 30
}
console.log(name, age) // '주영', 30