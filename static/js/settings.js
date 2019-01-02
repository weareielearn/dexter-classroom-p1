// init ui
// username
var username = document.getElementById("username").value;
// community components
var community_hold = document.getElementById("community_hold");
var community = document.getElementById("community");
var community_btn_hold = document.getElementById("community_btn_hold");
var community_btn = document.getElementById("community_btn");
var community_btn_hold_2 = document.getElementById("community_btn_hold_2");
var community_btn_2 = document.getElementById("community_btn_2");
var community_btn_3 = document.getElementById("community_btn_3");
// password components
var password_hold = document.getElementById("password_hold");
var password = document.getElementById("password");
var password_btn_hold = document.getElementById("password_btn_hold");
var password_btn = document.getElementById("password_btn");
var password_btn_hold_2 = document.getElementById("password_btn_hold_2");
var password_btn_2 = document.getElementById("password_btn_2");
var password_btn_3 = document.getElementById("password_btn_3");
// phone components
var phone_hold = document.getElementById("phone_hold");
var phone = document.getElementById("phone");
var phone_btn_hold = document.getElementById("phone_btn_hold");
var phone_btn = document.getElementById("phone_btn");
var phone_btn_hold_2 = document.getElementById("phone_btn_hold_2");
var phone_btn_2 = document.getElementById("phone_btn_2");
var phone_btn_3 = document.getElementById("phone_btn_3");
var phone_btn_ver = document.getElementById("phone_btn_ver");
// values
var community_v, phone_v, pass_v, phone_t, phone_veri;

// listeners
phone_btn.addEventListener("click", phoneChange);
phone_btn_3.addEventListener("click", phoneCancel);
phone_btn_2.addEventListener("click", phoneSave);
phone_btn_ver.addEventListener("click", onVerifyCodeSubmit_d);


community_btn.addEventListener("click", communityChange);
community_btn_3.addEventListener("click", communityCancel);
community_btn_2.addEventListener("click", checkCommunityCode_d);


password_btn.addEventListener("click", passwordChange);
password_btn_3.addEventListener("click", passwordCancel);
password_btn_2.addEventListener("click", onPassSave_dash);

// window onload
init_settings();

// functions
function init_settings() {
    var ref = firebase.database().ref("users/" + username);
    ref.once("value")
        .then(function (snapshot) {
            pass_v = password.value = snapshot.val().password
            community_v = community.value = snapshot.val().community
            phone_v = phone.value = snapshot.val().phone
        });
}

// community
function communityChange() {
    community.readOnly = false;
    community_btn_hold.classList.replace("d-block", 'd-none');
    community_btn_hold_2.classList.replace("d-none", 'd-block');
    community_hold.style.width = "155px";
    community_hold.getElementsByTagName("label")[0].classList.remove("underline");
    community.focus();
}

function communityCancel() {
    community.readOnly = true;
    community_btn_hold.classList.replace("d-none", 'd-block');
    community_btn_hold_2.classList.replace("d-block", 'd-none');
    community_hold.style.width = "225px";
    community_hold.getElementsByTagName("label")[0].classList.add("underline");
    community.blur();
    community.value = community_v;
    document.getElementById("community_err_dash").classList.replace("d-block", 'd-none');
}

// phone
function phoneChange() {
    phone.type = "number"
    phone.readOnly = false;
    phone_btn_hold.classList.replace("d-block", 'd-none');
    phone_btn_hold_2.classList.replace("d-none", 'd-block');
    phone_hold.style.width = "155px";
    phone_hold.getElementsByTagName("label")[0].classList.remove("underline");
    phone.focus();
}

function phoneCancel() {
    document.getElementById('phone_cross_dash').classList.replace('d-block', 'd-none');
    phone.readOnly = true;
    phone_btn_hold.classList.replace("d-none", 'd-block');
    phone_btn_hold_2.classList.replace("d-block", 'd-none');
    phone_hold.style.width = "225px";
    phone_hold.getElementsByTagName("label")[0].classList.add("underline");
    phone.blur();
    phone.type = "text";
    phone.value = phone_v;

    document.getElementById('phone_cross_dash').classList.replace('d-block', 'd-none');
    phone_btn_ver.classList.add("d-none");
    document.getElementById('phone_l').innerHTML = "Phone number"
    phone_btn_2.classList.remove("d-none");
    phone.style.paddingLeft = "30px";
    phone.disabled = false;
    phone_btn_ver.disabled = false;
    document.getElementById('country_code').classList.remove("d-none");
}

// password
function passwordChange() {
    password.readOnly = false;
    password_btn_hold.classList.replace("d-block", 'd-none');
    password_btn_hold_2.classList.replace("d-none", 'd-block');
    password_hold.style.width = "155px";
    password_hold.getElementsByTagName("label")[0].classList.remove("underline");
    password.focus();
}

function passwordCancel() {
    password.readOnly = true;
    password_btn_hold.classList.replace("d-none", 'd-block');
    password_btn_hold_2.classList.replace("d-block", 'd-none');
    password_hold.style.width = "225px";
    password_hold.getElementsByTagName("label")[0].classList.add("underline");
    password.blur();
    password.value = pass_v;
    document.getElementById("p_cross_d").classList.replace("d-block", 'd-none');
}

