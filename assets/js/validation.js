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



form.addEventListener('submit', (event) => {
    if (!validateForm()) {
        event.preventDefault();
    }
});

const validateForm = () => {
    let noError = true;

    const userNameValue = userName.value.trim().toLowerCase();
    const emailValue = email.value.trim().toLowerCase();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    // //Validation de l'username
    if (userNameValue === '') {
        setError(userName, "Ce champs est requis");
        noError = false;

    } else if (userNameValue.length < 5 || userNameValue.length > 15) {
        setError(userName, "Doit contenir entre 5 et 15 lettres");
        noError = false;

    } else {
        setSuccess(userName);
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

    //validation du mot de passe
    // Au moins une majuscule quelque part(?=.*[0-9])
    // Au moins un chiffre quelque part(?=.*[!@#$%^&*])
    // Au moins un symbole quelque part.{8,}

    const hasMaj = /[A-Z]/;
    const number = /[0-9]/;
    const special = /[!@#$%^&*]/;

    const errors = [];

    if (passwordValue.length < 8) errors.push("8 caractères minimum");
    if (!hasMaj.test(passwordValue)) errors.push("une majuscule");
    if (!number.test(passwordValue)) errors.push("un chiffre");
    if (!special.test(passwordValue)) errors.push("un symbole");

    if (errors.length > 0) {
        setError(password, errors.join("Requis:", " · "));
        noError = false;
    } else {
        setSuccess(password);
    }

    // //validation du mot de passe identique

    if (!(password2Value === passwordValue)) {
        setError(password2, "Les champs ne sont pas identiques");
        noError = false;
    } else {
        setSuccess(password2);
    }
    return noError;
};

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



