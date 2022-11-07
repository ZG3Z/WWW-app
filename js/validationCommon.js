function resetErrors(inputs, errorTexts, errorInfo) {
    for(let i=0; i<inputs.length; i++) {
        inputs[i].classList.remove("error-input");
    }
    for(let i=0; i<errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}

function checkRequired(value) {
    if(!value) {
        return false;
    }
    value = value.toString().trim();
    if(value === "") {
        return false;
    }

    return true;
}

function checkTextLengthRange(value, min, max) {
    if(!value) {
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if(max && length > max) {
        return false;
    }
    if(min && length < min) {
        return false;
    }
    return true;
}

function checkTelephone(value) {
    if(!value) {
        return false;
    }
    var regex = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
    return regex.test(value)
}

function checkEmail(value) {
    if(!value) {
        return false;
    }
    var regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    return regex.test(value);
}

function checkDateIfAfter(date1, date2) {
   return (date1.getTime() < date2.getTime());
}