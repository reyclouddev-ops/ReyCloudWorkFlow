const express = require("express");

const {
createVercelProject
}=require("../core/vercel");


const router = express.Router();



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





res.json({

success:true,

message:
"Deploy berhasil",

data:
result

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
