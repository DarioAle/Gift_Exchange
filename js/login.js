"use strict";

let inputUsername = document.getElementById('login-input-username');
let inputPassword = document.getElementById('login-input-passw');
let btnSubmit = document.getElementById('login-btn-sbmit');

btnSubmit.addEventListener('click', (evt) => {
    evt.preventDefault();
    login(inputUsername.value, inputPassword.value)
        .then(res => {
            window.sessionStorage.setItem("username", res)
            window.location.href = "./index.html";
        })
        .catch(err => console.error(err));
});

function login(username, contrasena) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `${BASE_URL}/users/${username}?password=${contrasena}`);
        xhr.onload = (evt) => {
            if (xhr.status == 200) {
                let user = JSON.parse(xhr.responseText);
                if (user.contrasena == contrasena) {
                    resolve(username);
                } else {
                    reject("Bad password");
                }
            }else {
                reject(xhr.statusText);
            }
        };
        xhr.send();
    });
}