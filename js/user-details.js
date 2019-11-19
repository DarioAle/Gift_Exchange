"use strict";

const urlParams = new URLSearchParams(window.location.search);

let usuario;

function fetchData() {

    let xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/users/?id=${urlParams.get("id")}`);
    xhr.onload = () => {
        if (xhr.status == 200) {
            usuario = JSON.parse(xhr.response)[0];
            document.querySelector("title").innerHTML = usuario.nombre;
            document.getElementById("header").innerHTML = usuario.nombre;
            document.getElementById("profile").setAttribute("src", "." + usuario.imagen);
        } else {
            alert(xhr.statusText);
        }
    };
    xhr.send();
}