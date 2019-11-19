"use strict"

let rigthForm = document.querySelector(".publish-container");
let continueButton = document.querySelector("#continue-btn");

let picUpload = document.querySelectorAll("[type=file]");
let divPic = document.querySelectorAll("span img");

let isFileUploaded = false;

function enableButton() {
    let nombre = rigthForm.querySelector("input").value;
    let descripcion = rigthForm.querySelector("textarea").value;
    // If it is equal to zero the length of invalid fields check for the password
    if (nombre.length != 0 && descripcion.length != 0 && isFileUploaded) {
        continueButton.removeAttribute("disabled");
    } else {
        continueButton.setAttribute("disabled", "");
    }
}

// When some picture is added to the catalogue give it an event listener 
// That will load the defautl picture
picUpload.forEach((e, i) => {
    e.addEventListener("change", e => {
        console.log("This file was changed");
        isFileUploaded = true;
        enableButton();
        divPic[i].setAttribute("src", `./img/wallet-${i}.jpg`)
    });
});

// Event when some new values are added to the fields in the form.
rigthForm.addEventListener("change", function (e) {
    console.log("Entre al evento change de la forma")
    enableButton();
});


// ------ New gift entry -------------------------------------
// Event when the submit button is click in the form. 
continueButton.addEventListener("click", event => {
    event.preventDefault();

    console.log("Estás dentro del evento continue");
    let valuesFilled = {
        "id": (Math.random() * 500) / 10,
        "nombre": rigthForm.querySelector("input").value,
        "descripcion": rigthForm.querySelector("textarea").value,
        "imagen": ["/img/wallet-2.jpg"],
        "estado": "usado",
        "publicadoPor": "pedro.paramo",
        "creacion": "2019-11-18",
        "categoria": "otros",
        "edicion": "2019-11-18",
        "cantidad": 1,
        "pub": "activo",
        "interesados": []
    }


    let postEntry = new XMLHttpRequest();
    postEntry.open("POST", "http://127.0.0.1:3000/gifts/");
    postEntry.setRequestHeader('Content-Type', 'application/json');
    postEntry.setRequestHeader('x-auth', localStorage.token);

    postEntry.onload = (ev) => {
        console.log("Petición de registro de regalo realizada");
        if (postEntry.status != 201) {
            console.log("Algo salió mal");
            console.log(postEntry.responseText);
            
        } else {
            console.log("Si lo recibió y se almacenó el regalo");
            // let s = document.querySelector("section");
            // s.removeChild(s.firstChild);
            // s.insertAdjacentHTML("afterbegin", `<div class="container">
            // 	<div class="row text-center">
            //         <div class="col-sm-6 col-sm-offset-3">
            //         <br><br> <h2 style="color:#0fad00">Success</h2>
            //         <img src="http://osmhotels.com//assets/check-true.jpg">
            //         <h3>Dear, Faisal khan</h3>
            //         <p style="font-size:20px;color:#5C5C5C;">Thank you for verifying your Mobile No.We have sent you an email "faisalkhan.chat@gmail.com" with your details
            // Please go to your above email now and login.</p>
            //         <a href="" class="btn btn-success">     Log in      </a>
            //     <br><br>
            //         </div>
            
            // 	</div>
            // </div>`);
            // console.log(postEntry.responseText);
        }
        
    }
    postEntry.send(JSON.stringify(valuesFilled));
});




