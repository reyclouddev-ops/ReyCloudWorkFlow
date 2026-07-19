const express = require("express");
const axios = require("axios");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const router = express.Router();

const DB = "./database/users.json";


// =========================
// Login GitHub OAuth
// =========================

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




// =========================
// Callback GitHub
// =========================

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



// cek user sudah ada

let oldUser =
users.find(
u=>u.github===githubUser.login
);



let data;



if(oldUser){


data=oldUser;


data.token=accessToken;


}

else{


data={


id:uuid(),

github:
githubUser.login,


avatar:
githubUser.avatar_url,


token:
accessToken


};



users.push(data);



}




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


console.log(
err.response?.data || err
);


res.send(
"GitHub Login Failed"
);


}


});





// =========================
// Login Pakai Token GitHub
// =========================


router.post("/token", async(req,res)=>{


try{


const token=req.body.token;



const user =
await axios.get(

"https://api.github.com/user",

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);



const githubUser=user.data;



let users =
JSON.parse(
fs.readFileSync(DB)
);



let oldUser =
users.find(
u=>u.github===githubUser.login
);



let data;



if(oldUser){


data=oldUser;


data.token=token;


}

else{


data={


id:uuid(),

github:
githubUser.login,


avatar:
githubUser.avatar_url,


token


};


users.push(data);


}




fs.writeFileSync(

DB,

JSON.stringify(
users,
null,
2
)

);



req.session.user=data;



res.json({

success:true,

username:
githubUser.login

});


}



catch(err){


res.json({

success:false,

message:
"Token GitHub tidak valid"

});


}


});





// =========================
// Logout
// =========================

router.get("/logout",(req,res)=>{


req.session.destroy(()=>{


res.redirect("/");


});


});





module.exports=router;
