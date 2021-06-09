import React from 'react';
import classes from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {PostsType} from '../../Redux/State';

type ProfileType = {
    posts: Array<PostsType>
    addPost: () => void
    changePostEL: (el: string) => void
    newPostText: string
}

function Profile(props: ProfileType) {

    return (
        <div className={classes.content}>
            <ProfileInfo/>
            <MyPosts posts={props.posts}
                     addPost={props.addPost}
                     newPostText={props.newPostText}
                     changePostEL={props.changePostEL}/>
        </div>
    );
}

export default Profile;