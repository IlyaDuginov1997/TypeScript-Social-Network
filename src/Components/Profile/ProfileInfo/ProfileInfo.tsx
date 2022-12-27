import React, { ChangeEvent, useState } from 'react';
import { GetProfileType } from 'src/Components/Profile/ProfileContainer';
import { Preloader } from 'src/Common/Preloader/Preloader';
import classes from 'src/Components/Profile/ProfileInfo/ProfileInfo.module.css';
import { ProfileStatus } from 'src/Components/Profile/ProfileInfo/ProfileStatus';
import user from 'src/Assets/Images/user.jpg';
import camera from 'src/Assets/Images/camera.svg';
import { ProfileFormData } from 'src/Components/Profile/ProfileInfo/ProfileFormData/ProfileFormData';
import { ProfileForm } from 'src/Components/Profile/ProfileInfo/ProfileForm/ProfileForm';

export type ProfileInfoPropsType = {
  profile: GetProfileType | null;
  profileStatus: string;
  updateProfileStatusThunk: (status: string) => void;
  updateProfilePhotoThunk: (file: File) => void;
  isOwner: boolean;
};

export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
  profile,
  profileStatus,
  updateProfileStatusThunk,
  updateProfilePhotoThunk,
  isOwner,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const editModeOn = () => {
    setEditMode(true);
  };

  const editModeOff = () => {
    setEditMode(false);
  };

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
        isOwner={isOwner}
      />
      <div>
        <img
          className={classes.profilePhoto}
          src={profile?.photos.large ? profile.photos.large : user}
          alt='Profile'
        />
        {isOwner && (
          <div className={classes.changePhotoBlock}>
            <label className={classes.changePhotoLabel}>
              Change profile photo
              <img src={camera} alt='' />
              <input type='file' accept='image/*' onChange={profilePhotoChange} />
            </label>
          </div>
        )}

        {editMode ? (
          <ProfileForm editModeOff={editModeOff} profile={profile} isOwner={isOwner} />
        ) : (
          <ProfileFormData
            profile={profile}
            editModeHandle={editModeOn}
            isOwner={isOwner}
          />
        )}
      </div>
    </div>
  );
};

type LinkPropsType = {
  property: string;
  value: string | null;
};

export const Link: React.FC<LinkPropsType> = ({ property, value }) => {
  return (
    <div>
      <b>{property}: </b> {value}
    </div>
  );
};
