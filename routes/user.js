const express = require("express");
const axios = require("axios");
const fs = require("fs");

const router = express.Router();

const DB = "./database/users.json";


// Dashboard ambil data user

router.get("/api/user",(req,res)=>{


if(!req.session.user){

return res.json({

username:"Guest",

github:null,

connected:false

});

}



res.json({

username:req.session.user.github,

github:req.session.user.github,

avatar:req.session.user.avatar,

connected:true

});


});



module.exports = router;
