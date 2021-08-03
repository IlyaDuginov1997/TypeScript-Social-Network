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
}

const ADD_NEW_POST = 'ADD_NEW_POST'
const CHANGE_POST_EL = 'CHANGE_POST_EL'
const SET_USERS_PROFILE = 'SET_USERS_PROFILE'

export type DispatchActionType = AddNewPostType | ChangePostElType | SetUsersProfileType

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

let initialState: ProfileComponentType = {
    posts: [
        {id: 1, message: 'Hello, my name is Ilya', likesCount: 34},
        {id: 2, message: 'Hey, it is my second post', likesCount: 12},
        {id: 3, message: 'Sorry for my english', likesCount: 105},
        {id: 4, message: 'I love your likes', likesCount: 65},
    ],
    newPostText: 'Hello',
    profile: null
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
        profile: profile
    }
}

export const getProfileThunk = (userId: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.userProfile(userId).then(data => {
            dispatch(setUsersProfile(data))
        })
    }
}