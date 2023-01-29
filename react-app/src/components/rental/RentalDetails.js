import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRentalByIdApiCall } from '../../apiCalls/rentalApiCalls';
import { getFormattedDate } from '../../helpers/dateHelper';
import { useTranslation } from 'react-i18next';

export default function RentalDetails() {
    const { t } = useTranslation();
    let { rentalId } = useParams();
    rentalId = parseInt(rentalId);
    const [rental, setRental] = useState({});
    const [isLoad, setIsLoad] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getRentalByIdApiCall(rentalId)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setRental(data);
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
            <h2>{t('rental.form.details.pageTitle')}</h2>
            <p>{t('rental.fields.Customer_ID_customer')}: {rental.Customer?.Name} {rental.Customer?.Surname}</p>
            <p>{t('rental.fields.Bike_ID_bike')}: {rental.Bike?.Brand} {rental.Bike?.Model}</p>
            <p>{t('rental.fields.Date_from')}: {rental.Date_from ? getFormattedDate(rental.Date_from) : ""}</p>
            <p>{t('rental.fields.Date_to')}: {rental.Date_to ? getFormattedDate(rental.Date_to) : ""}</p>
            <p>{t('rental.fields.Equipment')}: {rentals.Equipment ? "yes" : "no"}</p>
            <br></br>
            <h3>{t('rental.form.customer')}</h3>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>{t('customer.fields.Name')}</th>
                        <th>{t('customer.fields.Surname')}</th>
                        <th>{t('customer.fields.Telephone')}</th>
                        <th>{t('customer.fields.Email')}</th>
                    </tr>
                </thead>
                <tbody>
                    <td>{rental.Customer?.Name}</td>
                    <td>{rental.Customer?.Surname}</td>
                    <td>{rental.Customer?.Telephone}</td>
                    <td>{rental.Customer?.Email}</td>
                </tbody>
            </table>
            <br></br>
            <h3>{t('rental.form.bike')}</h3>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>{t('bike.fields.Brand')}</th>
                        <th>{t('bike.fields.Model')}</th>
                        <th>{t('bike.fields.Colour')}</th>
                    </tr>
                </thead>
                <tbody>
                    <td>{rental.Bike?.Brand}</td>
                    <td>{rental.Bike?.Model}</td>
                    <td>{rental.Bike?.Colour}</td>
                </tbody>
            </table>
            <div className="section-buttons">
              <p><Link to="/rentals"  className="list-actions-button-details">{t('form.actions.return')}</Link></p>
            </div>
        </main>  
        )
}