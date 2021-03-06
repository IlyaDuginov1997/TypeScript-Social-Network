import {authAPI} from '../API/API';
import {Dispatch} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {stopSubmit} from 'redux-form';

const SET_USER_DATA = 'SET_USER_DATA';

export type DataType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

export type SetAuthUserDataType = {
    type: typeof SET_USER_DATA
    data: DataType
}


type InitialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type DispatchActionType = SetAuthUserDataType

let initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
};

export function authReducer(state = initialState, action: DispatchActionType): InitialStateType {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            };
        default:
            return state;
    }
}


export function setAuthUserData(id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataType {
    return {
        type: SET_USER_DATA,
        data: {
            id: id,
            email: email,
            login: login,
            isAuth
        },
        /*data: data,*/
    };
}

export const authUserThunk = (): any => {
    return (dispatch: Dispatch) => {
        return authAPI.authUser().then(data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
        });
    };
};

export const login = (email: string, password: string, rememberMe: boolean,) => {
    // typing thunk
    return (dispatch: ThunkDispatch<any, any, any>) => {
        authAPI.login(email, password, rememberMe).then(data => {
            if (data.resultCode === 0) {
                dispatch(authUserThunk());
            } else {
                const errorMessage = data.messages.length > 0
                    ? data.messages[0]
                    : 'Some error';
                dispatch(stopSubmit('login', {_error: errorMessage}));
            }
        });
    };
};

export const logout = () => {
    // typing thunk
    return (dispatch: ThunkDispatch<any, any, any>) => {
        authAPI.logout().then(data => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        });
    };
};

