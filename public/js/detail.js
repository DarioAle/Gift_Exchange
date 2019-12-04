'use strict'

/**
 * 
 * estado
 * prImage
 * catHeader
 * descrHead
 * pubFecha
 * nombHead
 */

 let estado = document.querySelector("#estado");
 let prImage = document.querySelector("#prImage");
 let catHeader = document.querySelector("#catHeader");
 let descrHead = document.querySelector("#descrHead");
 let pubFecha = document.querySelector("#pubFecha");
 let nombHead = document.querySelector("#nombHead");
 let nombreOwner = document.querySelector("#nombreOwner");

let global_owner;

function loadGift(){
    let giftId = urlParams.get('gift');
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${BASE_URL}/posts/gift/${giftId}`);
    xhr.onload = e => {
        if (xhr.status != 200) {
            console.log("Algo salió mal");
            console.log(xhr.status);
        } else {
            // localStorage.token = JSON.parse(xhr.response).token;
            // console.log("Este es tu token: " + localStorage.token);
            let postInfoObject = JSON.parse(xhr.responseText);
            console.log(postInfoObject);
            estado.innerHTML = postInfoObject.isNewGift ? "Nuevo" : "Usado";
            prImage.src = postInfoObject.image[0];
            catHeader.innerHTML = postInfoObject.category;
            descrHead.innerHTML = postInfoObject.descripcionPost;
            pubFecha.innerHTML = "Publicado el "+ postInfoObject.date;
            nombHead.innerHTML =  postInfoObject.nombrePost;
            nombreOwner.innerHTML = postInfoObject.owner;

            console.log(xhr.status);
            console.log("This is the info that should be in the html   " + xhr.responseText);
        }
    }
    xhr.send();
}

function ownerDetails(owner) {
    let giftId = urlParams.get('gift');
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${BASE_URL}/posts/gift/${giftId}`);
    xhr.onload = e => {
        if (xhr.status != 200) {
            console.log("Algo salió mal");
            console.log(xhr.status);
        } else {
            // localStorage.token = JSON.parse(xhr.response).token;
            // console.log("Este es tu token: " + localStorage.token);
            let postInfoObject = JSON.parse(xhr.responseText);
            console.log(postInfoObject);
            estado.innerHTML = postInfoObject.isNewGift ? "Nuevo" : "Usado";
            prImage.src = postInfoObject.image[0];
            catHeader.innerHTML = postInfoObject.category;
            descrHead.innerHTML = postInfoObject.descripcionPost;
            pubFecha.innerHTML = "Publicado el "+ postInfoObject.date;
            nombHead.innerHTML =  postInfoObject.nombrePost;
            nombreOwner.innerHTML = postInfoObject.owner;

            console.log(xhr.status);
            console.log("This is the info that should be in the html   " + xhr.responseText);
        }
    }
    xhr.send();
}

loadGift();