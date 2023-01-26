import React from 'react';
import { Navigate } from "react-router-dom";
import { getBikeByIdApiCall, addBikeApiCall, updateBikeApiCall } from "../../apiCalls/bikeApiCalls";
import formMode from '../../helpers/formHelper';
import { formValidationKeys } from '../../helpers/formHelper';
import { checkRequired, checkTextLengthRange } from "../../helpers/validationCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import FormTitle from "../form/FormTitle";

class BikeForm extends React.Component{
    constructor(props) {
        super(props);
        const paramsBikeId = props.id;
        const currentFormMode = paramsBikeId? formMode.EDIT : formMode.NEW;

        this.state = {
            bikeId: paramsBikeId,
            bike: {
                Brand: '',
                Model: '',
                Colour: '',
            },
            errors: {
                Brand: '',
                Model: '',
                Colour: '',
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }
    
    componentDidMount = () => {
        const currentFormMode = this.state.formMode;
        if(currentFormMode === formMode.EDIT) {
            this.fetchBikeDetails();
        }
    }

    fetchBikeDetails = () => {
        getBikeByIdApiCall(this.state.bikeId)
            .then(res => res.json())
            .then(
                (data) => {
                    if(data.message) {
                        this.setState({
                            message: data.message,
                        })
                    } else {
                        this.setState({
                            bike: data,
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
        const bike = {...this.state.bike};
        bike[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = {...this.state.errors};
        errors[name] = errorMessage;

        this.setState({
            bike: bike,
            errors: errors,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                bike = this.state.bike,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addBikeApiCall(bike);
            } else if (currentFormMode === formMode.EDIT) {
                console.log(bike);
                const bikeId = this.state.bikeId;
                promise = updateBikeApiCall(bikeId, bike);
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
        const bike = this.state.bike;
        const errors = this.state.errors;

        for(const fieldName in bike) {
            const fieldValue = bike[fieldName];
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
        if(fieldName === 'Brand') {
            if(!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            } else if(!checkTextLengthRange(fieldValue, 2, 60)) {
               errorMessage = formValidationKeys.len_2_60;
            }
       
        }
        if(fieldName === 'Model') {
            if(!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            } else if(!checkTextLengthRange(fieldValue, 2, 60)) {
               errorMessage = formValidationKeys.len_2_60;
            }
       
        }
        if(fieldName === 'Colour') {
            if(!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            } else if(!checkTextLengthRange(fieldValue, 2, 60)) {
               errorMessage = formValidationKeys.len_2_60;
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
        return (<Navigate to={{ pathname: "/bikes" }} />)
    }

    const globalErrorMessage =  this.state.message;
    
    return (
        <main>
            <FormTitle formMode={this.state.formMode} object="bike"/>
            <form className="form" onSubmit={this.handleSubmit}>
                <FormInput type="text" label="Brand" required error={this.state.errors.Brand} name="Brand" placeholder="2-60" onChange={this.handleChange} value={this.state.bike.Brand} object="bike"/>
                <FormInput type="text" label="Model" required error={this.state.errors.Model} name="Model" placeholder="2-60"onChange={this.handleChange} value={this.state.bike.Model} object="bike"/>
                <FormInput type="text" label="Colour" required error={this.state.errors.Colour} name="Colour" placeholder="2-60" onChange={this.handleChange} value={this.state.bike.Colour} object="bike"/>
                <FormButtons formMode={this.state.formMode} error={globalErrorMessage} cancelPath="/bikes" object="bike"/>
            </form>
        </main >
    )
}
}

export default BikeForm;
