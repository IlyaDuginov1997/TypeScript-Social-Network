import { applyMiddleware, combineReducers, createStore } from 'redux';
import { dialogReducer } from './messageReducer';
import { profileReducer } from './profileReducer';
import { usersReducer } from './usersReducer';
import { authReducer } from './authReducer';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import { appReducer } from './appReducer';
import { composeWithDevTools } from '@redux-devtools/extension';

let reducer = combineReducers({
  profileComponent: profileReducer,
  dialogComponent: dialogReducer,
  usersComponent: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer,
});

export type RootReduxState = ReturnType<typeof reducer>

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsDenylist, actionsCreators and other options
});

export let store = createStore(reducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
// export let store = createStore(reducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;


