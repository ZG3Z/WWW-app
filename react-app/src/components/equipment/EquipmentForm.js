import React from 'react';
import { Navigate } from "react-router-dom";
import { addEquipmentApiCall } from "../../apiCalls/equipmentApiCalls";
import formMode from '../../helpers/formHelper';
import { formValidationKeys } from '../../helpers/formHelper';
import { checkRequired } from "../../helpers/validationCommon";
import FormButtons from "../form/FormButtons";
import FormTitle from "../form/FormTitle";
import { getAccessoriesApiCall } from "../../apiCalls/accessoryApiCalls";
import { getBikesApiCall } from "../../apiCalls/bikeApiCalls";
import FormLabel from '../form/FormLabel';

class EquipmentForm extends React.Component{
    constructor(props) {
        super(props);
        const paramsBikeId = props.id;
        this.state = {
            bikeId: paramsBikeId,
            equipment: {
                Bike_ID_bike: '',
                Accessory_ID_accessory: ''
            },
            errors: {
                Bike_ID_bike: '',
                Accessory_ID_accessory: ''
            },
            redirect: false,
            bikes: [],
            accessories: []
        }
    }
    
    componentDidMount = () => {
        this.fetchDetails();
    }

    fetchDetails = () => {
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

        getAccessoriesApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        accessories: data
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

    handleChange = (event) => {
        const {name, value} = event.target;
        const equipment = {...this.state.equipment};
        equipment[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = {...this.state.errors};
        errors[name] = errorMessage;

        this.setState({
            equipment: equipment,
            errors: errors,
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm();
        if (isValid) {
            const
            equipment = this.state.equipment;
            let promise, response;
            promise = addEquipmentApiCall(equipment);
            
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
        const equipment = this.state.equipment;
        const errors = this.state.errors;

        for(const fieldName in equipment) {
            const fieldValue = equipment[fieldName];
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
        if(fieldName === 'Bike_ID_bike') {
            if(!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            }
        }
        if(fieldName === 'Accessory_ID_accessory') {
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
    const { redirect, paramsBikeId  } = this.state;
    if (redirect) {
        return (<Navigate to={{ pathname: "/bikes" }} />)
    }

    const globalErrorMessage =  this.state.message;
    return (
        <main>
            <FormTitle formMode={formMode.NEW} object="equipment"/>
            <form className="form" onSubmit={this.handleSubmit}>
               <FormLabel  name="Bike_ID_bike" object="equipment"/>
                <select name='Bike_ID_bike' onChange={this.handleChange}>
                    <option value=""></option>
                     { this.state.bikes.filter(x => x.ID_bike === this.state.bikeId).map(bike => (
                                <option key={bike.ID_bike} value={bike.ID_bike}>{bike.Brand} {bike.Model}</option>
                            ))}
                    </select>
                <span id='errorBike_ID_bike' className='errors-text'></span>
                <FormLabel  name="Accessory_ID_accessory" object="equipment"/>
                <select id="Accessory_ID_accessory" onChange={this.handleChange} name="Accessory_ID_accessory">
                    <option value=""></option>
                        { this.state.accessories.map(accessory => (
                            <option key={accessory.ID_accessory} value={accessory.ID_accessory}>{accessory.Name}</option>
                        ))}
                </select>
                <span id='errorAccessory_ID_accessory' className='errors-text'></span>
                <FormButtons formMode={formMode.NEW} error={globalErrorMessage} cancelPath="/bikes" object="equipment"/>
            </form>
        </main >
    )
}
}

export default EquipmentForm;
