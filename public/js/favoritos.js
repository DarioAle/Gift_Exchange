"use strict";

let wrapperFavorites = document.getElementById('wrapper-favorites');

let btnConfirm = document.getElementById('selection-btn-confirm');
let targetPost;
let targetPostId;

function getAGifts() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${BASE_URL}/posts/favorites`);
    xhr.setRequestHeader('x-auth', sessionStorage.getItem('token'));
    xhr.onload =  function (evt) {
        if (xhr.status == 200) {
            let gifts = JSON.parse(xhr.response);
            console.log(gifts);
            wrapperFavorites.innerHTML = "";
            for(let i = 0; i < gifts.length; i++){
                let button = `<button type="button" style="vertical-align: middle;" class="btn btn-danger delete-button" 
                        data-post-id="${gifts[i].id}" 
                        data-post-name="${gifts[i].nombrePost}">Eliminar de mis favoritos</button>`;
                gifts[i].redirectURL = `/giftDetail.html?gift=${gifts[i].id}`;
                wrapperFavorites.innerHTML += renderHorizontalGiftCard(gifts[i], button);
                
            }
            if(wrapperFavorites.innerHTML == ""){
                wrapperFavorites.innerHTML = SIN_RESULTADOS;
            }

            let deleteButtons = document.getElementsByClassName('delete-button');
            for (const btn in deleteButtons) {
                if (deleteButtons.hasOwnProperty(btn)) {
                    const element = deleteButtons[btn];
                    element.addEventListener('click', onDeleteButtonClick);
                }
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
    console.log("post id " + targetPostId)
    xhr.open('DELETE', `${BASE_URL}/posts/favorites?postId=${targetPostId}`);
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

function onDeleteButtonClick(evt) {
    evt.preventDefault();
    let t = evt.target;
    targetPost = t.getAttribute('data-post-name');
    targetPostId = t.getAttribute('data-post-id');
    document.getElementById('selection-moda-name-span').innerText = targetPost;
    console.log("post id " + targetPostId)
    $("#selection-modal").modal('show');
}

btnConfirm.addEventListener('click', onConfirmClick);
getAGifts();