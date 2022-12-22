function validateForm(){
    const personDataSelect = document.getElementById('Client_ID_client');
    const bikeDataSelect = document.getElementById('Bike_ID_bike');
    const dateFromInput = document.getElementById('Date_from');
    const dateToInput = document.getElementById('Date_to');

    const errorPersonData = document.getElementById('errorClient_ID_client');
    const errorBikeData = document.getElementById('errorBike_ID_bike');
    const errorDateFrom = document.getElementById('errorDate_from');
    const errorDateTo = document.getElementById('errorDate_to');
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