import React from 'react';
import {WrappedFieldProps} from 'redux-form';
import classes from './ValidatedForm.module.css';

export type DefaultFormControlType = WrappedFieldProps & {
    children: React.ReactNode
}

export const FormControl = ({input, meta, children, ...props}: DefaultFormControlType) => {
    const hasErrorTextarea = meta.error && meta.touched
    return (
        <div className={`${classes.formControl} ${hasErrorTextarea ? classes.error :''}`}>
            <div>
                {children}
            </div>
            <div>
                {hasErrorTextarea && <span>{meta.error}</span> }
            </div>
        </div>
    );
};

export const Input = (props: DefaultFormControlType) => {
    const {input, meta, children, ...restProps} = props
    return (
        <FormControl {...props}>
            <input {...input} {...restProps} />
        </FormControl>
    );
};

export const Textarea = (props: DefaultFormControlType) => {
    const {input, meta, children, ...restProps} = props
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps} />
        </FormControl>
    );
};