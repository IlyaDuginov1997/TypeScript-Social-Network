import {combineReducers, createStore} from 'redux';
import {dialogReducer} from './messageReducer';
import {profileReducer} from './profileReducer';


let reducers = combineReducers({
    profileComponent: profileReducer,
    dialogComponent: dialogReducer,
})

export type RootReduxState = ReturnType<typeof reducers>

export let store = createStore(reducers)


