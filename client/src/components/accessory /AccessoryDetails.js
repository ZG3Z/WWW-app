import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAccessoryByIdApiCall } from '../../apiCalls/accessoryApiCalls';
import { useTranslation } from 'react-i18next';

export default function AccessoryDetails() {
    const { t } = useTranslation();
    let { accessoryId } = useParams();
    accessoryId = parseInt(accessoryId);
    const [accessory, setAccessory] = useState({});
    const [isLoad, setIsLoad] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAccessoryByIdApiCall(accessoryId)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAccessory(data);
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
            <h2>{t('accessory.form.details.pageTitle')}</h2>
            <p>{t('accessory.fields.Name')}: {accessory.Name}</p>
            <h2>{t('accessory.form.equipment')}</h2>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>{t('bike.fields.Brand')}</th>
                        <th>{t('bike.fields.Model')}</th>
                        <th>{t('bike.fields.Colour')}</th>
                    </tr>
                </thead>
                <tbody>
                    {accessory.Equipment?.map(
                        equipment =>
                            <tr key={equipment.ID_equipment}>
                                <td>{equipment.Bike.Brand}</td>
                                <td>{equipment.Bike.Model}</td>
                                <td>{equipment.Bike.Colour}</td>
                            </tr>
                    )}
                </tbody>
            </table>
                <div className="section-buttons">
                  <p><Link to="/accessories"  className="list-actions-button-details">{t('form.actions.return')}</Link></p>
                </div>
            </main>  
        )
}