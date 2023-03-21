import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCustomerByIdApiCall } from '../../apiCalls/customerApiCalls';
import { getFormattedDate } from '../../helpers/dateHelper';
import { useTranslation } from 'react-i18next';

export default function CustomerDetails() {
    const { t } = useTranslation();
    let { customerId } = useParams();
    customerId = parseInt(customerId);
    const [customer, setCustomer] = useState({});
    const [isLoad, setIsLoad] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCustomerByIdApiCall(customerId)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCustomer(data);
                setIsLoad(true);
            })
            .catch(error => {
                console.log(error);
                setIsLoad(true);
                setError(error);
            });
    }, [])
        return (
            <main>
            <h2>{t('customer.form.details.pageTitle')}</h2>
            <p>{t('customer.fields.Name')}: {customer.Name}</p>
            <p>{t('customer.fields.Surname')}: {customer.Surname} </p>
            <p>{t('customer.fields.Telephone')}: {customer.Telephone} </p>
            <p>{t('customer.fields.Email')}: {customer.Email} </p>
            <h2>{t('customer.form.rental')}</h2>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>{t('bike.fields.Brand')}</th>
                        <th>{t('bike.fields.Model')}</th>
                        <th>{t('bike.fields.Colour')}</th>
                        <th>{t('rental.fields.Date_from')}</th>
                        <th>{t('rental.fields.Date_to')}</th>
                        <th>{t('rental.fields.Equipment')}</th>
                    </tr>
                </thead>
                <tbody>
                    {customer.Rentals?.map(
                        rentals =>
                            <tr key={rentals.ID_rental}>
                                <td>{rentals.Bike.Brand}</td>
                                <td>{rentals.Bike.Model}</td>
                                <td>{rentals.Bike.Colour}</td>
                                <td>{rentals.Date_from ? getFormattedDate(rentals.Date_from) : ""}</td>
                                <td>{rentals.Date_to ? getFormattedDate(rentals.Date_to) : ""}</td>
                                <td>{rentals.Equipment ? "X" : ""}</td>
                            </tr>
                    )}
                </tbody>
            </table>
                <div className="section-buttons">
                  <p><Link to="/customers"  className="list-actions-button-details">{t('form.actions.return')}</Link></p>
                </div>
            </main>  
        )
}