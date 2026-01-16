const grandparent=document.getElementById("grandparent");
grandparent.addEventListener("click",()=>{
    console.log("grandparent is clicked")
},true)

const parent=document.getElementById("parent");
parent.addEventListener("click",(e)=>{
    console.log(e.target);
    console.log("parent is clicked")
},true)
const child=document.getElementById("child");
child.addEventListener("click",()=>{
    console.log("child is clicked")
},true)

// Events have 2 phases:
// 1) Capturing → top to target (use true in addEventListener)
// 2) Bubbling  → target to top (default behavior)
// Capturing runs first, bubbling runs after
// event.target = clicked element
// stopPropagation() stops event flow
