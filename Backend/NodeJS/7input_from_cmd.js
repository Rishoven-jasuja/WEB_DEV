const http=require('http')

const arg=process.argv;
http.createServer((req,resp)=>{

    for(let i=2;i<arg.length;i++){
        resp.write(`${arg[i]}`);
    }

resp.end();
}).listen(4000);

