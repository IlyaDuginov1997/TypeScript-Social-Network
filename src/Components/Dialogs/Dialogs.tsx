import React from 'react';
import classes from './Dialogs.module.css';
import DialogsItem from './DialogsItem/DialogsItem';
import MessageItem from './MessageItem/MessageItem';
import {DialogComponentType, DispatchActionType} from '../../Redux/Store';
import {AddMessageActionCreator, AddMessageElActionCreator} from '../../Redux/messageReducer';

type DialogsType = {
    dialogsState: DialogComponentType
    dispatch: (action: DispatchActionType) => void
}

function Dialogs(props: DialogsType) {

    let dialogs = props.dialogsState.dialogs
    let messages = props.dialogsState.messages


    let dialogsItem = dialogs.map(d => <DialogsItem key={d.id} id={d.id} name={d.name}/>)
    let messagesItem = messages.map(m => <MessageItem key={m.id} message={m.message}/>)

    let newMessageEl = React.createRef<HTMLTextAreaElement>()
    const addMessage = () => {
        if (newMessageEl.current) {
            props.dispatch(AddMessageActionCreator())
        }
    }
    const addMessageEl = () => {
        if (newMessageEl.current) {
            props.dispatch(
                AddMessageElActionCreator(newMessageEl.current?.value))
        }
    }

    return (
        <div className={classes.dialogsPage}>
            <div className={classes.dialogs}>
                {dialogsItem}

            </div>
            <div className={classes.message}>
                <button onClick={addMessage}>Add message</button>
                <div>
                    <textarea value={props.dialogsState.newMessageText} ref={newMessageEl}
                              onChange={addMessageEl}></textarea>
                </div>
                {messagesItem}
            </div>
        </div>
    );
}

export default Dialogs;