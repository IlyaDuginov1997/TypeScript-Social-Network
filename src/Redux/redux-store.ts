import {combineReducers, createStore} from 'redux';
import {dialogReducer} from './messageReducer';
import {profileReducer} from './profileReducer';
import {usersReducer} from './usersReducer';
import authReducer from './authReducer';


let reducer = combineReducers({
    profileComponent: profileReducer,
    dialogComponent: dialogReducer,
    usersComponent: usersReducer,
    auth: authReducer,
})

export type RootReduxState = ReturnType<typeof reducer>

export let store = createStore(reducer)


