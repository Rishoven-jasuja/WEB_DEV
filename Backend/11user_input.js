console.log("🔥 File started");

const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
http.createServer((req, resp) => {

    if(req.url == "/"){
        

     
        fs.readFile('D:/WEB-DEV/Backend/NodeJS/files_text/form.html', 'utf-8', (err, data) => {
            if(err){
                 resp.end("<h1>Internal Server Error</h1>");
            } else {
                resp.writeHead(200, {"Content-Type": "text/html"});
                resp.end(data);
            }
         

        });
    }
     else if(req.url=='/submit'){
           let databody=[];
        req.on('data',(chunk)=>{
            databody.push(chunk);

        });

        req.on("end",()=>{
            const readdata=Buffer.concat(databody).toString();
            const parseddata = querystring.parse(readdata);

            console.log(parseddata);
             resp.writeHead(200, {"Content-Type": "text/html"});
             resp.write('<h1> Data submitted</h1>');
             resp.write(`<h1> user name is ${parseddata.name}</h1>`);

            resp.end(`<h1> user email is ${parseddata.email}</h1>`);
        })
       
       
    }
    else{
        resp.writeHead(404, {"Content-Type": "text/html"});
        resp.end('<h1>Cannot Get Data</h1>');
    }

}).listen(5100, () => {
    console.log("✅ Server running at http://localhost:5100");
});