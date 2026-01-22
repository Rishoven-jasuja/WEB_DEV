const btn=document.getElementById('generate');

function createpassword(){
    const ALL_CHARS =
  "abcdefghijklmnopqrstuvwxyz" +
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
  "0123456789" +
  "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let passtring="";
  
  for(let i=0;i<=14;i++){
    const char=ALL_CHARS[Math.floor(Math.random()*ALL_CHARS.length)];
   
    passtring=passtring+char;
  }
return passtring;
}

let span=document.getElementById('password');
btn.addEventListener("click",()=>{
    let ans=createpassword();
    
    span.textContent=ans;

    let alert=document.querySelector('.alert');
    alert.classList.add('show');
    alert.textContent="password generated";

    setTimeout(() => {
        alert.classList.remove('show')
    }, 2000);

})

const copybtn=document.getElementById('copy');

copybtn.addEventListener("click",()=>{
navigator.clipboard.writeText(span.textContent);

let alert = document.querySelector('.alert');
  alert.classList.add('show');
  alert.textContent = "Password Copied";

  setTimeout(()=>{
    alert.classList.remove('show');
  },2000);
});

