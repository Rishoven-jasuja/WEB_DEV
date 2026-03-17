const http = require('http');

http.createServer((req, resp) => {
  resp.write("hi server is started , now with nodemon ,");
  resp.end("hello this is response from 3000");
}).listen(3000);

console.log("Server running at http://localhost:3000/");

// nodemon package is used when we want to reflect changes made in this file automatically without this we need to restart the server every time


// this is the example of two servers in one file


http.createServer((req, resp) => {
  resp.write("example of second server in same file ,")
  resp.write("hi server is started , now with nodemon ,");
  resp.end("hello this is response from 5000");
}).listen(5000);

console.log("Server running at http://localhost:5000/");