"use strict";

let warperActivas = document.getElementById('warper-activas');
let warperInactivas = document.getElementById('warper-inactivas');


function getAGifts() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${BASE_URL}/posts/history`);
    xhr.setRequestHeader('x-auth', sessionStorage.getItem('token'));
    xhr.onload =  function (evt) {
        if (xhr.status == 200) {
            let gifts = JSON.parse(xhr.response);
            console.log(gifts);
            warperInactivas.innerHTML = "";
            warperActivas.innerHTML = "";
            for(let i = 0; i < gifts.length; i++){
                gifts[i].redirectURL = `/winner-selector.html?gift=${gifts[i].id}`;
                if(gifts[i].postIsActive){
                    warperActivas.innerHTML += renderHorizontalGiftCard(gifts[i]);
                }else{
                    warperInactivas.innerHTML += renderHorizontalGiftCard(gifts[i]);
                }
            }
            if(warperActivas.innerHTML == ""){
                warperActivas.innerHTML = SIN_RESULTADOS;
            }
            if(warperInactivas.innerHTML == ""){
                warperInactivas.innerHTML = SIN_RESULTADOS;
            }
            return;
        } else {
            alert(xhr.statusText);
        }
    }
    xhr.send();
}

getAGifts();