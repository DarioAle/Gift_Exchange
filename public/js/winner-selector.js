"use strict";

let gift
let spanGiftName = document.getElementById('selection-gift-name');
let imgGift = document.getElementById('selection-gift-image');
let selectionHeader = document.getElementById('selection-header');
let btnConfirm = document.getElementById('selection-btn-confirm');
let warper = document.getElementById('warper');
let targetUser;
let targetUserID;

warper.addEventListener('click', (evt) => {
    evt.preventDefault();
    let t = evt.target.closest('.user-horizontal-card');
    targetUser = t.getAttribute('data-user-name');
    targetUserID = t.getAttribute('data-user-id');
    document.getElementById('selection-moda-name-span').innerText = targetUser;
})

function renderUser(username, razon) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', BASE_URL + "/user/u/" + username);
    xhr.onload = (evt) => {
        if (xhr.status == 200) {
            let user = JSON.parse(xhr.response);
            user.redirectURL = "#";
            user.id = username;
            user.usuario = razon;
            warper.innerHTML += renderHorizontalUserCard(user, 'selection-modal');
        }
    }
    xhr.send();
}

function winnerGiftCallback(xhr) {
    return function (evt) {
        if (xhr.status == 200) {
            console.log("Hola");
            gift = JSON.parse(xhr.response);
            console.log(gift);
            spanGiftName.innerHTML = gift.nombrePost;
            imgGift.src = gift.image[0];
            selectionHeader.hidden = false;
            console.log(gift.interesados.length, gift.interesados, gift);
            for (let i = 0; i < gift.interesados.length; i++) {
                renderUser(gift.interesados[i].usuario, gift.interesados[i].razon)
            }
            return;
        } else {
            alert(xhr.statusText);
        }
    }
}

function onConfirmClick (evt) {
    let xhr = new XMLHttpRequest();
    let id = urlParams.get('postId');
    xhr.open('PATCH', `${BASE_URL}/posts/winner-selector/${id}`);
    xhr.setRequestHeader('x-auth', sessionStorage.getItem('token'));
    xhr.onload = (evt) => {
        if(xhr.status == 200){
            window.location.href = "/gracias.html";
        }
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        "aquiredBy": targetUserID,
        "postIsActive": false 
    }));
}

btnConfirm.addEventListener('click', onConfirmClick);

loadGift(winnerGiftCallback);