import { ContactsType } from 'src/Components/Profile/ProfileContainer';
import React from 'react';
import { Link } from 'src/Components/Profile/ProfileInfo/ProfileInfo';
import { ProfileFormDataPropsType } from 'src/Components/Profile/ProfileInfo/ProfileFormData/types';

export const ProfileFormData: React.FC<ProfileFormDataPropsType> = ({
  profile,
  editModeHandle,
  isOwner,
}) => {
  return (
    <div>
      { isOwner && <button onClick={editModeHandle}>Change profile</button>}
      <Link property={'about me'} value={profile.aboutMe} />
      <Link property={'fullName'} value={profile.fullName} />
      <Link
        property={'looking for a job'}
        value={profile.lookingForAJob ? 'Yes' : 'No'}
      />
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
