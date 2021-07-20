import React from 'react';
import {UserType} from '../../Redux/usersReducer';
import classes from './Users.module.css';
import user from '../../Assets/Images/user.jpg'

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
            {pageCountArray.map(p => {
                return (
                    <span className={props.currentPage === p ? classes.selected : ''}
                          onClick={(e) => props.onPageChanged(p)}> {p} </span>
                )
            })}
            {props.users.map(u => {
                return (<div key={u.id}>
                    <span>
                        <div>
                             <img className={classes.avatar} src={u.photos.small ? u.photos.small : user}/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    props.unfollow(u.id)
                                }}> Unfollow </button>
                                : <button onClick={() => {
                                    props.follow(u.id)
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