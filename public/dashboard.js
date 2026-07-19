let projectFolder=null;




// Load User


async function loadUser(){


let res =
await fetch("/api/user");


let data =
await res.json();



username.innerHTML =
data.username;



github.innerHTML =
data.github || "Belum connect";



status.innerHTML =
data.connected

?
"🟢 Github Connected"

:

"🔴 Github Not Connected";


}



loadUser();





// Load Repo


async function loadRepo(){


let res =
await fetch("/repo/repos");


let data =
await res.json();



repos.innerHTML="";



data.repos.forEach(repo=>{


let option =
document.createElement("option");


option.value =
repo.owner+"/"+repo.name;


option.innerHTML =
repo.name;


repos.appendChild(option);


});


}


loadRepo();






// Upload


file.onchange=upload;



async function upload(){


let form =
new FormData();


form.append(
"file",
file.files[0]
);



let xhr =
new XMLHttpRequest();



xhr.open(
"POST",
"/deploy/upload"
);



xhr.upload.onprogress=e=>{


let persen =
(e.loaded/e.total)*100;


progress.innerHTML =
"Upload "+
persen.toFixed(0)+"%";


};



xhr.onload=()=>{


let data =
JSON.parse(xhr.response);



projectFolder =
data.folder;



progress.innerHTML =
"✅ "+data.totalFile+" File siap";


};



xhr.send(form);


}





// Create Repo


async function createRepo(){


let name =
prompt(
"Nama Repository"
);



await fetch(
"/repo/create",
{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:JSON.stringify({

name

})

});


loadRepo();


}





// Deploy


async function deploy(){


let repo =
repos.value;



let split =
repo.split("/");



let res =
await fetch(
"/deploy/push",
{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:JSON.stringify({

owner:split[0],

repo:split[1]

})

});


let data =
await res.json();


alert(
JSON.stringify(data)
);


}
