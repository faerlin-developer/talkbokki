'use strict';

class Model {

    constructor() {
        this.DOMAIN = 'http://localhost:3000';
        // this.DOMAIN = 'https://talkbokki.azurewebsites.net'
        this.URL_SIGNUP = `${this.DOMAIN}/api/auth/signup`;
        this.URL_LOGIN = `${this.DOMAIN}/api/auth/login`;
        this.URL_FRIENDS = `${this.DOMAIN}/api/messenger/friends`;
        this.URL_FRIENDS_PAGE = `${this.DOMAIN}/friends.html`;
    }

    async signup(username, email, password) {

        const data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        };

        const res = await fetch(this.URL_SIGNUP, data);
        return await res.json();
    }

    async login(email, password) {

        const data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        };

        const res = await fetch(this.URL_LOGIN, data);
        return await res.json();
    }
}

