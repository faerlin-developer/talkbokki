'use strict';

const model = new Model();
const view = new View();

function init() {

    model.getUser().then(response => {

        model.username = response.data.username;

        model.friendUsername = model.getFriendUsername();
        view.setFriendUsername(model.friendUsername);

        model.socket.emit('join', `chat:${model.username}`);

        model.getMessages().then(response => {
            const messages = response.data;
            view.displayMessages(messages, model.username, model.friendUsername);
        });
    });
}

/*
view.DOM.buttonSend.addEventListener('click', async function (event) {

    event.preventDefault();
    const message = view.getMessage();
    model.socket.emit('message', { from: model.username, to: model.friendUsername, message: message });
})
*/

view.DOM.inputMessage.addEventListener('keypress', async function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const message = view.getMessage();
        if (message !== '') {
            model.socket.emit('message', { from: model.username, to: model.friendUsername, message: message });
        }
    }
});

model.socket.on('message', async function (message) {
    view.displayMessage(message, model.username, model.friendUsername);
});

init();