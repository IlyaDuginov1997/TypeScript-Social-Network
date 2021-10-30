import React from 'react';
import {connect} from 'react-redux';
import {getProfileStatusThunk, getUserProfileThunk, updateProfileStatusThunk} from '../../Redux/profileReducer';
import {RootReduxState} from '../../Redux/redux-store';
import Profile from './Profile';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../WithAuthRedirectComponent/WithAuthRedirectComponent';
import {compose} from 'redux';


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
    profileStatus: string
}

export type PathParamsType = {
    userId: string
}

type ProfileComponentType = {
    profile: GetProfileType | null
    profileStatus: string
    getUserProfileThunk: (userId: string) => void
    getProfileStatusThunk: (userId: string) => void
    updateProfileStatusThunk: (status: string) => void
}

type ProfileComponentWithRouterPropsType = RouteComponentProps<PathParamsType> & ProfileComponentType


class ProfileComponent extends React.Component<ProfileComponentWithRouterPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '15542'
        }
        this.props.getUserProfileThunk(userId)
        this.props.getProfileStatusThunk(userId)
    }

    render() {
        // можно избавиться от слова props (типо деструктуризации)
        /*const {profile, setUsersProfile} = this.props*/
        return <Profile
            profile={this.props.profile}
            updateProfileStatusThunk={this.props.updateProfileStatusThunk}
            profileStatus={this.props.profileStatus}
            /*{...this.props}*//>
    }
}

const mapStateToProps = (state: RootReduxState): mapStateToPropsType => {
    return {
        profile: state.profileComponent.profile,
        profileStatus: state.profileComponent.status,
    }
}
export const ProfileContainer = compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {getUserProfileThunk, getProfileStatusThunk, updateProfileStatusThunk}),
    withRouter,
)(ProfileComponent)