const http=require('http');

http.createServer((req,resp)=>{
console.log(req.url);
console.log(req.method);

if(req.url=="/"){
    resp.write("<h1>Home page </h1>")
}
else if(req.url=="/login"){
   resp.write("<h1>login page </h1>")
}
else if(req.url=="/about"){
    resp.write("<h1>about page </h1>")
}
else{
    resp.write("<h1>other page </h1>")
}
resp.end("hello");
}).listen(5100);
