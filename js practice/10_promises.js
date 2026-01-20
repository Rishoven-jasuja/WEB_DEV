console.log("hello world start");


// const p1=fetch("https://api.github.com/users");


// // fullfilled or rejected 
// const p2=p1.then((response)=>{
//     // console.log(response); // it will return us data in bits form not in readable form so we have to convert in some readable format like json
//     return response.json();
// })

// p2.then((data)=>{
//     console.log(data);
// })


console.log("end");

fetch("https://api.github.com/users")
.then((response)=>{

    if(!response.ok){
        // this condition is used when data is not fetched from the server due to any reason . so we have to create an error so that catch block will work
      throw new Error("data is not fetched from the server"); 
    } 
    return response.json();
})
.then((data)=>{
    // console.log(data);
    const parent=document.getElementById("parent");

    for(let i=0;i<data.length;i++){

        const img=document.createElement('img');
    img.src=data[i].avatar_url;
    parent.append(img);
    img.style.height="200px";
     img.style.width="200px";
    }
    
})
.catch((error)=>{
    const parent=document.getElementById('parent');
    parent.textContent=error.message;
})

// we can convert js object in json format
const o1={
    name:"rishoven",
    age:20,
    cgpa :9

}
const j1=JSON.stringify(o1);
console.log(j1);

// now we can also convert json to js object using:
const o2=JSON.parse(j1);
console.log(o2);

//now we will understand how a new promise is created

const pr1=new Promise((resolve,reject)=>{
    resolve("hello");
})
pr1.then((response)=>{
   
    console.log(pr1);
})
.catch((error)=>{
    console.log(error)
})







