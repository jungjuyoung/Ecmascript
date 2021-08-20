const delay = ms => new Promise((resolve, reject) => setTimeout(resolve, ms));

const getHen = async () => {
  await delay(1000)
  return '🐓'
}

const getEgg = async () => {
  await delay(2000)
  return '🥚'
}

const cook = async () => {
  await delay(1000)
  return '🥘'
}

// 직렬처리 async await 연습
const food = async () => {
 try {
  const Hen = await getHen(); 
  const Egg = await getEgg();
  const Food = await cook();
  return `${Hen} => ${Egg} => ${Food}`
 } catch (error) {
   console.log(error);
 }
}
food().then(console.log)