'use strict';

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
            inputModalUsername: document.getElementById("input-modal-username"),
            labelModalEmail: document.getElementById("label-modal-email"),
            inputModalEmail: document.getElementById("input-modal-email"),
            labelModalPassword: document.getElementById("label-modal-password"),
            inputModalPassword: document.getElementById("input-modal-password"),
            labelModalConfirmPassword: document.getElementById("label-modal-confirmPassword"),
            inputModalConfirmPassword: document.getElementById("input-modal-confirmPassword"),
            buttonModalSubmit: document.getElementById("btn-modal-submit"),
            buttonModalClose: document.getElementById('button-modal-close'),
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
                hSubtitle: "Talkbokki에서 월드와 연결합니다.",
                inputEmail: "이메일",
                inputPassword: "비밀번호",
                buttonLogin: "로그인",
                buttonCreate: "새 계정 만들기",
                cardFooter: "친구, 가족 및 동료와 <strong>대화합니다</strong>.",
                hModalTitle: "새 계정 만들기",
                labelModalUsername: "사용자이름",
                labelModalEmail: "이메일",
                labelModalPassword: "비밀번호",
                labelModalConfirmPassword: "비밀번호를 확인하다",
                buttonModalSubmit: "가입하기",
            }
        }
    }

    changeLanguageToEnglish() {

        this.DOM.hSubtitle.innerHTML = this.message.english.hSubtitle;
        this.DOM.inputEmail.placeholder = this.message.english.inputEmail;
        this.DOM.inputPassword.placeholder = this.message.english.inputPassword;
        this.DOM.buttonLogin.innerHTML = this.message.english.buttonLogin;
        this.DOM.buttonCreate.innerHTML = this.message.english.buttonCreate;
        this.DOM.cardFooter.innerHTML = this.message.english.cardFooter;
        this.DOM.hModalTitle.innerHTML = this.message.english.hModalTitle;
        this.DOM.labelModalUsername.innerHTML = this.message.english.labelModalUsername;
        this.DOM.labelModalEmail.innerHTML = this.message.english.labelModalEmail;
        this.DOM.labelModalPassword.innerHTML = this.message.english.labelModalPassword;
        this.DOM.labelModalConfirmPassword.innerHTML = this.message.english.labelModalConfirmPassword;
        this.DOM.buttonModalSubmit.innerHTML = this.message.english.buttonModalSubmit;
    }

    changeLanguageToKorean() {

        this.DOM.hSubtitle.innerHTML = this.message.korean.hSubtitle;
        this.DOM.inputEmail.placeholder = this.message.korean.inputEmail;
        this.DOM.inputPassword.placeholder = this.message.korean.inputPassword;
        this.DOM.buttonLogin.innerHTML = this.message.korean.buttonLogin;
        this.DOM.buttonCreate.innerHTML = this.message.korean.buttonCreate;
        this.DOM.cardFooter.innerHTML = this.message.korean.cardFooter;
        this.DOM.hModalTitle.innerHTML = this.message.korean.hModalTitle;
        this.DOM.labelModalUsername.innerHTML = this.message.korean.labelModalUsername;
        this.DOM.labelModalEmail.innerHTML = this.message.korean.labelModalEmail;
        this.DOM.labelModalPassword.innerHTML = this.message.korean.labelModalPassword;
        this.DOM.labelModalConfirmPassword.innerHTML = this.message.korean.labelModalConfirmPassword;
        this.DOM.buttonModalSubmit.innerHTML = this.message.korean.buttonModalSubmit;
    }

    getLoginForms() {
        const email = this.DOM.inputEmail.value;
        const password = this.DOM.inputPassword.value;
        return { email, password };
    }

    getSignUpForms() {
        const username = this.DOM.inputModalUsername.value;
        const email = this.DOM.inputModalEmail.value;
        const password = this.DOM.inputModalPassword.value;
        return { username, email, password };
    }

    closeSignUpModal() {
        this.clearModalForms();
        $('#contactModal').modal('hide');
    }

    clearModalForms() {
        this.DOM.inputModalUsername.value = "";
        this.DOM.inputModalEmail.value = "";
        this.DOM.inputModalPassword.value = "";
        this.DOM.inputModalConfirmPassword.value = "";
    }

    prefillLoginEmail(email) {
        this.DOM.inputEmail.value = email;
    }

    modalFormIsValid() {
        return this.DOM.formModal.checkValidity();
    }

    loginFormIsValid() {
        return this.DOM.formLogin.checkValidity();
    }

    redirect(url) {
        window.location.href = url;
    }

}