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
        .catch(err => {
            alert(err);
        });
});

function login(username, password) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", `${BASE_URL}/auth/login`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
            if (xhr.status == 201) {
                resolve(xhr.getResponseHeader('X-Auth'));
            }else {
                reject(xhr.statusText);
            }
        };
        let user = {username, password};
        xhr.send(JSON.stringify(user));
    });
}