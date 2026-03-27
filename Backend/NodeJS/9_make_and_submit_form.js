// const http=require('http');
// http.createServer((req,resp)=>{
//     resp.writeHead(200,{"content-type":"text/html"});

//     if(req.url=="/"){
//         resp.write(`
//     <form action="/submit" method="post">
//     <input type="text" placeholder="enter your name" name="name" />
//     <input type="text" placeholder="enter your email" name="email" />
//     <button> submit </button>
//     </form>

//     `);
//     }

//     else if(req.url=="/submit"){
//   resp.write('<h1>data is submitted successfully</h1>')
//     }
// resp.end();
// }).listen(3200);


// above code is for using html in same file

const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

http.createServer((req, resp) => {

    if (req.url === "/" && req.method === "GET") {

        fs.readFile('form.html', 'utf-8', (err, data) => {
            if (err) {
                resp.writeHead(500, { "content-type": "text/html" });
                resp.end('<h1> internal server error</h1>');
            } else {
                resp.writeHead(200, { "content-type": "text/html" });
                resp.end(data);
            }
        });

    } 
    else if (req.url === "/submit" && req.method === "POST") {

        let databody = [];

        req.on('data', (chunk) => {
            databody.push(chunk);
        });

        req.on('end', () => {
            let rawdata = Buffer.concat(databody).toString();
            let readabledata = querystring.parse(rawdata);

            resp.writeHead(200, { "content-type": "text/html" });
            resp.end(`<h1> username is ${readabledata.name} and email is ${readabledata.email}</h1>`);
        });

    }

}).listen(3200);