function checkCommunityCode_d() {
    community.disabled = true;
    community_btn_2.disabled = true;
    var code = community.value.toUpperCase().replace(' ', "");
    var ref = firebase.database().ref("codes/" + code.slice(0, 4) + "/subcodes/" + code);
    ref.once("value")
        .then(function (snapshot) {
            if (snapshot.exists()) {
                // correct code
                community.disabled = false;
                community_btn_2.disabled = false;
                communityCancel();
                firebase.database().ref("users/" + username).update({ community: code });
                community.value = code;
                document.getElementById("community_err_dash").classList.replace("d-block", 'd-none');
                community_v = code;
                // add snack bar later
            } else {
                // wrong code
                document.getElementById("community_err_dash").classList.replace("d-none", 'd-block');
                community.disabled = false;
                community_btn_2.disabled = false;
            }
        });
}

function onPassSave_dash() {
    password.disabled = true;
    password_btn_2.disabled = true;
    var p = password.value;
    if (p.length < 8) {
        password.disabled = false;
        password_btn_2.disabled = false;
        document.getElementById('p_cross_d').classList.replace('d-none', 'd-block');
    }
    else {
        firebase.database().ref("users/" + username).update({ password: p });
        password.value = p;
        pass_v = p;
        document.getElementById('p_cross_d').classList.replace('d-block', 'd-none');
        password.disabled = false;
        password_btn_2.disabled = false;
        passwordCancel();
    }
}

function phoneSave() {
    phone.disabled = true;
    password_btn_2.disabled = true;
    var p = phone.value;
    if (p.length < 10) {
        phone.disabled = false;
        phone_btn_2.disabled = false;
        document.getElementById('phone_cross_dash').classList.replace('d-none', 'd-block');
    }
    else {
        phone.type = "number"
        phone_t = "+91" + phone.value;
        document.getElementById("sign-in-button_offic_2").click();
    }
}

// auth
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
        }
    });
    window.recaptchaVerifier_d = new firebase.auth.RecaptchaVerifier('sign-in-button_offic_2', {
        'size': 'invisible',
        'callback': function (response) {
            onSignInSubmit_d();
        }
    });
    recaptchaVerifier_d.render().then(function (widgetId) {
        window.recaptchaWidgetId = widgetId;
        phone.disabled = false;
    });
};

function onSignInSubmit_d() {
    if (isPhoneNumberValid_d()) {
        phone.disabled = true;
        phone_btn_2.disabled = true;
        var phoneNumber = phone_t;
        var appVerifier = window.recaptchaVerifier_d;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
                // SMS sent. Prompt user to type the code from the message, then sign the
                window.confirmationResult = confirmationResult;
                console.log("Sms sent for verification");
                // 
                phone.disabled = false;
                document.getElementById('phone_cross_dash').classList.replace('d-block', 'd-none');
                phone_btn_ver.classList.remove("d-none");
                document.getElementById('phone_l').innerHTML = "Code"
                phone_btn_2.classList.add("d-none");
                phone.style.paddingLeft = "0px";
                phone_btn_2.disabled = false;
                document.getElementById('country_code').classList.add("d-none");
                phone_t = "+91" + phone.value;
                phone.value = "";
                phone.focus();

            }).catch(function (error) {
                // Error; SMS not sent
                alert("sms not send");
                console.error('Error during signInWithPhoneNumber', error);
                window.signingIn = false;
                // handle later
            });
    }
}

function onSignOutClick() {
    firebase.auth().signOut();
}

function onVerifyCodeSubmit_d() {
    phone_btn_ver.disabled = true;
    phone.disabled = true;
    if (phone.value.replace(" ", "") != "") {
        if (!!getCodeFromUserInput_h()) {
            window.verifyingCode = true;
            var code = getCodeFromUserInput_h();
            confirmationResult.confirm(code).then(function (result) {
                // User signed in successfully.
                phone_v = phone_t.slice(3, phone_t.length);
                firebase.database().ref("users/" + username).update({ phone: phone_t.slice(3, phone_t.length) });
                phoneCancel();

            }).catch(function (error) {
                // User couldn't sign in (bad verification code?)
                console.error('Error while checking the verification code', error);
                window.verifyingCode = false;
                document.getElementById("phone_cross_dash").classList.replace("d-none", "d-block");
                phone_btn_ver.disabled = false;
                phone.disabled = false;
                document.getElementById("err_phone").innerHTML = "Invalid verification code";

            });
        }
    }
    else {
        document.getElementById("phone_cross_dash").classList.replace("d-none", "d-block");
        phone_btn_ver.disabled = false;
        phone.disabled = false;
        document.getElementById("err_phone").innerHTML = "Invalid verification code";
        // add later
    }
}

function getCodeFromUserInput_h() {
    return phone.value;
}


function isPhoneNumberValid_d() {
    var pattern = /^\+[0-9\s\-\(\)]+$/;
    var phoneNumber = phone_t;
    return phoneNumber.search(pattern) !== -1;
}