import React from 'react';
import { connect } from 'react-redux';
import {
  getProfileStatusThunk,
  getUserProfileThunk,
  updateProfileDataThunk,
  updateProfilePhotoThunk,
  updateProfileStatusThunk,
} from 'src/Redux/profileReducer';
import { RootReduxState } from 'src/Redux/redux-store';
import Profile from 'src/Components/Profile/Profile';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { ProfileFormFields } from 'src/Components/Profile/ProfileInfo/ProfileForm/ProfileForm';

export type ContactsType = {
  facebook: string;
  website: null;
  vk: string;
  twitter: string;
  instagram: string;
  youtube: null;
  github: string;
  mainLink: null;
};

export type GetProfileType = {
  aboutMe: string;
  contacts: ContactsType;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  userId: number;
  photos: {
    small: string;
    large: string;
  };
};

export type mapStateToPropsType = {
  profile: GetProfileType | null;
  profileStatus: string;
  userId: number | null;
};

export type PathParamsType = {
  userId: string;
};

type ProfileComponentType = {
  userId: number | null;
  profile: GetProfileType | null;
  profileStatus: string;
  getUserProfileThunk: (userId: number | null) => void;
  getProfileStatusThunk: (userId: number | null) => void;
  updateProfileStatusThunk: (status: string) => void;
  updateProfilePhotoThunk: (file: File) => void;
  updateProfileDataThunk: (profileData: ProfileFormFields) => Promise<any>;
};

type ProfileComponentWithRouterPropsType = RouteComponentProps<PathParamsType> &
  ProfileComponentType;

class ProfileComponent extends React.Component<ProfileComponentWithRouterPropsType> {
  refreshProfile() {
    let userId: number | null = this.props.match.params.userId
      ? Number(this.props.match.params.userId)
      : null;
    if (!userId) {
      userId = this.props.userId;
      if (!userId) {
        this.props.history.push('/login');
      }
    }
    this.props.getUserProfileThunk(userId);
    this.props.getProfileStatusThunk(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(
    prevProps: Readonly<ProfileComponentWithRouterPropsType>,
    prevState: Readonly<{}>,
    snapshot?: any,
  ) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    // можно избавиться от слова props (типо деструктуризации)
    /*const {profile, setUsersProfile} = this.props*/
    return (
      <Profile
        profile={this.props.profile}
        updateProfileStatusThunk={this.props.updateProfileStatusThunk}
        updateProfilePhotoThunk={this.props.updateProfilePhotoThunk}
        updateProfileDataThunk={this.props.updateProfileDataThunk}
        profileStatus={this.props.profileStatus}
        isOwner={!this.props.match.params.userId}
        /*{...this.props}*/
      />
    );
  }
}

const mapStateToProps = (state: RootReduxState): mapStateToPropsType => {
  return {
    profile: state.profileComponent.profile,
    profileStatus: state.profileComponent.status,
    userId: state.auth.id,
  };
};
export const ProfileContainer = compose<React.ComponentType>(
  // withAuthRedirect,
  connect(mapStateToProps, {
    getUserProfileThunk,
    getProfileStatusThunk,
    updateProfileStatusThunk,
    updateProfilePhotoThunk,
    updateProfileDataThunk,
  }),
  withRouter,
)(ProfileComponent);
