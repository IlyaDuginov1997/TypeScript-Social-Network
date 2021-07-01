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

type DispatchActionType = FollowType | UnfollowType

let initialState: UsersComponentType = {
    users: [
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
            status: 'love to stock exchange',
            location: {
                id: 1,
                country: 'Russia',
                cityName: 'Moscow',
            }
        },
    ],
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

