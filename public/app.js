// ==========================
// LOAD USER
// ==========================

async function loadUser(){


try{


let res =
await fetch("/api/user");


let data =
await res.json();



let username =
document.getElementById("username");


let githubUser =
document.getElementById("githubUser");


let status =
document.getElementById("status");



if(username)
username.innerHTML =
data.username || "Guest";



if(githubUser)
githubUser.innerHTML =
data.github || "Belum Connect";



if(status)
status.innerHTML =
data.connected

?

"🟢 Github Connected"

:

"🔴 Github Not Connected";



let avatar =
document.getElementById("avatar");


if(
avatar &&
data.avatar
){

avatar.src=data.avatar;

}



}

catch(e){

console.log(e);

}


}






// ==========================
// LOGIN TOKEN
// ==========================


async function tokenLogin(){


let token =
prompt(
"Masukkan GitHub Token"
);



if(!token)return;



let res =
await fetch(

"/auth/token",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:JSON.stringify({

token

})

}

);



let data =
await res.json();



if(data.success){


location.href="/dashboard";


}

else{


alert(
"Token GitHub salah"
);


}


}







// ==========================
// LOAD REPOSITORY
// ==========================


async function loadRepo(){


let select =
document.getElementById(
"repos"
);



if(!select)
return;



try{


let res =
await fetch(
"/repo/repos"
);


let data =
await res.json();



select.innerHTML="";



data.repos.forEach(repo=>{


let option =
document.createElement("option");



option.value =
repo.owner+"/"+repo.name;



option.innerHTML =
repo.name;



select.appendChild(option);



});



}

catch(e){

console.log(e);

}


}







// ==========================
// CREATE REPO
// ==========================


async function createRepo(){


let name =
prompt(
"Nama Repository"
);



if(!name)
return;



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

}

);



loadRepo();


}








// ==========================
// UPLOAD PROJECT
// ==========================


async function uploadProject(){


let file =
document.getElementById(
"file"
);



if(!file.files[0])
return alert(
"Pilih file dulu"
);



let form =
new FormData();



form.append(
"file",
file.files[0]
);



let res =
await fetch(

"/deploy/upload",

{

method:"POST",

body:form

}

);



let data =
await res.json();



if(data.success){


alert(

"Extract berhasil : "

+
data.totalFile
+
" file"

);


}

else{


alert(
data.message
);


}


}







// ==========================
// DEPLOY
// ==========================


async function deploy(){


let repo =
document.getElementById(
"repos"
).value;



let projectName =
document.getElementById(
"projectName"
).value;



let res =
await fetch(

"/vercel/deploy",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:JSON.stringify({

projectName,

repo

})

}

);



let data =
await res.json();



if(data.success){


alert(
"Deploy berhasil 🚀"
);


}

else{


alert(
data.message ||
"Deploy gagal"
);


}


}







// ==========================
// START
// ==========================


if(
location.pathname.includes(
"dashboard"
)
){

loadUser();

loadRepo();

}
