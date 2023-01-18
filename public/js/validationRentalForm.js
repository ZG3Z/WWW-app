function validateForm(){
    const personDataSelect = document.getElementById('Customer_ID_customer');
    const bikeDataSelect = document.getElementById('Bike_ID_bike');
    const dateFromInput = document.getElementById('Date_from');
    const dateToInput = document.getElementById('Date_to');

    const errorPersonData = document.getElementById('errorCustomer_ID_customer');
    const errorBikeData = document.getElementById('errorBike_ID_bike');
    const errorDateFrom = document.getElementById('errorDate_from');
    const errorDateTo = document.getElementById('errorDate_to');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([personDataSelect, bikeDataSelect, dateFromInput, dateToInput], [errorPersonData, errorBikeData, errorDateFrom, errorDateTo], errorsSummary);

    let valid = true;

    const reqMessageCustomerRequired = document.getElementById('errorMessage-required-customer').innerText;

    if(!checkRequired(personDataSelect.value)) {
        valid = false;
        personDataSelect.classList.add("error-input");
        errorPersonData.innerText = reqMessageCustomerRequired;
    } 

    const reqMessageBikeRequired = document.getElementById('errorMessage-required-bike').innerText;

    if(!checkRequired(bikeDataSelect.value)) {
        valid = false;
        bikeDataSelect.classList.add("error-input");
        errorBikeData.innerText = reqMessageBikeRequired;
    } 

    const reqMessageDateFromRequired = document.getElementById('errorMessage-required-datefrom').innerText;

    if(!checkRequired(dateFromInput.value)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = reqMessageDateFromRequired;
    } 
    
    const reqMessageDateToRequired = document.getElementById('errorMessage-required-dateto').innerText;

    if(!checkRequired(dateToInput.value)) {
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = reqMessageDateToRequired;
    } 

    const reqMessageSummary = document.getElementById('errorMessage-summary').innerText;

    if(!valid) {
        errorsSummary.innerText = reqMessageSummary;
    }

    return valid;
}