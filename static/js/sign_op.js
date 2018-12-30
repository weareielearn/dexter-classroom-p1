// ui elements
var code_verify_btn = document.getElementById('code_verify_btn')
var code_in = document.getElementById('code');
var code_holder = document.getElementById('code_holder');
var code_verify_btn_holder = document.getElementById('code_verify_btn_holder');

// listeners
code_verify_btn.addEventListener('click', checkCommunityCode);

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
                alert('Success')
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