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

    const reqMessageBrandRequired = document.getElementById('errorMessage-required-brand').innerText;
    const reqMessageBrandSpecific = document.getElementById('errorMessage-specific-brand').innerText;

    if(!checkRequired(brandInput.value)) {
        valid = false;
        brandInput.classList.add("error-input");
        errorBrand.innerText = reqMessageBrandRequired;
    } else if(!checkTextLengthRange(brandInput.value, 2, 60)) {
        valid = false;
        brandInput.classList.add("error-input");
        errorBrand.innerText = reqMessageBrandSpecific;
    }

    const reqMessageModelRequired = document.getElementById('errorMessage-required-model').innerText;
    const reqMessageModelSpecific = document.getElementById('errorMessage-specific-model').innerText;

    if(!checkRequired(modelInput.value)) {
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = reqMessageModelRequired;
    } else if(!checkTextLengthRange(modelInput.value, 2, 60)) {
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = reqMessageModelSpecific;
    }

    const reqMessageColourRequired = document.getElementById('errorMessage-required-colour').innerText;
    const reqMessageColourSpecific = document.getElementById('errorMessage-specific-colour').innerText;

    if (!checkRequired(colourInput.value)) {
       valid = false;
       colourInput.classList.add("error-input");
       errorColour.innerText = reqMessageColourRequired;
    }else if(!checkTextLengthRange(colourInput.value, 2, 60)) {
        valid = false;
        colourInput.classList.add("error-input");
        errorColour.innerText = reqMessageColourSpecific;
    }
    
    const reqMessageSummary = document.getElementById('errorMessage-summary').innerText;

    if(!valid) {
        errorsSummary.innerText = reqMessageSummary;
    }

    return valid;
}