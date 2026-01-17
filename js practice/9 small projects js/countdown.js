const result=document.getElementById("result");  
// now we need current date and date of req day


const countdown=function count(){

    const current=Date.now();
 // this is returning a time stap of current time in milliseconds
//January 1, 1970, 00:00:00 UTC (this is called the Unix Epoch).

const req_time=new Date(2026,20,1).getTime();

// this is the time stamp in millisecond to which we want to make countdown

    let diff=req_time-current;
    const day=Math.floor(diff/(1000*60*60*24));

    diff%=1000*60*60*24;
    const hour=Math.floor(diff/(1000*60*60));

    diff%=1000*60*60;

    const minutes=Math.floor(diff/(1000*60));

    diff%=1000*60;
    
    const seconds=Math.floor(diff/(1000));

    diff%=1000;

    result.textContent=`days: ${day} hour: ${hour} minutes: ${minutes} seconds: ${seconds}`
}
setInterval(countdown,1000);