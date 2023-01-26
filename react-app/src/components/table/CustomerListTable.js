import React from 'react';
import { Link } from 'react-router-dom';
import CustomerListTableRow from './CustomerListTableRow';
import { useTranslation } from 'react-i18next';
import { isAuthenticated, isAuthenticatedAdmin } from '../../helpers/authHelper';

function CustomerListTable(props) {
    const { t } = useTranslation();
    const customers = props.customerList;

    return(
        <React.Fragment>
        <h2>{t('customer.list.pageTitle')}</h2>
        <table className="table-list">
            <thead>
                 <tr>
                     <th>{t('customer.fields.Name')}</th>
                     <th>{t('customer.fields.Surname')}</th>
                     {isAuthenticatedAdmin() &&
                     <>
                     <th>{t('customer.fields.Telephone')}</th>
                     <th>{t('customer.fields.Email')}</th>
                     </>
                     }
                     {isAuthenticated() &&
                     <th>{t('list.actions.title')}</th>
                     }   
                 </tr>
             </thead>
             <tbody>
                {customers.map(customer =>
                    <CustomerListTableRow customerData={customer} key={customer.ID_customer}/>
                )}
            </tbody>
        </table>
        {isAuthenticatedAdmin() &&
        <>
        <p className="section-buttons">
            <Link to="/customers/add" className="button-add">{t('customer.list.addNew')}</Link>
        </p>
        </>
        }
        {!isAuthenticated() &&
        <>
        <p className="section-buttons">
            <Link to="/customers/add" className="button-add">{t('register.register')}</Link>
        </p>
        </>
        }
        </React.Fragment>
    )
}

export default CustomerListTable;