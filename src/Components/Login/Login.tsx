import React from 'react';
import {FormDataType, LoginForm} from './LoginForm';
import {reduxForm} from 'redux-form';

export type LoginPropsType = {}

export function Login(props: LoginPropsType) {
    const onSubmit = (formData: FormDataType) => {
        console.log(formData);
    }

    return (
        <div>
            <div>
                <h1>
                    login
                </h1>
            </div>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>

    );
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm);

export default Login;