// literal 이란 문자 그대로
// 기존의 문자열은 줄바꿈을 위해 \n을 썼는데 

var a = 'abc\n' + 
'def'
a

// template literal은 간결하게 multi-line이 가능
var b = `abc
def`
// 이렇게 
function a () {
    return `
<div>
    <h1>Lorem ipsum.</h1>
</div>`
.trim()
}
a()
// template 자체로의 기능은 이게더 맞다.
// 아래같이 따옴표 세고, 변수 에 값 들어간거 확인하고 또 따옴표에 문자 넣고 헷갈리는데 
const a = 10;
const b = 20;
const strBefore = a + '+' + b + '=' + (a + b);
// 이젠 백틱과 백틱 사이에 ${변수} 하면 값이나 식이 올수있다. 문은 안된다. 왜냐 문은 값이 될수 없기 때문에. 값이 될수 있는건 식과 값 뿐이다.
// 문은 값을 반환하지 않는다. 문은 실행하고 끝.
const str = `${a} + ${b}  = ${a + b}`;
str 

// 만약에 $를 스트링으로 포함해야한다면? ${} 앞에 $를 한번더 작성.
const str = `${a} + ${b} = $${a + b}`
str

// 결국은 문자열이 된다. ${변수}의 값이 결국은 문자열이된다

// 중첩된 백틱 처리
console.log(`foo ${`bar`}`);

// template literal 이 등장하게 된 계기
// hadlebars
// mustache
// jsp
// asp
// php
// 이런것들을 template language, template engine, template library 라고 한다.
// 이것들이 하는 일은 HTML tag를 만들어준다.
<div class ="%a%"></div>
<div class ="{{abc}}"></div> //handlebars 의 경우는 이렇게 쓴다. 
var abc = 'aaa';// 이런게 선언 되어있다고 하면
<div class ="{{abc}}"></div> // class에 abc변수의 리턴값이 적용되어 
<div class ="aaa"></div> // class에 aaa가 들어가게된다.
