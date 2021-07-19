import React from 'react';
import {RootReduxState} from '../../Redux/redux-store';
import {connect} from 'react-redux';
import {
    FollowAC,
    SetCurrentPageAC,
    SetTotalCountUsersAC,
    SetUsersAC,
    UnfollowAC,
    UserType
} from '../../Redux/usersReducer';
import {Dispatch} from 'redux';
import Users from './Users';


type mapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUserCount: number
    currentPage: number
}

type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
    setCurrentPage: (currentPage: number) => void
    setTotalCountUsers: (totalCountUsers: number) => void
}

let mapStateToProps = (state: RootReduxState): mapStateToPropsType => {
    return {
        users: state.usersComponent.users,
        pageSize: state.usersComponent.pageSize,
        totalUserCount: state.usersComponent.totalUserCount,
        currentPage: state.usersComponent.currentPage,

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
        setUsers: (users: UserType[]) => {
            dispatch(SetUsersAC(users))
        },
        setCurrentPage: (currentPage: number) => {
            dispatch(SetCurrentPageAC(currentPage))
        },
        setTotalCountUsers: (totalCountUsers: number) => {
            dispatch(SetTotalCountUsersAC(totalCountUsers))
        },
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer;