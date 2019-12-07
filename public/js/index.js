'use strict'

let mainGrid = document.querySelector(".grid");
let giftArray;
let global_page_counter;
const global_pageLimit = 6;
let global_pageNumber;

let catFilter  = document.getElementById('input-cat-filter');
let nameFilter = document.getElementById('input-name-filter');

catFilter.addEventListener('change', () => loadMain());
nameFilter.addEventListener('change', () => loadMain());


// Load the page before anything and add all the cards to the maing page
function loadMain(limit, number) {
    let pageNumber = global_pageNumber || 1;
    global_page_counter = global_pageNumber;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL + `/posts/main?pagina=${pageNumber}&limit=${global_pageLimit}`);
    xhr.send();
    
    xhr.onload = () => {
        if (xhr.status != 200) {
            console.log("Algo salió mal");
            console.log(xhr.responseText)
        } else {
            giftArray = JSON.parse(xhr.responseText);
            console.log("values");
            console.log(catFilter.value);
            console.log(nameFilter.value);

            let htmlArray = giftArray.map(e=> {
            if(e)
                return renderVerticalGiftCard(e);
            }).join("");

            mainGrid.innerHTML = htmlArray;
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
    unorderList.innerHTML = "";
    let v = "";
    let p = "";
    let lasPage = Math.ceil(numberOfElements /  global_pageLimit);
    if(page == 1) {
        v = "disabled";
    }
    if(page == lasPage)
        p = "disabled";
        
    
    let previous = `<li class='page-item'><a class='btn page-link ${v}' onclick="pressPrevious()" href='#'>Previous</a></li>`;
    unorderList.insertAdjacentHTML("beforeend", previous);

    for(let i = 0; i < (numberOfElements / global_pageLimit); i++) {
        let style ="";
        if((i + 1) == global_page_counter) {
            style = "background-color : black";
        }
        let element = `<li class='page-item'><a style="${style}" class='page-link' onclick="pressPageButton('${i + 1}')" href='#'>${i + 1}</a></li>`;
        unorderList.insertAdjacentHTML("beforeend", element);

    }
    let next = `<li class='page-item'><a class='btn page-link ${p}' onclick="pressNext()" href='#'>Next</a></li>`;
    unorderList.insertAdjacentHTML("beforeend", next);
}

function pressNext() {
    global_page_counter++;
    pressPageButton(global_page_counter);

}


function pressPrevious() {
    global_page_counter--;
    pressPageButton(global_page_counter);
    
}

function pressPageButton(page) {
    global_pageNumber = page ;
    global_page_counter = page;

    loadMain();// location.reload();
}


loadMain(global_pageLimit, global_pageNumber);