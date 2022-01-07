import React from 'react';
import {Header} from './Header';
import {connect} from 'react-redux';
import {authUserThunk, logout} from '../../Redux/authReducer';
import {RootReduxState} from '../../Redux/redux-store';

export type HeaderContainerType = {
    login: string | null
    auth: boolean
    authUserThunk: () => void
    logout: () => void
}

export type MapStateToPropsType = {
    login: string | null
    auth: boolean
}

class HeaderComponent extends React.Component<HeaderContainerType, any> {

    componentDidMount() {
        this.props.authUserThunk()
    }

    render() {
        return <Header {...this.props}/>
    }
}

let mapStateToProps = (state: RootReduxState): MapStateToPropsType => {
    return {
        login: state.auth.login,
        auth: state.auth.isAuth,
    }
}


export const HeaderContainer = connect(mapStateToProps, {authUserThunk, logout})(HeaderComponent)

