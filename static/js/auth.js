// init ui
var ph_holder = document.getElementById("ph_holder");
var ph_btn_holder = document.getElementById("ph_btn_holder");
var ver_holder = document.getElementById("ver_holder");
var ver_btn_holder = document.getElementById("ver_btn_holder");

var btn_ph_ver = document.getElementById("btn_ph_ver");
var btn_cancel = document.getElementById("btn_cancel");

// listeners
btn_ph_ver.addEventListener('click', showVerification);
btn_cancel.addEventListener('click', hideVerification);

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