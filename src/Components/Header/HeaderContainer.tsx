import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {setAuthUserData} from '../../Redux/authReducer';
import {RootReduxState} from '../../Redux/redux-store';
import {authAPI} from '../../API/API';

export type HeaderContainerType = {
    setAuthUserData: (id: number, email: string, login: string,) => void
    login: string | null
    auth: boolean
}

export type MapStateToPropsType = {
    login: string | null
    auth: boolean
}

class HeaderContainer extends React.Component<HeaderContainerType, any> {

    componentDidMount() {
        authAPI.authUser().then(data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
                this.props.setAuthUserData(id, email, login)
            }
        })
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

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);