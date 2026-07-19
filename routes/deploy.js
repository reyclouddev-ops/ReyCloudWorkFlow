const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const unzipper = require("unzipper");
const Seven = require("node-7z");
const unrar = require("node-unrar-js");


const router = express.Router();



// Upload config

const upload = multer({

dest:"uploads/"

});




// =====================
// Upload Archive
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





// =====================
// ZIP
// =====================


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




// =====================
// 7Z
// =====================


else if(ext===".7z"){



Seven.extract(

file.path,

output,

{recursive:true}

);



}




// =====================
// RAR
// =====================


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





res.json({

success:true,

message:
"Extract berhasil",

folder:
output

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
