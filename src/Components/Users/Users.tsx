import React from 'react';
import {UserType} from '../../Redux/usersReducer';
import classes from './Users.module.css';
import axios from 'axios';
import user from '../../Assets/Images/user.jpg'

export type UsersPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUserCount: number
    currentPage: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
    setCurrentPage: (currentPage: number) => void
    setTotalCountUsers: (totalCountUsers: number) => void
}

class Users extends React.Component<UsersPropsType, {}> {
    constructor(props: UsersPropsType) {
        super(props)
    }

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.totalUserCount}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalCountUsers(response.data.totalCount)
        })
    }

    onPageChanged = (currentPage: number) => {
        this.props.setCurrentPage(currentPage)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
        })
    }

    render() {
        let pageCount = Math.ceil(this.props.totalUserCount / this.props.pageSize)
        let pageCountArray = []
        for (let i = 1; i <= pageCount; i++) {
            pageCountArray.push(i)
        }
        return (
            <div>
                {pageCountArray.map(p => {
                    return (
                        <span className={this.props.currentPage === p ? classes.selected : ''}
                              onClick={(e) => this.onPageChanged(p)}> {p} </span>
                    )
                })}
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