import {combineReducers, createStore} from 'redux';
import {dialogReducer} from './messageReducer';
import {profileReducer} from './profileReducer';
import {usersReducer} from './usersReducer';


let reducers = combineReducers({
    profileComponent: profileReducer,
    dialogComponent: dialogReducer,
    usersComponent: usersReducer,
})

export type RootReduxState = ReturnType<typeof reducers>

export let store = createStore(reducers)


