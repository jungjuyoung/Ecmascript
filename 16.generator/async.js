// 비동기 처리 예시

// userId가 1000번 이후인 데이터를 가져와서 그중에 4번째에 위치한 User 정보를 보고싶다.
const ajaxCalls = () => {
  const res1 = fetch.get('https://api.github.com/users?since=1000');
  const res2 = fetch.get(`https://api.github.com/user/${res1[3].userId}`)
}

const user = ajaxCalls()

// server request 보내고
// server response 온다. 응당시간은 천차만별.
// res1에는 request를 하자마자 바로 결과가 담긴다. 즉, response된 결과가 담기는게 아니라, 불필요한 데이터가 담긴다.

// 비동기 처리 이슈!!

// 대표적인 콜백방식의 비동기 처리 with ajax
$.ajax({
  method: 'GET',
  url: 'https://api.github.com/users?since=1000',
  success: function (res) {
    // 여기서 res로 지지고볶고
    const res2 = fetch.get(`https://api.github.com/user/${res1[3]}`)
  }
})

// Promise방식의 비동기 처리.
fetch.get('https://api.github.com/users?since=1000')
  .then(res => {
   const res2 = fetch.get(`https://api.github.com/user/${res1[3]}`)
})

  // generator방식의 비동기 처리.
  // 사실상 퓨어한 generator로만 서버와의 통신(비동기)하지 못한다.
  // 대부분이 Promise로 구현이 되어있음을 참고.
const fetchWrapper = url => fetch(url)
  .then(res => res.json())

function* getNthUserInfo() {
  const [from, nth] = yield;
  const res1 = yield fetchWrapper(gen, `https://api.github.com/users?since=${from || 0}`);
  const userId = res1[nth - 1 || 0].userId;
  console.log(userId);
  const res2 = yield fetchWrapper(gen, `https://api.github.com/user/${userId}`);
  console.log(res2);
}

const runGenerator = (generator, ...rest) => {
  const gen = generator();
  gen.next();
  gen.next([...rest]).value
    .then(res => gen.next(res).value)
    .then(res => gen.next(res));
}
runGenerator(getNthUserInfo, 1000, 4);
runGenerator(getNthUserInfo, 1000, 6);