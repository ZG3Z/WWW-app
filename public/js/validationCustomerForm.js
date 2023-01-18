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

    const reqMessageNameRequired = document.getElementById('errorMessage-required-name').innerText;
    const reqMessageNameSpecific = document.getElementById('errorMessage-specific-name').innerText;

    if(!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = reqMessageNameRequired;
    } else if(!checkTextLengthRange(firstNameInput.value, 2, 60)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = reqMessageNameSpecific;
    }

    const reqMessageSurnameRequired = document.getElementById('errorMessage-required-surname').innerText;
    const reqMessageSurnameSpecific = document.getElementById('errorMessage-specific-surname').innerText;

    if(!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = reqMessageSurnameRequired;
    } else if(!checkTextLengthRange(lastNameInput.value, 2, 60)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = reqMessageSurnameSpecific;
    }

    const reqMessageTelephoneSpecific = document.getElementById('errorMessage-specific-telephone').innerText;

    if(!(telephoneInput.value=="")) {
        if(!checkTelephone(telephoneInput.value)) {
            valid = false;
            telephoneInput.classList.add("error-input");
            errorTelephone.innerText = reqMessageTelephoneSpecific;
        }
    }

    const reqMessageEmailRequired = document.getElementById('errorMessage-required-email').innerText;
    const reqMessageEmailSpecific = document.getElementById('errorMessage-specific-email').innerText;

    if(!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = reqMessageEmailRequired;
    } else if(!checkEmail(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = reqMessageEmailSpecific;
    }

    const reqMessagePasswordRequired = document.getElementById('errorMessage-required-password').innerText;

    if(!checkRequired(passwordInput.value)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = reqMessagePasswordRequired;
    } 

    const reqMessageSummary = document.getElementById('errorMessage-summary').innerText;

    if(!valid) {
        errorsSummary.innerText = reqMessageSummary;
    }

    return valid;
}