import { GetProfileType } from 'src/Components/Profile/ProfileContainer';
import { ProfileFormFields } from 'src/Components/Profile/ProfileInfo/ProfileForm/ProfileForm';

export type ProfileFormPropsType = {
  profile: GetProfileType;
  isOwner: boolean;
  editModeOff: () => void;
  updateProfileDataThunk: (profileData: ProfileFormFields) => Promise<any>;
};