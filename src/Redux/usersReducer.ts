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
    location: LocationType
}

export type UsersComponentType = {
    users: Array<UserType>
}

export type FollowType = {
    type: 'FOLLOW'
    userId: number
}

export type UnfollowType = {
    type: 'UNFOLLOW'
    userId: number
}

export type SetUsersType = {
    type: 'SET_USERS'
    users: UserType[]
}

export type SetCurrentPageType = {
    type: 'SET_CURRENT_PAGE'
    currentPage: number
}

export type SetTotalCountUsersType = {
    type: 'SET_TOTAL_COUNT_USERS'
    totalCountUsers: number
}

export type SetToggleIsFetching = {
    type: 'TOGGLE_IS_FETCHING'
    isFetching: boolean
}


export type initialStateType = {
    users: UserType[]
    pageSize: number
    totalUserCount: number
    currentPage: number
    isFetching: boolean
}

type DispatchActionType = FollowType | UnfollowType | SetUsersType | SetCurrentPageType | SetTotalCountUsersType | SetToggleIsFetching

let initialState: initialStateType = {
    users: [],
    pageSize: 20,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: true,
}

export function usersReducer(state = initialState, action: DispatchActionType): initialStateType {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    return u.id === action.userId
                        ? {...u, followed: true}
                        : u
                })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    return u.id === action.userId
                        ? {...u, followed: false}
                        : u
                })
            }
        case 'SET_USERS':
            return {
                ...state, users: action.users
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state, currentPage: action.currentPage,
            }
        case 'SET_TOTAL_COUNT_USERS':
            return {
                ...state, totalUserCount: action.totalCountUsers,
            }
        case 'TOGGLE_IS_FETCHING':
            return {
                ...state, isFetching: action.isFetching,
            }
        default:
            return state
    }
}


export function follow(userId: number): FollowType {
    return {
        type: 'FOLLOW',
        userId: userId,
    }
}

export function unfollow(userId: number): UnfollowType {
    return {
        type: 'UNFOLLOW',
        userId: userId,
    }
}

export function setUsers(users: UserType[]): SetUsersType {
    return {
        type: 'SET_USERS',
        users: users
    }
}

export function setCurrentPage(currentPage: number): SetCurrentPageType {
    return {
        type: 'SET_CURRENT_PAGE',
        currentPage: currentPage
    }
}

export function setTotalCountUsers(totalCountUsers: number): SetTotalCountUsersType {
    return {
        type: 'SET_TOTAL_COUNT_USERS',
        totalCountUsers: totalCountUsers
    }
}

export function setToggleIsFetching(isFetching: boolean): SetToggleIsFetching {
    return {
        type: 'TOGGLE_IS_FETCHING',
        isFetching: isFetching
    }
}

