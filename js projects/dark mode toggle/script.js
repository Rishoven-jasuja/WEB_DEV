// const btn=document.querySelector('.label');
// let curr="white";
// console.log(curr);
// btn.addEventListener("click",()=>{
//     if(curr==="white"){
//         document.body.style.backgroundColor="black";
//         curr="black";

//     }
//     else{
//         document.body.style.backgroundColor="white";
//         curr="white";
//     }
// })

const input=document.querySelector(".input");
// console.log(input.checked);

let body=document.querySelector('body');


function updatebody(){
    if(input.checked){
        body.style.backgroundColor="black";
    }
    else{
          body.style.backgroundColor="white";
    }
}

input.addEventListener('change',()=>{
    updatebody();
    


})
