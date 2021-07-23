import React from 'react';
import {GetProfileType} from '../ProfileContainer';
import {Preloader} from '../../../Common/Preloader/Preloader';

export type ProfileInfoPropsType = {
    profilePhoto: GetProfileType | null
}

function ProfileInfo(props: ProfileInfoPropsType) {
    console.log('ProfileInfo is rendering')

    if (!props.profilePhoto) {
        return <Preloader/>
    }

    return (
        <div>
            <div>
                <img
                    src='https://st2.depositphotos.com/3106839/7689/i/600/depositphotos_76899721-stock-photo-barley-beans-in-wooden-plate.jpg'
                    alt=''/>
            </div>
            <div>
                <img src={props.profilePhoto?.photos.large} alt=''/>
                ava + description
            </div>
        </div>
    );
}

export default ProfileInfo;