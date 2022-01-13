import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import React from 'react';
import {Input} from '../../Common/FormControl/ValidatedForm';
import {maxLengthCreator, requiredField} from '../../Utils/Validators/Validator';
import classes from './LoginForm.module.css';

export type FormDataLoginType = {
    login: string
    password: string
    rememberMe: boolean
}
const maxLength30 = maxLengthCreator(30);

export const LoginForm: React.FC<InjectedFormProps<FormDataLoginType>> = (props) => {

    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div><Field component={Input} validate={[requiredField, maxLength30]} name={'login'}
                            placeholder={'login'}/></div>
                <div><Field component={Input} validate={[requiredField, maxLength30]} name={'password'} type={'password'}
                            placeholder={'password'}/></div>
                <div><Field component={Input} name={'rememberMe'} type={'checkbox'}/>remember me</div>
                <div>
                    {props.error && <span className={classes.globalFormError}>
                        {props.error}
                    </span>}
                </div>
                <div>
                    <button> Login</button>
                </div>
            </form>
        </div>
    );
};

export const LoginReduxForm = reduxForm<FormDataLoginType>({form: 'login'})(LoginForm);
