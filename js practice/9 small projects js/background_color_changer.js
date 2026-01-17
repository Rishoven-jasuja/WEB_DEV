const parent=document.getElementById("parent");

parent.addEventListener("click",(e)=>{
   console.log(e.target);
   const backcl=e.target.textContent;
   console.log(backcl);
   document.body.style.backgroundColor=backcl
  
})