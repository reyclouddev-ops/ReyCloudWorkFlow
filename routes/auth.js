const express = require("express");
const axios = require("axios");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const router = express.Router();


const DB = "./database/users.json";


// Login GitHub

router.get("/github", (req,res)=>{


const url =
"https://github.com/login/oauth/authorize"
+
"?client_id="
+process.env.GITHUB_CLIENT_ID
+
"&scope=repo";


res.redirect(url);


});



// Callback

router.get("/github/callback", async(req,res)=>{


try{


const code = req.query.code;



const token = await axios.post(

"https://github.com/login/oauth/access_token",

{

client_id:
process.env.GITHUB_CLIENT_ID,

client_secret:
process.env.GITHUB_CLIENT_SECRET,

code

},

{

headers:{
Accept:"application/json"
}

}

);



const accessToken =
token.data.access_token;



const user = await axios.get(

"https://api.github.com/user",

{

headers:{

Authorization:
`Bearer ${accessToken}`

}

}

);



const githubUser =
user.data;



let users =
JSON.parse(
fs.readFileSync(DB)
);



let data={


id:uuid(),

github:
githubUser.login,


avatar:
githubUser.avatar_url,


token:
accessToken


};



users.push(data);



fs.writeFileSync(

DB,

JSON.stringify(
users,
null,
2
)

);



req.session.user=data;



res.redirect("/dashboard");


}

catch(err){


console.log(err.response?.data || err);


res.send(
"GitHub Login Failed"
);


}


});




module.exports=router;
