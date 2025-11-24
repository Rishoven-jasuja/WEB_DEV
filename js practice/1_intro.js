let a="rishu";
console.log(a)

for(let i=1;i<=10;i++){
    console.log(i);
}

let age=17;
if(age==18){
    console.log("the person is 18")
}
else if(age>18){
    console.log("the person is over 18")
}
else{
    console.log("the person is under 18")
}

m=344.456790;
console.log(m.toFixed(3))
z=m.toString();
console.log(z);
console.log(typeof z)
console.log(typeof m)
console.log(Math.ceil(2.3))
console.log(Math.floor(2.3))
console.log(Math.floor(Math.random() * 10))
//otp generation of 4 digits :1000-9999
 console.log(Math.floor(Math.random()*(9999-1000+1)+1000))

 // strings
 let str=`this is the modern way of declaring strings 
 
               because it can also contain spaces in output which we have used`

console.log(str)

let name="rj";
console.log(`my name is ${name}`)

let str1="    hello i am learning js    ";
console.log(str1.length)
console.log(str1.toUpperCase())


console.log(str1.indexOf('lear'))
// this is used to find the occurence of substring
console.log(str1.slice(3,18))
// this method is used to cut the string from any point

console.log(str1.replace("hello","hii"))
// this method is used to replace any substring of the main string but it actually gives a new string in return instead of changing the main string

console.log(str1.trim())

str2="ram,sham,king,om";
console.log(str2.split(","));
// this is the way to split strings diffrently here we are using comma

let date= Date.now();
let time= Date();
console.log(date);
console.log(time)