// async function greet(){
//     return "hello";
// }
// // async function always return promise
// const respond=greet();
// console.log(respond)
// response.then((data1)=>{
//     console.log(data1)
// })

async function git(){

    try{
const response=  await fetch("https://api.github.com/users");
// await is use to let the first task completed by js and not jump to the next line immediately

if(!response.ok){
    throw new Error("data is not found");
}
const data= await response.json();
return data;
    }

    catch(error){
        console.log("error has occurred")
    }
}


git();
// console.log("hello everyone")
// so when we use await inside the async function then firsly all other synchronized tasks are performed then async function will run , so that other tasks will not be freezed

const parent=document.getElementById("parent");

git().then((data)=>{
    for(let i=0;i<data.length;i++){
    const photo=document.createElement('img');

    photo.src=data[i].avatar_url;
    const card=document.createElement('div');
    card.classList.add('card');

    const name=document.createElement('h4');
    name.textContent=data[i].login;


    const url=document.createElement('a');
    url.href=data[i].html_url;
    url.textContent="visit profile";

    url.target = "_blank"; // for opening in new tab
url.rel = "noopener noreferrer";// for security purpose

    card.append(photo,name,url);
    card.style.marginTop="20px";
    parent.append(card);
}
})