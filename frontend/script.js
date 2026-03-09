const API = "https://missingchild1.onrender.com";

/* PAGE SWITCH */

function showPage(page){

document.querySelectorAll(".page").forEach(p=>{
p.style.display="none";
});

document.getElementById(page).style.display="block";

}

showPage("login");


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

alert(data.message || "Signup Successful");

showPage("login");

})

.catch(err=>{
alert("Signup Error");
console.log(err);
});

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

showPage("dashboard");

}else{

alert("Login Failed");

}

})

.catch(err=>{
alert("Server Error");
console.log(err);
});

}



/* REGISTER CHILD */

function registerChild(){

let formData = new FormData();

formData.append(
"name",
document.getElementById("child_name").value
);

formData.append(
"age",
document.getElementById("child_age").value
);

formData.append(
"place",
document.getElementById("child_place").value
);

formData.append(
"photo",
document.getElementById("child_photo").files[0]
);


fetch(API + "/register_child",{

method:"POST",
body:formData

})

.then(res=>res.json())
.then(data=>{

alert(data.message || "Child Registered");

showPage("dashboard");

})

.catch(err=>{
alert("Upload Failed");
console.log(err);
});

}



/* CROSS CHECK */

function crossCheck(){

let formData = new FormData();

formData.append(
"photo",
document.getElementById("check_photo").files[0]
);

fetch(API + "/crosscheck",{

method:"POST",
body:formData

})

.then(res=>res.json())
.then(data=>{

showPage("result");

if(data.status=="found"){

/* CHECK MATCH TYPE */

if(data.match_type=="age_progression"){

document.getElementById("result_text").innerHTML =
"AGE PROGRESSION MATCH FOUND";

}else{

document.getElementById("result_text").innerHTML =
"MATCH FOUND";

}

/* FAMILY DETAILS */

document.getElementById("family_details").innerHTML =

"Name: "+data.name+"<br>"+
"Age: "+data.age+"<br>"+
"Place: "+data.place;

}

else if(data.status=="no face"){

document.getElementById("result_text").innerHTML =
"NO FACE DETECTED";

document.getElementById("family_details").innerHTML = "";

}

else{

document.getElementById("result_text").innerHTML =
"NOT FOUND";

document.getElementById("family_details").innerHTML = "";

}

})

.catch(err=>{

alert("Crosscheck Failed");

console.log(err);

});

}
