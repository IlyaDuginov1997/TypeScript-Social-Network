import React from 'react';
import {addMessage, addMessageEl, DialogComponentType} from '../../Redux/messageReducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {RootReduxState} from '../../Redux/redux-store';
import {withAuthRedirect} from '../WithAuthRedirectComponent/WithAuthRedirectComponent';


type mapStateToPropsType = {
    dialogsState: DialogComponentType
}

// type dialogsPropsType = {
//     dialogsState: DialogComponentType
//     isAuth: boolean
//     addMessage: () => void
//     addMessageEl: (message: string) => void
// }

let mapStateToProps = (state: RootReduxState): mapStateToPropsType => {
    return {
        dialogsState: state.dialogComponent,
    }
}

export const DialogsContainer = withAuthRedirect(connect(mapStateToProps, {addMessageEl, addMessage})(Dialogs))
