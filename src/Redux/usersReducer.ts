export type LocationType = {
    id: number
    country: string
    cityName: string
}

export type UserType = {
    id: number
    imgUrl: string
    followed: boolean
    name: string
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

type DispatchActionType = FollowType | UnfollowType | SetUsersType

let initialState: UsersComponentType = {
    users: []
}

export function usersReducer(state = initialState, action: DispatchActionType): UsersComponentType {
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
                ...state, users: [...state.users, ...action.users]
            }
        default:
            return state
    }
}

export function FollowAC(userId: number): FollowType {
    return {
        type: 'FOLLOW',
        userId: userId,
    }
}

export function UnfollowAC(userId: number): UnfollowType {
    return {
        type: 'UNFOLLOW',
        userId: userId,
    }
}

export function SetUsersAC(users: UserType[]): SetUsersType {
    return {
        type: 'SET_USERS',
        users: users
    }
}


