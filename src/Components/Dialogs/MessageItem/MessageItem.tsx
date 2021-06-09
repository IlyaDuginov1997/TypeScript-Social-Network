import React from 'react';
import classes from './MessageItem.module.css';

type MessageItemPropsType = {
    message: string
}

function MessageItem(props: MessageItemPropsType) {
    return (
        <div className={classes.messageItem}>
            {props.message}
        </div>
    )
}

export default MessageItem;