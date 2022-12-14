import React from 'react';
import {Header} from 'src/Components/Header/Header';
import {connect} from 'react-redux';
import {logout} from 'src/Redux/authReducer';
import {RootReduxState} from 'src/Redux/redux-store';

export type HeaderContainerType = {
  login: string | null
  auth: boolean
  logout: () => void
}

export type MapStateToPropsType = {
  login: string | null
  auth: boolean
}

class HeaderComponent extends React.Component<HeaderContainerType, any> {

  render() {
    return <Header {...this.props}/>;
  }
}

let mapStateToProps = (state: RootReduxState): MapStateToPropsType => {
  return {
    login: state.auth.login,
    auth: state.auth.isAuth,
  };
};


export const HeaderContainer = connect(mapStateToProps, {
  logout
})(HeaderComponent);

