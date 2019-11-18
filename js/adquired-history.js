"use strict";

let warper = document.getElementById('warper');
let catFilter  = document.getElementById('input-cat-filter');
let nameFilter = document.getElementById('input-name-filter');

function getAdquiredGifts() {
    let xhr = new XMLHttpRequest();
    let queryString = `${BASE_URL}/gifts?adquiridoPor=${window.sessionStorage.getItem("username")}&pub=inactivo`;
    if(catFilter.value != -1){
        queryString += "&categoria=" + catFilter.value;
    }
    xhr.open('GET', queryString);
    warper.innerHTML = "";
    xhr.onload =  function (evt) {
        if (xhr.status == 200) {
            let gifts = JSON.parse(xhr.response);
            if(gifts.length == 0){
                warper.innerHTML = SIN_RESULTADOS;
            }
            console.log(gifts);
            for(let i = 0; i < gifts.length; i++){
                gifts[i].redirectURL = '#';
                warper.innerHTML += renderHorizontalGiftCard(gifts[i]);
            }
            return;
        } else {
            alert(xhr.statusText);
        }
    }
    xhr.send();
}

catFilter.addEventListener('change', (evt) => getAdquiredGifts());

getAdquiredGifts();