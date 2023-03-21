const formMode = {
    NEW: 'NEW',
    EDIT: 'EDIT'
}

export const formValidationKeys = {
    notEmpty: 'notEmpty',
    len_2_60: 'len_2_60',
    len_5_60: 'len_5_60',
    emailError: 'emailError',
    telephoneError: 'telephoneError'
}

export function getValidationErrorKey(error) {
    return `form.validation.messages.${error}`
}

export default formMode;