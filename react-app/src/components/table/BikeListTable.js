import React from 'react';
import { Link } from 'react-router-dom';
import BikeListTableRow from './BikeListTableRow';
import { useTranslation } from 'react-i18next';
import { isAuthenticated, isAuthenticatedAdmin } from '../../helpers/authHelper';

function BikeListTable(props) {
    const { t } = useTranslation();
    const bikes = props.bikeList;

    return(
        <React.Fragment>
        <h2>{t('bike.list.pageTitle')}</h2>
        <table className="table-list">
            <thead>
                 <tr>
                     <th>{t('bike.fields.Brand')}</th>
                     <th>{t('bike.fields.Model')}</th>
                     <th>{t('bike.fields.Colour')}</th>
                     {isAuthenticated() &&
                     <th>{t('list.actions.title')}</th>
                     }   
                 </tr>
             </thead>
             <tbody>
                {bikes.map(bike =>
                    <BikeListTableRow bikeData={bike} key={bike.ID_bike}/>
                )}
            </tbody>
        </table>
        {isAuthenticatedAdmin() &&
        <>
        <p className="section-buttons">
                <Link to="/bikes/add" className="button-add">{t('bike.list.addNew')}</Link>
        </p>
        </>
        }
        {!isAuthenticated() &&
        <>
        <p className="section-buttons">
                <Link to="/login" className="button-add">{t('list.actions.details')}</Link>
        </p>
        </>
        }
        </React.Fragment>
    )
}

export default BikeListTable;