import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import React from 'react';
import { Input } from '../../Common/FormControl/ValidatedForm';
import {maxLengthCreator, requiredField} from '../../Utils/Validators/Validator';

export type FormDataLoginType = {
    login: string
    password: string
    rememberMe: boolean
}
const maxLength10 = maxLengthCreator(10)

export const LoginForm: React.FC<InjectedFormProps<FormDataLoginType>> = (props) => {

    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div><Field component={Input} validate={[requiredField, maxLength10]} name={'login'} placeholder={'login'}/></div>
                <div><Field component={Input} validate={[requiredField, maxLength10]} name={'password'} placeholder={'password'}/></div>
                <div><Field component={Input} name={'rememberMe'} type={'checkbox'}/></div>
                <div>
                    <button> Remember me</button>
                </div>
            </form>
        </div>
    );
}

export const LoginReduxForm = reduxForm<FormDataLoginType>({form: 'login'})(LoginForm);
