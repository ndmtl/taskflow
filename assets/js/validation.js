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
const subscription = document.getElementsByName('subscription');
const conditions = document.getElementById('conditions');
//fieldset
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');

//Boutons
const buttonNext1 = document.getElementById('buttonNext1');
const buttonNext2 = document.getElementById('buttonNext2');

const validateStep1 = () => {
    let noError = true;

    const firstNameValue = firstName.value.trim().toLowerCase();
    const lastNameValue = lastName.value.trim().toLowerCase();
    const phoneValue = phone.value.trim();
    const emailValue = email.value.trim().toLowerCase();

    // //Validation du prénonom
    if (firstNameValue === '') {
        setError(firstName, "Ce champ est requis");
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
        setError(phone, "Ce champ est requis");
        noError = false;
    } else if (cleanPhone.length !== 10) {
        setError(phone, "Doit contenir 10 chiffres");
        noError = false;
    } else {
        setSuccess(phone);
    }

    //Validation de l'email
    if (emailValue === '') {
        setError(email, "Ce champ est requis");
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
        nextTab();

    }

}
const validateStep2 = () => {
    let noError = true;
    //Step 2
    const businessValue = business.value.trim();
    const activityValue = activity.value;


    // Validation du nom de l'entreprise
    if (businessValue === '') {
        setError(business, "Ce champ est requis");
        noError = false;
    } else {
        setSuccess(business);
    }
    // Validation du champssecteur d'activités
    if (activityValue === '') {
        setError(activity, "Ce champ est requis");
        noError = false;
    } else {
        setSuccess(activity);
    }
    // Validation de la taille de l'équipe
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
        nextTab();
    }
}
const validateForm = () => {
    let noError = true;

    //Final
    const userValue = user.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();


    // Validation du nom d'utilisateur
    if (userValue === '') {
        setError(user, "Ce champ est requis");
        noError = false; // Ne pas oublier !
    } else if (userValue.length < 8) {
        setError(user, "Le nom d'utilisateur doit comporter 8 lettres");
        noError = false; // Ne pas oublier !
    } else {
        setSuccess(user); // On passe l'élément 'user', pas 'userValue'
    }

    // Validation du mot de passe 
    if (validatePassword(password) === false) {
        noError = false;
    }

    // Validation de la confirmation
    if (password2Value === '') {
        setError(password2, "Veuillez confirmer le mot de passe");
        noError = false;
    } else if (password2Value !== passwordValue) {
        setError(password2, "Les mots de passe ne sont pas identiques");
        noError = false;
    } else {
        setSuccess(password2);
    }

    //Validation de l'abonnement
    let radioSelected = false;

    subscription.forEach(radio => {
        if (radio.checked) {
            radioSelected = true;
        }
    });
    if (!radioSelected) {
        setError(subscription[0], "Veuillez choisir un plan");
        noError = false;
    } else {
        setSuccess(subscription[0]);
    }

    // Validation des conditions d'utilisations
    if (!conditions.checked) {
        setError(conditions, "Vous devez accepter les conditions d'utilisation");
        noError = false;
    } else {
        setSuccess(conditions);
    }

    return noError;
}
buttonNext1.addEventListener('click', (event) => {
    event.preventDefault();
    validateStep1();
});

buttonNext2.addEventListener('click', (event) => {
    event.preventDefault();
    validateStep2();
});
form.addEventListener('submit', (event) => {
    if (!validateForm()) {
        event.preventDefault();
    }
});

function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

const validatePassword = (input) => {
    const passwordValue = input.value.trim();

    const hasMaj = /[A-Z]/;
    const number = /[0-9]/;
    const special = /[!@#$%^&*]/;

    const errors = [];

    if (passwordValue.length < 8) errors.push("8 caractères");
    if (!hasMaj.test(passwordValue)) errors.push("une majuscule");
    if (!number.test(passwordValue)) errors.push("un chiffre");
    if (!special.test(passwordValue)) errors.push("un symbole");

    if (errors.length > 0) {

        setError(input, "Requis : " + errors.join(" · "));
        return false;
    } else {
        setSuccess(input);
        return true;
    }
};

function setError(element, message) {
    const inputControl = element.closest('.inputControl');
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

const tabs = document.querySelectorAll(".tabs_element");
let currentStep = 0;

function nextTab() {
    if (currentStep < tabs.length - 1) {
        currentStep++;
        tabs[currentStep].classList.add("active");
    }
}

function steps(previousStep, nextStep) {
    previousStep.classList.remove('active');
    nextStep.classList.add('active')
}

