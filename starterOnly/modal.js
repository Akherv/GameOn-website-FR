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

/*=============================================
=                   FORM                      =
=============================================*/
NodeList.prototype.forEach = function (callback) {
  Array.prototype.forEach.call(this, callback);
}

//Form DOM Elements
const form = document.querySelector('form');
const fields = document.querySelectorAll('input');
const formData = document.querySelectorAll(".formData");
const first = form['first'];
const last = form['last'];
const email = form['email'];
const birthdate = form['birthdate'];
const quantity = form['quantity'];
const radioLocations = document.querySelectorAll('input[type="radio"]');
const checkboxCondition = form['checkbox1'];

//Global validation state
let fieldsValid = false;

//Validation on Submit
form.addEventListener('submit', validateOnSubmit);

//Validation on Entry
fields.forEach(field => field.addEventListener('input', validateOnEntry));
// fields.forEach(field => field.addEventListener('invalid', function (e) {
//   e.preventDefault();
// }, true));

function validateOnSubmit(e) {
  e.preventDefault();
  checkFieldsValid();

  if (fieldsValid === false) {
    return false;
  } else {
    launchModal2();
    this.reset();
    return true;
  }
}

function validateOnEntry() {
  this.setCustomValidity('');
  this.checkValidity();
  checkFieldsValid(this);
}

function setValidationMessage(el, checktype) {
  switch (el.name || el.id) {
    case 'first':
      message = "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
      break;
    case 'last':
      message = "Veuillez entrer 2 caractères ou plus pour le champ du nom."
      break;
    case 'email':
      message = "Veuillez entrer 1 email correct"
      break;
    case 'birthdate':
      message = "Vous devez entrer votre date de naissance."
      break;
    case 'quantity':
      message = "Vous devez entrer le nombre de tournois auxquels vous avez participé."
      break;
    case 'location':
      message = "Vous devez cocher le lieu du tournoi."
      break;
    case 'checkbox1':
      message = "Vous devez accepter les conditions d'utilisation."
      break;
    default:
      break;
  }

  if (checktype && (checktype === 'input')) {
    el.setCustomValidity(message);
  }
  el.parentElement.setAttribute('data-error', message);
  el.parentElement.setAttribute('data-error-visible', 'true');
  el.classList.add('error');
}

function removeValidationMessage(el) {
  el.parentElement.removeAttribute('data-error');
  el.parentElement.setAttribute('data-error-visible', 'false');
  el.classList.remove('error');
}

function checkFieldsValid(el, checktype) {
  let counter = 0;

  //pattern
  const namePattern = /[a-zA-Z]{2,}/; //name must contains only letters and at least 2 characters
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //email must begin with a word or numeric character (one or more time), can be followed by punctuation & another word or numeric character, then must contains an @ symbol, followed by word or numeric character and finish with a top level domain of 2 or 3 characters. (ex:a0.aaa@aaaa.com)
  let age = +((new Date().getTime() - new Date(birthdate.value).getTime()) / 31536000000).toFixed(0); //age calculation between today and birthdate

  //conditions
  const firstConditionIsValid = first.value.trim() !== "" && first.value.trim().length >= 2 && namePattern.test(first.value.trim());
  const lastConditionIsValid = last.value.trim() !== "" && last.value.trim().length >= 2 && namePattern.test(last.value.trim());
  const emailConditionIsValid = email.value !== "" && emailPattern.test(email.value);
  const birthdateConditionIsValid = birthdate.value !== "" && (age >= 18);
  const quantityConditionIsValid = quantity.value !== "";
  let radioLocationIsValid = false;
  let checkboxConditionIsValid = true;

  //check on input each text-control fields and give visual clues errors if they are invalid
  if (el) {
    if (el.name === 'first') {
      if (firstConditionIsValid) {
        removeValidationMessage(first);
      } else {
        setValidationMessage(first, 'input');
      }
    }
    if (el.name === 'last') {
      if (lastConditionIsValid) {
        removeValidationMessage(last);
      } else {
        setValidationMessage(last, 'input');
      }
    }
    if (el.name === 'email') {
      if (emailConditionIsValid) {
        removeValidationMessage(email);
      } else {
        setValidationMessage(email, 'input');
      }
    }
    if (el.name === 'birthdate') {
      if (birthdateConditionIsValid) {
        removeValidationMessage(birthdate);
      } else {
        setValidationMessage(birthdate, 'input');
      }
    }
    if (el.name === 'quantity') {
      if (quantityConditionIsValid) {
        removeValidationMessage(quantity);
      } else {
        setValidationMessage(quantity, 'input');
      }
    }

  } else {
    //check on submit all fields and start the counter for final validation

    //check text-control fields
    if (firstConditionIsValid) {
      counter += 1;
      removeValidationMessage(first);
    } else {
      setValidationMessage(first);
    }
    if (lastConditionIsValid) {
      counter += 1;
      removeValidationMessage(last);
    } else {
      setValidationMessage(last);
    }
    if (emailConditionIsValid) {
      counter += 1;
      removeValidationMessage(email);
    } else {
      setValidationMessage(email);
    }
    if (birthdateConditionIsValid) {
      counter += 1;
      removeValidationMessage(birthdate);
    } else {
      setValidationMessage(birthdate);
    }
    if (quantityConditionIsValid) {
      counter += 1;
      removeValidationMessage(quantity);
    } else {
      setValidationMessage(quantity);
    }

    //check location field
    radioLocations.forEach((el) => (el.checked) && (radioLocationIsValid = true));
    if (radioLocationIsValid === true) {
      removeValidationMessage(location1);
    } else {
      setValidationMessage(location1);
    }

    //check condition field
    if (checkboxCondition.checked) {
      checkboxCondition.setAttribute('checked', 'checked');
      removeValidationMessage(checkbox1);
      checkboxConditionIsValid = true;
    } else {
      checkboxCondition.removeAttribute('checked');
      setValidationMessage(checkbox1);
      checkboxConditionIsValid = false;
    }

    //Final global check
    (counter === 5 && radioLocationIsValid === true && checkboxConditionIsValid === true) ? fieldsValid = true: fieldsValid = false;
  }
}