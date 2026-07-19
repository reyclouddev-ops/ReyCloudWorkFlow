const axios = require("axios");


async function createVercelProject(
token,
name,
repo
){


try{


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

catch(err){


console.log(
err.response?.data || err
);


throw err;


}


}



module.exports={
createVercelProject
};
