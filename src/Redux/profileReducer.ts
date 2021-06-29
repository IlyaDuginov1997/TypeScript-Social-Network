import {AddMessageType, ChangeMessageElType} from './messageReducer';

export type PostsType = {
    id: number
    message: string
    likesCount: number
}

export type ProfileComponentType = {
    posts: Array<PostsType>
    newPostText: string
}


export type DispatchActionType = AddNewPostType | ChangePostElType | AddMessageType | ChangeMessageElType

export type AddNewPostType = {
    type: 'ADD-NEW-POST'
}

export type ChangePostElType = {
    type: 'CHANGE-POST-EL'
    postEl: string
}

let initialState: ProfileComponentType = {
    posts: [
        {id: 1, message: 'Hello, my name is Ilya', likesCount: 34},
        {id: 2, message: 'Hey, it is my second post', likesCount: 12},
        {id: 3, message: 'Sorry for my english', likesCount: 105},
        {id: 4, message: 'I love your likes', likesCount: 65},
    ],
    newPostText: ''
}

export function profileReducer(state = initialState, action: DispatchActionType): ProfileComponentType {
    switch (action.type) {
        case 'CHANGE-POST-EL': {
            let stateCopy = {...state}
            stateCopy.newPostText = action.postEl
            return stateCopy
        }
        case 'ADD-NEW-POST': {
            let stateCopy = {...state}
            let newPost = {
                id: 5,
                message: stateCopy.newPostText,
                likesCount: 17
            }
            stateCopy.posts.push(newPost)
            stateCopy.newPostText = ''
            return stateCopy
        }
        default:
            return state
    }
}

export function AddPostElActionCreator(postEl: string): ChangePostElType {
    return {
        type: 'CHANGE-POST-EL',
        postEl: postEl
    }
}

export function AddPostActionCreator(): AddNewPostType {
    return {
        type: 'ADD-NEW-POST',
    }
}

