"use strict";

function redirect() {
    if(localStorage.getItem('token') == undefined)
        window.location.href = '/login.html';
    else
        document.querySelector("body").removeAttribute("hidden");
}

function fetchData() {
    let xhr = new XMLHttpRequest();
    let usuario = urlParams.get('id');
    xhr.open("GET", `${BASE_URL}/user/u/${usuario}`);
    xhr.onload = () => {
        if (xhr.status == 200) {
            console.log(xhr.response);
            usuario = JSON.parse(xhr.response);
            document.querySelector("title").innerHTML = usuario.nombre;
            document.getElementById("header").innerHTML = usuario.nombre;
            document.getElementById("profile").setAttribute("src", usuario.imagen);
            document.getElementById("id-user").innerHTML = usuario.usuario;
            document.getElementById("name").innerHTML = usuario.nombre;
            document.getElementById("mail").innerHTML = usuario.correo;
            document.getElementById("points").innerHTML = usuario.puntaje.toFixed(2);
        } else {
            alert(xhr.statusText);
        }
    };
    xhr.send();
}

fetchData();
