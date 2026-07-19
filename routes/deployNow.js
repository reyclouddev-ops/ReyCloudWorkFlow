const express = require("express");
const fs = require("fs");
const path = require("path");


const {
uploadFile
}=require("../core/github");


const {
createVercelProject
}=require("../core/vercel");



const router =
express.Router();



const DB =
"./database/deploys.json";




// Scan File

function scanFiles(dir){


let files=[];


fs.readdirSync(dir)
.forEach(file=>{


let full =
path.join(
dir,
file
);


if(
fs.statSync(full)
.isDirectory()
){


files =
files.concat(
scanFiles(full)
);


}

else{


files.push(full);


}


});


return files;


}






// ======================
// DEPLOY NOW
// ======================


router.post(

"/now",

async(req,res)=>{


try{


if(!req.session.user){


return res.json({

success:false,

message:
"Github belum connect"

});


}




const {

folder,

owner,

repo,

projectName

}=req.body;





// ======================
// PUSH GITHUB
// ======================


let files =
scanFiles(folder);



for(let file of files){


let relative =
path.relative(

folder,

file

)
.replaceAll("\\","/");



await uploadFile(

req.session.user.token,

owner,

repo,

relative,

fs.readFileSync(file)

);


}







// ======================
// DEPLOY VERCEL
// ======================


const vercel =
await createVercelProject(

process.env.VERCEL_TOKEN,

projectName,

owner+"/"+repo

);







// ======================
// HISTORY
// ======================


let history=[];


if(fs.existsSync(DB)){


history =
JSON.parse(
fs.readFileSync(DB)
);


}




history.push({

id:
Date.now(),

user:
req.session.user.github,

project:
projectName,

repo:
owner+"/"+repo,

deploymentId:
vercel.id,


url:
vercel.url || null,


status:
"SUCCESS",


date:
new Date()

});





fs.writeFileSync(

DB,

JSON.stringify(
history,
null,
2
)

);







res.json({

success:true,

message:
"Deploy selesai 🚀",

url:
vercel.url


});





}


catch(err){


console.log(err);



res.json({

success:false,

error:
err.message

});


}



});





module.exports=router;
