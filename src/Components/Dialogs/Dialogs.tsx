import React from 'react';
import {DialogComponentType} from '../../Redux/messageReducer';
import classes from './Dialogs.module.css';
import DialogsItem from './DialogsItem/DialogsItem';
import MessageItem from './MessageItem/MessageItem';
import {DialogsReduxForm, FormDataDialogsType} from './DialogsForm';

type DialogsType = {
    dialogsState: DialogComponentType
    addMessage: (message: string) => void
}

function Dialogs(props: DialogsType) {

    let dialogs = props.dialogsState.dialogs
    let messages = props.dialogsState.messages

    let dialogsItem = dialogs.map(d => <DialogsItem key={d.id} id={d.id} name={d.name}/>)
    let messagesItem = messages.map(m => <MessageItem key={m.id} message={m.message}/>)

    const onSubmit = (formData: FormDataDialogsType) => {
        props.addMessage(formData.message)
    }

    return (
        <div className={classes.dialogsPage}>
            <div className={classes.dialogs}>
                {dialogsItem}

            </div>
            <div className={classes.message}>
                {/*<div>*/}
                {/*    <textarea value={props.dialogsState.newMessageText} ref={newMessageEl}*/}
                {/*              onChange={addMessageEl}></textarea>*/}
                {/*</div>*/}
                {/*<button onClick={addMessage}>Add message</button>*/}
                <DialogsReduxForm onSubmit={onSubmit}/>
                {messagesItem}
            </div>
        </div>
    );
}

export default Dialogs;