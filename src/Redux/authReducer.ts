import { authAPI, securityAPI } from 'src/API/API';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_CAPTCHA_URL = 'auth/SET_CAPTCHA_URL';

export type DataType = {
  id: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};

export type SetAuthUserDataType = {
  type: typeof SET_USER_DATA;
  data: DataType;
};

export type SetCaptchaURLType = {
  type: typeof SET_CAPTCHA_URL;
  payload: { captchaURL: string | null };
};

type InitialStateType = {
  id: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
  captchaURL: string | null;
};

type DispatchActionType = SetAuthUserDataType | SetCaptchaURLType;

let initialState: InitialStateType = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaURL: null,
};

export function authReducer(
  state = initialState,
  action: DispatchActionType,
): InitialStateType {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
      };

    case SET_CAPTCHA_URL:
      return {
        ...state,
        captchaURL: action.payload.captchaURL,
      };
    default:
      return state;
  }
}

export function setAuthUserData(
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean,
): SetAuthUserDataType {
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

export function setCaptchaURL(captchaURL: string | null): SetCaptchaURLType {
  return {
    type: SET_CAPTCHA_URL,
    payload: {
      captchaURL,
    },
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

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captchaURL: string | null,
) => {
  // typing thunk
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    const data = await authAPI.login(email, password, rememberMe, captchaURL);

    if (data.resultCode === 0) {
      dispatch(setCaptchaURL(null));
      dispatch(authUserThunk());
    } else {
      if (data.resultCode === 10) {
        await dispatch(getCaptchaURL());
      } else {
        const errorMessage = data.messages.length > 0 ? data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', { _error: errorMessage }));
      }
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

export const getCaptchaURL = () => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    const data = await securityAPI.getCaptchaURL();
    const captchaURL = data.url;

    dispatch(setCaptchaURL(captchaURL));
    return captchaURL;
  };
};
