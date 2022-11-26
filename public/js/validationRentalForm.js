function validateForm(){
    const personDataSelect = document.getElementById('personData');
    const bikeDataSelect = document.getElementById('bikeData');
    const dateFromInput = document.getElementById('dateFrom');
    const dateToInput = document.getElementById('dateTo');

    const errorPersonData = document.getElementById('errorPersonData');
    const errorBikeData = document.getElementById('errorBikeData');
    const errorDateFrom = document.getElementById('errorDateFrom');
    const errorDateTo = document.getElementById('errorDateTo');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([personDataSelect, bikeDataSelect, dateFromInput, dateToInput], [errorPersonData, errorBikeData, errorDateFrom, errorDateTo], errorsSummary);

    let valid = true;

    if(!checkRequired(personDataSelect.value)) {
        valid = false;
        personDataSelect.classList.add("error-input");
        errorPersonData.innerText = "Pole jest wymagane";
    } 

    if(!checkRequired(bikeDataSelect.value)) {
        valid = false;
        bikeDataSelect.classList.add("error-input");
        errorBikeData.innerText = "Pole jest wymagane";
    } 

    if(!checkRequired(dateFromInput.value)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Pole jest wymagane";
    } else if(checkDateIfAfter(new Date(dateFromInput.value), new Date())) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Data nie może być z przeszłości";
    } 
    
    if(!checkRequired(dateToInput.value)) {
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = "Pole jest wymagane";
    } else if(!checkDateIfAfter(new Date(dateFromInput.value), new Date(dateToInput.value))) {
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = "Data do powinna być późniejsza niż data od";
    } 


    if(!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}