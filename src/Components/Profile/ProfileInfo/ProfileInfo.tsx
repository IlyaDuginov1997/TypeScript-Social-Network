import React, {ChangeEvent, useState} from 'react';
import {ContactsType, GetProfileType} from 'src/Components/Profile/ProfileContainer';
import {Preloader} from 'src/Common/Preloader/Preloader';
import classes from 'src/Components/Profile/ProfileInfo/ProfileInfo.module.css';
import {ProfileStatus} from 'src/Components/Profile/ProfileInfo/ProfileStatus';
import user from 'src/Assets/Images/user.jpg';
import camera from 'src/Assets/Images/camera.svg';

export type ProfileInfoPropsType = {
  profile: GetProfileType | null;
  profileStatus: string;
  updateProfileStatusThunk: (status: string) => void;
  updateProfilePhotoThunk: (file: File) => void;
  isOwner: boolean;
};

const ProfileInfo: React.FC<ProfileInfoPropsType> = (
  {
    profile,
    profileStatus,
    updateProfileStatusThunk,
    updateProfilePhotoThunk,
    isOwner,
  }) => {

  const [editMode, setEditMode] = useState<boolean>(false);

  const editModeOn = () => {
    setEditMode(true);
  }

  const editModeOff = () => {
    setEditMode(false);
  }

  if (!profile) {
    return <Preloader/>;
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
          alt='Profile'
        />
        {isOwner && (
          <div className={classes.changePhotoBlock}>
            <label className={classes.changePhotoLabel}>
              Change profile photo
              <img src={camera} alt=''/>
              <input type='file' accept='image/*' onChange={profilePhotoChange}/>
            </label>
          </div>
        )}
        {editMode
          ? <ProfileForm editModeOff={editModeOff}/>
          : <ProfileFormData profile={profile} editModeHandle={editModeOn}/>

        }

      </div>
    </div>
  );
};

type LinkPropsType = {
  property: string;
  value: string | null;
}

const Link: React.FC<LinkPropsType> = ({property, value}) => {
  return (
    <div>
      <b>{property}: </b> {value}
    </div>
  );
};

type ProfileFormDataPropsType = {
  profile: GetProfileType;
  editModeHandle: () => void;
}

const ProfileFormData: React.FC<ProfileFormDataPropsType> = ({profile, editModeHandle}) => {
  return (
    <div>
      <button onClick={editModeHandle}>Change profile</button>
      <Link property={'about me'} value={profile.aboutMe}/>
      <Link property={'fullName'} value={profile.fullName}/>
      <Link property={'looking for a job'} value={profile.lookingForAJob ? 'Yes' : 'No'}/>
      <div>
        {Object.keys(profile.contacts).map(title => {
          return (
            <Link
              key={title}
              property={title}
              value={profile.contacts[title as keyof ContactsType]}
            />
          );
        })}
      </div>
    </div>
  );
};

type ProfileFormPropsType = {
  editModeOff: () => void;
}

const ProfileForm: React.FC<ProfileFormPropsType> = ({editModeOff}) => {
  return (
    <form onBlur={editModeOff}>
      <input type='text' value={'some'} onChange={() => {}}/>
      <input type='text' value={'some2'} onChange={() => {}}/>
    </form>
  );
};

export default ProfileInfo;
