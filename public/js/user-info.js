"use strict";

let nombreIn = document.getElementById("name");
let correoIn = document.getElementById("email");
let passIn = document.getElementById("pass");
let passCIn = document.getElementById("newPass");

function fetchData() {

    let usuario;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `${BASE_URL}/user/me`);
    xhr.setRequestHeader('x-auth', window.sessionStorage.getItem("token"));
    xhr.setRequestHeader("Content-Type", "multipart/form-data");
    xhr.onload = () => {
        if (xhr.status == 200) {
            usuario = JSON.parse(xhr.response);
            console.log(usuario);
            nombreIn.value = usuario.nombre;
            correoIn.value = usuario.correo;
            document.getElementById("profile").setAttribute("src", usuario.imagen);
        } else {
            alert(xhr.statusText);
        }
    };
    xhr.send();
}

let pictureBtn = document.getElementById("pictureBtn");
let fileIn = document.getElementById("fileIn");

pictureBtn.addEventListener("click", () => {
    event.preventDefault();
    fileIn.click();
});

document.getElementById("updateBtn").addEventListener("click", () => {
    event.preventDefault();

    let updates = new FormData();
    updates.append('nombre', nombreIn.value);
    updates.append('correo', correoIn.value)
    updates.append('password', passIn.value)
    updates.append('confpass', passCIn.value)
    updates.append('statement', fileIn.files[0]);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", `${BASE_URL}/user/update`);
    xhr.setRequestHeader('x-auth', window.sessionStorage.getItem("token"));

    xhr.onload = () => {
        if (xhr.status == 200) {
            alert("Updated");
            window.location.href = "/user-info.html";
        } else {
            alert(xhr.responseText);
        }
    };
    xhr.send(updates);

});