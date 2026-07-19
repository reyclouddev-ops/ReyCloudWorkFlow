const fs = require("fs");


function detect(folder){


let result="Static HTML";



if(
fs.existsSync(
folder+"/package.json"
)

){


const pkg =
JSON.parse(

fs.readFileSync(
folder+"/package.json"
)

);



if(pkg.dependencies){


if(pkg.dependencies.next){

result="Next.js";

}

else if(pkg.dependencies.react){

result="React";

}

else{

result="Node.js";

}


}



}



else if(

fs.existsSync(
folder+"/requirements.txt"

)

){

result="Python";

}



return result;


}



module.exports={
detect
};
