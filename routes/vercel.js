const express = require("express");
const fs = require("fs");

const {
    createVercelProject
} = require("../core/vercel");


const router = express.Router();


const DB =
"./database/deploys.json";




// ==========================
// Deploy Vercel
// ==========================


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




if(!projectName || !repo){

return res.json({

success:false,

message:
"Project name dan repo wajib diisi"

});

}





const result =
await createVercelProject(

process.env.VERCEL_TOKEN,

projectName,

repo

);





// =====================
// LOAD HISTORY
// =====================


let history=[];


if(fs.existsSync(DB)){


history =
JSON.parse(

fs.readFileSync(DB)

);


}





// =====================
// SAVE DEPLOY HISTORY
// =====================


history.push({

id:
Date.now(),


user:
req.session.user.github,


project:
projectName,


repo,


deploymentId:
result.id || null,



url:
result.url || null,



status:
"BUILDING",



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
"Deploy berhasil 🚀",


deploymentId:
result.id,


url:
result.url || null,


data:
result


});





}



catch(err){


console.log(

err.response?.data || err

);



res.json({

success:false,

error:
err.message

});


}



});




module.exports=router;
