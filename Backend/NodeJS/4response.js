const http=require("http");
let age=29;
http.createServer((req,resp)=>{

    resp.setHeader("Content-Type","text/html");
    resp.write(`
        <html>
        <head>

        <title>
        node learning
        </title>
        <head>

        <body>
        <h1> this is rj </h1>
        <br>
        <h2>`+age+`</h2>
        </html>

        `)
    resp.end()
    process.exit();
}).listen(100);