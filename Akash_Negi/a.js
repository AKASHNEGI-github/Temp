
/*let,var,const
var c = 300;
if(true)
{
  let a = 10;
  const b = 20;
  var c = 30;
  d = 40;
}
console.log(a); // ReferenceError: a is not defined
console.log(b); // ReferenceError: b is not defined
console.log(c); // 30
console.log(d); // 40
*/

/* Scope
console.log(addOne(5)); // 6
function addOne(num){
  return (num + 1);
}

console.log(addTwo(5)); // ReferenceError: Cannot access 'addTwo' before initialization
const addTwo = function(num){
  return (num + 2);
}
*/

/* Arrow Function
const addTwo = (num1 , num2) => {
  return (num1 + num2);
}
console.log(addTwo(2,3)); // 5

const addTwo = (num1 , num2) => num1 + num2;
console.log(addTwo(2,3)); // 5

const addTwo = (num1 , num2) => (num1 + num2);
console.log(addTwo(2,3)); // 5

const addTwo = (num1 , num2) => {num1 + num2};
console.log(addTwo(2,3)); // undefined

const addTwo = (num1 , num2) => {name : "Akash"};
console.log(addTwo(2,3)); // undefined

const addTwo = (num1 , num2) => ({name : "Akash"}); 
console.log(addTwo(2,3)); // { name: 'Akash' }
*/

/*IIFE
(function print(){
  console.log("Akash Negi");
})();

(() => {
  console.log("Akash");
})(); // Akash

((name) => {
  console.log(`Name : ${name}`);
})("Akash"); // Name : Akash
*/

/* This
const student = {
  name : "Akash",
  printName : function(){
    console.log(`Name : ${this.name}`);
  }
}
student.printName(); // Name : Akash

const student = {
  name : "Akash",
  printName : function(){
    console.log(this);
  }
}
student.printName(); // { name: 'Akash', printName: [Function: printName] }

console.log(this); // {}
console.log(this); // window(Object)

function print(){
  console.log(this); // Object [global]
}
print();

function print(){
  let name = "Akash";
  console.log(this.name); // undefined
}
print();
*/

/* Lexical Scope
function outer(){
  let outerVar = "Outer Variable";
  console.log(outerVar); // Outer Variable

  function innerOne(){
    let innerOneVar = "Inner Variable One";
    console.log(outerVar); // Outer Variable
  }

  function innerTwo(){
    let innerTwoVar = "Inner Variable One";
    console.log(innerOneVar); // ReferenceError: innerOneVar is not defined
  }

  innerOne();
  innerTwo();
}
outer();
console.log(outerVar); // ReferenceError: outerVar is not defined
*/

/* Closure
function outer(){
  const name = "Outer Function";
  function displayName(){
    console.log(name);
  }
  return displayName;
}
const call = outer();
call(); // Outer Function
*/



