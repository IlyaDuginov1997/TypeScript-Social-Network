import {RootReduxState} from 'src/Redux/redux-store';

export const getUsers = (state: RootReduxState) => {
  return state.usersComponent.users;
};

export const getPageSize = (state: RootReduxState) => {
  return state.usersComponent.pageSize;
};

export const getTotalUserCount = (state: RootReduxState) => {
  return state.usersComponent.totalUserCount;
};

export const getCurrentPage = (state: RootReduxState) => {
  return state.usersComponent.currentPage;
};

export const getIsFetching = (state: RootReduxState) => {
  return state.usersComponent.isFetching;
};

export const getToggleFollowingProcessArray = (state: RootReduxState) => {
  return state.usersComponent.toggleFollowingProcessArray;
};

