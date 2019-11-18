"use strict";

const BASE_URL = 'http://localhost:3000';
const urlParams = new URLSearchParams(window.location.search);

let loggedInNavbar = document.getElementById('logged-navbar');
let notLoggedNavbar = document.getElementById('not-logged-navbar');

let user;

function renderNavbar(){
    notLoggedNavbar.hidden = false;
    loggedInNavbar.hidden = true;
    if(window.sessionStorage.getItem("username") != undefined){
        let xhr = new XMLHttpRequest();
        let username = window.sessionStorage.getItem("username");
        xhr.open("GET", `${BASE_URL}/users/${username}`);
        xhr.onload = (evt) => {
            if(xhr.status == 200){
                user = JSON.parse(xhr.response);
                notLoggedNavbar.hidden = true;
                loggedInNavbar.hidden = false;
                loggedInNavbar.querySelectorAll('img').forEach(element => {
                    element.src = user.imagen;
                })
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
    xhr.onload = callback(xhr)
    xhr.send();
}

renderNavbar();