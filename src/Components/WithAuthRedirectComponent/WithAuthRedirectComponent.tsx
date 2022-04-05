import React, {ComponentType} from 'react'
import {Redirect} from 'react-router-dom'
import {RootReduxState} from '../../Redux/redux-store';
import {connect} from 'react-redux';

export type mapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: RootReduxState): mapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
    }
}

export function withAuthRedirect<T>(Component: ComponentType<T>) {
    class RedirectComponent extends React.Component<mapStateToPropsType> {
        render() {
            let {isAuth, ...restProps} = this.props
            if (!isAuth) {
                return <Redirect to={'/login'}/>
            }
            return <Component {...restProps as T}/>
        }
    }

    return connect(mapStateToProps)(RedirectComponent)
}
