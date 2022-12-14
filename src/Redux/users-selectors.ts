import {RootReduxState} from 'src/Redux/redux-store';
import {createSelector} from 'reselect';

export const getUsersSelector = (state: RootReduxState) => {
  return state.usersComponent.users;
};

// selector from reselect library, with getUsersSelector dependence
// if getUsersSelector returns the same primitive or the same link of object
// selector getUsers use hashed data and no uses

// fake example with filter, but here can be difficult logic
// and we cashed returned value
export const getUsers = createSelector(getUsersSelector, (users) => {
  return users.filter(user => true);
});

export const getToggleFollowingProcessArraySelector = (state: RootReduxState) => {
  return state.usersComponent.toggleFollowingProcessArray;
};

export const getToggleFollowingProcessArray = createSelector(getToggleFollowingProcessArraySelector, (progressFollowingArray) => {
  return progressFollowingArray.filter(item => true);
});

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
