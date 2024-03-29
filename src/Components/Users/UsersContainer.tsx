import React from 'react';
import { RootReduxState } from 'src/Redux/redux-store';
import { connect } from 'react-redux';
import {
  fetchUsers,
  followUserThunk,
  setCurrentPage,
  unfollowUserThunk,
  UserType,
} from 'src/Redux/usersReducer';
import Users from './Users';
import { Preloader } from 'src/Common/Preloader/Preloader';
import {
  getCurrentPage,
  getIsFetching,
  getPageSize,
  getToggleFollowingProcessArray,
  getTotalUserCount,
  getUsers,
} from 'src/Redux/users-selectors';

type mapStateToPropsType = {
  users: Array<UserType>;
  pageSize: number;
  totalUserCount: number;
  currentPage: number;
  isFetching: boolean;
  toggleFollowingProcessArray: [] | number[];
};
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
  users: Array<UserType>;
  pageSize: number;
  totalUserCount: number;
  currentPage: number;
  isFetching: boolean;
  toggleFollowingProcessArray: [] | number[];
  fetchUsers: (currentPage: number, pageSize: number) => void;
  unfollowUserThunk: (userId: number) => void;
  followUserThunk: (userId: number) => void;
  setCurrentPage: (currentPage: number) => void;
};

const START_PAGE = 1;

class UsersComponent extends React.Component<UsersPropsType, {}> {
  // закоментировал, что бы избавится от warnings
  // это дефолтная фраза, которую можно не писать, если мы не добавляем в дефолтные пропсы чего-либо

  // constructor(props: UsersPropsType) {
  //     super(props)
  // }

  componentDidMount() {
    this.props.fetchUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (currentPage: number) => {
    this.props.fetchUsers(currentPage, this.props.pageSize);
  };

  componentWillUnmount() {
    this.props.setCurrentPage(START_PAGE);
  }

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
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
    // users: getUsersSelector(state),
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUserCount: getTotalUserCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    toggleFollowingProcessArray: getToggleFollowingProcessArray(state),
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
  fetchUsers,
  unfollowUserThunk,
  followUserThunk,
  setCurrentPage,
})(UsersComponent);
