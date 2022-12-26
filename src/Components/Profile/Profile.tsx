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
  isOwner: boolean;
};

const Profile: React.FC<ProfileType> = ({
  profile,
  profileStatus,
  updateProfilePhotoThunk,
  updateProfileStatusThunk,
  isOwner,
}) => {
  return (
    <div className={classes.content}>
      <ProfileInfo
        updateProfileStatusThunk={updateProfileStatusThunk}
        updateProfilePhotoThunk={updateProfilePhotoThunk}
        profileStatus={profileStatus}
        profile={profile}
        isOwner={isOwner}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
