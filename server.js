require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const authRouter =
require("./routes/auth");

const userRouter =
require("./routes/user");


const app = express();


app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));


app.use(session({

    secret:process.env.SESSION_SECRET,

    resave:false,

    saveUninitialized:false

}));


app.use(express.static("public"));



app.get("/",(req,res)=>{

    res.sendFile(
        __dirname+"/public/index.html"
    );

});


app.get("/dashboard",(req,res)=>{

    res.sendFile(
        __dirname+"/public/dashboard.html"
    );

});

app.use(
"/auth",
authRouter
);

app.use(
userRouter
);

app.listen(
    process.env.PORT,
    ()=>{

console.log(
"🚀 ReyDeploy Online : "+
process.env.PORT
);

});
