```javascript
const API = "https://missingchild1.onrender.com";


/* ---------------- PAGE SWITCH ---------------- */

function showPage(page){

document.querySelectorAll(".page").forEach(p=>{
p.style.display="none";
});

let current = document.getElementById(page);

current.style.display="block";

current.style.opacity=0;

setTimeout(()=>{
current.style.opacity=1;
current.style.transition="0.4s";
},50);

/* LOAD CHILDREN WHEN DASHBOARD OPENS */

if(page==="dashboard"){
loadChildren();
}

}

showPage("login");


/* ---------------- LOADING ---------------- */

function showLoading(btn){

btn.innerHTML="Processing...";
btn.disabled=true;

}

function hideLoading(btn,text){

btn.innerHTML=text;
btn.disabled=false;

}


/* ---------------- MESSAGE BOX ---------------- */

function showMessage(msg,color="green"){

let box=document.createElement("div");

box.innerText=msg;

box.style.position="fixed";
box.style.bottom="20px";
box.style.left="50%";
box.style.transform="translateX(-50%)";

box.style.background=color;
box.style.color="white";
box.style.padding="12px 20px";
box.style.borderRadius="8px";
box.style.boxShadow="0px 4px 10px rgba(0,0,0,0.3)";

document.body.appendChild(box);

setTimeout(()=>{
box.remove();
},3000);

}


/* ---------------- SIGNUP ---------------- */

function signup(){

let btn=event.target;

showLoading(btn);

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

hideLoading(btn,"Signup");

showMessage(data.message || "Signup Successful");

showPage("login");

})

.catch(err=>{

hideLoading(btn,"Signup");

showMessage("Signup Error","red");

console.log(err);

});

}


/* ---------------- LOGIN ---------------- */

function login(){

let btn=event.target;

showLoading(btn);

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

hideLoading(btn,"Login");

if(data.status=="success"){

showMessage("Login Successful");

showPage("dashboard");

}else{

showMessage("Login Failed","red");

}

})

.catch(err=>{

hideLoading(btn,"Login");

showMessage("Server Error","red");

console.log(err);

});

}


/* ---------------- REGISTER CHILD ---------------- */

function registerChild(){

let btn=event.target;

showLoading(btn);

let formData=new FormData();

formData.append("name",document.getElementById("child_name").value);
formData.append("age",document.getElementById("child_age").value);
formData.append("place",document.getElementById("child_place").value);
formData.append("photo",document.getElementById("child_photo").files[0]);

fetch(API + "/register_child",{

method:"POST",
body:formData

})

.then(res=>res.json())
.then(data=>{

hideLoading(btn,"Register Child");

showMessage(data.message || "Child Registered");

showPage("dashboard");

})

.catch(err=>{

hideLoading(btn,"Register Child");

showMessage("Upload Failed","red");

console.log(err);

});

}


/* ---------------- CROSS CHECK ---------------- */

function crossCheck(){

let btn=event.target;

showLoading(btn);

let formData=new FormData();

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

hideLoading(btn,"Cross Check");

showPage("result");


if(data.status=="found"){

if(data.match_type=="age_progression"){

document.getElementById("result_text").innerHTML =
"AGE PROGRESSION MATCH FOUND";

}else{

document.getElementById("result_text").innerHTML =
"MATCH FOUND";

}

document.getElementById("family_details").innerHTML =

"Name: "+data.name+"<br>"+
"Age: "+data.age+"<br>"+
"Place: "+data.place;

}

else if(data.status=="no face"){

document.getElementById("result_text").innerHTML =
"NO FACE DETECTED";

document.getElementById("family_details").innerHTML="";

}

else{

document.getElementById("result_text").innerHTML="NOT FOUND";

document.getElementById("family_details").innerHTML="";

}

})

.catch(err=>{

hideLoading(btn,"Cross Check");

showMessage("Crosscheck Failed","red");

console.log(err);

});

}


/* ---------------- LOAD REGISTERED CHILDREN ---------------- */

function loadChildren(){

fetch(API + "/get_children")

.then(res=>res.json())

.then(data=>{

let container=document.getElementById("childrenContainer");

if(!container) return;

container.innerHTML="";

data.forEach(child=>{

let card=document.createElement("div");

card.className="childCard";

card.innerHTML=

"<h4>"+child.name+"</h4>"+
"<p>Age: "+child.age+"</p>"+
"<p>Place: "+child.place+"</p>"+
"<img src='"+API+"/"+child.image+"' width='120'>";

container.appendChild(card);

});

})

.catch(err=>{

console.log("Error loading children",err);

});

}


/* ---------------- IMAGE PREVIEW ---------------- */

function previewImage(input,id){

let file=input.files[0];

if(file){

let reader=new FileReader();

reader.onload=function(e){

document.getElementById(id).src=e.target.result;

};

reader.readAsDataURL(file);

}

}
```
