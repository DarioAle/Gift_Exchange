'use strict'

let mainGrid = document.querySelector(".grid");

// Load the page before anything
(function getToken() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:3000/gifts");
    xhr.setRequestHeader("x-expediente", 707954);
    xhr.send();
    
    xhr.onload = () => {
        if (xhr.status != 200) {
            console.log("Algo salió mal");
        } else {
            console.log(xhr.response);
            // localStorage.token = JSON.parse(xhr.response).token;
            // console.log("Este es tu token: " + localStorage.token);
        }
    }
})();