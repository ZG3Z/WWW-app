function validateForm(){
    const brandInput = document.getElementById('Brand');
    const modelInput = document.getElementById('Model');
    const colourInput = document.getElementById('Colour');

    const errorBrand = document.getElementById('errorBrand');
    const errorModel = document.getElementById('errorModel');
    const errorColour = document.getElementById('errorColour');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([brandInput, modelInput, colourInput], [errorBrand, errorModel, errorColour], errorsSummary);

    let valid = true;

    if(!checkRequired(brandInput.value)) {
        valid = false;
        brandInput.classList.add("error-input");
        errorBrand.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(brandInput.value, 2, 30)) {
        valid = false;
        brandInput.classList.add("error-input");
        errorBrand.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if(!checkRequired(modelInput.value)) {
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(modelInput.value, 2, 30)) {
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if(!checkRequired(colourInput.value)) {
        valid = false;
        colourInput.classList.add("error-input");
        errorColour.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(colourInput.value, 2, 30)) {
        valid = false;
        colourInput.classList.add("error-input");
        errorColour.innerText = "Pole powinno zawierać od 2 do 30 znaków";
    }

    
    if(!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}