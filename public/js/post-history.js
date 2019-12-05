"use strict";

let warperActivas = document.getElementById('warper-activas');
let warperInactivas = document.getElementById('warper-inactivas');
let btnConfirm = document.getElementById('selection-btn-confirm');
let targetPost;
let targetPostId;

function onWarperClick(evt) {
    evt.preventDefault();
    let t = evt.target.closest('.gift-horizontal-card');
    targetPost = t.getAttribute('data-post-name');
    targetPostId = t.getAttribute('data-post-id');
    document.getElementById('selection-moda-name-span').innerText = targetPost;
}

warperInactivas.addEventListener('click', onWarperClick);

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
                gifts[i].redirectURL = `/winner-selector.html?postId=${gifts[i].id}`;
                if(gifts[i].postIsActive){
                    warperActivas.innerHTML += renderHorizontalGiftCard(gifts[i]);
                }else{
                    gifts[i].redirectURL = "#";
                    warperInactivas.innerHTML += renderHorizontalGiftCard(gifts[i], 'selection-modal');
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

function onConfirmClick (evt) {
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${BASE_URL}/posts/p/${targetPostId}`);
    xhr.setRequestHeader('x-auth', sessionStorage.getItem('token'));
    xhr.onload = (evt) => {
        if(xhr.status == 200){
            $("#selection-modal").modal('hide');
            getAGifts();
        }
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

btnConfirm.addEventListener('click', onConfirmClick);
getAGifts();