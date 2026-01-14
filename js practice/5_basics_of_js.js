const arr=[10,20,30,"hello","hii"];

arr.forEach((val,index,arr)=>{
    console.log(val,index,arr);
})

// thid is for each loop's syntax to traverse on arr 

// filter 
arr1=arr.filter((number)=>number>=20);
console.log(arr1);

arr2=arr.filter((number)=>typeof(number)=="string");
console.log(arr2);

// now we will see how the things are actually working by creating our own methods like filter

// now we will create one method of filter 
arr2=[1,2,3,4,5,6,7,8];
Array.prototype.filtering=function(comp){
    let ans=[];
    for(let key of this){
        if(comp(key)){
            ans.push(key);

        }
    }
    return ans;
}

// now we will use our own filter process


let ans=arr2.filtering((num)=>num<=6);
ans.forEach((num)=>{
    console.log(num);
});

arr3=[1,44,55,6,66,4,44,7,7,4,4,4];
let arr4=arr3.filtering((num)=>num%2==0);
for(key of arr4){
    console.log(key)
}

//  map() ka use hota hai array ke har element ko change (transform) karke
// ek naya array banane ke liye.

// so basically we can perform the operations which need whole array elmenets with same modification but it will return a new array instead of changing original array.

const a=[1,3,5,6,7,77,5];
const newa=a.map((num)=>num*2);
console.log(newa);


let x=a.reduce((accumlator,currentval)=>{
    return accumlator+currentval;
},0);

console.log(`sum of al element of arr is ${x}`);

// reduce is used to get single value by any operation all entries of arr,objects etc,

// set
let b=[1,1,33,22,33,44,4,4,4,46,6,6,6,6,66];
let s=new Set(b);
console.log(s);
s.add(11);
console.log(s);

console.log(s.has(22));
// this is the way of checking that a particular value exists in set or not

s.delete(22);
// this is the way of deleting any element from the set

console.log(s.has(22));

// s.clear();
// console.log(s);
// this is the way of making any set empty

// now we will make an array from set by using spread operator 

let setarr=[...s];
console.log(setarr);


// map data structure like hashing

let m1=new Map([

    ["rj",18],
    ["hello","hiii"],
    ["number",9654321],
    [[12,3,4,5,5,6]]
]);
console.log(m1);

m1.set({name:"rj",age:19},"student");
console.log(m1);