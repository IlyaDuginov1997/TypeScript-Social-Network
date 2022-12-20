import React from 'react';
import { FormDataLoginType, LoginReduxForm } from 'src/Components/Login/LoginForm';
import { connect } from 'react-redux';
import { login } from 'src/Redux/authReducer';
import { RootReduxState } from 'src/Redux/redux-store';
import { Redirect } from 'react-router-dom';

export type LoginPropsType = {
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
  ) => void
  isAuth: boolean
}

type MapStateToPropsType = {
  isAuth: boolean
}

export function Login(props: LoginPropsType) {
  const onSubmit = (formData: FormDataLoginType) => {
    const { login, password, rememberMe = false } = formData;
    props.login(login, password, rememberMe);
  };

  if (props.isAuth) {
    return <Redirect to={'/profile'} />;
  }

  return (
    <div>
      <div>
        <h1>
          login
        </h1>
      </div>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>

  );
}

let mapStateToProps = (state: RootReduxState): MapStateToPropsType => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps, { login })(Login);
