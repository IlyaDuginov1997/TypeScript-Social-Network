import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import React from 'react';
import { Input } from 'src/Common/FormControl/ValidatedForm';
import { maxLengthCreator, requiredField } from 'src/Utils/Validators/Validator';
import classes from 'src/Components/Login/LoginForm.module.css';

export type FormDataLoginType = {
  login: string
  password: string
  rememberMe: boolean
}
const maxLength30 = maxLengthCreator(30);

export const LoginForm: React.FC<InjectedFormProps<FormDataLoginType>> = ({ handleSubmit, error }) => {

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div><Field component={Input} validate={[requiredField, maxLength30]} name={'login'}
                    placeholder={'login'} /></div>
        <div><Field component={Input} validate={[requiredField, maxLength30]} name={'password'} type={'password'}
                    placeholder={'password'} /></div>
        <div><Field component={Input} name={'rememberMe'} type={'checkbox'} />remember me</div>
        <div>
          {error && <span className={classes.globalFormError}>
                        {error}
                    </span>}
        </div>
        <div>
          <button> Login</button>
        </div>
      </form>
    </div>
  );
};

export const LoginReduxForm = reduxForm<FormDataLoginType>({ form: 'login' })(LoginForm);
