const API = "https://missingchild-tmdo.onrender.com";

function showPage(page){

document.querySelectorAll(".page").forEach(p=>{
p.style.display="none"
})

document.getElementById(page).style.display="block"

}

showPage("login")



/* SIGNUP */

function signup(){

fetch(API + "/signup",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name:document.getElementById("su_name").value,
email:document.getElementById("su_email").value,
password:document.getElementById("su_pass").value

})

})

.then(res=>res.json())
.then(data=>{

alert(data.message)

showPage("login")

})

}



/* LOGIN */

function login(){

fetch(API + "/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

email:document.getElementById("login_email").value,
password:document.getElementById("login_pass").value

})

})

.then(res=>res.json())
.then(data=>{

if(data.status=="success"){

showPage("dashboard")

}else{

alert("Login Failed")

}

})

}



/* REGISTER CHILD */

function registerChild(){

let formData = new FormData()

formData.append("name",
document.getElementById("child_name").value)

formData.append("age",
document.getElementById("child_age").value)

formData.append("place",
document.getElementById("child_place").value)

formData.append("photo",
document.getElementById("child_photo").files[0])

fetch(API + "/register_child",{

method:"POST",
body:formData

})

.then(res=>res.json())
.then(data=>{

alert(data.message)

})

}



/* CROSS CHECK */

function crossCheck(){

let formData = new FormData()

formData.append("photo",
document.getElementById("check_photo").files[0])

fetch(API + "/crosscheck",{

method:"POST",
body:formData

})

.then(res=>res.json())
.then(data=>{

showPage("result")

if(data.status=="found"){

document.getElementById("result_text").innerHTML="MATCH FOUND"

document.getElementById("family_details").innerHTML=

"Name: "+data.name+"<br>"+
"Age: "+data.age+"<br>"+
"Place: "+data.place

}

else{

document.getElementById("result_text").innerHTML="NOT FOUND"

}

})

}
