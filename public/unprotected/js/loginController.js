'use strict';

const model = new Model();
const view = new View();

(function () {
    const now = new Date();
    view.DOM.spanYear.innerHTML = `${now.getFullYear()}`;
})();

view.DOM.buttonLogin.addEventListener('click', async function (event) {

    if (!view.loginFormIsValid()) {
        return;
    }

    event.preventDefault();
    const { email, password } = view.getLoginForms();
    const response = await model.login(email, password);

    if (response.status === 'success') {
        view.redirect(model.URL_FRIENDS_PAGE);
    } else {
        alert('Failed to log in! Invalid credentials!');
    }

});

view.DOM.buttonModalSubmit.addEventListener('click', async function (event) {

    if (!view.modalFormIsValid()) {
        return;
    }

    event.preventDefault();
    const { username, email, password } = view.getSignUpForms();
    const response = await model.signup(username, email, password);

    if (response.status === 'success') {
        alert(`Hi ${username}! You have successfully created a new account!`);
        view.closeSignUpModal();
        view.prefillLoginEmail(email);
    } else {
        alert('Failed to create an account! Given username or email may already be in use.');
    }
});

view.DOM.buttonModalClose.addEventListener('click', async function (event) {
    view.closeSignUpModal();
});

view.DOM.anchorKorean.addEventListener('click', async function (event) {

    event.preventDefault();
    view.changeLanguageToKorean();
});

view.DOM.anchorEnglish.addEventListener('click', async function (event) {

    event.preventDefault();
    view.changeLanguageToEnglish();
});

view.DOM.inputModalUsername.addEventListener('keypress', async function (event) {
    if (event.key === ' ') {
        event.preventDefault();
    }
});