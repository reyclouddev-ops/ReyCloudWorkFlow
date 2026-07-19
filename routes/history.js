const express = require("express");
const fs = require("fs");

const router = express.Router();


const DB =
"./database/deploys.json";



router.get(
"/history",
(req,res)=>{


let data =
JSON.parse(
fs.readFileSync(DB)
);



let user =
req.session.user.github;



let result =
data.filter(
d=>d.user===user
);



res.json({

success:true,

deploys:result

});


});



module.exports=router;
