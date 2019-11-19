'use strict'

document.querySelector("");

function loadGift(){
    let giftId = urlParams.get('gift');
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${BASE_URL}/gifts/${giftId}`);
    xhr.onload = e => {
        if (xhr.status != 200) {
            console.log("Algo salió mal");
            console.log(xhr.status);
        } else {
            // localStorage.token = JSON.parse(xhr.response).token;
            // console.log("Este es tu token: " + localStorage.token);
            console.log(xhr.status);
            console.log(xhr.responseText);
        }
    }
    xhr.send();
}

loadGift();