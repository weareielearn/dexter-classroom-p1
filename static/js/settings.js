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

// window onload
init_settings();

function init_settings() {
    var ref = firebase.database().ref("users/" + username);
    ref.once("value")
        .then(function (snapshot) {
            password.value = snapshot.val().password
            community.value = snapshot.val().community
            phone.value = snapshot.val().phone
        });
}