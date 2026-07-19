const express = require("express");
const axios = require("axios");

const router = express.Router();



// ======================
// List Repository User
// ======================


router.get(
"/repos",
async(req,res)=>{


try{


if(!req.session.user){

return res.json({

success:false,

message:
"Github belum connect"

});

}



const response =
await axios.get(

"https://api.github.com/user/repos",

{

headers:{

Authorization:
`Bearer ${req.session.user.token}`

},

params:{


per_page:100,

sort:"updated"

}

}

);



const repos =
response.data.map(repo=>({


name:repo.name,

owner:
repo.owner.login,


private:
repo.private,


url:
repo.html_url


}));



res.json({

success:true,

repos

});


}


catch(err){


res.json({

success:false,

error:
err.response?.data

});


}


});
