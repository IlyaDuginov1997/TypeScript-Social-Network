import React from 'react';
import classes from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {DispatchActionType, PostsType} from '../../Redux/Store';

type ProfileType = {
    posts: Array<PostsType>
    dispatch: (action: DispatchActionType) => void
    newPostText: string
}

function Profile(props: ProfileType) {

    return (
        <div className={classes.content}>
            <ProfileInfo/>
            <MyPosts posts={props.posts}
                     dispatch={props.dispatch}
                     newPostText={props.newPostText}
                     />
        </div>
    );
}

export default Profile;