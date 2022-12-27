import { GetProfileType } from 'src/Components/Profile/ProfileContainer';

export type ProfileFormDataPropsType = {
  profile: GetProfileType;
  editModeHandle: () => void;
  isOwner: boolean;
};