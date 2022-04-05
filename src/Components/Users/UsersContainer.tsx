import React from 'react';
import {RootReduxState} from '../../Redux/redux-store';
import {connect} from 'react-redux';
import {
  followUserThunk,
  getUsers,
  unfollowUserThunk,
  UserType
} from '../../Redux/usersReducer';
import Users from './Users';
import {Preloader} from '../../Common/Preloader/Preloader';


type mapStateToPropsType = {
  users: Array<UserType>
  pageSize: number
  totalUserCount: number
  currentPage: number
  isFetching: boolean
  toggleFollowingProcessArray: [] | number[]
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
  isFetching: boolean
  toggleFollowingProcessArray: [] | number[]
  getUsers: (currentPage: number, pageSize: number) => void
  unfollowUserThunk: (userId: number) => void
  followUserThunk: (userId: number) => void
}

class UsersComponent extends React.Component<UsersPropsType, {}> {
  // закоментировал, что бы избавится от warnings
  // это дефолтная фраза, которую можно не писать, если мы не добавляем в дефолтные пропсы чего-либо

  // constructor(props: UsersPropsType) {
  //     super(props)
  // }

  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (currentPage: number) => {
    this.props.getUsers(currentPage, this.props.pageSize);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader/> : null}
        <Users
          users={this.props.users}
          totalUserCount={this.props.totalUserCount}
          currentPage={this.props.currentPage}
          pageSize={this.props.pageSize}
          onPageChanged={this.onPageChanged}
          toggleFollowingProcessArray={this.props.toggleFollowingProcessArray}
          unfollowUserThunk={this.props.unfollowUserThunk}
          followUserThunk={this.props.followUserThunk}
        />
      </>
    );
  }
}


let mapStateToProps = (state: RootReduxState): mapStateToPropsType => {
  return {
    users: state.usersComponent.users,
    pageSize: state.usersComponent.pageSize,
    totalUserCount: state.usersComponent.totalUserCount,
    currentPage: state.usersComponent.currentPage,
    isFetching: state.usersComponent.isFetching,
    toggleFollowingProcessArray: state.usersComponent.toggleFollowingProcessArray,
  };
};

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

export const UsersContainer = connect(mapStateToProps, {
  getUsers,
  unfollowUserThunk,
  followUserThunk,
})(UsersComponent);
