console.log("hii everyone");
const newEl =document.createElement("h2");
newEl.textContent="india won the match";
newEl.id="second";
const prevEl=document.getElementById("first");
prevEl.after(newEl);

// this is the way of creating and adding a particular element after one particular element

const el2=document.createElement("span");
el2.textContent="i am learning js from coder army ";
el2.style.backgroundColor="aqua";
newEl.after(el2);
el2.style.color="red";
el2.className="learn";
// this is used to assign one class to the element 
//but if we have to assign multiple classes to the element by usign below method
el2.className +=" code";
// if we dont want to use above method then we have one more method for this

el2.classList.add("hii");



console.log(el2);
el2.style.fontSize="35px";
console.log("script completed");

// we can also add any element before any particular element 
prevEl.before(el2);

console.log(el2.getAttribute("class"));
console.log(newEl.getAttribute("id"));

const list=document.createElement("li");
list.textContent="mango";
const unlist=document.querySelector("ul");
unlist.append(list);


const list1=document.createElement("li");
list1.textContent="apple";
unlist.append(list1);
// this is the way of adding in element inside the another element at last

const list2=document.createElement("li");
list2.textContent="bannana";
unlist.prepend(list2);
// it is used to insert element at front

const list3=document.createElement("li");
list3.textContent="grapes";
list1.before(list3);

let arr=[1,2,3,43,5,55,55,645,434,];
let oli=document.getElementById("olist");
const fragmemt=document.createDocumentFragment();
for(let el of arr){
    let li=document.createElement("li");
    li.textContent=el;
    // oli.append(li);
    // if we use append here then it will disturb the ui again and again which is not suitable
    fragmemt.append(li);
    // so we will append these items in fragment and then append whole fragment in list in only one go 
}
oli.append(fragmemt);


// now we will see how to delete a particular element from html using js and dom

// access that element first
let string=document.querySelector("#para")
string.remove();

console.log("js loaded success");