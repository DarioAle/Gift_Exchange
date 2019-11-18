"use strict";

let gift
let spanGiftName = document.getElementById('selection-gift-name');
let imgGift = document.getElementById('selection-gift-image');
let selectionHeader = document.getElementById('selection-header');

function winnerGiftCallback(xhr) {
    return function (evt) {
        if (xhr.status == 200) {
            gift = JSON.parse(xhr.response);
            console.log(gift);
            spanGiftName.innerHTML = gift.nombre;
            imgGift.src = gift.imagen[0];
            selectionHeader.hidden = false;
            return;
        }else{
            alert(xhr.statusText);
        }
    }
}

loadGift(winnerGiftCallback);