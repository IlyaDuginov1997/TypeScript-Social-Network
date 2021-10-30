import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import React from 'react';

export type FormDataLoginType = {
    login: string
    password: string
    rememberMe: boolean
}

export const LoginForm: React.FC<InjectedFormProps<FormDataLoginType>> = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div><Field component={'input'} name={'login'} placeholder={'login'}/></div>
                <div><Field component={'input'} name={'password'} placeholder={'password'}/></div>
                <div><Field component={'input'} name={'rememberMe'} type={'checkbox'}/></div>
                <div>
                    <button> Remember me</button>
                </div>
            </form>
        </div>
    );
}

export const LoginReduxForm = reduxForm<FormDataLoginType>({form: 'login'})(LoginForm);
