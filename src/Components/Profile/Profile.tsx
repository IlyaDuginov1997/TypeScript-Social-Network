import React from 'react';
import classes from 'src/Components/Profile/Profile.module.css';
import MyPostsContainer from 'src/Components/Profile/MyPosts/MyPostsContainer';
import { GetProfileType } from 'src/Components/Profile/ProfileContainer';
import { ProfileInfo } from 'src/Components/Profile/ProfileInfo/ProfileInfo';
import { ProfileFormFields } from 'src/Components/Profile/ProfileInfo/ProfileForm/ProfileForm';

export type ProfileType = {
  profile: GetProfileType | null;
  profileStatus: string;
  updateProfileStatusThunk: (status: string) => void;
  updateProfilePhotoThunk: (file: File) => void;
  isOwner: boolean;
  updateProfileDataThunk: (profileData: ProfileFormFields) => Promise<any>;
};

const Profile: React.FC<ProfileType> = ({
  profile,
  profileStatus,
  updateProfilePhotoThunk,
  updateProfileStatusThunk,
  isOwner,
  updateProfileDataThunk,
}) => {
  return (
    <div className={classes.content}>
      <ProfileInfo
        updateProfileStatusThunk={updateProfileStatusThunk}
        updateProfilePhotoThunk={updateProfilePhotoThunk}
        profileStatus={profileStatus}
        profile={profile}
        isOwner={isOwner}
        updateProfileDataThunk={updateProfileDataThunk}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
