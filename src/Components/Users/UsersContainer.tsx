import React from 'react';
import {RootReduxState} from '../../Redux/redux-store';
import {connect} from 'react-redux';
import {
    FollowAC,
    SetCurrentPageAC, SetToggleIsFetchingAC,
    SetTotalCountUsersAC,
    SetUsersAC,
    UnfollowAC,
    UserType
} from '../../Redux/usersReducer';
import {Dispatch} from 'redux';
import axios from 'axios';
import Users from './Users';
import preloader from '../../Assets/Images/preloader.svg'
import {Preloader} from '../../Common/Preloader/Preloader';


type mapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUserCount: number
    currentPage: number
    isFetching: boolean
}

type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
    setCurrentPage: (currentPage: number) => void
    setTotalCountUsers: (totalCountUsers: number) => void
    setToggleIsFetching: (isFetching: boolean) => void
}

export type UsersPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUserCount: number
    currentPage: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
    setCurrentPage: (currentPage: number) => void
    setTotalCountUsers: (totalCountUsers: number) => void
    isFetching: boolean
    setToggleIsFetching: (isFetching: boolean) => void

}

class UsersComponent extends React.Component<UsersPropsType, {}> {
    constructor(props: UsersPropsType) {
        super(props)
    }

    componentDidMount() {
        this.props.setToggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalCountUsers(response.data.totalCount)
            this.props.setToggleIsFetching(false)
        })
    }

    onPageChanged = (currentPage: number) => {
        this.props.setToggleIsFetching(true)
        this.props.setCurrentPage(currentPage)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setToggleIsFetching(false)
        })
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader /> : null}
                <Users
                    users={this.props.users}
                    totalUserCount={this.props.totalUserCount}
                    currentPage={this.props.currentPage}
                    unfollow={this.props.unfollow}
                    follow={this.props.follow}
                    pageSize={this.props.pageSize}
                    onPageChanged={this.onPageChanged}
                />
            </>
        )
    }
}


let mapStateToProps = (state: RootReduxState): mapStateToPropsType => {
    return {
        users: state.usersComponent.users,
        pageSize: state.usersComponent.pageSize,
        totalUserCount: state.usersComponent.totalUserCount,
        currentPage: state.usersComponent.currentPage,
        isFetching: state.usersComponent.isFetching,
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
        setToggleIsFetching: (isFetching: boolean) => {
            dispatch(SetToggleIsFetchingAC(isFetching))
        },
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersComponent)

export default UsersContainer;