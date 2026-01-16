function handleclick(){
    const el=document.getElementById("first");
    el.textContent=" this text is changed using js";
    el.style.backgroundColor="blue";
}

// 1st method inline js

function white(){
    document.body.style.backgroundColor="white";
    document.body.style.color="black";
}

const btn=document.getElementById("darkBtn");
// btn.onclick=white;
//2nd method

btn.addEventListener('click',()=>{
    btn.style.backgroundColor="yellow";
    white();
})

//now we want to change the content of square box when mouse enters
// so we will achieve this by adding event listners on each box using for loop to make it easy

//access the parent first
const parent=document.getElementById("parent"); // this will return an array of its childs

// for (let child of parent.children){
//     child.addEventListener("mouseenter",()=>{
//         child.textContent="this box is clicked";
//         child.style.backgroundColor="black";
//         child.style.color="aqua";
//     })
// }
// still this approach is not optimized so we will learn bubbling 

// now we will apply just event concept on parent

// parent.addEventListener("click",(e)=>{
//     e.target.textContent="i am clicked";
//     e.target.style.backgroundColor="yellow";
//     e.target.style.color="black";
// })

function handleclick(e){
    e.target.textContent="i am clicked";
        e.target.style.backgroundColor="yellow";
    e.target.style.color="black";

    parent.removeEventListener("click",handleclick);

    // this is the way to remove any event listner .so it will disabled after working once.

}

parent.addEventListener("click",handleclick);

