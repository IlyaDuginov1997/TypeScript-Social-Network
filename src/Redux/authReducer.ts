const SET_USER_DATA = 'SET_USER_DATA'

export type DataType = {
    id: number | null
    email: string | null
    login: string | null
}

export type SetAuthUserDataType = {
    type: typeof SET_USER_DATA
    data: DataType
}


type initialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type DispatchActionType = SetAuthUserDataType

let initialState: initialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

export function authReducer(state = initialState, action: DispatchActionType): initialStateType {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state
    }
}


export function setAuthUserData(id: number, email: string, login: string, /*data: DataType*/): SetAuthUserDataType {
    return {
        type: SET_USER_DATA,
        data: {
            id: id,
            email: email,
            login: login,
        },
        /*data: data,*/
    }
}

export default authReducer
