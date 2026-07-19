async function loadUser(){


try{


let res = await fetch("/api/user");


let data = await res.json();



document.getElementById(
"username"
).innerHTML =
data.username || "Guest";



document.getElementById(
"githubUser"
).innerHTML =
data.github || "Belum Connect";



document.getElementById(
"status"
).innerHTML =
data.connected
?
"🟢 Github Connected"
:
"🔴 Github Not Connected";



}catch(e){

console.log(e);

}


}



async function tokenLogin(){


let token = prompt(
"Masukkan GitHub Token"
);



if(!token)return;



await fetch(
"/auth/token",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

token

})

});


location.href="/dashboard";


}



if(
location.pathname.includes(
"dashboard"
)
){

loadUser();

}
