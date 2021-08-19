// async & await
// clear style of using promise

// 기존의 promise
const res = () => {
    return new Promise((resolve, reject) => {
        resolve('...통신성공')
    })
}
const resolvePromise = res();
resolvePromise.then(console.log);

const rej = () => {
    return new Promise((resolve, reject) => {
        reject('...통신실패')
    })
}
const rejectPromise = rej();
rejectPromise.then(console.log)

// 프로미스를 좀더 간결하게 만들 수 있는 async 
// async
async function fetchUser() {
  // do network request in 10 sec...
  return 'understanding for async and await...';
}

const user = fetchUser();
user.then(console.log);

// await ✨
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(1000);
  return '🍎';
}
async function getBanana() {
  await delay(2000);
  return '🍌';
}
// 콜백지옥같은...
// function pickFruits() {
//   return getApple()
//     .then(apple => {
//       return getBanana().then(banana => `apple: ${apple}, banana: ${banana}`)
//     })
// }
// pickFruits().then(console.log) // 3초뒤에 apple: 🍎, banana: 🍌

// await ✨
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(1000);
  // 만약 받아오는데 문제가 생겼다 하면 에러처리를 **error
  throw 'error'; // **error
  return '🍎';
}
async function getBanana() {
  await delay(2000);
  return '🍌';
}
async function pickFruits() {
  // ** error처리를 위해 try catch 구문 안에 작성.
  const apple = await getApple();
  const banana = await getBanana();
  return `apple: ${apple}, banana: ${banana}`
}
pickFruits().then(console.log)

// 바나나와 애플은 받아오는데 서로 연관이 없기 때문에 에플을 다 받아온 다음에 바나나를 받아올 필요없음.
// 그럴때 병렬로 처리되도록 아래와 같이 작성.
async function pickFruits() {
  try {
    const applePromise = getApple(); // 프로미스는 작성하면 즉시 실행, 프로미스 실행시킴.
    const bananaPromise = getBanana(); // 프로미스는 작성하면 즉시 실행, 프로미스 실행시킴.
    const apple = await applePromise; // 그다음 applePromise값이 전달될 때 까지 기다림.
    const banana = await bananaPromise; // 그다음 bananaPromise값이 전달될 때 까지 기다림.
    return `${apple} + ${banana}`;
  } catch {
    return new Error('picking fruits something problem...');
  }
}
pickFruits().then(console.log);

// 병렬처리 할때 위와같이 더럽게 코드를 짜지 않고, 미리 준비된 Promise APIs을 이용한다.
// ⭐️ really usefull Promise All APIs
// 모두 따오면 출력.
function pickAllFruits() {
  try {
    return Promise.all([getApple(), getBanana()]).then((fruits) =>
      fruits.join(' + ')
    );
  } catch (err) {
    return new Error('picking fruits something problem...');
  }
}

pickAllFruits().then(console.log).catch(console.log);

// ⭐️ really usefull Promise race APIs
// 먼저 따와지는것을 먼저 출력
function pickOnlyOne() {
  try {
    return Promise.race([getApple(), getBanana()]);
  } catch {
    return new Error('picking only one fruits something problem... ');
  }
}
pickOnlyOne().then(console.log);
