import React from 'react';
import {UserType} from '../../Redux/usersReducer';
import classes from './Users.module.css';
import user from '../../Assets/Images/user.jpg'
import {NavLink} from 'react-router-dom';
import axios from 'axios';

export type UsersPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUserCount: number
    currentPage: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onPageChanged: (currentPage: number) => void
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
                                 alt={'sorry, we have some trobles'}/>
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                        withCredentials: true,
                                        headers: {
                                            'API-KEY': 'e5b738f6-4744-4b59-9452-509c57fc296b'
                                        },
                                    }).then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.unfollow(u.id)
                                        }
                                    })
                                }}> Unfollow </button>

                                : <button onClick={() => {

                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                        withCredentials: true,
                                        headers: {
                                            'API-KEY': 'e5b738f6-4744-4b59-9452-509c57fc296b'
                                        },
                                    }).then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.follow(u.id)
                                        }
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