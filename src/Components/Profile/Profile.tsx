import React from 'react';
import classes from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {ReduxStoreType} from '../../Redux/redux-store';

type ProfileType = {
    store: ReduxStoreType
}

function Profile(props: ProfileType) {

    return (
        <div className={classes.content}>
            <ProfileInfo/>
            <MyPostsContainer store={props.store}
            />
        </div>
    );
}

export default Profile;