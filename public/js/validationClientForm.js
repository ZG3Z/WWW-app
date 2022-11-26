function validateForm(){
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const telephoneInput = document.getElementById('telephone');
    const emailInput = document.getElementById('email');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorTelephone = document.getElementById('errorTelephone');
    const errorEmail = document.getElementById('errorEmail');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([firstNameInput, lastNameInput, telephoneInput, emailInput], [errorFirstName, errorLastName, errorTelephone, errorEmail], errorsSummary);

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

    if(!checkRequired(telephoneInput.value)) {
        valid = false;
        telephoneInput.classList.add("error-input");
        errorTelephone.innerText = "Pole jest wymagane";
    } else if(!checkTelephone(telephoneInput.value)) {
        valid = false;
        telephoneInput.classList.add("error-input");
        errorTelephone.innerText = "Pole powinno zawierać prawidłowy numer telefonu";
    }

    if(!(emailInput.value=="")) {
        if(!checkEmail(emailInput.value)) {
            valid = false;
            emailInput.classList.add("error-input");
            errorEmail.innerText = "Pole powinno zawierać prawidłowy adres email";
        }
    }

    if(!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}