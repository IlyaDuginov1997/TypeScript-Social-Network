import React from 'react';
import { addMessage, DialogComponentType } from 'src/Redux/messageReducer';
import Dialogs from 'src/Components/Dialogs/Dialogs';
import { connect } from 'react-redux';
import { RootReduxState } from 'src/Redux/redux-store';
import { withAuthRedirect } from 'src/Components/WithAuthRedirectComponent/WithAuthRedirectComponent';
import { compose } from 'redux';


type mapStateToPropsType = {
  dialogsState: DialogComponentType
}

let mapStateToProps = (state: RootReduxState): mapStateToPropsType => {
  return {
    dialogsState: state.dialogComponent,
  };
};

export const DialogsContainer = compose<React.ComponentType>(
  withAuthRedirect,
  connect(mapStateToProps, { addMessage }),
)(Dialogs);
