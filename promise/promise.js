// Promise
// 비동기를 간편하게 처리할수 있도록 도와주는 오브젝트
// 정해진 장시간의 기능을 수행하고 완료되면 resolve
// 기능을 수행하다 에러를 만나면 reject

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
});

// Consumer: then, catch, finally
promise
  .then((value) => console.log(value))
  .catch((value) => console.log(value))
  .finally(() => console.log('끝'));

// 재밌는 예제
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('🐓'), 1000);
  });
const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${hen} => 🥚`);
      // reject(new Error(`error! ${hen} => 🥚`));
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
