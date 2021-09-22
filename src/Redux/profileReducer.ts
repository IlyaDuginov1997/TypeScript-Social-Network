import {GetProfileType} from '../Components/Profile/ProfileContainer';
import {profileAPI} from '../API/API';
import {Dispatch} from 'redux';

export type PostsType = {
    id: number
    message: string
    likesCount: number
}

export type ProfileComponentType = {
    posts: Array<PostsType>
    newPostText: string
    profile: GetProfileType | null
    status: string
}


const ADD_NEW_POST = 'ADD_NEW_POST'
const CHANGE_POST_EL = 'CHANGE_POST_EL'
const SET_USERS_PROFILE = 'SET_USERS_PROFILE'
const SET_PROFILE_STATUS = 'SET_PROFILE_STATUS'

export type DispatchActionType = AddNewPostType | ChangePostElType | SetUsersProfileType | SetProfileStatusType

export type AddNewPostType = {
    type: typeof ADD_NEW_POST
}

export type ChangePostElType = {
    type: typeof CHANGE_POST_EL
    postEl: string
}

export type SetUsersProfileType = {
    type: typeof SET_USERS_PROFILE
    profile: GetProfileType
}

export type SetProfileStatusType = {
    type: typeof SET_PROFILE_STATUS
    status: string
}

let initialState: ProfileComponentType = {
    posts: [
        {id: 1, message: 'Hello, my name is Ilya', likesCount: 34},
        {id: 2, message: 'Hey, it is my second post', likesCount: 12},
        {id: 3, message: 'Sorry for my english', likesCount: 105},
        {id: 4, message: 'I love your likes', likesCount: 65},
    ],
    newPostText: 'Hello',
    profile: null,
    status: '',
}

export function profileReducer(state = initialState, action: DispatchActionType): ProfileComponentType {
    switch (action.type) {
        case CHANGE_POST_EL:
            return {
                ...state,
                newPostText: action.postEl
            }

        case ADD_NEW_POST:
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 17
            }
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, newPost],
            }
        case SET_USERS_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_PROFILE_STATUS:
            return {
                ...state,
                status: action.status
            }
        default:
            return state
    }
}

export function AddPostElActionCreator(postEl: string): ChangePostElType {
    return {
        type: CHANGE_POST_EL,
        postEl: postEl
    }
}

export function AddPostActionCreator(): AddNewPostType {
    return {
        type: ADD_NEW_POST,
    }
}

export function setUsersProfile(profile: GetProfileType): SetUsersProfileType {
    return {
        type: SET_USERS_PROFILE,
        profile
    }
}

export function setProfileStatus(status: any): SetProfileStatusType {
    return {
        type: SET_PROFILE_STATUS,
        status
    }
}

export const getProfileStatusThunk = (userId: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.getProfileStatus(userId).then(data => {
            dispatch(setProfileStatus(data))
        })
    }
}

export const updateProfileStatusThunk = (status: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.updateProfileStatus(status).then(data => {
            if (data.resultCode === 0) {
                dispatch(setProfileStatus(status))
            }
        })
    }
}

export const getUserProfileThunk = (userId: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.getUserProfile(userId).then(data => {
            dispatch(setUsersProfile(data))
        })
    }
}