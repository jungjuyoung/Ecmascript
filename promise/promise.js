// Promise
// 비동기를 간편하게 처리할수 있도록 도와주는 오브젝트
// 정해진 장시간의 기능을 수행하고 완료되면 resolve
// 기능을 수행하다 에러를 만나면 reject
// 반드시 resolve 콜백함수나 reject콜백함수중 한개는 반환을 해야함.
// then(), catch()는 언제나 promise를 반환한다.
// 프로미스는 then이나 catch를 태워서 무한정 프로미스 체이닝을해서 계속 사용할 수 있음. 
// 프로미스를 중단시킬 수 없다 라는 한계를 지적받고있는데... 현재로서는 그렇다...

// state: pending(보류) fullfilled(이행) or rejected(거부)
// Producer vs Consumer

// Producer
// when new Promise is created, the executor runs automatically.
// Caution.
// When a new Promise is created, the executor is automatically executed immediately.

const promise = new Promise((resolve, reject) => {
  // doing some heavy work (network, read file)
  console.log('doing something...');
  setTimeout(() => {
    resolve('프로미스 완료');
    // reject(new Error('프로미스 실행중 에러'));
  }, 2000);
});// 이렇게 하면 프로미스 안에 콜백함수가 executor에 의해 즉시 실행되기때문에 유의해야한다.

// Consumer: then, catch, finally
promise
  .then((value) => console.log(value)) // 성공
  .catch((value) => console.log(value)) // 실패
  .finally(() => console.log('끝')); // 성공과 실패 상관없이 무조건

// 재밌는 예제
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('🐓'), 1000);
  });
const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve(`${hen} => 🥚`);
      reject(new Error(`error! ${hen} => 🥚`));
    }, 1000);
  });
const cook = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 🥘`), 1000);
  });

getHen()
  .then(getEgg)
  .catch((err) => {
    return '🥖';
  })
  .then(cook)
  .then(console.log)
  .catch(console.log);

  
// 실행과정
// ** resolve가 먼저 나올경우
const promise = new Promise((resolve, reject) => {
  resolve() //** 
  reject()
  console.log('Promise!');
});

promise.then(() => console.log('then'))
promise.catch(() => console.log('catch'))
console.log('HI');
// "Promise!"
// "HI"
// "then"


// 실행과정
// ** reject가 먼저 나올경우 
const promise = new Promise((resolve, reject) => {
  reject() //** 
  resolve()
  console.log('Promise!');
});

promise.then(() => console.log('then'))
promise.catch(() => console.log('catch'))
console.log('HI');
// "Promise!"
// "HI"
// "catch"

// 1. then이나 catch구문은 실행큐에 후순위로 등록되고 실행된다.
// 2. promise 인스턴스에 넘긴 함수 내부에서는, resolve나 reject 둘 중에 먼저 호출한 것만 실제로 실행된다.
// 3. 사실은 실제로 실행되는게 아니라, 실행은 둘다 되는데, pending상태일 때만 의미가 있기 때문에 2번과 같은 결과가 나온것

new Promise((resolve, reject) => {
  // ... 여기서 어떤 로직을 짜고
  resolve(10)
})

Promise.resolve(10) // 바로 then을 태울수 있게 하려고 할때 이렇게 할 수도 있다.
  .then(res => console.log(res))
  .catch(err => console.log(err)) 
Promise.reject(10) // 바로 then을 태울수 있게 하려고 할때 이렇게 할 수도 있다.
  .then(res => console.log(res)) 
  .catch(err => console.log(err))
  

