'use strict'

let mainGrid = document.querySelector(".grid");
let giftArray;

// Load the page before anything and add all the cards to the maing page
(function getToken() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL + "/api/posts/main");
    xhr.send();
    
    xhr.onload = () => {
        if (xhr.status != 200) {
            console.log("Algo salió mal");
        } else {
            console.log(xhr.response);
            giftArray = JSON.parse(xhr.responseText);
            // console.table(giftArray);
            let htmlArray = giftArray.map(e=> {
                return renderVerticalGiftCard(e);
            }).join("");

            mainGrid.insertAdjacentHTML("afterbegin", htmlArray);
            // localStorage.token = JSON.parse(xhr.response).token;
            // console.log("Este es tu token: " + localStorage.token);
        }
    }
})();