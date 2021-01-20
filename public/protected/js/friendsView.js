'use strict';

class View {

    constructor() {
        this.DOM = {
            textUsername: document.getElementById("text-username"),
            buttonLogout: document.getElementById("button-log-out"),
            buttonFind: document.getElementById("button-find"),
            divFriends: document.getElementById("div-friends"),
            textFriendsCount: document.getElementById("text-friends-count")
        }
    }

    displayUserAndFriends(user, friends) {
        this.DOM.textUsername.innerHTML = user.username;
        this.DOM.divFriends.insertAdjacentHTML.innerHTML = '';
        friends.forEach(friend => {
            this.displayFriend(friend);
        });
    }

    displayFriend(friend) {
        const html = `<a href="#" class="friend div-friends-friend w-inline-block">
        <img src="images/user-circle-regular.svg" loading="lazy" width="30" alt="" class="friend img-friends-friend">
        <h1 class="friend h1-friends-friend">${friend}</h1></a>`;
        this.DOM.divFriends.insertAdjacentHTML('beforeend', html);
        this.DOM.textFriendsCount.innerHTML = Number(this.DOM.textFriendsCount.innerHTML) + 1;
    }

    redirect(url) {
        window.location.href = url;
    }
}