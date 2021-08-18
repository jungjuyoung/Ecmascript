// async & await
// clear style of using promise

// async
async function fetchUser() {
  // do network request in 10 sec...
  return 'BTS';
}

// const user = fetchUser();
// user.then(console.log);
// console.log(user);

// await
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

// async function pickFruits() {
//   try {
//     const applePromise = getApple();
//     const bananaPromise = getBanana();
//     const apple = await applePromise;
//     const banana = await bananaPromise;
//     return `${apple} + ${banana}`;
//   } catch {
//     return new Error('picking fruits something problem...');
//   }
// }
// pickFruits().then(console.log);

// ⭐️really usefull Promise APIs
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

function pickOnlyOne() {
  try {
    return Promise.race([getApple(), getBanana()]);
  } catch {
    return new Error('picking only one fruits something problem... ');
  }
}
// pickOnlyOne().then(console.log);
