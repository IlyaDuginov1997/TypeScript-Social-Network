import React from 'react';
import {AddMessageActionCreator, AddMessageElActionCreator, DialogComponentType} from '../../Redux/messageReducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {RootReduxState} from '../../Redux/redux-store';


type mapStateToPropsType = {
    dialogsState: DialogComponentType
    isAuth: boolean
}

type mapDispatchToPropsType = {
    addMessageEl: (message: string) => void
    addMessage: () => void
}

// function DialogsContainer(props: DialogsType) {
//
//     let dialogsState = props.store.getState().dialogComponent
//
//     const addMessage = () => {
//         props.store.dispatch(AddMessageActionCreator())
//     }
//     const addMessageEl = (message: string) => {
//         if (message) {
//             props.store.dispatch(AddMessageElActionCreator(message))
//         }
//     }
//
//     return (
//         <Dialogs
//             addMessage={addMessage}
//             addMessageEl={addMessageEl}
//             dialogsState={dialogsState}/>
//     );
// }

let mapStateToProps = (state: RootReduxState): mapStateToPropsType => {
    return {
        dialogsState: state.dialogComponent,
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        addMessageEl: (message: string) => {
            dispatch(AddMessageElActionCreator(message))
        },
        addMessage: () => {
            dispatch(AddMessageActionCreator())
        }
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)
