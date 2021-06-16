import {AddNewPostType, ChangePostElType, DispatchActionType, ProfileComponentType} from './State';

export function profileReducer(state: ProfileComponentType, action: DispatchActionType) {
    switch (action.type) {
        case 'CHANGE-POST-EL':
            state.newPostText = action.postEl
            return state
        case 'ADD-NEW-POST':
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 17
            }
            state.posts.push(newPost)
            state.newPostText = ''
            return state
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

