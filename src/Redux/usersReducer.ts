import {followAPI, usersAPI} from '../API/API';
import {Dispatch} from 'redux';

export type LocationType = {
    id: number
    country: string
    cityName: string
}

export type UserType = {
    name: string
    followed: boolean
    id: number
    photos: {
        large: string | undefined
        small: string | undefined
    }
    uniqueUrlName: string
    status: string
    location?: LocationType
}

export type UsersComponentType = {
    users: Array<UserType>
}

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_COUNT_USERS = 'SET_TOTAL_COUNT_USERS'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_FOLLOWING_IN_PROCESS = 'TOGGLE_FOLLOWING_IN_PROCESS'

export type FollowType = {
    type: typeof FOLLOW
    userId: number
}

export type UnfollowType = {
    type: typeof UNFOLLOW
    userId: number
}

export type SetUsersType = {
    type: typeof SET_USERS
    users: UserType[]
}

export type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

export type SetTotalCountUsersType = {
    type: typeof SET_TOTAL_COUNT_USERS
    totalCountUsers: number
}

export type SetToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}

export type SetToggleFollowingInProcessType = {
    type: typeof TOGGLE_FOLLOWING_IN_PROCESS,
    isFollowingInProcess: boolean,
    userId: number,
}

export type initialStateType = {
    users: UserType[]
    pageSize: number
    totalUserCount: number
    currentPage: number
    isFetching: boolean
    toggleFollowingProcessArray: [] | number[]

}

type DispatchActionType =
    FollowType
    | UnfollowType
    | SetUsersType
    | SetCurrentPageType
    | SetTotalCountUsersType
    | SetToggleIsFetchingType
    | SetToggleFollowingInProcessType

let initialState: initialStateType = {
    users: [],
    pageSize: 100,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: true,
    toggleFollowingProcessArray: [],
}

export function usersReducer(state = initialState, action: DispatchActionType): initialStateType {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    return u.id === action.userId
                        ? {...u, followed: true}
                        : u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    return u.id === action.userId
                        ? {...u, followed: false}
                        : u
                })
            }
        case SET_USERS:
            return {
                ...state, users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage,
            }
        case SET_TOTAL_COUNT_USERS:
            return {
                ...state, totalUserCount: action.totalCountUsers,
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching,
            }
        case TOGGLE_FOLLOWING_IN_PROCESS:
            return {
                ...state,
                toggleFollowingProcessArray: action.isFollowingInProcess
                    ? [...state.toggleFollowingProcessArray, action.userId]
                    : state.toggleFollowingProcessArray.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}


export function followSuccess(userId: number): FollowType {
    return {
        type: FOLLOW,
        userId: userId,
    }
}

export function unfollowSuccess(userId: number): UnfollowType {
    return {
        type: UNFOLLOW,
        userId: userId,
    }
}

export function setUsers(users: UserType[]): SetUsersType {
    return {
        type: SET_USERS,
        users: users,
    }
}

export function setCurrentPage(currentPage: number): SetCurrentPageType {
    return {
        type: SET_CURRENT_PAGE,
        currentPage: currentPage,
    }
}

export function setTotalCountUsers(totalCountUsers: number): SetTotalCountUsersType {
    return {
        type: SET_TOTAL_COUNT_USERS,
        totalCountUsers: totalCountUsers,
    }
}

export function setToggleIsFetching(isFetching: boolean): SetToggleIsFetchingType {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching: isFetching,
    }
}

export function setToggleFollowingInProcess(isFollowingInProcess: boolean, userId: number): SetToggleFollowingInProcessType {
    return {
        type: TOGGLE_FOLLOWING_IN_PROCESS,
        isFollowingInProcess: isFollowingInProcess,
        userId: userId,
    }
}

export const fetchUsers = (currentPage: number, pageSize: number) => {
    return (dispatch: Dispatch) => {
        dispatch(setToggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(setUsers(data.items))
            dispatch(setTotalCountUsers(data.totalCount))
            dispatch(setToggleIsFetching(false))
        })
    }
}

export const unfollowUserThunk = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(setToggleFollowingInProcess(true, userId))
        followAPI.unfollowUser(userId).then(data => {
            if (data.resultCode === 0) {
                dispatch(unfollowSuccess(userId))
            }
            dispatch(setToggleFollowingInProcess(false, userId))
        })
    }
}

export const followUserThunk = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(setToggleFollowingInProcess(true, userId))
        followAPI.followUser(userId).then(data => {
            if (data.resultCode === 0) {
                dispatch(followSuccess(userId))
            }
            dispatch(setToggleFollowingInProcess(false, userId))
        })
    }
}
