import React from 'react';
import axios from 'axios';


const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': 'e5b738f6-4744-4b59-9452-509c57fc296b'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})


export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    }
}

export const authAPI = {
    authUser() {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data
            })
    }
}

export const followAPI = {
    followUser(id: number) {
        return instance.post(`follow/${id}`)
            .then(response => {
                return response.data
            })
    },
    unfollowUser(id: number) {
        return instance.delete(`follow/${id}`)
            .then(response => {
                return response.data
            })
    },
}

export const profileAPI = {
    userProfile(userId: string) {
        return instance.get(`profile/${userId}`)
            .then(response => {
                return response.data
            })
    }
}