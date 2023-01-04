import React from 'react';
import { FormDataLoginType, LoginReduxForm } from 'src/Components/Login/LoginForm';
import { connect } from 'react-redux';
import { login } from 'src/Redux/authReducer';
import { RootReduxState } from 'src/Redux/redux-store';
import { Redirect } from 'react-router-dom';

export type LoginPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captchaURL: string | null) => void;
  isAuth: boolean;
  captchaURL: string | null;
};

type MapStateToPropsType = {
  isAuth: boolean;
  captchaURL: string | null;
};

export function Login(props: LoginPropsType) {
  const onSubmit = (formData: FormDataLoginType) => {
    const { login, password, rememberMe = false, captchaURL = null } = formData;
    props.login(login, password, rememberMe, captchaURL);
  };

  if (props.isAuth) {
    return <Redirect to={'/profile'} />;
  }

  return (
    <div>
      <div>
        <h1>login</h1>
      </div>
      <LoginReduxForm onSubmit={onSubmit} captchaURL={props.captchaURL}/>
    </div>
  );
}

let mapStateToProps = (state: RootReduxState): MapStateToPropsType => {
  return {
    isAuth: state.auth.isAuth,
    captchaURL: state.auth.captchaURL,
  };
};

export default connect(mapStateToProps, { login })(Login);
