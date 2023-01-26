import React from 'react';
import {Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isAuthenticated, isAuthenticatedAdmin } from '../../helpers/authHelper';

function BikeListTableRow(props){
    const { t } = useTranslation();
    const bike = props.bikeData;
    const deleteBike = (bikeId) => {
        fetch(`http://localhost:3000/api/bikes/${bikeId}`, {
            method: "DELETE",
        })
            .then(response => {
                console.log(response);
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
                window.location.reload();
            });
    };

    return (
        <React.Fragment>
            <tr>
                <td>{bike.Brand}</td>
                <td>{bike.Model}</td>
                <td>{bike.Colour}</td>
                {isAuthenticated() &&
                <td>
                   <ul className="list-actions">
                        <li><Link to={`/bikes/details/${bike.ID_bike}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                        {isAuthenticatedAdmin() &&
                        <>
                        <li><Link to={`/bikes/edit/${bike.ID_bike}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                        <li><button  onClick={() => deleteBike(bike.ID_bike)} className="list-actions-button-delete">{t('list.actions.delete')}</button></li>
                        </>
                        }
                    </ul>
                </td>
                }
            </tr>
        </React.Fragment>
    )
}

export default BikeListTableRow;