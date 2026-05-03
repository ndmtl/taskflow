//Infos perso
const form = document.getElementById('form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lasttName');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
// Infos de l'entreprise
const business = document.getElementById('business');
const activity = document.getElementById('activity');
const teamSize = document.getElementsByName('teamsize');
const website = document.getElementById('website');
//Infos compte
const user = document.getElementById('user')
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const subscription = document.getElementsByClassName('subscription');
const conditions = document.getElementById('conditions');
const newsletter = document.getElementById('newsletter');

//Boutons
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
//Boutons
const button1 = document.getElementById('button1');

button1.addEventListener()('click', (event) => {
    if (!validateForm()) {
        event.preventDefault();
    }
});

const validateForm = () => {
    let noError = true;

    const firstNameValue = firstName.value.trim().toLowerCase();
    const lastNameValue = lastName.value.trim().toLowerCase();
    const phonevalue = phone.value.parseInt().trim();
    const emailValue = email.value.trim().toLowerCase();

    step1.classList.remove('active');
    step2.classList.add('hidden');

    // //Validation du prénonom
    if (firstNameValue === '') {
        setError(firstName, "Ce champs est requis");
        noError = false;
    } else {
        setSuccess(firstName);
    }
    // //Validation du nom
    if (lastNameValue === '') {
        setError(lastName, "Ce champs est requis");
        noError = false;
    } else {
        setSuccess(lastName);
    }

    //Validation de l'email
    if (emailValue === '') {
        setError(email, "Ce champs est requis");
        noError = false;
    } else if (!validateEmail(emailValue)) {
        setError(email, "Le format n'est pas bon");
        noError = false;
    }
    else {
        setSuccess(email);
    }
}


function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

function setError(element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.errorMessage');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}
function setSuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.errorMessage');

    errorDisplay.innerText = "";
    inputControl.classList.remove('error');
    inputControl.classList.add('success');
}



