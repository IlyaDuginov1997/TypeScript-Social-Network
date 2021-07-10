import React from 'react';
import {UserType} from '../../Redux/usersReducer';
import classes from './Users.module.css';

export type UsersPropsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
}


export function Users(props: UsersPropsType) {
    debugger
    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                imgUrl: 'https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png',
                followed: true,
                name: 'Ilya D.',
                status: 'I am homebrewer',
                location: {
                    id: 1,
                    country: 'Belarus',
                    cityName: 'Minsk',
                }
            },
            {
                id: 2,
                imgUrl: 'https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png',
                followed: false,
                name: 'Gleb D.',
                status: 'I am programmer',
                location: {
                    id: 1,
                    country: 'Belarus',
                    cityName: 'Minsk',
                }
            },
            {
                id: 3,
                imgUrl: 'https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png',
                followed: true,
                name: 'Kostya K.',
                status: 'Love to trade on the stock exchange',
                location: {
                    id: 1,
                    country: 'Russia',
                    cityName: 'Moscow',
                }
            },
        ])
    }

    return (
        <div>
            {props.users.map(u => {
                return (<div key={u.id}>
                    <span>
                        <div>
                             <img className={classes.avatar} src={u.imgUrl} alt='Sorry, we have some troubles'/>
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
                            <div>{u.location.country}</div>
                            <div>{u.location.cityName}</div>
                        </span>
                    </span>
                </div>)
            })}
        </div>)
}

