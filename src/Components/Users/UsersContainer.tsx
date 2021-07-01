import React from 'react';
import {RootReduxState} from '../../Redux/redux-store';
import {connect} from 'react-redux';
import {FollowAC, UnfollowAC, UserType} from '../../Redux/usersReducer';
import {Dispatch} from 'redux';
import {Users} from './Users';


type mapStateToPropsType = {
    users: Array<UserType>
}

type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

let mapStateToProps = (state: RootReduxState): mapStateToPropsType => {
    return {
        users: state.usersComponent.users
    }
}

let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        follow: (userId: number) => {
            dispatch(FollowAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(UnfollowAC(userId))
        },
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer;