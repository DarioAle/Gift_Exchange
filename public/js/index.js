'use strict'

let mainGrid = document.querySelector(".grid");
let giftArray;
let global_page_counter;
const global_pageLimit = 6;
let global_pageNumber;



// Load the page before anything and add all the cards to the maing page
function loadMain(limit, number) {
    let pageNumber = localStorage.global_pageNumber || 1;
    localStorage.global_page_counter = localStorage.global_pageNumber;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL + `/posts/main?pagina=${pageNumber}&limit=${global_pageLimit}`);
    xhr.send();
    
    xhr.onload = () => {
        if (xhr.status != 200) {
            console.log("Algo salió mal");
        } else {
            console.log(xhr.response);
            giftArray = JSON.parse(xhr.responseText);
            // console.table(giftArray);
            let htmlArray = giftArray.map(e=> {
            if(e)
                return renderVerticalGiftCard(e);
            }).join("");

            mainGrid.insertAdjacentHTML("afterbegin", htmlArray);
            // localStorage.token = JSON.parse(xhr.response).token;
            // console.log("Este es tu token: " + localStorage.token);
            let numberOfElemets = xhr.getResponseHeader("x-posts-length");
            removeButtonsFromHTML();
            addButtons(numberOfElemets, pageNumber);
        }
    }
};

function removeButtonsFromHTML() {
    let ul = document.querySelector('#pageButtons');
    while( ul.firstChild != null ){
        ul.removeChild( ul.firstChild );
    }

}

function addButtons(numberOfElements, page) {
    // removeButtonsFromHTML();
    // console.log("This is the number of elements" + numberOfElements);

    let unorderList = document.querySelector(".pagination");
    let v = "";
    let p = "";
    let lasPage = Math.ceil(numberOfElements /  global_pageLimit);
     console.log("This is the las page " + lasPage);
    if(page == 1) {
        v = "disabled";
    }
    if(page == lasPage)
        p = "disabled";
        
    
    let previous = `<li class='page-item'><a class='btn page-link ${v}' onclick="pressPrevious()" href='#'>Previous</a></li>`;
    unorderList.insertAdjacentHTML("beforeend", previous);

    for(let i = 0; i < (numberOfElements / global_pageLimit); i++) {
        let style ="";
        // console.log("Comparing indexes " + ((i + 1) == localStorage.global_page_counter));
        if((i + 1) == localStorage.global_page_counter) {
            style = "background-color : black";
        }
        let element = `<li class='page-item'><a style="${style}" class='page-link' onclick="pressPageButton('${i + 1}')" href='#'>${i + 1}</a></li>`;
        unorderList.insertAdjacentHTML("beforeend", element);

    }
    let next = `<li class='page-item'><a class='btn page-link ${p}' onclick="pressNext()" href='#'>Next</a></li>`;
    unorderList.insertAdjacentHTML("beforeend", next);
}

function pressNext() {
    localStorage.global_page_counter++;
    pressPageButton(localStorage.global_page_counter);

}


function pressPrevious() {
    localStorage.global_page_counter--;
    pressPageButton(localStorage.global_page_counter);
    
}

function pressPageButton(page) {
    // localStorage.global_pageLimit = global_pageLimit;
    localStorage.global_pageNumber = page ;
    localStorage.global_page_counter = page;

    location.reload();
}


loadMain(global_pageLimit,localStorage.global_pageNumber);