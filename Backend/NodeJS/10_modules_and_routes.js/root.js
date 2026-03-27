const http=require('http');
const userform=require('./userform');
const userdatasub=require('./userDatasubmit');


http.createServer((req,resp)=>{
    resp.writeHead(200,{"content-type":"text/html"})
    if(req.url=="/"){

    userform(req,resp);
    }
    else if(req.url=="/submit"){
   userdatasub(req,resp);
    }
    

}).listen(3200);