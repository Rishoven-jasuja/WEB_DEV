function addnum(...num){
let sum=0;
for( let key of num){
    sum=sum+key;
}
console.log(sum);
}

addnum(7,5,6,4)

// here we have used rest operator in function as parameter which can help us take multiple inputs

// arrow function

const prod=(...num)=>{
let prod =1;
for(let val of num){
prod=prod*val;
}
return prod;
}

console.log(prod(5,4,2));

// it is used to make the code short when we can even remove the braces and return statement by just using arrow function
const square=(num)=>num*num;

console.log(square(7));

(function greet(){
    console.log("hello rj");
})();

// this is the syntax of immediate callback function it will invoked automatically and immediate after creating it

function hello(){
    console.log("hello !! how are you");

}
function meet(callback){
    console.log("i am going to meet someone");
    callback();
    console.log("i have finished my work");
}
meet(hello);

function one(){
    let a =9;

    function add(){
        a++;
        console.log(a);
    }
    return add;
}

let check=one();
check();
check();

