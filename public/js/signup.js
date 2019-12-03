'use strict';

let registerBtn = document.getElementById("signupbtn");

registerBtn.addEventListener("click", (evt) => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:3000/api/user/register');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = (evt) => {
        if(xhr.status == 200)
            window.location.href = "/";
        else
            alert(xhr.statusText);
    };
    xhr.send();
});