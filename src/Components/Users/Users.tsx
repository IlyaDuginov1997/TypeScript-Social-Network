import React from 'react';
import {UserType} from '../../Redux/usersReducer';
import classes from './Users.module.css';
import user from '../../Assets/Images/user.jpg'
import {NavLink} from 'react-router-dom';
import {followAPI} from '../../API/API';

export type UsersPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUserCount: number
    currentPage: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onPageChanged: (currentPage: number) => void
    toggleFollowingProcessArray: [] | number[]
    setToggleFollowingInProcess: (isFollowingInProcess: boolean, userId: number) => void
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
                                    onClick={() => {
                                        props.setToggleFollowingInProcess(true, u.id)
                                        followAPI.unfollowUser(u.id).then(data => {
                                            if (data.resultCode === 0) {
                                                props.unfollow(u.id)
                                            }
                                            props.setToggleFollowingInProcess(false, u.id)
                                        })
                                    }}> Unfollow </button>

                                : <button
                                    disabled={props.toggleFollowingProcessArray.some(id => id === u.id)}
                                    onClick={() => {
                                        props.setToggleFollowingInProcess(true, u.id)
                                        followAPI.followUser(u.id).then(data => {
                                            if (data.resultCode === 0) {
                                                props.follow(u.id)
                                            }
                                            props.setToggleFollowingInProcess(false, u.id)
                                        })
                                    }}> Follow </button>
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