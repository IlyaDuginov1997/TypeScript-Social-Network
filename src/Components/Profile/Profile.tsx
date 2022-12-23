import React from 'react';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { GetProfileType } from './ProfileContainer';

export type ProfileType = {
  profile: GetProfileType | null;
  profileStatus: string;
  updateProfileStatusThunk: (status: string) => void;
  updateProfilePhotoThunk: (file: File) => void;
};

const Profile: React.FC<ProfileType> = ({
  profile,
  profileStatus,
  updateProfilePhotoThunk,
  updateProfileStatusThunk,
}) => {
  return (
    <div className={classes.content}>
      <ProfileInfo
        updateProfileStatusThunk={updateProfileStatusThunk}
        updateProfilePhotoThunk={updateProfilePhotoThunk}
        profileStatus={profileStatus}
        profile={profile}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
