const OBJ = {
	prop1: 1,
	prop2: 2,
}
OBJ = 10 // Assignment to constant variable.
OBJ.prop1 = 10 // 된다.
console.log(OBJ)

Object.freeze(OBJ)
OBJ.prop1 = 1 // 에러는 없지만 실제로 OBJ를 출력해보면 값이 바뀌지 않는다!

const OBJ = {
	prop1: [
		1,
		2,
		3,
	],
	prop2: 2,
}
// OBJ.prop1[0] = 10 된다. prop1에 들어있는 []은 참조형이기 때문에
