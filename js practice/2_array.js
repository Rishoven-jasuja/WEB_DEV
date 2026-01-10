let arr =[1,3,4,"hello","rj"]
console.log(arr)
arr.push(10)
console.log(arr)
arr.pop();
arr.unshift("added");
console.log(arr)

//iterating of arr by for of loop
for(let num of arr){
    console.log(num)
}
arr2=arr;
arr2.push("same");
console.log(arr2)

console.log(arr.slice(1,4))

//slice is used to get the changed copy while splice is used to change in original array
arr.splice(1,5);
console.log(arr);

let arr5=[1,2,3,3,4];
let arr6=[3,4,55,5,6];
let arr3=arr5.concat(arr6);
console.log(arr3)
// this method is used to combine two different arrays
arr4=[...arr5,...arr6]  // spread operator
console.log(arr4)

console.log(arr4.indexOf(558));
// this will return the index of desired element otherwise -1

console.log(arr4.includes(3));
//this is used to check whether elements is present or not

arr4.sort((a,b)=>a-b);
console.log(arr4);
