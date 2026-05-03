//Infos perso
const form = document.getElementById('form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
// Infos de l'entreprise
const business = document.getElementById('business');
const activity = document.getElementById('activity');
const teamSize = document.getElementsByName('teamSize');
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
const button2 = document.getElementById('button2');

if (button1) {
    button1.addEventListener('click', (event) => {
        event.preventDefault();
        validateStep1();
    });
}

if (button2) {
    button2.addEventListener('click', (event) => {
        event.preventDefault();
        validateStep2();
    });
}
form.addEventListener('submit', (event) => {
    if (!validateForm()) {
        event.preventDefault();
    }
});
const validateForm = () => {
    let noError = true;

    const firstNameValue = firstName.value.trim().toLowerCase();
    const lastNameValue = lastName.value.trim().toLowerCase();
    const phoneValue = phone.value.trim();
    const emailValue = email.value.trim().toLowerCase();


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

    //Validation du téléphone

    const cleanPhone = phoneValue.replace(/\D/g, '');

    if (cleanPhone === '') {
        setError(phone, "Ce champs est requis");
        noError = false;
    } else if ((cleanPhone.length < 10) || (cleanPhone.length > 10)) {
        setError(phone, "Doit contenir 10 chiffres");
        noError = false;
    } else {
        setSuccess(phone);
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
    if (noError === true) {
        steps(step1, step2);
    }
    //Step 2
    const businessValue = business.value.trim();
    const activityValue = activity.value;

    // Validation du nom de l'entreprise
    if (businessValue === '') {
        setError(business, "Ce champs est requis");
        noError = false;
    } else {
        setSuccess(business);
    }
    //Validation du champssecteur d'activités
    if (activityValue === '') {
        setError(activity, "Ce champs est requis");
        noError = false;
    } else {
        setSuccess(activity);
    }
    // validation des boutons radio
    let radioSelected = false;

    teamSize.forEach(radio => {
        if (radio.checked) {
            radioSelected = true;
        }
    });

    if (!radioSelected) {

        setError(teamSize[0], "Veuillez choisir une taille d'équipe");
        noError = false;
    } else {
        setSuccess(teamSize[0])
    }

    if (noError === true) {
        steps(step2, step3);
    }

}


function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

function setError(element, message) {
    // On remonte jusqu'au parent commun qui contient TOUT (inputs + message)
    const inputControl = element.closest('.inputControl');

    // On cherche le message d'erreur à l'intérieur de ce parent
    const errorDisplay = inputControl.querySelector('.errorMessage');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

function setSuccess(element) {
    const inputControl = element.closest('.inputControl');
    const errorDisplay = inputControl.querySelector('.errorMessage');

    errorDisplay.innerText = "";

    inputControl.classList.remove('error');
    inputControl.classList.add('success');
}

function steps(previousStep, nextStep) {
    previousStep.classList.remove('active');
    nextStep.classList.add('active')
}