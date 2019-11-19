"use strict";

let reciever;
let giftId;
let pagenumber = 0;
let conversationWarper = document.getElementById('content-panel');
let messages = [];

function renderRecieverMessage(message){
    let html = `
    <div class="message-container reciever">
        <div class="reciever message">
            <div class="message-text-container">
                <p>${message.message}</p>
            </div>
        </div>
    </div>
    `;
    return html;
}

function renderSenderMessage (message){
    let html = `
        <div class="message-container sender">
            <div class="sender message">
                <div class="message-text-container">
                    <p>${message.message}</p>
                </div>
            </div>
        </div>
    `;
    return html;
}

function fetchMessages(){
    let url = `${BASE_URL}/chat?gift=${giftId}&_sort=id&_order=desc&_page=${pagenumber}&_limit=20`;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = (evt) => {
        if(xhr.status == 200){
            messages = JSON.stringify(xhr.response);
            messages.forEach(message, index => {
                if(message.sender == user.id){
                    renderSenderMessage(message)
                }else{
                    renderRecieverMessage(message);
                }
            });
        }
    }
    xhr.send();
}

function sendMessages(message){
    let url = `${BASE_URL}/chat`;
    let now = new Date().getTime();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = (evt) => {
        if(xhr.status == 201){
            console.log("Cool");
        }
    }
    xhr.send(JSON.stringify({
        "sender": user.id,
        "reciever": reciever,
        "message": message,
        "id": now 
    }));
}