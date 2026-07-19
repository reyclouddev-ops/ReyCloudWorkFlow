const axios = require("axios");





// ==========================
// CREATE REPOSITORY
// ==========================


async function createRepo(
token,
name
){


const res =
await axios.post(

"https://api.github.com/user/repos",

{

name,

private:false

},

{

headers:{

Authorization:
`Bearer ${token}`,

Accept:
"application/vnd.github+json"

}

}

);



return res.data;


}








// ==========================
// UPLOAD FILE
// ==========================


async function uploadFile(

token,

owner,

repo,

filePath,

content

){



const url =

`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;



const res =
await axios.put(

url,

{

message:
"ReyDeploy upload",


content:

Buffer.from(
content
).toString(
"base64"
)

},

{

headers:{

Authorization:
`Bearer ${token}`,

Accept:
"application/vnd.github+json"

}

}

);



return res.data;


}






module.exports={

createRepo,

uploadFile

};
