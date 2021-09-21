import React from 'react';
import axios from 'axios';
import {UserType} from '../Redux/usersReducer';
import {GetProfileType} from '../Components/Profile/ProfileContainer';

type getUserAPIType = {
    error: null | string
    items: UserType[]
    totalCount: number
}

type authDataType = {
    id: number
    email: string
    login: string
}

type commonType<T> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}

const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': 'e5b738f6-4744-4b59-9452-509c57fc296b'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})


export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<getUserAPIType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    }
}

export const authAPI = {
    authUser() {
        return instance.get<commonType<authDataType>>(`auth/me`)
            .then(response => {
                return response.data
            })
    }
}

export const followAPI = {
    followUser(id: number) {
        return instance.post<commonType<{}>>(`follow/${id}`)
            .then(response => {
                return response.data
            })
    },
    unfollowUser(id: number) {
        return instance.delete<commonType<{}>>(`follow/${id}`)
            .then(response => {
                return response.data
            })
    },
}

export const profileAPI = {
    getUserProfile(userId: string) {
        return instance.get<GetProfileType>(`profile/${userId}`)
            .then(response => {
                return response.data
            })
    },

    getProfileStatus(userId: string) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(responce => {
                return responce
            })
    },

    updateProfileStatus(status: string) {
        return instance.post<commonType<{}>>(`profile/status`, {status: status})
            .then(responce => {
                return responce.data
            })
    }
}
