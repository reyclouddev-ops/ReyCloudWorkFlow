const express = require("express");

const {
getDeployment
}=require("../core/vercel");


const router =
express.Router();



router.get(

"/status/:id",

async(req,res)=>{


try{


if(!req.session.user){

return res.json({

success:false

});

}



const data =
await getDeployment(

process.env.VERCEL_TOKEN,

req.params.id

);



res.json({

success:true,


status:
data.readyState,


url:
data.url

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
