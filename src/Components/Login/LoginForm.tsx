import {Field, InjectedFormProps} from 'redux-form';
import React from 'react';

export type LoginFormPropsType = {}

export type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}


export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
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