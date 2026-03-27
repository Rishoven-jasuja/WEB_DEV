function userform(req,resp){
    
resp.write(`<form action="/submit" method="post">
   <input type="text" placeholder="enter your name" name="name" />
     <input type="text" placeholder="enter your email" name="email" />
  <button type="submit"> submit </button>
     </form>`);
}
module.exports=userform;