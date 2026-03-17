const fs=require('fs');
// this is the way of importing core modules which is already built in 
// fs stands for filesystem which can be used for creating ,reading and deleting the files directly from here

// fs.writeFileSync("dummy.txt","this file is created using fs module");

const os=require('os');
console.log(os.platform());
console.log(os.hostname());
