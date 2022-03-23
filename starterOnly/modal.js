NodeList.prototype.forEach = function (callback) {
  Array.prototype.forEach.call(this, callback);
}

/*=============================================
=                   NAVBAR                    =
=============================================*/
//Style responsive Navbar
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//Style active navBar element on click
const navBarElements = document.querySelectorAll(".main-navbar a[href^='#']");
navBarElements.forEach((el) => el.addEventListener("click", setActiveElement));

function setActiveElement() {
  navBarElements.forEach(el => el.classList.remove("active"));
  this.classList.add("active");
}

/*=============================================
=                   MODAL                    =
=============================================*/

// Modal DOM Elements
const body = document.querySelector('body');
const modalbg = document.querySelector(".bground");
const modalbg2 = document.querySelector(".bground2");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalCloseBtn = document.querySelectorAll(".close");
const modalClose2Btn = document.querySelector(".close2");

// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));
modalClose2Btn.addEventListener("click", closeModal);

// Launch modal form
function launchModal() {
  modalbg.style.display = "block";
  body.style.overflow = "hidden";
}

function launchModalValidated() {
  modalbg.style.display = "none";
  modalbg2.style.display = "block";
}

function closeModal() {
  modalbg.style.display = "none";
  modalbg2.style.display = "none";
  body.style.overflow = "auto";
}

/*=============================================
=                   FORM                      =
=============================================*/

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
let fieldsIsValid = false;

//Validation on Submit
form.addEventListener('submit', validateOnSubmit);

//Validation on Entry
fields.forEach(field => field.addEventListener('input', validateOnEntry));

function validateOnSubmit(e) {
  e.preventDefault();
  checkfieldsIsValid();

  if (fieldsIsValid === false) {
    return false;
  } else {
    launchModalValidated();
    this.reset();
    return true;
  }
}

function validateOnEntry() {
  this.setCustomValidity('');
  this.checkValidity();
  checkfieldsIsValid(this);
}

function checkfieldsIsValid(el) {
  let counter = 0;

  //Pattern
  const namePattern = /[a-zA-Z]{2,}/; //name must contains only letters and at least 2 characters
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //email must begin with a word or numeric character (one or more time), can be followed by punctuation & another word or numeric character, then must contains an @ symbol, followed by word or numeric character and finish with a top level domain of 2 or 3 characters. (ex:a0.aaa@aaaa.com)
  let age = getAge(new Date(birthdate.value)); //age calculation between today and birthdate
  let nbrIsInteger = Number(quantity.value) % 1 === 0; //check if nbr is integer;

  console.log(nbrIsInteger);

  function getAge(date) {
    let diff = Date.now() - date.getTime();
    let age = new Date(diff);
    return Math.abs(age.getUTCFullYear() - 1970);
  }

  //Conditions
  const firstConditionIsValid = first.value.trim() !== "" && first.value.trim().length >= 2 && namePattern.test(first.value.trim());
  const lastConditionIsValid = last.value.trim() !== "" && last.value.trim().length >= 2 && namePattern.test(last.value.trim());
  const emailConditionIsValid = email.value.trim() !== "" && emailPattern.test(email.value.trim());
  const birthdateConditionIsValid = birthdate.value !== "" && (age >= 18);
  const quantityConditionIsValid = quantity.value !== "" && quantity.value >= 0 && quantity.value <= 100 && nbrIsInteger;
  let radioLocationIsValid = false;
  let checkboxConditionIsValid = true;

  //Check on input each text-control fields and give visual clues errors if they are invalid
  if (el) {
    if (el.name === 'first') {
      if (firstConditionIsValid) {
        removeErrorMessage(first);
      } else {
        setErrorMessage(first, 'input');
      }
    }
    if (el.name === 'last') {
      if (lastConditionIsValid) {
        removeErrorMessage(last);
      } else {
        setErrorMessage(last, 'input');
      }
    }
    if (el.name === 'email') {
      if (emailConditionIsValid) {
        removeErrorMessage(email);
      } else {
        setErrorMessage(email, 'input');
      }
    }
    if (el.name === 'birthdate') {
      if (birthdateConditionIsValid) {
        removeErrorMessage(birthdate);
      } else {
        setErrorMessage(birthdate, 'input');
      }
    }
    if (el.name === 'quantity') {
      if (quantityConditionIsValid) {
        removeErrorMessage(quantity);
      } else {
        setErrorMessage(quantity, 'input');
      }
    }
    radioLocations.forEach((el) => (el.checked) && (radioLocationIsValid = true));
    if (radioLocationIsValid === true) {
      removeErrorMessage(location1);
    }
    if (checkboxCondition.checked) {
      checkboxCondition.setAttribute('checked', 'checked');
      removeErrorMessage(checkbox1);
      checkboxConditionIsValid = true;
    } else {
      checkboxCondition.removeAttribute('checked');
      setErrorMessage(checkbox1);
      checkboxConditionIsValid = false;
    }

  } else {
    //Check on submit all fields and start the counter for final validation

    //Check text-control fields
    if (firstConditionIsValid) {
      counter += 1;
      removeErrorMessage(first);
    } else {
      setErrorMessage(first);
    }
    if (lastConditionIsValid) {
      counter += 1;
      removeErrorMessage(last);
    } else {
      setErrorMessage(last);
    }
    if (emailConditionIsValid) {
      counter += 1;
      removeErrorMessage(email);
    } else {
      setErrorMessage(email);
    }
    if (birthdateConditionIsValid) {
      counter += 1;
      removeErrorMessage(birthdate);
    } else {
      setErrorMessage(birthdate);
    }
    if (quantityConditionIsValid) {
      counter += 1;
      removeErrorMessage(quantity);
    } else {
      setErrorMessage(quantity);
    }

    //Check location field
    radioLocations.forEach((el) => (el.checked) && (radioLocationIsValid = true));
    if (radioLocationIsValid === true) {
      removeErrorMessage(location1);
    } else {
      setErrorMessage(location1);
    }

    //Check condition field
    if (checkboxCondition.checked) {
      checkboxCondition.setAttribute('checked', 'checked');
      removeErrorMessage(checkbox1);
      checkboxConditionIsValid = true;
    } else {
      checkboxCondition.removeAttribute('checked');
      setErrorMessage(checkbox1);
      checkboxConditionIsValid = false;
    }

    //Final global check
    (counter === 5 && radioLocationIsValid === true && checkboxConditionIsValid === true) ? fieldsIsValid = true: fieldsIsValid = false;
  }
}

function setErrorMessage(el, checktype) {
  switch (el.name || el.id) {
    case 'first':
      message = "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
      break;
    case 'last':
      message = "Veuillez entrer 2 caractères ou plus pour le champ du nom."
      break;
    case 'email':
      message = "Veuillez entrer 1 email valide"
      break;
    case 'birthdate':
      message = "Vous devez entrer votre date de naissance. (Vous devez avoir + de 18 ans)."
      break;
    case 'quantity':
      message = "Vous devez entrer le nombre de tournois auxquels vous avez participé. (Entre 0 et 100)"
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
  //If needed uncomment this code to make the UI error style more visible
  // el.classList.add('error');
}

function removeErrorMessage(el) {
  el.parentElement.removeAttribute('data-error');
  el.parentElement.setAttribute('data-error-visible', 'false');
  // el.classList.remove('error');
}