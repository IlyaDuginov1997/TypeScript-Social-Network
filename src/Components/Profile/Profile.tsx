import React from 'react';
import classes from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {GetProfileType} from './ProfileContainer';

export type ProfileType = {
    profile: GetProfileType | null
    profileStatus: string
    updateProfileStatusThunk: (status: string) => void
}

function Profile(props: ProfileType) {

    return (
        <div className={classes.content}>
            <ProfileInfo
                updateProfileStatusThunk={props.updateProfileStatusThunk}
                profileStatus={props.profileStatus}
                profile={props.profile}/>
            <MyPostsContainer/>
        </div>
    );
}

export default Profile;