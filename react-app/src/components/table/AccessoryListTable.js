import React from 'react';
import { Link } from 'react-router-dom';
import AccessoryListTableRow from './AccessoryListTableRow';
import { useTranslation } from 'react-i18next';
import { isAuthenticated } from '../../helpers/authHelper';

function AccessoryListTable(props) {
    const { t } = useTranslation();
    const accessories = props.accessoryList;

    return(
        <React.Fragment>
        <h2>{t('accessory.list.pageTitle')}</h2>
        <table className="table-list">
            <thead>
                 <tr>
                     <th>{t('accessory.fields.Name')}</th>
                     {isAuthenticated() &&
                     <th>{t('list.actions.title')}</th>
                     }   
                 </tr>
             </thead>
             <tbody>
                {accessories.map(accessory =>
                    <AccessoryListTableRow accessoryData={accessory} key={accessory.ID_accessory}/>
                )}
            </tbody>
        </table>
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

export default AccessoryListTable;