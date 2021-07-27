import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setUsersProfile} from '../../Redux/profileReducer';
import {RootReduxState} from '../../Redux/redux-store';
import Profile from './Profile';
import {withRouter, RouteComponentProps} from 'react-router-dom';


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

export type PathParamsType = {
    userId: string
}

type ProfileComponentType = {
    profile: GetProfileType | null
    setUsersProfile: (profile: GetProfileType) => void
}

type ProfileComponentWithRouterPropsType = RouteComponentProps<PathParamsType> & ProfileComponentType


class ProfileComponent extends React.Component<ProfileComponentWithRouterPropsType> {

    componentDidMount() {
        debugger
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2'
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId).then(response => {
            this.props.setUsersProfile(response.data)
        })
    }

    render() {
        // можно избавиться от слова props (типо деструктуризации)
        /*const {profile, setUsersProfile} = this.props*/
        return <Profile profile={this.props.profile} /*{...this.props}*//>
    }
}

const mapStateToProps = (state: RootReduxState): mapStateToPropsType => {
    return {
        profile: state.profileComponent.profile
    }
}

let WithUrlDataContainerComponent = withRouter(ProfileComponent)
const ProfileContainer = connect(mapStateToProps, {setUsersProfile})(WithUrlDataContainerComponent)

export default ProfileContainer;