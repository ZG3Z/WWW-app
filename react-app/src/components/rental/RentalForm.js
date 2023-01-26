import React from 'react';
import { Navigate } from "react-router-dom";
import { getRentalByIdApiCall, addRentalApiCall, updateRentalApiCall } from "../../apiCalls/rentalApiCalls";
import formMode from '../../helpers/formHelper';
import { formValidationKeys } from '../../helpers/formHelper';
import { checkRequired } from "../../helpers/validationCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import FormTitle from "../form/FormTitle";
import { getCustomersApiCall } from "../../apiCalls/customerApiCalls";
import { getBikesApiCall } from "../../apiCalls/bikeApiCalls";
import { getFormattedDate } from '../../helpers/dateHelper';
import FormLabel from '../form/FormLabel';
import { isAuthenticatedAdmin, userId } from '../../helpers/authHelper';

class RentalForm extends React.Component{
    constructor(props) {
        super(props);
        const paramsRentalId = props.id;
        const currentFormMode = paramsRentalId? formMode.EDIT : formMode.NEW;
        this.state = {
            checked: false,
            user: props.user,
            rentalId: paramsRentalId,
            rental: {
                Customer_ID_customer: '',
                Bike_ID_bike: '',
                Date_from: '',
                Date_to: '',
                Equipment: false
            },
            errors: {
                Customer_ID_customer: '',
                Bike_ID_bike: '',
                Date_from: '',
                Date_to: '',
                Equipment: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null,
            customers: [],
            bikes: [],
            customer: {
                Name: '',
                Surname: '',
                Telephone: '',
                Email: '',
                Password: ''
            },
            bike: {
                Brand: '',
                Model: '',
                Colour: '',
            }
        }
    }
    
    componentDidMount = () => {
        this.fetchDetails();
        const currentFormMode = this.state.formMode;
        if(currentFormMode === formMode.EDIT) {
            this.fetchRentalDetails();
        }
    }

    fetchDetails = () => {
        getCustomersApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        customers: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );

        getBikesApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        bikes: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    fetchRentalDetails = () => {
        getRentalByIdApiCall(this.state.rentalId)
            .then(res => res.json())
            .then(
                (data) => {
                    if(data.message) {
                        this.setState({
                            message: data.message,
                        })
                    } else {
                        this.setState({
                            rental: data,
                            checked: data.Equipment,
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
        const rental = {...this.state.rental};
        rental[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = {...this.state.errors};
        errors[name] = errorMessage;

        this.setState({
            rental: rental,
            errors: errors,
        })
    }

    handleCheck = (e) => {
        const { checked } = e.target;

        this.setState({
          checked: checked,
          rental: {
            Equipment: checked
          }
        })
      }
      
    
    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm();
        if (isValid) {
            const
                rental = this.state.rental,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addRentalApiCall(rental);
            } else if (currentFormMode === formMode.EDIT) {
                console.log(rental);
                const rentalId = this.state.rentalId;
                promise = updateRentalApiCall(rentalId, rental);
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
        const rental = this.state.rental;
        const errors = this.state.errors;

        for(const fieldName in rental) {
            const fieldValue = rental[fieldName];
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
        if(fieldName === 'Customer_ID_customer') {
            if(!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            }
        }
        if(fieldName === 'Bike_ID_bike') {
            if(!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            }
        }
        if(fieldName === 'Date_from') {
            if(!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            } 
        }
        if(fieldName === 'Date_to') {
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
        return (<Navigate to={{ pathname: "/rentals" }} />)
    }

    const globalErrorMessage =  this.state.message;
    return (
        <main>
            <FormTitle formMode={this.state.formMode} object="rental"/>
            <form className="form" onSubmit={this.handleSubmit}>
                <FormLabel  name="Customer_ID_customer" object="rental"/>
                {isAuthenticatedAdmin() &&
                <>
                {!this.state.rentalId && 
                    <select id="Customer_ID_customer" onChange={this.handleChange} name="Customer_ID_customer">
                        <option value=""></option>
                            { this.state.customers.slice(1,this.state.customers.length).map(customer => (
                                <option key={customer.ID_customer} value={customer.ID_customer}>{customer.Name} {customer.Surname}</option>
                            ))}
                    </select>}
                {this.state.rentalId && 
                    <select name='Customer_ID_customer' onChange={this.handleChange}>
                        <option value={this.state.customers.slice(1,this.state.customers.length).find(x => x.ID_customer === this.state.rental.Customer_ID_customer)?.ID_customer}>{this.state.customers.find(x => x.ID_customer === this.state.rental.Customer_ID_customer)?.Name} {this.state.customers.find(x => x.ID_customer === this.state.rental.Customer_ID_customer)?.Surname}</option>
                            { this.state.customers.slice(1,this.state.customers.length).filter(x => x.ID_customer !== this.state.rental.Customer_ID_customer).map(customer => (
                                <option key={customer.ID_customer} value={customer.ID_customer}>{customer.Name} {customer.Surname}</option>
                            ))}
                    </select>
                }
                </>
                }
                { !isAuthenticatedAdmin() &&
                <>
                   <select name='Customer_ID_customer' onChange={this.handleChange}>
                    <option value=""></option>
                     { this.state.customers.slice(1,this.state.customers.length).filter(x => x.ID_customer === userId()).map(customer => (
                                <option key={customer.ID_customer} value={customer.ID_customer}>{customer.Name} {customer.Surname}</option>
                            ))}
                    </select>
                </>
                }
                <span id='errorCustomer_ID_customer' className='errors-text'></span>
                <FormLabel  name="Bike_ID_bike" object="rental"/>
                {!this.state.rentalId && 
                    <select id="Bike_ID_bike" onChange={this.handleChange} name="Bike_ID_bike">
                        <option value=""></option>
                            { this.state.bikes.map(bike => (
                                <option key={bike.ID_bike} value={bike.ID_bike}>{bike.Brand} {bike.Model}</option>
                            ))}
                    </select>}
                {this.state.rentalId && 
                    <select name='Bike_ID_bike' onChange={this.handleChange}>
                        <option value={this.state.bikes.find(x => x.ID_bike === this.state.rental.Bike_ID_bike)?.ID_bike}>{this.state.bikes.find(x => x.ID_bike === this.state.rental.Bike_ID_bike)?.Brand} {this.state.bikes.find(x => x.ID_bike === this.state.rental.Bike_ID_bike)?.Model}</option>
                            { this.state.bikes.filter(x => x.ID_bike !== this.state.rental.Bike_ID_bike).map(bike => (
                                <option key={bike.ID_bike} value={bike.ID_bike}>{bike.Brand} {bike.Model}</option>
                            ))}
                    </select>
                }
                <span id='errorBike_ID_bike' className='errors-text'></span>
                <FormInput type="date" label="Date_from" required error={this.state.errors.Date_from} name="Date_from" onChange={this.handleChange} value={getFormattedDate(this.state.rental.Date_from)} object="rental"/>
                <FormInput type="date" label="Date_to" required error={this.state.errors.Date_to} name="Date_to" onChange={this.handleChange} value={getFormattedDate(this.state.rental.Date_to)} object="rental"/>
                {this.state.formMode===formMode.NEW &&
                <>
                    <FormInput type="checkbox" label="Equipment" required error={this.state.errors.Equipment} name="Equipment"  onChange={e => this.handleCheck(e)}  defaultChecked={this.state.checked} object="rental"/>
                    <span id='errorEquipment' className='errors-text'></span>
                </>
                }
                <FormButtons formMode={this.state.formMode} error={globalErrorMessage} cancelPath="/rentals" object="rental"/>
            </form>
        </main >
    )
}
}

export default RentalForm;
