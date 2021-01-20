'use strict';

class View {

    constructor() {
        this.DOM = {
            buttonLogout: document.getElementById("button-log-out"),
            buttonFriends: document.getElementById("button-friends"),
            inputSearch: document.getElementById("input-search"),
            divFindResults: document.getElementById("div-find-results")
        }
    }

    redirect(url) {
        window.location.href = url;
    }
}