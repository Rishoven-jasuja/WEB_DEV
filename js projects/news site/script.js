window.addEventListener("DOMContentLoaded"
, () => {
    
 const api_key="9ddcaf03504804bea2dd52671f8455f9";
// const api_key="ed096ee77c5183c9e82d27608616b041";
const container=document.querySelector(".container");


let gen=document.getElementById('gen');
    gen.classList.add('active');


const loader=document.querySelector('.loader');

async function get_news(category="general"){
 
    const url = `https://gnews.io/api/v4/top-headlines?country=in&lang=en&category=${category}&apikey=${api_key}`;


    try{
      container.innerHTML="";
     loader.style.display="block";

const response=await fetch(url);
    const data=await response.json();
  console.log(data.articles);

  
     // clearing previous cards

    data.articles.forEach(news => {
        let card=document.createElement('div');
    card.classList.add('card');

    card.innerHTML=`
                   <img 
    src="${news.image || 'https://via.placeholder.com/400x170'}" 
    alt="${news.title || 'News'}" 
    class="img"
/>


            <h3>${news.title}</h3>
            <p>${news.description || "No description found"}</p>
        
          <a href="${news.url}" target="_blank">
  <button class="btn">Read More</button>
</a>

    `
    container.appendChild(card);

    
setTimeout(() => {
  card.classList.add('show');
}, 50);  
    
    });
    

    


    }
    catch (err) {
    console.error("Error:", err);
  }
  finally {
  setTimeout(() => {
    loader.style.display = "none";
  }, 200);
}
}



 get_news();

let categories=document.querySelector('.navbar ul');
categories.addEventListener("click",(e)=>{

  if (e.target.tagName !== 'LI') return;
  console.log(e);
  categories.querySelectorAll('li').forEach(item => item.classList.remove('active'));
  let category=e.target.textContent.toLowerCase();
  e.target.classList.add('active');
    get_news(category);
 
  
})

const menu=document.querySelector('.menu-button');

//side bar access
const sidebar=document.querySelector('.sidebar');
menu.addEventListener("click",()=>{
sidebar.classList.add('show');
})

// acess close button
const closebtn=document.querySelector('.close-btn');
closebtn.addEventListener("click",()=>{
  sidebar.classList.remove('show');
})

// sidebar resizing part

const drag=document.querySelector('.resize-handle');

let resize=false;

drag.addEventListener("mousedown",()=>{
  resize=true;
})

document.addEventListener("mousemove",(e)=>{
  if(!resize) return;

  else{
    let width=e.clientX;
    if(width>300){
      width=300; // the maxwidth is declared 

    }
    if(width<90){
      sidebar.classList.remove('show');
      resize=false;
      return;
    }
    sidebar.style.width=width+"px";


  }
});

document.addEventListener("mouseup",()=>{
  resize=false;
})


const darkToggle = document.querySelector(".dark-mode-toggle");
const body = document.body;

darkToggle.addEventListener("click", () => {
  body.classList.toggle("dark"); // dark mode colors
  darkToggle.classList.toggle("dark"); // animate icon
});


});


