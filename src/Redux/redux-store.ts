import {combineReducers, createStore} from 'redux';
import {dialogReducer} from './messageReducer';
import {profileReducer} from './profileReducer';
import {usersReducer} from './usersReducer';


let reducer = combineReducers({
    profileComponent: profileReducer,
    dialogComponent: dialogReducer,
    usersComponent: usersReducer,
})

export type RootReduxState = ReturnType<typeof reducer>

export let store = createStore(reducer)
