import React from 'react';
import {FormDataLoginType, LoginReduxForm} from './LoginForm';

export type LoginPropsType = {}

export function Login(props: LoginPropsType) {
    const onSubmit = (formData: FormDataLoginType) => {
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

export default Login;