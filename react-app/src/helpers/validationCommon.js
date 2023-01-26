export function checkRequired(value) {
    if(!value) {
        return false;
    }
    value = value.toString().trim();
    if(value === "") {
        return false;
    }
    return true;
}

export function checkTextLengthRange(value, min, max) {
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

export function checkTelephone(value) {
    if(!value) {
        return false;
    }
    var regex = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
    return regex.test(value);
}

export function checkEmail(value) {
    if(!value) {
        return false;
    }
    var regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    return regex.test(value);
}