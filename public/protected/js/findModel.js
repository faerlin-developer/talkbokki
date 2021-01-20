'use strict';

class Model {

    constructor() {
        // this.DOMAIN = 'http://localhost:3000';
        this.DOMAIN = '';
        this.URL_LOGOUT = `${this.DOMAIN}/api/auth/logout`;
        this.URL_USER = `${this.DOMAIN}/api/messenger/user`;
        this.URL_FRIENDS = `${this.DOMAIN}/api/messenger/friends`;
        this.URL_ADD_FRIEND = `${this.DOMAIN}/api/messenger/addfriend`;
        this.URL_LOGIN_PAGE = `${this.DOMAIN}/login.html`;
        this.URL_FRIENDS_PAGE = `${this.DOMAIN}/friends.html`;
        this.URL_FIND_PAGE = `${this.DOMAIN}/find.html`;

        this.socket = io(this.DOMAIN, { query: { jwt: this.getjwt() } });
        this.username2id;
        this.user;
        this.results;
        this.friends;
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

    async getFriends() {

        const data = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };

        const res = await fetch(this.URL_FRIENDS, data);
        return await res.json();
    }

    async addFriend(friendUsername) {

        const data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ friendUsername })
        };

        const res = await fetch(this.URL_ADD_FRIEND, data);
        return await res.json();
    }

    async logout() {

        const data = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };

        const res = await fetch(this.URL_LOGOUT, data);
        return await res.json();
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