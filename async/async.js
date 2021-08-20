// async & await
// clear style of using promise

// 기존의 promise
/* const res = new Promise((resolve, reject) => {
  console.log('doing something...');
  setTimeout(() => resolve('통신성공'), 1000);
})*/ // 이렇게 하면 즉시실행 되버림.

const res = () => new Promise((resolve, reject) => {
  console.log('doing something...');
  setTimeout(() => resolve('통신성공'), 1000);
}) // 함수로 감싸서 즉시실행되는것을 막고.

res().then(console.log);

const rej = () => {
  return new Promise((resolve, reject) => {
    console.log('doing something...');
    setTimeout(() =>reject('...통신실패'), 1000)
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
const delay = ms => new Promise((resolve) => setTimeout(resolve, ms));

const getApple = async () => {
  await delay(1000);
  return '🍎';
}
const getBanana = async () => {
  await delay(2000);
  return '🍌';
}

// await ✨
const delay = ms => new Promise((resolve) => setTimeout(resolve, ms));

const getApple = async () => {
  await delay(1000);
  // 만약 받아오는데 문제가 생겼다 하면 에러처리를 **error
  // throw 'error'; // **error
  return '🍎';
}
const getBanana = async () => {
  await delay(2000);
  return '🍌';
}

const pickFruits = async () => {
  // ** error처리를 위해 try catch 구문 안에 작성.
  try {
    const apple = await getApple();
    const banana = await getBanana();
    return `apple: ${apple}, banana: ${banana}`
  } catch (error) {
    console.error(error);
  }
}
pickFruits().then(console.log)

// 바나나와 애플은 받아오는데 서로 연관이 없기 때문에 에플을 다 받아온 다음에 바나나를 받아올 필요없음.
// 그럴때 병렬로 처리되도록 아래와 같이 작성.
// 병렬처리.
async function pickFruits() {
  try {
    const applePromise = getApple(); // 프로미스는 만들면 즉시실행, 프로미스 실행시킴.
    const bananaPromise = getBanana(); // 프로미스는 만들면 즉시실행, 프로미스 실행시킴.
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
function pickAllFruits() {// 모두 따오면 출력.
  try {
    return Promise.all([getApple(), getBanana()]).then(fruits =>
      fruits.join(' + ')
    );
  } catch (err) {
    return new Error('picking fruits something problem...');
  }
}
pickAllFruits().then(console.log)

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
