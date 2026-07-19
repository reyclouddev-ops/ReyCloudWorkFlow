const axios = require("axios");
const fs = require("fs");
const path = require("path");



async function uploadFile(
token,
owner,
repo,
filePath,
githubPath
){



const content =
fs.readFileSync(
filePath
)
.toString("base64");



try{


// cek file sudah ada atau belum

let sha;



try{


const old =
await axios.get(

`https://api.github.com/repos/${owner}/${repo}/contents/${githubPath}`,

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);


sha =
old.data.sha;


}

catch(e){}




await axios.put(

`https://api.github.com/repos/${owner}/${repo}/contents/${githubPath}`,

{

message:
"🚀 Upload from ReyDeploy",

content,

sha

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



return true;



}

catch(err){


console.log(
err.response?.data || err
);


return false;


}



}




// Scan semua file

function scanFolder(
folder,
base=""
){


let files=[];



const list =
fs.readdirSync(
folder
);



for(
const item of list
){


const full =
path.join(
folder,
item
);



const target =
path.join(
base,
item
);



if(
fs.statSync(full).isDirectory()
){


files.push(
...scanFolder(
full,
target
)
);


}

else{


files.push({

local:full,

github:target.replaceAll("\\","/")

});


}


}



return files;


}





module.exports={

uploadFile,

scanFolder

};
