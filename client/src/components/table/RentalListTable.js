import React from 'react';
import { Link } from 'react-router-dom';
import RentalListTableRow from './RentalListTableRow';
import { useTranslation } from 'react-i18next';
import { isAuthenticated } from '../../helpers/authHelper';

function RentalListTable(props) {
    const { t } = useTranslation();
    const rentals = props.rentalList;

    return(
        <React.Fragment>
        <h2>{t('rental.list.pageTitle')}</h2>
        <table className="table-list">
            <thead>
                 <tr>
                     <th>{t('rental.fields.Customer_ID_customer')}</th>
                     <th>{t('rental.fields.Bike_ID_bike')}</th>
                     <th>{t('rental.fields.Date_from')}</th>
                     <th>{t('rental.fields.Date_to')}</th>
                     <th>{t('rental.fields.Equipment')}</th>
                     {isAuthenticated() &&
                     <th>{t('list.actions.title')}</th>
                     }   
                 </tr>
             </thead>
             <tbody>
                {rentals.map(rental =>
                    <RentalListTableRow rentalData={rental} key={rental.ID_rental}/>
                )}
            </tbody>
        </table>
        {isAuthenticated() &&
        <>
        <p className="section-buttons">
                <Link to="/rentals/add" className="button-add">{t('rental.list.addNew')}</Link>
        </p>
        </>
        }
        </React.Fragment>
    )
}

export default RentalListTable;