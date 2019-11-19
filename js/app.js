"use strict";

const BASE_URL = 'http://localhost:3000';
const SIN_RESULTADOS = '<div class="col-12"><img class="not-found" src="/img/eastwood-page-not-found.png"/> Sin resultados</div>';
const urlParams = new URLSearchParams(window.location.search);

let loggedInNavbar = document.getElementById('logged-navbar');
let notLoggedNavbar = document.getElementById('not-logged-navbar');

let user;

function renderNavbar(){
    // console.log("Hola");
    if(notLoggedNavbar != null){
        notLoggedNavbar.hidden = false;
        loggedInNavbar.hidden = true;
    }
    if(window.sessionStorage.getItem("username") != undefined){
        let xhr = new XMLHttpRequest();
        let username = window.sessionStorage.getItem("username");
        xhr.open("GET", `${BASE_URL}/users/${username}`);
        xhr.onload = (evt) => {
            if(xhr.status == 200){
                user = JSON.parse(xhr.response);
                console.log(user);
                if(notLoggedNavbar != null){
                    notLoggedNavbar.hidden = true;
                    loggedInNavbar.hidden = false;
                }else{
                    loggedInNavbar.hidden = false;
                }
                loggedInNavbar.querySelector("#cuenta-a").href = `./user-info.html?id=${user.id}`;
                loggedInNavbar.querySelectorAll('img').forEach(element => {
                    element.src = user.imagen;
                }); 
                return;
            }
        }
        xhr.send();
    }
}

function loadGift(callback){
    let giftId = urlParams.get('gift');
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${BASE_URL}/gifts/${giftId}`);
    xhr.onload = callback
    xhr.send();
}

function renderHorizontalUserCard(user){
    let html = `
        <div class="card mb-3 shadow-sm col-md-12 user-horizontal-card" data-user-id="${user.id}" data-user-name="${user.nombre}">
            <a href="${user.redirectURL}" data-toggle="modal" data-target="#selection-modal">
                <div class="row no-gutters">
                    <div class="col-md-3">
                            <img src=".${user.imagen}" class="card-img" style alt="${user.id}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                                <h5 class="card-title">${user.nombre}</h5>
                                <p class="card-text">${user.usuario}</p>
                                <small>Puntaje <span>${user.puntaje}</span></small>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    `;
    return html;
}

function renderHorizontalGiftCard(gift){
    let html = `
        <div class="card mb-3 shadow-sm col-md-12 gift-horizontal-card">
                <div class="row no-gutters">
                    <div class="col-md-3">
                        <a href="${gift.redirectURL}">
                            <img src="${gift.imagen[0]}" class="card-img" alt="${gift.imagen[0]}" />
                        </a>
                    </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${gift.nombre}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Publicado por <a href="http://127.0.0.1:5500/user-info.html?usuario=${gift.publicadoPor}">${gift.publicadoPor}</a></h6>
                        <p class="card-text">${gift.descripcion}</p>
                        <small>Estado <span>${gift.estado}</span></small><br>
                        <small>Publicado el <span>${gift.creacion}</span></small>
                    </div>
                </div>
            </div>
        </div>
    `;
    return html;
}

function renderVerticalGiftCard(gift) {
    console.log(gift.imagen[0]);
    let html = 
    `
    <div class="col-12 col-lg-4 col xl-3 px-4 px-lg-2 mb-3">
        <div class="card post-card shadow-sm bg-white rounded">
            <a href = 'giftDetail.html?gift=${gift.id}'>
                <img src=".${gift.imagen[0]}" class="card-img-top" alt="...">
            </a>
            <div class="card-body">
                <h5 class="card-title">${gift.nombre}</h5>
                <h6 class="card-subtitle mb-2 text-muted"><a href="#">Dario Arias</a></h6>
                <p class="card-text">${gift.estado}</p>
                <small>Publicado hace <span>${gift.creacion}</span></small>
            </div>
        </div>
    </div>
    `;
    return html;
}

renderNavbar();