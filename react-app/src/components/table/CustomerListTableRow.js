import React from 'react';
import {Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isAuthenticated, isAuthenticatedAdmin } from '../../helpers/authHelper';

function CustomerListTableRow(props){
    const { t } = useTranslation();
    const customer = props.customerData;

    return (
        <React.Fragment>
            <tr>
                <td>{customer.Name}</td>
                <td>{customer.Surname}</td>
                {isAuthenticatedAdmin() &&
                <>
                <td>{customer.Telephone}</td>
                <td>{customer.Email}</td>
                </>
                }
                {isAuthenticated() &&
                <td>
                   <ul className="list-actions">
                        <li><Link to={`/customers/details/${customer.ID_customer}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                        {isAuthenticatedAdmin() &&
                        <>
                        <li><Link to={`/customers/edit/${customer.ID_customer}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                        </>
                        }
                    </ul>
                </td>
                }
            </tr>
        </React.Fragment>
    )
}

export default CustomerListTableRow;