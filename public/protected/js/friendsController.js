'use strict';

const model = new Model();
const view = new View();

function init() {

    view.DOM.textFriendsCount.innerHTML = '0';

    model.getUser().then(response => {
        model.user = response.data;
        model.socket.emit('join', `friends:${model.user.username}`);

        model.friends = model.getFriends().then(res => {
            model.friends = res.data;
            view.displayUserAndFriends(model.user, model.friends);
        });
    });
}

view.DOM.buttonFind.addEventListener('click', async function (event) {

    event.preventDefault();
    view.redirect(model.URL_FIND_PAGE);
});

view.DOM.buttonLogout.addEventListener('click', async function (event) {

    event.preventDefault();
    await model.logout();
    view.redirect(model.URL_LOGIN_PAGE);
});

view.DOM.divFriends.addEventListener('click', async function (event) {

    const classes = event.target.className.split(/\s+/);
    if (!classes.includes('friend')) {
        return
    }

    let username = "";
    switch (event.target.tagName) {
        case 'A':
            username = event.target.querySelector('h1').innerHTML;
            break;
        case 'H1':
            username = event.target.innerHTML;
            break;
        case 'IMG':
            username = event.target.nextElementSibling.innerHTML;
            break;
    }

    console.log('username', username);
    view.redirect(`${model.URL_CHAT}?${username}`);
});

model.socket.on('friend', async function (friend) {
    view.displayFriend(friend);
});

init();
