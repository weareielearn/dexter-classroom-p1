// ui elements
var code_verify_btn = document.getElementById('code_verify_btn')
var code_in = document.getElementById('code');
var code_holder = document.getElementById('code_holder');
var code_verify_btn_holder = document.getElementById('code_verify_btn_holder');
var signup_btn = document.getElementById('signup_offic');

var c_check = document.getElementById("c_check");
var u_check = document.getElementById("u_check");
var p_check = document.getElementById("p_check");
var ph_check = document.getElementById("ph_check");

// listeners
code_verify_btn.addEventListener('click', checkCommunityCode);
password.addEventListener('keyup', onPassKey);
username.addEventListener('keyup', onUserKey);
signup_btn.addEventListener('click', signup_form_submit);

// functions
function checkCommunityCode() {
    code_in.disabled = true;
    code_verify_btn.disabled = true;
    var code = code_in.value.toUpperCase().replace(' ', "");
    var ref = firebase.database().ref("codes/" + code.slice(0, 4) + "/subcodes/" + code);
    ref.once("value")
        .then(function (snapshot) {
            if (snapshot.exists()) {
                // correct code
                code_in.disabled = true;
                code_verify_btn_holder.classList.add("d-none");
                code_holder.classList.replace("w-75", "w-100");
                document.getElementById("c_check").classList.replace("d-none", "d-block");
                document.getElementById("c_cross").classList.replace("d-block", "d-none");
            } else {
                // wrong code
                document.getElementById("c_cross").classList.replace("d-none", "d-block");
                code_in.disabled = false;
                code_verify_btn.disabled = false;
            }
        });
}

function onPassKey() {
    var p = password.value;
    if (p.length < 8) {
        document.getElementById('p_cross').classList.replace('d-none', 'd-block');
        document.getElementById('p_check').classList.replace('d-block', 'd-none');
    }
    else {
        document.getElementById('p_cross').classList.replace('d-block', 'd-none');
        document.getElementById('p_check').classList.replace('d-none', 'd-block');
    }
}

function onUserKey() {
    var p = username.value;
    if (p.indexOf(" ") != -1) {
        username.value = p.replace(" ", "_");
        p = username.value;
    }
    if (p.length < 8) {
        document.getElementById('u_cross').classList.replace('d-none', 'd-block');
        document.getElementById('u_check').classList.replace('d-block', 'd-none');
        document.getElementById("u_cross_text").innerHTML = "Minimum 8 characters";
    }
    else {

        var ref = firebase.database().ref("users/" + p);
        ref.once("value")
            .then(function (snapshot) {
                if (snapshot.exists()) {
                    // user is not unique
                    document.getElementById('u_cross').classList.replace('d-none', 'd-block');
                    document.getElementById('u_check').classList.replace('d-block', 'd-none');
                    document.getElementById("u_cross_text").innerHTML = "Username already taken";
                } else {
                    // username is unique
                    document.getElementById('u_cross').classList.replace('d-block', 'd-none');
                    document.getElementById('u_check').classList.replace('d-none', 'd-block');
                }
            });
    }

}

function signup_form_submit() {
    if (u_check.classList.contains("d-block") && c_check.classList.contains("d-block") && p_check.classList.contains("d-block") && ph_check.classList.contains("d-block")) {
        document.getElementById('phone-number').disabled = false;
        code_in.disabled = false;
        document.getElementById("signup_form").submit();
    } else {
        alert("form not completed");
    }
}