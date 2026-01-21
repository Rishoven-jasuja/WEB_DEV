
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