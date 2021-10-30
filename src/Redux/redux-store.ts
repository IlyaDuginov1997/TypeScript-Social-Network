import {applyMiddleware, combineReducers, createStore} from 'redux';
import {dialogReducer} from './messageReducer';
import {profileReducer} from './profileReducer';
import {usersReducer} from './usersReducer';
import {authReducer} from './authReducer';
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

let reducer = combineReducers({
    profileComponent: profileReducer,
    dialogComponent: dialogReducer,
    usersComponent: usersReducer,
    auth: authReducer,
    form: formReducer,
})

export type RootReduxState = ReturnType<typeof reducer>

export let store = createStore(reducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store


