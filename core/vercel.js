const axios = require("axios");



// ==========================
// CREATE VERCEL PROJECT
// ==========================

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






// ==========================
// GET ALL DEPLOYMENTS
// ==========================

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







// ==========================
// GET DEPLOYMENT STATUS
// ==========================

async function getDeployment(
token,
id
){


const res =
await axios.get(

`https://api.vercel.com/v13/deployments/${id}`,

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

getDeployments,

getDeployment

};
