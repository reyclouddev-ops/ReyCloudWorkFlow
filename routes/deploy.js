const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const unzipper = require("unzipper");
const Seven = require("node-7z");
const unrar = require("node-unrar-js");

const {
    uploadFile,
    scanFolder
} = require("../core/github");


const router = express.Router();


// Upload config

const upload = multer({

    dest:"uploads/"

});




// =====================
// Upload + Extract Archive
// =====================


router.post(
"/upload",
upload.single("file"),
async(req,res)=>{


try{


const file=req.file;


if(!file){

return res.json({

success:false,

message:"File kosong"

});

}



const ext =
path.extname(
file.originalname
)
.toLowerCase();



const output =
"temp/"+Date.now();



fs.mkdirSync(
output,
{
recursive:true
}
);




// ZIP

if(ext===".zip"){


await fs.createReadStream(
file.path
)

.pipe(
unzipper.Extract({

path:output

})
)
.promise();


}




// 7Z

else if(ext===".7z"){


await new Promise((resolve,reject)=>{


Seven.extract(

file.path,

output,

{

recursive:true

}

)

.on("end",resolve)

.on("error",reject);


});


}





// RAR

else if(ext===".rar"){


const extractor =
await unrar.createExtractorFromFile({

filepath:file.path,

targetPath:output

});


[...extractor.extract()];


}





else{


return res.json({

success:false,

message:
"Format tidak didukung"

});


}





// simpan lokasi extract

req.session.projectFolder =
output;



// scan file

const files =
scanFolder(output);



res.json({

success:true,

message:
"Extract berhasil",

folder:
output,

totalFile:
files.length,

files

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






// =====================
// Push ke GitHub
// =====================


router.post(
"/push",
async(req,res)=>{


try{


if(!req.session.user){

return res.json({

success:false,

message:
"GitHub belum connect"

});

}



const {

owner,

repo

}=req.body;



const folder =
req.session.projectFolder;



if(!folder){

return res.json({

success:false,

message:
"Upload project dulu"

});

}





const files =
scanFolder(folder);



let uploaded=0;



for(
const file of files
){


const result =
await uploadFile(

req.session.user.token,

owner,

repo,

file.local,

file.github

);



if(result)
uploaded++;


}




res.json({

success:true,

message:
"Push berhasil",

uploaded,

total:
files.length

});




}


catch(err){


res.json({

success:false,

error:
err.message

});


}



});




module.exports=router;
