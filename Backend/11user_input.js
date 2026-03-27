console.log("🔥 File started");

const http = require('http');
const fs = require('fs');

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
        resp.writeHead(200, {"Content-Type": "text/html"});
        resp.end('<h1> Data submitted</h1>');
    }
    else{
        resp.writeHead(404, {"Content-Type": "text/html"});
        resp.end('<h1>Cannot Get Data</h1>');
    }

}).listen(5100, () => {
    console.log("✅ Server running at http://localhost:3300");
});