// es5에서 나머지 파라미터 처럼 쓰려면 이렇게 해야했는데 
function foo(a, b) {
    var rest = Array.prototype.slice.call(arguments, 2)
    console.log(rest);
}
foo(10, 20, true, null, undefined, 10)

// es6에서는 rest parameer 나머지 parameter 이렇게
function foo(a, b, ...z) {
    console.log(z); // 유사배열 객체가 아니라 진짜 배열!!
}
foo(10, 20, true, null, undefined, 10)

// arguments의 기능을 완전히 대체하려면 이렇게 통으로 받아옴
function foo(...z) {
    console.log(z); // 전부다 나머지로 받아들이겠다.
}
foo(10, 20, true, null, undefined, 10)

// rest parameter 주의 할점!!
// 나머지이기 때문에 맨 마지막에 들어와야 한다.
// 한번만 들어와야 한다.
function foo(a, ...z, b) { // SyntaxError: rest parameter must be last formal parameter
    console.log(z); 
}
foo(10, 20, true, null, undefined, 10)

// 객체에서 getter, setter
// 객체의 setter: obj.a = 10 하면 setter가 발동해서 obj.a가 10으로 바뀌고
// 객체의 getter: obj.a 하면 getter가 발동해서 10을 가져올꺼고
// 실제 obj에는 {_a: 10} 1개밖에 없음
// 객체는 하나의 포로퍼티 키에는 하나의 밸류만 매칭 시킬수 있다.
// 배열이든 객체든 하나의 통을 넣을수 밖에 없다.
// 그래서 setter에는 여러개를 받는데 불가능하다. 그래서 나머지 파라미터를 받을수 없다
const obj = {
    _a : 'a',
    get a () {return this._a},
    set a (v) {this._a = v;} 
}
const obj = {
    _a : 'a',
    get a () {return this._a},
    set a (...v) {this._a = v;} // Setter function argument must not be a rest paramter
}
obj.a = 10;
console.log(obj.a);