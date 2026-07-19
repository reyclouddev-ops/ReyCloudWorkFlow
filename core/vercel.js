const axios = require("axios");


async function createVercelProject(
token,
name,
repo
){


const response =
await axios.post(

"https://api.vercel.com/v10/projects",

{

name,

gitRepository:{

type:"github",

repo

}

},

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);



return response.data;

}




async function getDeployments(
token
){


const res =
await axios.get(

"https://api.vercel.com/v6/deployments",

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);



return res.data;


}



module.exports={

createVercelProject,

getDeployments

};
