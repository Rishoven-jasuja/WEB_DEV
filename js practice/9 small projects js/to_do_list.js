const form=document.querySelector('form');
const result=document.getElementById('alltask');

const input=document.querySelector('input');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const text=input.value.trim();



    const parent=document.createElement('div');
    parent.style.display="flex";
    parent.style.justifyContent="center";
    parent.style.alignItems="center";
    parent.style.gap="20px";

    const task=document.createElement('span');
    task.textContent=text;
    task.style.marginRight="20px";
    task.style.backgroundColor="cyan";
    task.style.color="purple";
    task.style.height="35px";
    task.style.width="275px";
    task.style.textAlign="center"
    task.style.fontSize="30px";
    task.style.fontWeight="bolder";
    task.style.borderRadius="30px";

    

    const deletebutton=document.createElement('button');
    deletebutton.textContent="Delete";
    deletebutton.style.width="80px";



    const done=document.createElement('button');
    done.textContent="Done";
    done.style.marginRight="10px";
    done.style.width="80px";
    
    parent.append(task,deletebutton,done);
    result.append(parent);

deletebutton.addEventListener("click", () => {
    const confirmDelete = confirm("Delete this task?");
    if (confirmDelete) {
        parent.remove();
    }
});

done.addEventListener("click",()=>{
    task.style.textDecoration="line-through";
    task.textContent=`${task.textContent}`+" task is completed";
})


form.reset();
});





