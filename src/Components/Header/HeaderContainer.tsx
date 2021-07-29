import React from 'react';
import axios from 'axios';
import Header from './Header';
import {connect} from 'react-redux';
import {setAuthUserData} from '../../Redux/authReducer';
import {RootReduxState} from '../../Redux/redux-store';

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
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        }).then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
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