'use strict';

const model = new Model();
const view = new View();

function init() {

    model.getUser().then(response => {
        model.user = response.data;
        model.getFriends().then(res => {
            model.friends = res.data;
            console.log(model.friends);
        });
    });

    model.results = [];
}

view.DOM.buttonFriends.addEventListener('click', async function (event) {

    event.preventDefault();
    view.redirect(model.URL_FRIENDS_PAGE);
});

view.DOM.buttonLogout.addEventListener('click', async function (event) {

    event.preventDefault();
    await model.logout();
    view.redirect(model.URL_LOGIN_PAGE);
});

view.DOM.inputSearch.addEventListener('input', async function (event) {
    if (this.value) {
        model.socket.emit('find', this.value);
    } else {
        view.DOM.divFindResults.innerHTML = '';
    }
});

view.DOM.divFindResults.addEventListener('click', async function (event) {

    const classes = event.target.className.split(/\s+/);
    if (!classes.includes('find-result')) {
        return
    }

    let friendUsername = "";
    switch (event.target.tagName) {
        case 'A':
            friendUsername = event.target.querySelector('h1').innerHTML;
            break;
        case 'H1':
            friendUsername = event.target.innerHTML;
            break;
        case 'IMG':
            friendUsername = event.target.nextElementSibling.innerHTML;
            break;
    }

    if (model.friends.includes(friendUsername)) {
        return;
    }

    const response = await model.addFriend(friendUsername);
    if (response.status === 'success') {
        alert(`Successfully added ${friendUsername} as a friend!`);

        model.getFriends().then(res => {
            model.friends = res.data;
            displayFindResults(model.results);
            console.log(model.friends);
        });

    }
});

model.socket.on('error', async function (message) {
    console.log(message);
});

model.socket.on('find', async function (results) {
    displayFindResults(results);
});

function displayFindResults(results) {

    model.results = results;
    model.username2id = {};
    view.DOM.divFindResults.innerHTML = '';
    results.forEach(result => {

        let isFriend = '';
        let image = 'user-plus-solid.svg';
        let width = '30';
        let marginRight = '15';
        if (model.friends.includes(result.username)) {
            isFriend = '&nbsp&nbsp(friend)';
            image = 'user-solid.svg';
            width = '22';
            marginRight = '23';
        }

        if (model.user.username !== result.username) {
            const html = `<a href="#" class="find-result div-find-body-bottom-entry w-inline-block">
                          <img src="images/${image}" loading="lazy" width="${width}" alt="" 
                                class="find-result img-friends-friend" style="margin-right: ${marginRight}px;">
                          <h1 class="find-result h1-friends-friend">${result.username}</h1>${isFriend}</a>`;
            view.DOM.divFindResults.insertAdjacentHTML('beforeend', html);
        }
    });
}

init();