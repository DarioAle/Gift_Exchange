"use strict";

let warperActivas = document.getElementById('warper-activas');
let warperInactivas = document.getElementById('warper-inactivas');



function getAGifts(pub, w) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${BASE_URL}/gifts?pub=${pub}&publicadoPor=${window.sessionStorage.getItem("username")}`)
    xhr.onload =  function (evt) {
        if (xhr.status == 200) {
            let gifts = JSON.parse(xhr.response);
            if(gifts.length == 0){
                w.innerHTML = SIN_RESULTADOS;
            }
            console.log(gifts);
            for(let i = 0; i < gifts.length; i++){
                gifts[i].redirectURL = `http://127.0.0.1:5500/winner-selector.html?gift=${gifts[i].id}`;
                w.innerHTML += renderHorizontalGiftCard(gifts[i]);
            }
            return;
        } else {
            alert(xhr.statusText);
        }
    }
    xhr.send();
}

getAGifts('activo', warperActivas);
getAGifts('inactivo', warperInactivas);