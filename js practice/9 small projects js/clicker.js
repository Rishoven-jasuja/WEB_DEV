console.log("hello");
const body=document.querySelector('body');
window.addEventListener('mousemove', (e) => {
    console.log(e.clientX, e.clientY);

    const circ=document.createElement('div');
circ.classList.add('circle');

const color=['red','blue','pink','white','green','yellow', 'orange','purple']
circ.style.backgroundColor=color[Math.floor(Math.random()*color.length)]
circ.style.top=`${e.clientY}px`;
circ.style.left=`${e.clientX}px`;
body.append(circ);

circ.textContent="hii";
setTimeout(()=>{
    circ.remove();
},4000)
});




