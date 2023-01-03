import { GetProfileType } from 'src/Components/Profile/ProfileContainer';
import { profileAPI } from 'src/API/API';
import { Dispatch } from 'redux';
import { ProfileFormFields } from 'src/Components/Profile/ProfileInfo/ProfileForm/ProfileForm';
import { RootReduxState } from 'src/Redux/redux-store';

export type PostsType = {
  id: number;
  message: string;
  likesCount: number;
};

export type ProfileComponentType = {
  posts: Array<PostsType>;
  profile: GetProfileType | null;
  // profile: any;
  status: string;
};

export type ProfilePhotoType = {
  small: string;
  large: string;
};

const ADD_NEW_POST = 'profile/ADD_NEW_POST';
const CHANGE_POST_EL = 'profile/CHANGE_POST_EL';
const SET_USERS_PROFILE = 'profile/SET_USERS_PROFILE';
const SET_PROFILE_STATUS = 'profile/SET_PROFILE_STATUS';
export const DELETE_POST = 'profile/DELETE_POST';
const CHANGE_PROFILE_PHOTO = 'profile/CHANGE_PROFILE_PHOTO';

export type DispatchActionType =
  | AddNewPostType
  | ChangePostElType
  | SetUsersProfileType
  | SetProfileStatusType
  | DeletePostType
  | ChangeProfilePhotoType;

export type AddNewPostType = ReturnType<typeof AddPostActionCreator>;

export type ChangePostElType = {
  type: typeof CHANGE_POST_EL;
  postEl: string;
};

export type SetUsersProfileType = {
  type: typeof SET_USERS_PROFILE;
  profile: GetProfileType;
};

export type SetProfileStatusType = {
  type: typeof SET_PROFILE_STATUS;
  status: string;
};

export type DeletePostType = {
  type: typeof DELETE_POST;
  postId: number;
};

export type ChangeProfilePhotoType = {
  type: typeof CHANGE_PROFILE_PHOTO;
  profilePhotos: ProfilePhotoType;
};

let initialState: ProfileComponentType = {
  posts: [
    { id: 1, message: 'Hello, my name is Ilya', likesCount: 34 },
    { id: 2, message: 'Hey, it is my second post', likesCount: 12 },
    { id: 3, message: 'Sorry for my english', likesCount: 105 },
    { id: 4, message: 'I love your likes', likesCount: 65 },
  ],
  profile: null,
  status: '',
};

export function profileReducer(
  state = initialState,
  action: DispatchActionType,
): ProfileComponentType {
  switch (action.type) {
    case ADD_NEW_POST:
      let newPost = {
        id: 5,
        message: action.post,
        likesCount: 17,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    case SET_USERS_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case SET_PROFILE_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.postId),
      };
    case CHANGE_PROFILE_PHOTO:
      return {
        ...state,
        profile:
          state.profile !== null
            ? { ...state.profile, photos: { ...action.profilePhotos } }
            : null,
      };
    default:
      return state;
  }
}

export function AddPostActionCreator(post: string) {
  return {
    type: ADD_NEW_POST,
    post,
  } as const;
}

export function setUsersProfile(profile: GetProfileType): SetUsersProfileType {
  return {
    type: SET_USERS_PROFILE,
    profile,
  };
}

export function setProfileStatus(status: string): SetProfileStatusType {
  return {
    type: SET_PROFILE_STATUS,
    status,
  };
}

export function deletePost(postId: number): DeletePostType {
  return {
    type: DELETE_POST,
    postId,
  };
}

export function setUsersPhoto(profilePhotos: ProfilePhotoType): ChangeProfilePhotoType {
  return {
    type: CHANGE_PROFILE_PHOTO,
    profilePhotos,
  };
}

export function updateProfile(profilePhotos: ProfilePhotoType): ChangeProfilePhotoType {
  return {
    type: CHANGE_PROFILE_PHOTO,
    profilePhotos,
  };
}

export const getProfileStatusThunk = (userId: number | null) => {
  return async (dispatch: Dispatch) => {
    const data = await profileAPI.getProfileStatus(userId);
    dispatch(setProfileStatus(data));
  };
};

export const updateProfileStatusThunk = (status: string) => {
  return async (dispatch: Dispatch) => {
    const data = await profileAPI.updateProfileStatus(status);

    if (data.resultCode === 0) {
      dispatch(setProfileStatus(status));
    }
  };
};

export const getUserProfileThunk = (userId: number | null) => {
  return async (dispatch: Dispatch) => {
    const data = await profileAPI.getUserProfile(userId);
    dispatch(setUsersProfile(data));
  };
};

export const updateProfilePhotoThunk = (file: File) => {
  return async (dispatch: Dispatch) => {
    const data = await profileAPI.updateProfilePhoto(file);

    if (data.resultCode === 0) {
      dispatch(setUsersPhoto(data.data.photos));
    }
  };
};

export const updateProfileDataThunk = (profileData: ProfileFormFields) => {
  return async (dispatch: Dispatch<any>, getState: () => RootReduxState) => {
    const userId = getState().auth.id;
    const data = await profileAPI.updateProfile(profileData);

    if (data.resultCode === 0) {
      dispatch(getUserProfileThunk(userId));
    } else {
      return data.messages ? data.messages : 'something go wrong';
    }
  };
};
