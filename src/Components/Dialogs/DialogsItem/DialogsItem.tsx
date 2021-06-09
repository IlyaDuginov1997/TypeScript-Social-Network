import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './DialogsItem.module.css';
import {DialogsType} from '../../../Redux/State';


function DialogsItem(props: DialogsType) {
    let path = '/dialogs/' + props.id;
    return (
        <div className={classes.dialogsItem}>
            <NavLink to={path} activeClassName={classes.active}>{props.name}</NavLink>
        </div>
    )
}

export default DialogsItem;