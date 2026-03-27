const querystring = require('querystring');

function userdatasub(req,resp){
    

    
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
module.exports=userdatasub;