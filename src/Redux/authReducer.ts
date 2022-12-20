import { authAPI } from 'src/API/API';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'auth/SET_USER_DATA';

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
  isAuth: false,
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
      isAuth,
    },
    /*data: data,*/
  };
}

export const authUserThunk = (): any => {
  return async (dispatch: Dispatch) => {
    const response = await authAPI.authUser();

    if (response.resultCode === 0) {
      let { id, email, login } = response.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  };
};

export const login = (email: string, password: string, rememberMe: boolean) => {
  // typing thunk
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    const data = await authAPI.login(email, password, rememberMe);

    if (data.resultCode === 0) {
      dispatch(authUserThunk());
    } else {
      const errorMessage = data.messages.length > 0
        ? data.messages[0]
        : 'Some error';
      dispatch(stopSubmit('login', { _error: errorMessage }));
    }
  };
};

export const logout = () => {
  // typing thunk
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    const data = await authAPI.logout();

    if (data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  };
};

