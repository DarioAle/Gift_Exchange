'use strict';


let registerBtn = document.getElementById("signupbtn");

let name = document.getElementById("input_name");
let lastname = document.getElementById("input_lastname");
let username = document.getElementById("input_username");
let mail = document.getElementById("input_mail");
let pass = document.getElementById("input_pass");
let passC = document.getElementById("input_pass_c");


registerBtn.addEventListener("click", (evt) => {
    if (pass.value != passC.value)
        alert("Passwords do not match");
    else if (document.querySelectorAll("input:invalid").length == 0){
        event.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:3000/api/user/register');
        xhr.setRequestHeader("Content-Type", "application/json");
        let user = {
            nombre : name.value,
            apellido : lastname.value,
            usuario : username.value,
            correo : mail.value,
            password : pass.value
        }
        xhr.send(JSON.stringify(user));
        xhr.onload = (evt) => {
            if (xhr.status == 201) {
                alert("You can login now");
                window.location.href = "/";
            }
            else
                alert(xhr.responseText);
        };
    }
});