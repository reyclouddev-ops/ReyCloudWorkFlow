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


async function detectProject(folder){


let res =
await fetch(

"/detect",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:JSON.stringify({

folder

})

}

);



let data =
await res.json();



if(data.success){


alert(

"Framework : "

+
data.data.framework

+
"\nBuild : "

+
(data.data.buildCommand || "-")

);


}


}




// ==========================
// LOAD REPOSITORY
// ==========================


async function loadRepo(){


let select =
document.getElementById("repos");



if(!select)
return;



try{


let res =
await fetch("/repo/repos");


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



let res =
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



let data =
await res.json();



if(data.success){

alert(
"Repository dibuat 🚀"
);

loadRepo();

}

}








// ==========================
// UPLOAD PROJECT
// ==========================


let projectFolder=null;



async function uploadProject(){


let input =
document.getElementById("file");



if(!input.files[0]){

return alert(
"Pilih file dulu"
);

}



let form =
new FormData();



form.append(

"file",

input.files[0]

);




let status =
document.getElementById(
"uploadStatus"
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


projectFolder =
data.folder;



if(status){

status.innerHTML =

"✅ Extract "+

data.totalFile+

" File";

}


}

else{


alert(
data.message
);


}


}








// ==========================
// DEPLOY VERCEL
// ==========================


async function deploy(){


let repo =
document.getElementById(
"repos"
);



let project =
document.getElementById(
"projectName"
);



if(!repo || !project)
return;



let status =
document.getElementById(
"deployStatus"
);



if(status)
status.innerHTML =
"⏳ Deploying...";




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

projectName:
project.value,


repo:
repo.value


})

}

);



let data =
await res.json();



if(data.success){


if(status)

status.innerHTML =
"✅ Deploy berhasil 🚀";


loadHistory();


}

else{


if(status)

status.innerHTML =
"❌ Deploy gagal";


}


}








// ==========================
// LOAD HISTORY
// ==========================


async function loadHistory(){


let box =
document.getElementById(
"history"
);



if(!box)
return;



let res =
await fetch(
"/history"
);



let data =
await res.json();



box.innerHTML="";



data.deploys.forEach(item=>{


box.innerHTML += `

<div class="history-item">

<h3>
${item.project}
</h3>

<p>
🐙 ${item.repo}
</p>

<p>
Status:
${item.status}
</p>

<p>
🌐 ${item.url || "-"}
</p>

</div>

`;



});


}








// ==========================
// START DASHBOARD
// ==========================


if(
location.pathname.includes(
"dashboard"
)
){

loadUser();

loadRepo();

loadHistory();

}
