const btn=document.getElementById('button');
btn.addEventListener("mousemove",(e)=>{
  console.log(e.clientX,e.clientY)

let circ=document.createElement('div');
circ.classList.add('circle');
circ.style.position="absolute";
circ.style.top=`${e.offsetY}px`;
circ.style.left=`${e.offsetX}px`;

btn.append(circ);
setTimeout(()=>{
    circ.remove();
},1500);
})