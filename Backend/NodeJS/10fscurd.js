const fs=require('fs')

// // fs.writeFileSync("Backend/NodeJs/files_text/crud.txt","this is file is created for understanding crud");
//  fs.writeFileSync("Backend/NodeJs/files_text/apple.txt","this is file is created for understanding crud");

//  //now above syntax is used to create the files 

//  // below syntax is for removing the file
//  fs.unlinkSync("Backend/NodeJs/files_text/apple.txt");
//  const data=fs.readFileSync("Backend/NodeJs/files_text/crud.txt","utf-8");
//  console.log(data);

//  // the above code is used to read code from any existing file

// //  fs.appendFileSync("Backend/NodeJs/files_text/crud.txt",",this is will help us to understand the working better");
// // the above code is used to add content in existing file

//   console.log(data);

//   console.log(process.argv);



// now in below code we will see that how we handle crud operations using terminal

const operation=process.argv[2];
const name=process.argv[3];
    
if(operation=='write'){
    const data=process.argv[4]
    fs.writeFileSync(`Backend/NodeJS/files_text/${name}.txt`,data);
}

if(operation=="deletefile"){
    fs.unlinkSync(`Backend/NodeJS/files_text/${name}.txt`);
}

if(operation=="update"){
    const data=process.argv[4]
    fs.appendFileSync(`Backend/NodeJS/files_text/${name}.txt`,data)
}
if(operation=="read"){
    const data=fs.readFileSync(`Backend/NodeJS/files_text/${name}.txt`,"utf-8");
    console.log(data);
}
