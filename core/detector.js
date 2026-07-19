const fs = require("fs");
const path = require("path");



function detect(folder){


let result = {

framework:"Static HTML",

buildCommand:null,

output:null

};





// ======================
// package.json
// ======================


let pkgFile =
path.join(
folder,
"package.json"
);



if(fs.existsSync(pkgFile)){


let pkg =
JSON.parse(

fs.readFileSync(
pkgFile,
"utf8"
)

);



let dep =
{

...(pkg.dependencies || {}),

...(pkg.devDependencies || {})

};





if(dep.next){


result.framework =
"Next.js";


result.buildCommand =
"npm run build";


result.output =
".next";


}



else if(dep.react){


result.framework =
"React";


result.buildCommand =
"npm run build";


result.output =
"dist";


}



else if(dep.vue){


result.framework =
"Vue.js";


result.buildCommand =
"npm run build";


result.output =
"dist";


}



else{


result.framework =
"Node.js";


result.buildCommand =
"npm start";


}



}





// ======================
// Python
// ======================


if(
fs.existsSync(
path.join(
folder,
"requirements.txt"
)

)

){


result.framework =
"Python";


result.buildCommand =
"pip install -r requirements.txt";

}




return result;


}



module.exports={

detect

};
