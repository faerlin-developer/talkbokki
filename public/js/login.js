'use strict';

/*********
 * Model *
 *********/

class Model {

    constructor() {

    }

}

/********
 * View *
 ********/

class View {

    constructor() {

        this.DOM = {
            spanYear: document.getElementById("span-year"),
            hSubtitle: document.getElementById("h-subtitle"),

            formLogin: document.getElementById("form-login"),
            inputEmail: document.getElementById("input-email"),
            inputPassword: document.getElementById("input-password"),
            buttonLogin: document.getElementById("btn-login"),
            buttonCreate: document.getElementById("btn-create"),
            cardFooter: document.getElementById("card-footer"),

            anchorKorean: document.getElementById("anchorKorean"),
            anchorEnglish: document.getElementById("anchorEnglish"),

            formModal: document.getElementById("form-modal"),
            hModalTitle: document.getElementById("h-modal-title"),
            labelModalUsername: document.getElementById("label-modal-username"),
            labelModalEmail: document.getElementById("label-modal-email"),
            labelModalPassword: document.getElementById("label-modal-password"),
            labelModalConfirmPassword: document.getElementById("label-modal-confirmPassword"),
            buttonModalSubmit: document.getElementById("btn-modal-submit"),
        };

        this.message = {
            english: {
                hSubtitle: "Connect with the world on talkbokki.",
                inputEmail: "Email",
                inputPassword: "Password",
                buttonLogin: "Login",
                buttonCreate: "Create New Account",
                cardFooter: "<strong>Chat</strong> with friends, family and co-workers.",
                hModalTitle: "Sign Up!",
                labelModalUsername: "Username",
                labelModalEmail: "Email",
                labelModalPassword: "Password",
                labelModalConfirmPassword: "Confirm Password",
                buttonModalSubmit: "Submit",
            },
            korean: {

            }
        }
    }

    /*


    view.DOM.hSubtitle.innerHTML = "Connect with the world on talkbokki.";

    view.DOM.inputEmail.placeholder = "Email";
    view.DOM.inputPassword.placeholder = "Password";
    view.DOM.buttonLogin.innerHTML = "Login";
    view.DOM.buttonCreate.innerHTML = "Create New Account";
    view.DOM.cardFooter.innerHTML = "<strong>Chat</strong> with friends, family and co-workers.";

    view.DOM.hModalTitle.innerHTML = "Sign Up!";
    view.DOM.labelModalUsername.innerHTML = "Username";
    view.DOM.labelModalEmail.innerHTML = "Email";
    view.DOM.labelModalPassword.innerHTML = "Password";
    view.DOM.labelModalConfirmPassword.innerHTML = "Confirm Password";
    view.DOM.buttonModalSubmit.innerHTML = "Submit";

    */

}

/**************
 * Controller *
 **************/

const model = new Model();
const view = new View();

// Get the current year for the copyright
(function () {
    const now = new Date();
    view.DOM.spanYear.innerHTML = `${now.getFullYear()}`;
})();

view.DOM.buttonLogin.addEventListener('click', function (event) {
    if (view.DOM.formLogin.checkValidity()) {
        event.preventDefault();
        console.log("valid");
    } else {
        console.log("not valid")
    }
});

view.DOM.buttonModalSubmit.addEventListener('click', function (event) {
    if (view.DOM.formModal.checkValidity()) {
        console.log("valid");
        event.preventDefault();
    } else {
        console.log("not valid")
    }
});

view.DOM.anchorKorean.addEventListener('click', function (event) {

    event.preventDefault();
    view.DOM.hSubtitle.innerHTML = "Talkbokki에서 월드와 연결합니다.";

    view.DOM.inputEmail.placeholder = "이메일";
    view.DOM.inputPassword.placeholder = "비밀번호";
    view.DOM.buttonLogin.innerHTML = "로그인";
    view.DOM.buttonCreate.innerHTML = "새 계정 만들기";
    view.DOM.cardFooter.innerHTML = "친구, 가족 및 동료와 <strong>대화합니다</strong>.";

    view.DOM.hModalTitle.innerHTML = "새 계정 만들기";
    view.DOM.labelModalUsername.innerHTML = "사용자이름";
    view.DOM.labelModalEmail.innerHTML = "이메일";
    view.DOM.labelModalPassword.innerHTML = "비밀번호";
    view.DOM.labelModalConfirmPassword.innerHTML = "비밀번호를 확인하다";
    view.DOM.buttonModalSubmit.innerHTML = "가입하기";
});

view.DOM.anchorEnglish.addEventListener('click', function (event) {

    event.preventDefault();
    view.DOM.hSubtitle.innerHTML = view.message.english.hSubtitle;

    view.DOM.inputEmail.placeholder = view.message.english.inputEmail;
    view.DOM.inputPassword.placeholder = view.message.english.inputPassword;
    view.DOM.buttonLogin.innerHTML = view.message.english.buttonLogin;
    view.DOM.buttonCreate.innerHTML = view.message.english.buttonCreate;
    view.DOM.cardFooter.innerHTML = view.message.english.cardFooter;

    view.DOM.hModalTitle.innerHTML = view.message.english.hModalTitle;
    view.DOM.labelModalUsername.innerHTML = view.message.english.labelModalUsername;
    view.DOM.labelModalEmail.innerHTML = view.message.english.labelModalEmail;
    view.DOM.labelModalPassword.innerHTML = view.message.english.labelModalPassword;
    view.DOM.labelModalConfirmPassword.innerHTML = view.message.english.labelModalConfirmPassword;
    view.DOM.buttonModalSubmit.innerHTML = view.message.english.buttonModalSubmit;
});
