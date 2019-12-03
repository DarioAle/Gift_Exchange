"use strict";

let inputUsername = document.getElementById('login-input-username');
let inputPassword = document.getElementById('login-input-passw');
let btnSubmit = document.getElementById('login-btn-sbmit');

btnSubmit.addEventListener('click', (evt) => {
    evt.preventDefault();
    login(inputUsername.value, inputPassword.value)
        .then(res => {
            window.sessionStorage.setItem("token", res)
            window.location.href = "/";
        })
        .catch(err => console.error(err));
});

function login(username, password) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", `${BASE_URL}/api/auth/login`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = (evt) => {
            if (xhr.status == 201) {
                resolve(xhr.getResponseHeader('X-Auth'));
            }else {
                reject(xhr.statusText);
            }
        };
        let user = {username, password};
        console.log(user);
        xhr.send(JSON.stringify(user));
    });
}