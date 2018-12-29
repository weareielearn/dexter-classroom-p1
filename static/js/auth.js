// init ui
var ph_holder = document.getElementById("ph_holder");
var ph_btn_holder = document.getElementById("ph_btn_holder");
var ver_holder = document.getElementById("ver_holder");
var ver_btn_holder = document.getElementById("ver_btn_holder");

var btn_ph_ver = document.getElementById("btn_ph_ver");
var btn_cancel = document.getElementById("btn_cancel");
var ver_code_btn = document.getElementById("ver_code_btn");

var phone_number =  document.getElementById('phone-number');
var ver_code = document.getElementById("ver_code");

// listeners
// btn_ph_ver.addEventListener('click', showVerification);
// btn_cancel.addEventListener('click', hideVerification);
ver_code_btn.addEventListener('click', onVerifyCodeSubmit);
btn_cancel.addEventListener('click', cancelVerification);
btn_ph_ver.addEventListener('click', signin_gate);

// functions
function showVerification() {
    ph_btn_holder.classList.replace("d-block", "d-none")
    ph_holder.classList.replace("d-block", "d-none")

    ver_btn_holder.classList.replace("d-none", "d-block")
    ver_holder.classList.replace("d-none", "d-block")
}

function hideVerification() {
    ver_btn_holder.classList.replace("d-block", "d-none")
    ver_holder.classList.replace("d-block", "d-none")

    ph_btn_holder.classList.replace("d-none", "d-block")
    ph_holder.classList.replace("d-none", "d-block")
}

function signin_gate() {
    var phoneNumber = getPhoneNumberFromUserInput();
    if (isPhoneNumberValid() && phoneNumber.length === 13) {
        document.getElementById('sign-in-button_offic').click();
    }
    else {
        alert("not valid");
    }
}

function cancelVerification(e) {
    e.preventDefault();
    window.confirmationResult = null;
    hideVerification();
    phone_number.disabled = false;
}

function getPhoneNumberFromUserInput() {
    return '+91' + phone_number.value;
}

function resetReCaptcha() {
    if (typeof grecaptcha !== 'undefined'
        && typeof window.recaptchaWidgetId !== 'undefined') {
        grecaptcha.reset(window.recaptchaWidgetId);
    }
}

function isPhoneNumberValid() {
    var pattern = /^\+[0-9\s\-\(\)]+$/;
    var phoneNumber = getPhoneNumberFromUserInput();
    return phoneNumber.search(pattern) !== -1;
}

function getCodeFromUserInput() {
    return ver_code.value;
}

function onSignInSubmit() {
    if (isPhoneNumberValid()) {
        window.signingIn = true;
        btn_ph_ver.disabled = true;
        phone_number.disabled = true;
        var phoneNumber = getPhoneNumberFromUserInput();
        var appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
                // SMS sent. Prompt user to type the code from the message, then sign the
                window.confirmationResult = confirmationResult;
                window.signingIn = false;
                console.log("Sms sent for verification");
                showVerification();
                btn_ph_ver.disabled = false;
                phone_number.disabled = false;
                ver_code.disabled = false;
            }).catch(function (error) {
                // Error; SMS not sent
                console.error('Error during signInWithPhoneNumber', error);
                window.signingIn = false;
            });
    }
}

function onSignOutClick() {
    firebase.auth().signOut();
}

function onVerifyCodeSubmit() {
    if (!!getCodeFromUserInput()) {
        window.verifyingCode = true;
        ver_code_btn.disabled = true;
        ver_code.disabled = true;
        var code = getCodeFromUserInput();
        confirmationResult.confirm(code).then(function (result) {
            // User signed in successfully.
            var user = result.user;
            window.verifyingCode = false;
            window.confirmationResult = null;
            console.log("Successful verification")
            onSignOutClick();
            hideVerification();
            ver_code_btn.disabled = false;
            ver_code.disabled = false;
            phone_number.disabled = true;
            phoneVerified();
            // add button code later
        }).catch(function (error) {
            // User couldn't sign in (bad verification code?)
            console.error('Error while checking the verification code', error);
            window.verifyingCode = false;
        });
    }
}

window.onload = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var uid = user.uid;
            var email = user.email;
            var photoURL = user.photoURL;
            var phoneNumber = user.phoneNumber;
            var isAnonymous = user.isAnonymous;
            var displayName = user.displayName;
            var providerData = user.providerData;
            var emailVerified = user.emailVerified;
            alert("Signin successful onload")
        }
    });
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button_offic', {
        'size': 'invisible',
        'callback': function (response) {
            onSignInSubmit();
        }
    });
    recaptchaVerifier.render().then(function (widgetId) {
        window.recaptchaWidgetId = widgetId;
        phone_number.disabled = false;
    });
};

function phoneVerified() {
    ph_btn_holder.classList.replace('d-block', 'd-none');
    ph_holder.classList.replace('w-75', 'w-100');
    document.getElementById('ph_check').classList.replace('d-none', 'd-block');
}