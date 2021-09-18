import React from 'react';
import {GetProfileType} from '../ProfileContainer';
import {Preloader} from '../../../Common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
import {ProfileStatus} from './ProfileStatus';

export type ProfileInfoPropsType = {
    profile: GetProfileType | null
}

function ProfileInfo(props: ProfileInfoPropsType) {

    if (!props.profile) {
        return <Preloader/>
    }
    console.log(props.profile)
    return (
        <div>
            {/*<div>*/}
            {/*    <img className={classes.content}*/}
            {/*         src='https://st2.depositphotos.com/3106839/7689/i/600/depositphotos_76899721-stock-photo-barley-beans-in-wooden-plate.jpg'*/}
            {/*         alt=''/>*/}
            {/*</div>*/}
            <ProfileStatus status={'It is my status for live'} />
            <div>
                <img className={classes.profilePhoto}
                     src={props.profile?.photos.large} alt=''/>
                <div>
                    About me: {props.profile.aboutMe}
                    <p/>
                    Fullname: {props.profile.fullName}
                    <p/>
                    Looking for a job: {props.profile.lookingForAJob}
                    <p/>

                    <div>
                        Facebook: {props.profile.contacts.facebook}
                        <p/>
                        VK: {props.profile.contacts.vk}
                        <p/>
                        Github: {props.profile.contacts.github}
                        <p/>
                        Twitter: {props.profile.contacts.twitter}
                        <p/>
                        Website: {props.profile.contacts.website}
                        <p/>
                        Instagram: {props.profile.contacts.instagram}
                        <p/>
                        MainLink: {props.profile.contacts.mainLink}
                        <p/>
                        Youtube: {props.profile.contacts.youtube}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProfileInfo;