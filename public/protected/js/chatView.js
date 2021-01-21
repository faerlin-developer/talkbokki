'use strict';

class View {

    constructor() {
        this.DOM = {
            divChat: document.getElementById('div-chat'),
            inputMessage: document.getElementById('input-message'),
            buttonSend: document.getElementById('button-send'),
            divFriendUsername: document.getElementById('div-username'),
            body: document.getElementById('body')
        }

        this.mostRecentMessageIsUser = true;
    }

    getMessage() {
        const message = this.DOM.inputMessage.value.trim();
        this.DOM.inputMessage.value = '';
        return message;
    }

    setFriendUsername(username) {
        this.DOM.divFriendUsername.innerHTML = username;
    }

    displayMessage(message, username, friendUsername) {
        let html = '';
        if (message.from === username) {
            html = `<div class="div-chat-user"><div class="div-chat-user-text">
                        <div class="text-chat-user">${message.message}</div></div></div>`;
            this.mostRecentMessageIsUser = true;
        } else {
            if (this.mostRecentMessageIsUser) {
                html = `<div class="div-chat-friend"><div class="div-chat-friend-header">
                            <img src="images/user-circle-regular.svg" loading="lazy" width="25" alt="" class="img-chat-friend-header">
                            <div class="text-chat-friend-header">${friendUsername}</div></div></div>`;
                this.mostRecentMessageIsUser = false;
            }
            html += `<div class="div-chat-friend"><div class="div-chat-friend-text">
                         <div class="text-block-6">${message.message}</div></div></div>`;
        }
        this.DOM.divChat.insertAdjacentHTML('beforeend', html);
        this.DOM.body.scrollTop = this.DOM.body.scrollHeight;

    }

    displayMessages(messages, username, friendUsername) {

        this.DOM.divChat.innerHTML = '';
        messages.forEach(message => {
            this.displayMessage(message, username, friendUsername);
        });
    }

    redirect(url) {
        window.location.href = url;
    }
}