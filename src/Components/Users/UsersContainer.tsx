import React from 'react';
import {RootReduxState} from '../../Redux/redux-store';
import {connect} from 'react-redux';
import {
    follow,
    setCurrentPage,
    setToggleIsFetching,
    setTotalCountUsers,
    setUsers,
    unfollow,
    UserType
} from '../../Redux/usersReducer';
import Users from './Users';
import {Preloader} from '../../Common/Preloader/Preloader';
import {usersAPI} from '../../API/API';


type mapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUserCount: number
    currentPage: number
    isFetching: boolean
}
// работает сто старым вариантом mapDispatchToProps
/*type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
    setCurrentPage: (currentPage: number) => void
    setTotalCountUsers: (totalCountUsers: number) => void
    setToggleIsFetching: (isFetching: boolean) => void
}*/

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
    // закоментировал, что бы избавится от warnings
    // это дефолтная фраза, которую можно не писать, если мы не добавляем в дефолтные пропсы чего-либо

    // constructor(props: UsersPropsType) {
    //     super(props)
    // }



    componentDidMount() {
        this.props.setToggleIsFetching(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.setUsers(data.items)
            this.props.setTotalCountUsers(data.totalCount)
            this.props.setToggleIsFetching(false)
        })
    }

    onPageChanged = (currentPage: number) => {
        this.props.setToggleIsFetching(true)
        this.props.setCurrentPage(currentPage)
        usersAPI.getUsers(currentPage, this.props.pageSize).then(data => {
            this.props.setUsers(data.items)
            this.props.setToggleIsFetching(false)
        })
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
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

// старый вариант mapDispatchToProps

// let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
//     return {
//         follow: (userId: number) => {
//             dispatch(FollowAC(userId))
//         },
//         unfollow: (userId: number) => {
//             dispatch(UnfollowAC(userId))
//         },
//         setUsers: (users: UserType[]) => {
//             dispatch(SetUsersAC(users))
//         },
//         setCurrentPage: (currentPage: number) => {
//             dispatch(SetCurrentPageAC(currentPage))
//         },
//         setTotalCountUsers: (totalCountUsers: number) => {
//             dispatch(SetTotalCountUsersAC(totalCountUsers))
//         },
//         setToggleIsFetching: (isFetching: boolean) => {
//             dispatch(SetToggleIsFetchingAC(isFetching))
//         },
//     }
// }

const UsersContainer = connect(mapStateToProps, {follow, unfollow, setUsers, setCurrentPage, setTotalCountUsers,
    setToggleIsFetching,})(UsersComponent)

export default UsersContainer;