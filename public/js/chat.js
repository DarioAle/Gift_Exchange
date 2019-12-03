"use strict";

let reciever;
let postId = 4;
let pagenumber = 0;
let conversationWarper = document.getElementById('message-warp');
let messages = [];
let btnSend = document.getElementById('btn-message-send');
let timeId = 0;
let conversationsWarper = document.getElementById('conversations-warper');

function renderRecieverMessage(message) {
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

function renderSenderMessage(message) {
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

function renderConversation(entry) {
    let html = `
    <li class="contact" data-post-id="${entry.id}">
                    <div>
                        <div class="contact-image-warpper">
                            <img src="${ ""}" alt="${entry.nombrePost}" />
                        </div>
                        <div class="contact-text-warpper metadata">
                            <p class="contact-name"><strong>${entry.nombrePost}</strong></p>
                            <p class="contact-preview">${entry.lastMessage}</p>
                        </div>
                    </div>
                </li>
    `;
    return html;
}

function fetchMessages() {
    let url = `${BASE_URL}/chat/${postId}?timestamp=${timeId}`;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('x-auth', sessionStorage.getItem('token'));
    xhr.onload = (evt) => {
        if (xhr.status == 200) {
            messages = JSON.parse(xhr.response);
            messages.forEach((message, index) => {

                /*
                if(message.sender == user.usuario){
                    conversationWarper.innerHTML += renderSenderMessage(message)
                }else{
                    conversationWarper.innerHTML += renderRecieverMessage(message);
                }
                */
                conversationWarper.innerHTML += renderRecieverMessage(message);
                timeId = timeId > message.timeId ? timeId : message.timeId;
                console.log(timeId);
            });
        } else if (xhr.status == 401) {
            alert("Unauth");
        }
        setTimeout(fetchMessages, 5000);
    }
    xhr.send();
}

function fetchConversations() {
    let url = `${BASE_URL}/chat`;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    console.log("Fetch conversations");
    xhr.setRequestHeader('x-auth', sessionStorage.getItem('token'));
    xhr.onload = (evt) => {
        if (xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);
            data.forEach((value, index) => {
                console.log(value);
                conversationsWarper.innerHTML += renderConversation(value);
            });
            let contacts = document.getElementsByClassName('contact');
            for (let i = 0; i < contacts.length; i++) {
                contacts[i].addEventListener('click', onContactClick);
            }
        } else if (xhr.status == 401) {
            alert("Unauth");
        }
    }
    xhr.send();
}

function sendMessages(message) {
    let url = `${BASE_URL}/chat`;
    let now = new Date().getTime();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = (evt) => {
        if (xhr.status == 201) {
            console.log("Cool");
        }
    }
    xhr.send(JSON.stringify({
        "sender": user.id,
        "reciever": reciever,
        "message": message,
        "gift": giftId,
        "id": now
    }));
}

function onContactClick(evt) {
    let element = event.target.closest(".contact");
    console.log(element);
    postId = element.getAttribute('data-post-id');
    console.log(postId);
    timeId = 0;
    conversationWarper.innerHTML = "";
    fetchMessages();
}

function onMessageSned(evt) {
    evt.preventDefault();
    sendMessages(document.getElementById('in-message-text').value);
}

btnSend.addEventListener('click', onMessageSned);

fetchConversations();