import { Dispatch } from 'redux';
import { authUserThunk } from 'src/Redux/authReducer';

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';

export type InitializedSuccess = {
  type: typeof INITIALIZED_SUCCESS
}


type InitialStateType = {
  isInitialized: boolean
}

type DispatchActionType = InitializedSuccess

let initialState: InitialStateType = {
  isInitialized: false,
};

export function appReducer(state = initialState, action: DispatchActionType): InitialStateType {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        isInitialized: true,
      };
    default:
      return state;
  }
}

const appInitializedAC = (): InitializedSuccess => {
  return {
    type: INITIALIZED_SUCCESS,
  };
};

export const appInitializing = () => {
  return (dispatch: Dispatch) => {
    const dispatchResult = dispatch(authUserThunk());
    dispatchResult.then(() => dispatch(appInitializedAC()));
  };
};
