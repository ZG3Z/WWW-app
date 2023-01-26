import React from 'react';
import {Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isAuthenticated, isAuthenticatedAdmin } from '../../helpers/authHelper';

function AccessoryListTableRow(props){
    const { t } = useTranslation();
    const accessory = props.accessoryData;
    const deleteAccessory = (accessoryId) => {
        fetch(`http://localhost:3000/api/accessories/${accessoryId}`, {
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
                <td>{accessory.Name}</td>
                {isAuthenticated() &&
                <td>
                   <ul className="list-actions">
                        <li><Link to={`/accessories/details/${accessory.ID_accessory}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                        {isAuthenticatedAdmin() &&
                        <>
                        <li><button onClick={() => deleteAccessory(accessory.ID_accessory)} className="list-actions-button-delete">{t('list.actions.delete')}</button></li>
                        </>
                        }
                    </ul>
                </td>
                }
            </tr>
        </React.Fragment>
    )
}

export default AccessoryListTableRow;