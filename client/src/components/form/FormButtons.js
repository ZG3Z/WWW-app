import React from 'react';
import { Link } from "react-router-dom";
import formMode from '../../helpers/formHelper';
import { useTranslation } from 'react-i18next';

function FormButtons(props) {
    const { t } = useTranslation();
    const submitButtonLabel = props.formMode === formMode.NEW ? `${t(`${props.object}.form.add.btnLabel`)}` : (props.formMode === formMode.EDIT ? `${t(`${props.object}.form.edit.btnLabel`)}` : `${t("form.actions.login")}`   ) ;
    const errors = props.error ? t('validationMessage.errorsSummary') : '';
    return (
        <div className="form-buttons">
             <div> 
                    <span  className="errors-text" id="errorMessage-summary">{props.error}</span>
                    <span id="errorsSummary" className="errors-text"></span>
            </div>
            <input className="form-button-submit" type="submit" value={submitButtonLabel} />
            <Link to={props.cancelPath} className="form-button-cancel">{t('form.actions.cancel')}</Link>
            
        </div>
    )
}

export default FormButtons;