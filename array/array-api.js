// 1. make a string out of an array
{
  const fruits = ['apple', 'banana', 'orange'];
  const result = fruits.join('|');
  console.log(result);
}
// 2. make an array out of a string
{
  const fruits = '🍏,🥝,🍌,🍒';
  const result = fruits.split(',');
  console.log(result);
}
// 3. make this array look like this: [5,4,3,2,1]
{
  const array = [1, 2, 3, 4, 5];
  const result = array.reverse();
  console.log(`result: ${result}, array === result: ${array === result}`);
}
// 4. make new array without the first two elements
{
  const array = [1, 2, 3, 4, 5];
  //   const result = array.splice(0, 2);
  const result = array.slice(2);
  console.log(`result: ${result}, array: ${array}`);
}

class Student {
  constructor(name, age, enrolled, score) {
    this.name = name;
    this.age = age;
    this.enrolled = enrolled;
    this.score = score;
  }
}
const students = [
  new Student('A', 29, true, 45), // {name: A, age: 29, enrolled: true, score: 45}
  new Student('B', 28, false, 80), // {name: B, age: 28, enrolled: false, score: 80}
  new Student('C', 30, true, 90), // {name: C, age: 30, enrolled: true, score: 90}
  new Student('D', 40, false, 66), // {name: D, age: 40, enrolled: false, score: 66}
  new Student('E', 18, true, 88), // {name: E, age: 18, enrolled: true, score: 88}
];
// 5. find a student with the score 90
{
  const result = students.find((student) => student.score >= 90);
  console.log(result);
}
// 6. make an array of enrolled students
{
  const result = students.filter((student) => student.enrolled);
  console.log(result);
}
// 7. make an array containing only the student's score
{
  const result = students.map((student) => student.score);
  console.log(result);
}
// 8. check if there is a student with the score lower than 50
{
  const result = students.some((student) => student.score < 50);
  console.log(result);
}
// 9. compute student's average score
{
  let average;
  const result = students.reduce((acc, item, index, array) => {
    console.log('--------------');
    average = acc + item.score;
    console.log(average);
    return index == array.length - 1 ? average / array.length : average;
  }, 0);
  console.log(result);
}
// 10. make a string containing all the scores
{
  const result = students
    .map((student) => student.score)
    .filter((scroe) => scroe > 50)
    .join();
  console.log(result);
}
// Bonus! do 10. sorted in ascending order
{
  const result = students
    .map((student) => student.score)
    .sort((a, b) => a - b)
    .join();
  console.log(result);
}
