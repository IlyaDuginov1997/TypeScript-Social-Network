import axios from 'axios';
import { UserType } from 'src/Redux/usersReducer';
import { GetProfileType } from 'src/Components/Profile/ProfileContainer';
import { ProfilePhotoType } from 'src/Redux/profileReducer';

type getUserAPIType = {
  error: null | string;
  items: UserType[];
  totalCount: number;
};

type authDataType = {
  id: number;
  email: string;
  login: string;
};

type commonType<T = {}> = {
  resultCode: number;
  messages: string[];
  fieldsErrors: string[];
  data: T;
};

export type loginDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: boolean;
};

const instance = axios.create({
  withCredentials: true,
  headers: {
    'API-KEY': '57c1b71f-e799-4641-88c4-164710395dd0',
  },
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
});

export const usersAPI = {
  getUsers(currentPage: number, pageSize: number) {
    return instance
      .get<getUserAPIType>(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => {
        return response.data;
      });
  },
};

export const authAPI = {
  authUser() {
    return instance.get<commonType<authDataType>>(`auth/me`).then(response => {
      return response.data;
    });
  },
  login(email: string, password: string, rememberMe: boolean) {
    return instance
      .post<commonType<{ userId: string }>>(`auth/login`, { email, password, rememberMe })
      .then(response => {
        return response.data;
      });
  },
  logout() {
    return instance.delete<commonType>(`auth/login`).then(response => {
      return response.data;
    });
  },
};

export const followAPI = {
  followUser(id: number) {
    return instance.post<commonType>(`follow/${id}`).then(response => {
      return response.data;
    });
  },
  unfollowUser(id: number) {
    return instance.delete<commonType>(`follow/${id}`).then(response => {
      return response.data;
    });
  },
};

export const profileAPI = {
  getUserProfile(userId: number | null) {
    return instance.get<GetProfileType>(`profile/${userId}`).then(response => {
      return response.data;
    });
  },

  getProfileStatus(userId: number | null) {
    return instance.get<string>(`profile/status/${userId}`).then(response => {
      return response.data;
    });
  },

  updateProfileStatus(status: string) {
    return instance
      .put<commonType>(`profile/status`, { status: status })
      .then(response => {
        return response.data;
      });
  },

  updateProfilePhoto(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    return instance
      .put<commonType<{ photos: ProfilePhotoType }>>(`profile/photo`, formData, config)
      .then(response => {
        return response.data;
      });
  },
};
