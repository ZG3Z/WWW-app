import React from 'react';
import { useTranslation } from 'react-i18next';

function FormLabel(props) {
    const { t } = useTranslation();
    return (
        <>
            <label htmlFor={props.name}> {t(`${props.object}.fields.${props.name}`)}:
                {<abbr title="required" aria-label="required">*</abbr>}
            </label>
        </>
    )
}

export default FormLabel;