// Javascript 는 동기적입니다.
// 호이스팅이 완료된 이후 부터는 위에서 아래로 한줄 한줄 코드를 읽어 내려오면서
// 동기적으로 인터프리터 하는 언어입니다.

// 동기 synchronous
// hoisting: var,let, const, function등 선언문들이(declaration) 위로 끌어올려지는것
// (단 let,const는 TDZ라는 새로운 영역에 갇혀서 할당문을 만나기 전까지 접근할수 없음)

// 비동기 Asynchronous
console.log(1);
setTimeout(() => {
  console.log(2);
}, 2000);
console.log(3);

// ⭐️callback함수는
// 즉각적으로 동기로 호출되는 synchronous callback함수가 있고
function printImmediatetly(print) {
  print();
}
printImmediatetly(() => console.log('Hello'));

// Asynchronous로 비동기로 호출되는 callback함수가 있다.
function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}
printWithDelay(() => console.log('Asynchronous로 Callback'), 1000);
