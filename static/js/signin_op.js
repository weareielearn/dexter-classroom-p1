var password_signin = document.getElementById("password_signin");
var u_check_signin = document.getElementById("u_check_signin");
var p_check_signin = document.getElementById("p_check_signin");
var username_signin = document.getElementById("username_signin");
var signin_btn = document.getElementById("signin_offic");

// listeners
password_signin.addEventListener('keyup', onPassKey_signin);
username_signin.addEventListener('keyup', onUserKey_signin);
signin_btn.addEventListener('click', signin_form_submit);

// functions
function onPassKey_signin() {
    var p = password_signin.value;
    if (p.length < 8) {
        document.getElementById('p_cross_signin').classList.replace('d-none', 'd-block');
        document.getElementById('p_check_signin').classList.replace('d-block', 'd-none');
        document.getElementById("p_cross_text_signin").innerHTML = "Password does not match";
    }
    else {
        var u = username_signin.value;
        var ref = firebase.database().ref("users/" + u);
        ref.once("value")
            .then(function (snapshot) {
                if (snapshot.exists() && snapshot.val().password === p) {
                    document.getElementById('p_cross_signin').classList.replace('d-block', 'd-none');
                    document.getElementById('p_check_signin').classList.replace('d-none', 'd-block');
                } else {
                    document.getElementById('p_cross_signin').classList.replace('d-none', 'd-block');
                    document.getElementById('p_check_signin').classList.replace('d-block', 'd-none');
                    document.getElementById("p_cross_text_signin").innerHTML = "Password does not match";
                }
            });
    }
}

function onUserKey_signin() {
    if (p_check_signin.classList.contains("d-block")) {
        onPassKey_signin();
    }
    var p = username_signin.value;
    if (p.indexOf(" ") != -1) {
        username_signin.value = p.replace(" ", "_");
        p = username_signin.value;
    }
    if (p.length < 8) {
        document.getElementById('u_cross_signin').classList.replace('d-none', 'd-block');
        document.getElementById('u_check_signin').classList.replace('d-block', 'd-none');
        document.getElementById("u_cross_text_signin").innerHTML = "User does not exist";
    }
    else {

        var ref = firebase.database().ref("users/" + p);
        ref.once("value")
            .then(function (snapshot) {
                if (snapshot.exists()) {
                    // user is present
                    document.getElementById('u_cross_signin').classList.replace('d-block', 'd-none');
                    document.getElementById('u_check_signin').classList.replace('d-none', 'd-block');
                    onPassKey_signin();
                } else {
                    // username is unique
                    document.getElementById('u_cross_signin').classList.replace('d-none', 'd-block');
                    document.getElementById('u_check_signin').classList.replace('d-block', 'd-none');
                    document.getElementById("u_cross_text_signin").innerHTML = "User does not exist";
                }
            });
    }

}

function signin_form_submit() {
    if (u_check_signin.classList.contains("d-block") && p_check_signin.classList.contains("d-block")) {
        document.getElementById("signin_form").submit();
    } else {
        alert("form not completed");
    }
}