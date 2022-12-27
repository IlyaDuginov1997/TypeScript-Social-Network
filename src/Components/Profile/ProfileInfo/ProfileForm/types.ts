import { GetProfileType } from 'src/Components/Profile/ProfileContainer';

export type ProfileFormPropsType = {
  profile: GetProfileType;
  isOwner: boolean;
  editModeOff: () => void;
};