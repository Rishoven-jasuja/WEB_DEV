let exp="";
let screen=document.querySelector('.screen');
screen.value=exp;
const btns=document.querySelector('.but-area');
btns.addEventListener("click",(e)=>{

      if(e.target.tagName !== "BUTTON") return;  // ignore clicks outside buttons
    if(e.target.textContent=="="){

        try{
let result=exp.replace(/×/g,"*").replace(/÷/g,"/"); // this will help js to understand symbols of multiply and devide because in keyboard there are diffrent symbols so it will replace them

        exp=eval(result);
        }
        catch{
            screen.value="invalid expression";
            exp="";
            return;
        }
        
    }
    else if(e.target.textContent=="C"){
      exp="";
       
    }
    else if( e.target.textContent=== "⌫"){
    exp = exp.slice(0, -1); // remove last character
}
    else{
        exp=exp+e.target.textContent;

    }

    screen.value = exp;




})