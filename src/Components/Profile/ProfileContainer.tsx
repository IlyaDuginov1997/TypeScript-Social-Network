import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setUsersProfile} from '../../Redux/profileReducer';
import {RootReduxState} from '../../Redux/redux-store';
import Profile from './Profile';

export type GetProfileType = {
    aboutMe: string
    contacts: {
        facebook: string
        website: null,
        vk: string
        twitter: string
        instagram: string
        youtube: null,
        github: string
        mainLink: null
    },
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: {
        small: string
        large: string
    }
}

export type mapStateToPropsType = {
    profile: GetProfileType | null
}

type ProfileComponentType = {
    profile: GetProfileType | null
    setUsersProfile: (profile: GetProfileType) => void
}

class ProfileComponent extends React.Component<ProfileComponentType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/1`).then(response => {
            this.props.setUsersProfile(response.data)
            debugger
        })
    }

    render() {
        return <Profile profile={this.props.profile}/>
    }
}

const mapStateToProps = (state: RootReduxState): mapStateToPropsType => {
    return {
        profile: state.profileComponent.profile
    }
}

const ProfileContainer = connect(mapStateToProps, {setUsersProfile})(ProfileComponent)

export default ProfileContainer;