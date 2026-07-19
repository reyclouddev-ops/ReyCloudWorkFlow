require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const fs = require("fs");



const authRouter =
require("./routes/auth");

const userRouter =
require("./routes/user");

const deployRouter =
require("./routes/deploy");

const repoRouter =
require("./routes/repo");

const vercelRouter =
require("./routes/vercel");

const statusRouter =
require("./routes/status");

const detectRouter =
require("./routes/detect");


const app = express();




// ======================
// AUTO DATABASE
// ======================


if(!fs.existsSync("./database")){

fs.mkdirSync("./database");

}



if(!fs.existsSync("./database/users.json")){

fs.writeFileSync(

"./database/users.json",

"[]"

);

}



if(!fs.existsSync("./database/deploys.json")){

fs.writeFileSync(

"./database/deploys.json",

"[]"

);

}




// ======================
// MIDDLEWARE
// ======================


app.use(cors());


app.use(
express.json()
);


app.use(
express.urlencoded({

extended:true

})
);





app.use(session({

secret:
process.env.SESSION_SECRET || "reydeploy_secret",


resave:false,


saveUninitialized:false,


cookie:{

maxAge:
1000*60*60*24

}

}));






app.use(
express.static("public")
);







// ======================
// PAGE
// ======================


app.get("/",(req,res)=>{


res.sendFile(

__dirname+
"/public/index.html"

);


});





app.get("/dashboard",(req,res)=>{


res.sendFile(

__dirname+
"/public/dashboard.html"

);


});








// ======================
// ROUTES
// ======================


app.use(

"/auth",

authRouter

);



app.use(

userRouter

);



app.use(

"/deploy",

deployRouter

);



app.use(

"/repo",

repoRouter

);



app.use(

"/vercel",

vercelRouter

);



app.use(

"/vercel",

statusRouter

);


app.use(
"/detect",
detectRouter
);





// ======================
// ERROR HANDLER
// ======================


app.use((err,req,res,next)=>{


console.log(err);



res.status(500).json({

success:false,

message:
"Server Error"

});


});







// ======================
// START
// ======================


const PORT =
process.env.PORT || 3000;



app.listen(

PORT,

()=>{


console.log(

"🚀 ReyDeploy Online : "+
PORT

);


}

);
