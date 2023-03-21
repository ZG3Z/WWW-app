import React from 'react';
import {Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isAuthenticated, isAuthenticatedAdmin } from '../../helpers/authHelper';
import { getFormattedDate } from '../../helpers/dateHelper';

function RentalListTableRow(props){
    const { t } = useTranslation();
    const rental = props.rentalData;
    const deleteRental = (rentalId) => {
        fetch(`http://localhost:3000/api/rentals/${rentalId}`, {
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
                <td>{rental.Customer.Name} {rental.Customer.Surname}</td>
                <td>{rental.Bike.Brand} {rental.Bike.Model}</td>
                <td>{rental.Date_from ? getFormattedDate(rental.Date_from) : ""}</td>
                <td>{rental.Date_to ? getFormattedDate(rental.Date_to) : ""}</td>
                <td>{rental.Equipment ? "X" : ""}</td>
                {isAuthenticated() &&
                <td>
                   <ul className="list-actions">
                        <li><Link to={`/rentals/details/${rental.ID_rental}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                        {isAuthenticatedAdmin() &&
                        <>
                        <li><Link to={`/rentals/edit/${rental.ID_rental}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                        <li><button  onClick={() => deleteRental(rental.ID_rental)} className="list-actions-button-delete">{t('list.actions.delete')}</button></li>
                        </>
                        }
                   </ul>
                </td>
                }
            </tr>
        </React.Fragment>
    )
}

export default RentalListTableRow;