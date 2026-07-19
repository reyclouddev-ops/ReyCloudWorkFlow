const express = require("express");

const {
detect
}=require("../core/detector");


const router =
express.Router();




router.post(

"/detect",

(req,res)=>{


try{


const folder =
req.body.folder;



const result =
detect(folder);



res.json({

success:true,

data:result

});



}


catch(err){


res.json({

success:false,

error:
err.message

});


}


}

);



module.exports=router;
