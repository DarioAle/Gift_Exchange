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
 let ownerImg = document.querySelector("#ownerImg");
 let ownerCal = document.querySelector("#ownerCal");
 let sendReason = document.querySelector("#sendReason");
 let textReason = document.querySelector("#textReason");

let global_owner;

sendReason.addEventListener('click' , (e) => {
    console.log("Estoyo dentro del evento enviar");
    let giftId = urlParams.get('gift');
    let xhr = new XMLHttpRequest();
    xhr.open('PATCH', `${BASE_URL}/posts/gift/${giftId}`);
    xhr.setRequestHeader('Content-Type', "application/json");
    xhr.setRequestHeader('x-auth', sessionStorage.getItem('token')); 
    xhr.onload = e => {
        if(xhr.status != 200) {
            console.log("Algo salió mal");
            console.log(xhr.status);
        }
        else {
            // Cerrar Modal
            document.querySelector("#pressX").click();

        }
    }
    xhr.send(JSON.stringify({'razon' : textReason.value}));
    console.log("Gracias por enviarme tus razones " + textReason.value);

})

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
            catHeader.innerHTML = "Categoría | " + postInfoObject.category;
            descrHead.innerHTML = postInfoObject.descripcionPost;
            pubFecha.innerHTML = "Publicado el "+ postInfoObject.date;
            nombHead.innerHTML =  postInfoObject.nombrePost;
            nombreOwner.innerHTML = postInfoObject.owner;
            ownerDetails(postInfoObject.owner);
            // console.log(xhr.status);
            // console.log("This is the info that should be in the html   " + xhr.responseText);
        }
    }
    xhr.send();
}

function ownerDetails(owner) {
    let giftId = urlParams.get('gift');
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${BASE_URL}/user/u/${owner}`);
    xhr.onload = e => {
        if (xhr.status != 200) {
            console.log("Algo salió mal");
            console.log(xhr.status);
        } else {
            // localStorage.token = JSON.parse(xhr.response).token;
            // console.log("Este es tu token: " + localStorage.token);
            let userInfoObject = JSON.parse(xhr.responseText);
            console.log(userInfoObject);
            
            ownerImg.src = userInfoObject.imagen;
            ownerCal.innerHTML = "Calificacion: " + userInfoObject.puntaje + " estrellas";
            

            // console.log(xhr.status);
            // console.log("This is the info that should be in the html   " + xhr.responseText);
        }
    }
    xhr.send();
}

loadGift();