"use strict";

let users;

function loadUsers() {

    let xhr = new XMLHttpRequest();
    xhr.open("GET", `${BASE_URL}/user/get`);
    xhr.setRequestHeader('x-auth', window.sessionStorage.getItem("token"));
    xhr.onload = (req, res) => {
        if (xhr.status == 200) {
            users = JSON.parse(xhr.response);
            renderUsers();
        } else {
            alert(xhr.statusText);
        }
    };
    xhr.send();
}

let filters = document.getElementById("sel");

filters.addEventListener("change", () => {
    let option = parseInt(filters.options[filters.selectedIndex].value);
    if (option == 1)
        users.sort((a, b) => {
            if (a.puntaje > b.puntaje)
                return -1;
            if (a.puntaje < b.puntaje)
                return 1;
            return 0;
        });
    else if (option == 2)
        users.sort((a, b) => {
            if (a.nombre.toUpperCase() > b.nombre.toUpperCase())
                return 1;
            if (a.nombre.toUpperCase() < b.nombre.toUpperCase())
                return -1;
            return 0;
        });
    else if (option == 3)
        users.sort((a, b) => {
            if (a.id > b.id)
                return 1;
            if (a.id < b.id)
                return -1;
            return 0;
        });
    else
        console.log("nel")
    renderUsers();
});

function renderUsers() {
    let html = "";
    users.forEach(element => {
        element.redirectURL = `/user-details.html?id=${element.usuario}`;
        html += renderHorizontalUserCard(element);
    });
    document.getElementById("users-cont").innerHTML = html;
}