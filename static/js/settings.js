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
// values
var community_v, phone_v, pass_v;

// listeners
phone_btn.addEventListener("click", phoneChange);
phone_btn_3.addEventListener("click", phoneCancel);

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
    phone.readOnly = false;
    phone_btn_hold.classList.replace("d-block", 'd-none');
    phone_btn_hold_2.classList.replace("d-none", 'd-block');
    phone_hold.style.width = "155px";
    phone_hold.getElementsByTagName("label")[0].classList.remove("underline");
    phone.focus();
}

function phoneCancel() {
    phone.readOnly = true;
    phone_btn_hold.classList.replace("d-none", 'd-block');
    phone_btn_hold_2.classList.replace("d-block", 'd-none');
    phone_hold.style.width = "225px";
    phone_hold.getElementsByTagName("label")[0].classList.add("underline");
    phone.blur();
    phone.value = phone_v;
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
