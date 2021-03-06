import React from 'react';
import {addMessage, DialogComponentType} from '../../Redux/messageReducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {RootReduxState} from '../../Redux/redux-store';
import {withAuthRedirect} from '../WithAuthRedirectComponent/WithAuthRedirectComponent';
import {compose} from 'redux';


type mapStateToPropsType = {
    dialogsState: DialogComponentType
}

let mapStateToProps = (state: RootReduxState): mapStateToPropsType => {
    return {
        dialogsState: state.dialogComponent,
    }
}

export const DialogsContainer = compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {addMessage}),
)(Dialogs)
