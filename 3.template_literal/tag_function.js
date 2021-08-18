const tag = function (strs, arg1, arg2) {
  return { strs: strs, args: [arg1, arg2]}
}
const res = tag`허공을 떠도는 작은 ${1}, 먼지 처럼 ${2}`
console.log(res);