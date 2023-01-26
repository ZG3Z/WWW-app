import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBikeByIdApiCall } from '../../apiCalls/bikeApiCalls';
import { getFormattedDate } from '../../helpers/dateHelper';
import { useTranslation } from 'react-i18next';
import { isAuthenticatedAdmin } from "../../helpers/authHelper";

export default function BikeDetails() {
    const { t } = useTranslation();
    let { bikeId } = useParams();
    bikeId = parseInt(bikeId);
    const [bike, setBike] = useState({});
    const [isLoad, setIsLoad] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getBikeByIdApiCall(bikeId)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setBike(data);
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
            <h2>{t('bike.form.details.pageTitle')}</h2>
            <p>{t('bike.fields.Brand')}: {bike.Brand}</p>
            <p>{t('bike.fields.Model')}: {bike.Model} </p>
            <p>{t('bike.fields.Colour')}: {bike.Colour} </p>
            {isAuthenticatedAdmin() &&
            <>            
            <h2>{t('bike.form.rental')}</h2>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>{t('customer.fields.Name')}</th>
                        <th>{t('customer.fields.Surname')}</th>
                        <th>{t('customer.fields.Telephone')}</th>
                        <th>{t('customer.fields.Email')}</th>
                        <th>{t('rental.fields.Date_from')}</th>
                        <th>{t('rental.fields.Date_to')}</th>
                        <th>{t('rental.fields.Equipment')}</th>
                    </tr>
                </thead>
                <tbody>
                    {bike.Rentals?.map(
                        rentals =>
                            <tr key={rentals.ID_rental}>
                                <td>{rentals.Customer.Name}</td>
                                <td>{rentals.Customer.Surname}</td>
                                <td>{rentals.Customer.Telephone}</td>
                                <td>{rentals.Customer.Email}</td>
                                <td>{rentals.Date_from ? getFormattedDate(rentals.Date_from) : ""}</td>
                                <td>{rentals.Date_to ? getFormattedDate(rentals.Date_to) : ""}</td>
                            </tr>
                    )}
                </tbody>
            </table>
            </>
            }
            <h2>{t('bike.form.equipment')}</h2>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>{t('accessory.fields.Name')}</th>
                    </tr>
                </thead>
                <tbody>
                    {bike.Equipment?.map(
                        equipment =>
                            <tr key={equipment.ID_equipment}>
                                <td>{equipment.Accessory.Name}</td>
                            </tr>
                    )}
                </tbody>
            </table>
                <div className="section-buttons">
                    <p><Link to={`/equipments/add/${bike.ID_bike}`}  className="button-add">{t('equipment.form.add.btnLabel')}</Link></p>
                    <p><Link to="/bikes"  className="list-actions-button-details">{t('form.actions.return')}</Link></p>
                </div>
            </main>  
        )
}