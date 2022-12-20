import React from 'react';
import { UserType } from 'src/Redux/usersReducer';
import classes from 'src/Components/Users/Users.module.css';
import user from 'src/Assets/Images/user.jpg';
import { NavLink } from 'react-router-dom';
import { Paginator } from 'src/Common/Paginator/Paginator';

export type UsersPropsType = {
  users: Array<UserType>
  pageSize: number
  totalUserCount: number
  currentPage: number
  onPageChanged: (currentPage: number) => void
  toggleFollowingProcessArray: [] | number[]
  unfollowUserThunk: (userId: number) => void
  followUserThunk: (userId: number) => void
}

const Users: React.FC<UsersPropsType> = (
  {
    totalUserCount,
    currentPage,
    pageSize,
    users,
    toggleFollowingProcessArray,
    followUserThunk,
    unfollowUserThunk,
    onPageChanged,
  }) => {

  return (
    <div>
      <Paginator
        totalUserCount={totalUserCount}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChanged={onPageChanged}
      />
      {users.map(u => {
        return (<div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                            <img className={classes.avatar} src={u.photos.small ? u.photos.small : user}
                                 alt={'sorry, we have some troubles'} />
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                              ? <button
                                disabled={toggleFollowingProcessArray.some(id => id === u.id)}
                                onClick={() => unfollowUserThunk(u.id)}> Unfollow </button>

                              : <button
                                disabled={toggleFollowingProcessArray.some(id => id === u.id)}
                                onClick={() => followUserThunk(u.id)}> Follow </button>
                            }
                        </div>
                    </span>
          <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>

                        <span>
                            <div>{'u.location.country'}</div>
                            <div>{'u.location.cityName'}</div>
                        </span>
                    </span>
        </div>);
      })}
    </div>);
};

export default Users;