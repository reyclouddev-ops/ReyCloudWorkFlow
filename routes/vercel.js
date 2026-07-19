const express = require("express");
const fs = require("fs");

const {
createVercelProject
}=require("../core/vercel");


const router = express.Router();


const DB =
"./database/deploys.json";




// Deploy Vercel

router.post(
"/deploy",
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

projectName,

repo

}=req.body;



const result =
await createVercelProject(

process.env.VERCEL_TOKEN,

projectName,

repo

);





// =====================
// Simpan History
// =====================


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


repo,


url:
result.targets
?
result.targets[0]?.url
:
null,


status:
"success",


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
"Deploy berhasil",

data:
result,


history:true

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
