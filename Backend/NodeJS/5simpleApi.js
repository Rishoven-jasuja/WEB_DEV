const http=require('http');
const userdata=[
    {
    name:'rishu',
    age:'20',
    email:'rj@gmail.com'

},

{
     name:'raj',
    age:'22',
    email:'raj@gmail.com'

    
},

{
      name:'sam',
    age:'28',
    email:'sam@gmail.com'

}


]
http.createServer((req,resp)=>{
    resp.setHeader("Content-Type",'application/json')
resp.write(JSON.stringify(userdata));
resp.end();
}).listen(3100);