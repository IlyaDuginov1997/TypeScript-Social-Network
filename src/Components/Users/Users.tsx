import React from 'react';
import {UserType} from '../../Redux/usersReducer';

export type UsersPropsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

export function Users(props: UsersPropsType) {

    return (
        <div>
            {
                props.users.map(u => <User user={u} follow={props.follow} unfollow={props.unfollow} />)
            }
        </div>
    )
}

export type UserPropsType = {
    user: UserType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const User = ({user, follow, unfollow}: UserPropsType) => (
    <div key={user.id}>
            <span>
                <div>
                    <img src={user.imgUrl} alt='Sorry, we have some troubles'/>
                </div>
                <div>
                    {user.followed
                        ? <button onClick={() => {
                            unfollow(user.id)
                        }}> Unfollow </button>
                        : <button onClick={() => {
                            follow(user.id)
                        }}> Follow </button>
                    }
                </div>
            </span>

        <span>
                <span>
                   <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>

                <span>
                    <div>{user.location.country}</div>
                    <div>{user.location.cityName}</div>
                </span>
            </span>
    </div>
)