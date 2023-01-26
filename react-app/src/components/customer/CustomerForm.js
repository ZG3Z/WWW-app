import React from 'react';
import { Navigate } from "react-router-dom";
import { getCustomerByIdApiCall, addCustomerApiCall, updateCustomerApiCall } from "../../apiCalls/customerApiCalls";
import formMode from '../../helpers/formHelper';
import { formValidationKeys } from '../../helpers/formHelper';
import { checkRequired, checkTextLengthRange, checkTelephone, checkEmail  } from "../../helpers/validationCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import FormTitle from "../form/FormTitle";

class CustomerForm extends React.Component{
    constructor(props) {
        super(props);
        const paramsCustomerId = props.id;
        const currentFormMode = paramsCustomerId? formMode.EDIT : formMode.NEW;

        this.state = {
            customerId: paramsCustomerId,
            customer: {
                Name: '',
                Surname: '',
                Telephone: '',
                Email: '',
                Password: ''
            },
            errors: {
                Name: '',
                Surname: '',
                Telephone: '',
                Email: '',
                Password: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }
    
    componentDidMount = () => {
        const currentFormMode = this.state.formMode;
        if(currentFormMode === formMode.EDIT) {
            this.fetchCustomerDetails();
        }
    }

    fetchCustomerDetails = () => {
        getCustomerByIdApiCall(this.state.customerId)
            .then(res => res.json())
            .then(
                (data) => {
                    if(data.message) {
                        this.setState({
                            message: data.message,
                        })
                    } else {
                        this.setState({
                            customer: data,
                            message: null,
                        })
                    }
                    this.setState({
                        isLoaded: true,
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                });
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        const customer = {...this.state.customer};
        customer[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = {...this.state.errors};
        errors[name] = errorMessage;

        this.setState({
            customer: customer,
            errors: errors,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                customer = this.state.customer,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addCustomerApiCall(customer);
            } else if (currentFormMode === formMode.EDIT) {
                console.log(customer);
                const customerId = this.state.customerId;
                promise = updateCustomerApiCall(customerId, customer);
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json();
                            }
                        })
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                console.log(data);
                                for (const i in data) {
                                    const errorItem = data[i];
                                    const errorMessage = errorItem.message;
                                    const fieldName = errorItem.path;
                                    const errors = { ...this.state.errors };
                                    errors[fieldName] = errorMessage;
                                    this.setState({
                                        errors: errors,
                                        error: null
                                    })
                                }
                            } else {
                                this.setState({ redirect: true })
                            }
                        },
                        (error) => {
                            this.setState({ error })
                            console.log(error)
                        }
                    )
            }
        }
    }

    validateForm = () => {
        const customer = this.state.customer;
        const errors = this.state.errors;

        for(const fieldName in customer) {
            const fieldValue = customer[fieldName];
            const errorMessage = this.validateField(fieldName, fieldValue);
            errors[fieldName] = errorMessage;
        }
        this.setState({
            errors: errors,
        })
        return !this.hasErrors();
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if(fieldName === 'Name') {
            if(!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            } else if(!checkTextLengthRange(fieldValue, 2, 60)) {
               errorMessage = formValidationKeys.len_2_60;
            }
       
        }
        if(fieldName === 'Surname') {
            if(!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            } else if(!checkTextLengthRange(fieldValue, 2, 60)) {
               errorMessage = formValidationKeys.len_2_60;
            }
       
        }
        if(fieldName === 'Telephone') {
            if(!(fieldValue==="")) {
                if(!checkTelephone(fieldValue)) {
                    errorMessage = formValidationKeys.telephoneError;
                }
            }
       
        }
        if(fieldName === 'Email') {
            if(!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            } else if(!checkEmail(fieldValue)) {
                errorMessage = formValidationKeys.emailError;
            }
        }
        if(fieldName === 'Password') {
            if(!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            } 
        }
        
        return errorMessage;
    }

    hasErrors = () => {
        const errors = this.state.errors;
        for(const errorField in this.state.errors) {
            if(errors[errorField].length>0){
                return true;
            }
        }
        return false;
    }

render() {
    const { redirect } = this.state;
    if (redirect) {
        return (<Navigate to={{ pathname: "/customers" }} />)
    }

    const globalErrorMessage =  this.state.message;
    
    return (
        <main>
            <FormTitle formMode={this.state.formMode} object="customer"/>
            <form className="form" onSubmit={this.handleSubmit}>
                <FormInput type="text" label="Name" required error={this.state.errors.Name} name="Name" placeholder="2-60" onChange={this.handleChange} value={this.state.customer.Name} object="customer"/>
                <FormInput type="text" label="Surname" required error={this.state.errors.Surname} name="Surname" placeholder="2-60"onChange={this.handleChange} value={this.state.customer.Surname} object="customer"/>
                <FormInput type="text" label="Telephone" required error={this.state.errors.Telephone} name="Telephone" placeholder="telephone" onChange={this.handleChange} value={this.state.customer.Telephone} object="customer"/>
                <FormInput type="text" label="Email" required error={this.state.errors.Email} name="Email" placeholder="email" onChange={this.handleChange} value={this.state.customer.Email} object="customer"/>
                {!this.state.customerId &&
                    <FormInput type="password" label="Password" required error={this.state.errors.Password} name="Password" placeholder="password" onChange={this.handleChange} value={this.state.customer.Password} object="customer"/>
                }
                <FormButtons formMode={this.state.formMode} error={globalErrorMessage} cancelPath="/customers" object="customer"/>
            </form>
        </main >
    )
}
}

export default CustomerForm;
