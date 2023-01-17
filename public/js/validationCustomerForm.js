function validateForm(){
    const firstNameInput = document.getElementById('Name');
    const lastNameInput = document.getElementById('Surname');
    const telephoneInput = document.getElementById('Telephone');
    const emailInput = document.getElementById('Email');
    const passwordInput = document.getElementById('Password');

    const errorFirstName = document.getElementById('errorName');
    const errorLastName = document.getElementById('errorSurname');
    const errorTelephone = document.getElementById('errorTelephone');
    const errorEmail = document.getElementById('errorEmail');
    const errorPassword = document.getElementById('errorPassword');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([firstNameInput, lastNameInput, telephoneInput, emailInput, passwordInput], [errorFirstName, errorLastName, errorTelephone, errorEmail, errorPassword], errorsSummary);

    let valid = true;

    if(!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(firstNameInput.value, 2, 30)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierać od 2 do 30 znaków";
    }

    if(!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(firstNameInput.value, 2, 30)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierać od 2 do 30 znaków";
    }

    if(!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(lastNameInput.value, 2, 30)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zawierać od 2 do 30 znaków";
    }

    if(!(telephoneInput.value=="")) {
        if(!checkTelephone(telephoneInput.value)) {
            valid = false;
            telephoneInput.classList.add("error-input");
        errorTelephone.innerText = "Pole powinno zawierać prawidłowy numer telefonu";
        }
    }

    if(!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole jest wymagane";
    } else if(!checkEmail(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierać prawidłowy adres e-mail";
    }

    if(!checkRequired(passwordInput.value)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(passwordInput.value, 2, 120)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = "Pole powinno zawierać od 2 do 120 znaków";
    }

    if(!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}