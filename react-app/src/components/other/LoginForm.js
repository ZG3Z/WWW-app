import { useState } from "react";
import { useTranslation } from "react-i18next";
import {  useNavigate } from "react-router-dom";
import { loginApiCall } from "../../apiCalls/authApiCalls";
import { formValidationKeys } from "../../helpers/formHelper";
import { checkRequired } from "../../helpers/validationCommon";
import FormButtons from "../form/FormButtons";
import FormInput from "../form/FormInput";

function LoginForm(props) {
    const [user, setUser] = useState(
        {
            Email: '',
            Password: ''
        }
    );
    const [errors, setErrors] = useState(
        {
            Email: '',
            Password: ''
        }
    );
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(null);
    const [message, setMessage] = useState(null);

    const { t } = useTranslation();
    const navigate = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target;
        const errorMessage = validateField(name, value)
        setErrors({
            ...errors,
            [name]: errorMessage
        })
        setUser({
            ...user,
            [name]: value
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        const isValid = validateForm();

        if (isValid) {
            let response
            loginApiCall(user)
                .then(res => {
                    response = res;
                    return res.json();
                })
                .then(
                    (data) => {
                        if (response.status === 200) {
                            if (data.token) {
                                const userString = JSON.stringify(data);
                                props.handleLogin(userString);
                                navigate(-1);
                                console.log(userString);
                            } else if (response.status === 401) {
                                setMessage(data.message);
                            }
                        }
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }
    }

    function validateField(fieldName, fieldValue) {
        let errorMessage = '';
        if (fieldName === 'Email') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            }
        }
        if (fieldName === 'Password') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            }
        }
        return errorMessage;
    }

    function validateForm() {
        let isValid = true;
        let serverFieldsErrors = { ...errors };
        Object.entries(user).forEach(([key, value]) => {
            const errorMessage = validateField(key, value);
            serverFieldsErrors[key] = errorMessage;
            if (errorMessage.length > 0) {
                isValid = false;
            }
        })
        setErrors(serverFieldsErrors);
        return isValid;
    }

    function hasErrors() {
        Object.values(errors).forEach((value) => {
            if (value.length > 0) {
                return true;
            }
        })
        return false;
    }

    const errorsSummary = hasErrors() ? t('form.validation.messages.formErrors') : '';
    const fetchError = error ? `${t('error')}: ${error.message}` : '';
    const globalErrorMessage = errorsSummary || fetchError || message ;

    return (
        <main>
            <div id="login">
                <h2>{t('register.login')}</h2>
                <form className="form" method="post" onSubmit={handleSubmit}>
                    <FormInput name="Email" value={user.Email} error={errors.Email} label="Email" onChange={handleChange} type="text" placeholder="email" object="customer"/>
                    <FormInput name="Password" value={user.Password} error={errors.Password} label="Password" onChange={handleChange} type="password" placeholder="password" object="customer"/>
                    <FormButtons cancelPath="/"error = {globalErrorMessage} />
                </form>
            </div>
        </main>
    )
}

export default LoginForm;