"use strict";

// TODO: Get render sender and reciever

let sender;
let reciever;
let postId = 4;
let pagenumber = 0;
let conversationWarper = document.getElementById('message-warp');
let messages = [];
let btnSend = document.getElementById('btn-message-send');
let timeId = 0;
let conversationsWarper = document.getElementById('conversations-warper');
let timeoutFun;
let score = 5;
let postName;

let finalyModaNameSpan = document.getElementById('finaly-moda-name-span');
let finalyBtnConfirm = document.getElementById('finaly-btn-confirm');

function onConfirmClick(evt) {
    clearTimeout(timeoutFun);
    $("#finaly-modal").modal('hide');
    let xhr = new XMLHttpRequest();
    xhr.open('PATCH', `${BASE_URL}/posts/p/${postId}/finalize`);
    xhr.setRequestHeader('x-auth', sessionStorage.getItem('token'));
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = (evt) => {
        if (xhr.status == 200) {
            conversationWarper.innerHTML = "";
            document.getElementById('btn-message-close').hidden = true;
            fetchConversations();
        }
    }
    score = document.querySelector('input[type="radio"]:checked').value || 5;
    console.log(score);
    xhr.send(JSON.stringify({
        postId,
        score
    }));
}

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
    <li class="contact" data-post-id="${entry.id}" data-post-name="${entry.nombrePost}" data-post-owner="${entry.owner}" data-post-aquired-by="${entry.aquiredBy}">
                    <div>
                        <div class="contact-image-warpper">
                            <img src="${entry.image[0]}" alt="${entry.nombrePost}" />
                        </div>
                        <div class="contact-text-warpper metadata">
                            <p class="contact-name"><strong>${entry.nombrePost}</strong></p>
                            <p class="contact-preview">${""}</p>
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
                if (message.sender == user.usuario) {
                    conversationWarper.innerHTML += renderSenderMessage(message)
                } else {
                    conversationWarper.innerHTML += renderRecieverMessage(message);
                }

                timeId = timeId > message.timeId ? timeId : message.timeId;
                console.log(timeId);
            });
            timeoutFun = setTimeout(fetchMessages, 500);
            conversationWarper.scrollTop = conversationWarper.scrollHeight;
        } else if (xhr.status == 401) {
            alert("Unauth");
        }
    }
    xhr.send();
}

function fetchConversations() {
    let url = `${BASE_URL}/chat`;
    let xhr = new XMLHttpRequest();
    conversationsWarper.innerHTML = "";
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
    let url = `${BASE_URL}/chat/${postId}`;
    let now = new Date().getTime();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('x-auth', sessionStorage.getItem('token'));
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = (evt) => {
        if (xhr.status == 201) {
            console.log("Cool");
            document.getElementById('in-message-text').value = "";
        }
    }
    let timeId = new Date().getTime();
    let newMsg = {
        "reciever": reciever,
        "sender": sender,
        "message": message,
        "post": postId,
        "timestamp": timeId
    };
    timeId += 1;
    xhr.send(JSON.stringify(newMsg));
}

function onContactClick(evt) {
    let element = event.target.closest(".contact");
    console.log(element);
    postId = element.getAttribute('data-post-id');
    sender = user.usuario;
    reciever = element.getAttribute('data-post-owner') == sender ? element.getAttribute('data-post-aquired-by') : element.getAttribute('data-post-owner');
    console.log(postId);
    timeId = 0;
    conversationWarper.innerHTML = "";
    console.log(sender, reciever);
    if(sender != element.getAttribute('data-post-owner')){
        document.getElementById('btn-message-close').hidden = false;
    }
    finalyModaNameSpan.innerText = element.getAttribute('data-post-name');
    fetchMessages();
}

function onMessageSned(evt) {
    evt.preventDefault();
    sendMessages(document.getElementById('in-message-text').value);
}

btnSend.addEventListener('click', onMessageSned);
finalyBtnConfirm.addEventListener('click', onConfirmClick);
document.getElementById('btn-message-close').addEventListener('click', (evt) => {
    $("#finaly-modal").modal('show');
})

fetchConversations();