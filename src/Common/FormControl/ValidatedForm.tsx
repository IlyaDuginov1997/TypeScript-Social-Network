import React from 'react';
import {WrappedFieldProps} from 'redux-form';
import classes from './Validator.module.css';

export const Textarea = ({input, meta, ...props}: WrappedFieldProps) => {
    const hasError = meta.error && meta.touched
    return (
        <div className={`${classes.formControl} ${hasError ? classes.error :''}`}>
            <div>
                <textarea {...input} {...props} />
            </div>
            <div>
                {hasError && <span>{meta.error}</span> }
            </div>

        </div>
    );
};