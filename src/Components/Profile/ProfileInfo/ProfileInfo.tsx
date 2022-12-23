import React, { ChangeEvent } from 'react';
import { GetProfileType } from 'src/Components/Profile/ProfileContainer';
import { Preloader } from 'src/Common/Preloader/Preloader';
import classes from 'src/Components/Profile/ProfileInfo/ProfileInfo.module.css';
import { ProfileStatus } from 'src/Components/Profile/ProfileInfo/ProfileStatus';
import user from 'src/Assets/Images/user.jpg';
import camera from 'src/Assets/Images/camera.svg';

export type ProfileInfoPropsType = {
  profile: GetProfileType | null;
  profileStatus: string;
  updateProfileStatusThunk: (status: string) => void;
  updateProfilePhotoThunk: (file: File) => void;
};

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
  profile,
  profileStatus,
  updateProfileStatusThunk,
  updateProfilePhotoThunk,
}) => {
  if (!profile) {
    return <Preloader />;
  }

  const profilePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const photoFile = e.target.files?.[0];

    if (photoFile) {
      updateProfilePhotoThunk(photoFile);
    }
  };

  return (
    <div>
      <ProfileStatus
        updateProfileStatusThunk={updateProfileStatusThunk}
        profileStatus={profileStatus}
      />
      <div>
        <img
          className={classes.profilePhoto}
          src={profile?.photos.large ? profile.photos.large : user}
          alt="Profile photo"
        />
        <div className={classes.changePhotoBlock}>
          <label className={classes.changePhotoLabel}>
            Change profile photo
            <img src={camera} alt="" />
            <input type="file" accept="image/*" onChange={profilePhotoChange} />
          </label>
        </div>

        <div>
          About me: {profile.aboutMe}
          <p />
          FullName: {profile.fullName}
          <p />
          Looking for a job: {profile.lookingForAJob}
          <p />
          <div>
            Facebook: {profile.contacts.facebook}
            <p />
            VK: {profile.contacts.vk}
            <p />
            Github: {profile.contacts.github}
            <p />
            Twitter: {profile.contacts.twitter}
            <p />
            Website: {profile.contacts.website}
            <p />
            Instagram: {profile.contacts.instagram}
            <p />
            MainLink: {profile.contacts.mainLink}
            <p />
            Youtube: {profile.contacts.youtube}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
