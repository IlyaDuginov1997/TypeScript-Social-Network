import React from 'react';
import {AddMessageActionCreator, AddMessageElActionCreator} from '../../Redux/messageReducer';
import Dialogs from './Dialogs';
import {ReduxStoreType} from '../../Redux/redux-store';

type DialogsType = {
    store: ReduxStoreType
}

function DialogsContainer(props: DialogsType) {

    let dialogsState = props.store.getState().dialogComponent

    const addMessage = () => {
        props.store.dispatch(AddMessageActionCreator())
    }
    const addMessageEl = (message: string) => {
        if (message) {
            props.store.dispatch(AddMessageElActionCreator(message))
        }
    }

    return (
        <Dialogs addMessage={addMessage} addMessageEl={addMessageEl} dialogsState={dialogsState}/>
    );
}

export default DialogsContainer;