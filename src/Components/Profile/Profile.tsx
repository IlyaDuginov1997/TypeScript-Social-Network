import React from 'react';
import classes from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {GetProfileType} from './ProfileContainer';
import {Redirect} from 'react-router-dom';

export type ProfileType = {
    profile: GetProfileType | null
    isAuth: boolean
}

function Profile(props: ProfileType) {

    if (!props.isAuth) {
        return <Redirect to={'/login'}/>
    }
    alert(!props.isAuth)
    return (
        <div className={classes.content}>
            <ProfileInfo profilePhoto={props.profile}/>
            <MyPostsContainer/>
        </div>
    );
}

export default Profile;