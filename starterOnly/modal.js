/*=============================================
=                   MODAL                    =
=============================================*/

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Modal DOM Elements
const modalbg = document.querySelector(".bground");
const modalbg2 = document.querySelector(".bground2");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalCloseBtn = document.querySelectorAll(".close");
const modalClose2Btn = document.querySelector(".close2");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));
modalClose2Btn.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

function launchModal2() {
  modalbg.style.display = "none";
  modalbg2.style.display = "block";
}

function closeModal() {
  modalbg.style.display = "none";
  modalbg2.style.display = "none";
}

