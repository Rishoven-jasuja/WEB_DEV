const http=require("http");
const fs=require('fs');
const querystring=require('querystring');
http.createServer((req,resp)=>{
if(req.url=="/"){
fs.readFile('Backend/NodeJS/12 calculator/home.html','utf-8',(err,data)=>{ 
    
    if(err){
        resp.writeHead(500,{"content-type":"text/html"});
        return resp.end("internal server error");
        
    }
   resp.writeHead(200,{"content-type":"text/html"});
   return resp.end(data)
    
    })
}

else if(req.url=="/calculator"){
fs.readFile('Backend/NodeJS/12 calculator/calculator.html','utf-8',(err,data)=>{ 
    
    if(err){
        resp.writeHead(500,{"content-type":"text/html"});
        return resp.end("internal server error");
        
    }
   resp.writeHead(200,{"content-type":"text/html"});
   return resp.end(data)
    
    })
}

else if(req.url=="/answer"){
    let databody=[];
    req.on('data',(chunk)=>{
        databody.push(chunk);

    });

    req.on('end',()=>{
        let readdata=Buffer.concat(databody).toString();
        let parseddata=querystring.parse(readdata);
        
        resp.writeHead(200,{"content-type":"text/html"});
        resp.write(`num1 is ${parseddata.firstelem} and num2 is ${parseddata.secondelem} .\n`)

        let num1=parseInt(parseddata.firstelem);
        let num2=parseInt(parseddata.secondelem);
resp.end(`sum of num 1 and num 2 is  ${num1+num2}`);
        
    })


}
}).listen(5100);