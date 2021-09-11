import React from 'react';
import {UserType} from '../../Redux/usersReducer';
import classes from './Users.module.css';
import user from '../../Assets/Images/user.jpg'
import {NavLink} from 'react-router-dom';

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

function Users(props: UsersPropsType) {
    let pageCount = Math.ceil(props.totalUserCount / props.pageSize)
    let pageCountArray = []
    for (let i = 1; i <= pageCount; i++) {
        pageCountArray.push(i)
    }
    return (
        <div>
            {pageCountArray.map((p, i) => {
                return (
                    <span key={i} className={props.currentPage === p ? classes.selected : ''}
                          onClick={(e) => props.onPageChanged(p)}> {p} </span>
                )
            })}
            {props.users.map(u => {
                return (<div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                            <img className={classes.avatar} src={u.photos.small ? u.photos.small : user}
                                 alt={'sorry, we have some troubles'}/>
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button
                                    disabled={props.toggleFollowingProcessArray.some(id => id === u.id)}
                                    onClick={() => props.unfollowUserThunk(u.id)}> Unfollow </button>

                                : <button
                                    disabled={props.toggleFollowingProcessArray.some(id => id === u.id)}
                                    onClick={() => props.followUserThunk(u.id)}> Follow </button>
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
                </div>)
            })}
        </div>)
}

export default Users