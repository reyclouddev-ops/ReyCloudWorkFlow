const express = require("express");
const fs = require("fs");
const path = require("path");


const {
uploadFile

}=require("../core/github");



const router =
express.Router();





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







router.post(

"/push",

async(req,res)=>{


try{


if(!req.session.user){

return res.json({

success:false,

message:
"Belum login"

});

}




const {

folder,

owner,

repo

}=req.body;





let files =
scanFiles(folder);





for(
let file of files
){


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







res.json({

success:true,

message:

files.length+

" file berhasil upload"

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
