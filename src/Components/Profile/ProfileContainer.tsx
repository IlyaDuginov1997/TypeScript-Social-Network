import React from 'react';
import {connect} from 'react-redux';
import {getProfileThunk} from '../../Redux/profileReducer';
import {RootReduxState} from '../../Redux/redux-store';
import Profile from './Profile';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../WithAuthRedirectComponent/WithAuthRedirectComponent';


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
    getProfileThunk: (userId: string) => void
    isAuth: boolean
}

type ProfileComponentWithRouterPropsType = RouteComponentProps<PathParamsType> & ProfileComponentType


class ProfileComponent extends React.Component<ProfileComponentWithRouterPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2'
        }
        this.props.getProfileThunk(userId)
    }

    render() {

        // можно избавиться от слова props (типо деструктуризации)
        /*const {profile, setUsersProfile} = this.props*/
        return <Profile profile={this.props.profile}/*{...this.props}*//>
    }
}

const mapStateToProps = (state: RootReduxState): mapStateToPropsType => {
    return {
        profile: state.profileComponent.profile,
    }
}

let WithUrlDataContainerComponent = withRouter(ProfileComponent)
export const ProfileContainer = withAuthRedirect(connect(mapStateToProps, {getProfileThunk})(WithUrlDataContainerComponent))
