import React from 'react';
import {UserType} from '../../Redux/usersReducer';
import classes from './Users.module.css';
import axios from 'axios';
import user from '../../Assets/Images/user.jpg'

export type UsersPropsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
}


class Users extends React.Component<UsersPropsType, {}> {
    constructor(props: UsersPropsType) {
        super(props)
    }

    componentDidMount() {
        if (this.props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                this.props.setUsers(response.data.items)
            })
        }
    }

    render() {
        console.log('Users rendering')
        return (
            <div>
                {this.props.users.map(u => {
                    return (<div key={u.id}>
                    <span>
                        <div>
                             <img className={classes.avatar} src={u.photos.small ? u.photos.small : user}/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    this.props.unfollow(u.id)
                                }}> Unfollow </button>
                                : <button onClick={() => {
                                    this.props.follow(u.id)
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
}

export default Users