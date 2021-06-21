import {combineReducers, createStore} from 'redux';
import {dialogReducer} from './messageReducer';
import {profileReducer} from './profileReducer';



let reducers = combineReducers({
    profileComponent: profileReducer,
    dialogComponent: dialogReducer,
})

export let store = createStore(reducers)

export type ReduxStoreType = typeof store

