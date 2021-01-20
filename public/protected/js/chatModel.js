'use strict';

class Model {

    constructor() {
        this.DOMAIN = 'http://localhost:3000';
        // this.DOMAIN = 'https://talkbokki.azurewebsites.net'
        this.URL_USER = `${this.DOMAIN}/api/messenger/user`;
        this.URL_MESSAGES = `${this.DOMAIN}/api/messenger/messages`;

        this.socket = io(this.DOMAIN, { query: { jwt: this.getjwt() } });
        this.friendUsername;
        this.username;
    }

    async getUser() {

        const data = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };

        const res = await fetch(this.URL_USER, data);
        return await res.json();
    }

    async getMessages() {

        const data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ friendUsername: this.friendUsername })
        };

        const res = await fetch(this.URL_MESSAGES, data);
        return await res.json();
    }

    getFriendUsername() {
        return location.search.substring(1);
    }

    getjwt() {
        const key = 'jwt';
        const cookies = document.cookie;
        const jwt = ('; ' + cookies)
            .split('; ' + key + '=')
            .pop()
            .split(';')
            .shift();

        return jwt;
    }

}