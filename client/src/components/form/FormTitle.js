import React from 'react';
import formMode from '../../helpers/formHelper';
import { useTranslation } from 'react-i18next';

function FormTitle(props) {
    const { t } = useTranslation();
    const title = props.formMode === formMode.NEW ? `${t(`${props.object}.form.add.pageTitle`)}` : `${t(`${props.object}.form.edit.pageTitle`)}`;

    return (
        <h2>{title}</h2>
    )
}

export default FormTitle;