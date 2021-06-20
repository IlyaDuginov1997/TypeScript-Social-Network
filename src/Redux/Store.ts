import {profileReducer} from './profileReducer';
import {dialogReducer} from './messageReducer';

export type PostsType = {
    id: number
    message: string
    likesCount: number
}

export type ProfileComponentType = {
    posts: Array<PostsType>
    newPostText: string
}

export type DialogsType = {
    id: number
    name: string
}

export type MessagesType = {
    id: number
    message: string
}

export type DialogComponentType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageText: string
}

export type RootStateType = {
    profileComponent: ProfileComponentType
    dialogComponent: DialogComponentType
}

export type DispatchActionType = AddNewPostType | ChangePostElType | AddMessageType | ChangeMessageElType

export type AddNewPostType = {
    type: 'ADD-NEW-POST'
}

export type ChangePostElType = {
    type: 'CHANGE-POST-EL'
    postEl: string
}

export type AddMessageType = {
    type: 'ADD-NEW-MESSAGE'
}

export type ChangeMessageElType = {
    type: 'CHANGE-MESSAGE-EL'
    messageEl: string
}

export type StoreType = {
    _state: RootStateType
    callback: () => void
    subscribe: (observer: () => void) => void
    getState: () => RootStateType
    dispatch: (action: DispatchActionType) => void
}


// ниже прописан наш самописный (хар-код) вариант стора, без редакса
// ............
// ............

export const store: StoreType = {
    _state: {
        profileComponent: {
            posts: [
                {id: 1, message: 'Hello, my name is Ilya', likesCount: 34},
                {id: 2, message: 'Hey, it is my second post', likesCount: 12},
                {id: 3, message: 'Sorry for my english', likesCount: 105},
                {id: 4, message: 'I love your likes', likesCount: 65},
            ],
            newPostText: ''
        },
        dialogComponent: {
            dialogs: [
                {id: 1, name: 'Nastya'},
                {id: 2, name: 'Gleb'},
                {id: 3, name: 'Anton'},
                {id: 4, name: 'Denis'},
                {id: 5, name: 'Kostya'},
            ],
            messages: [
                {id: 1, message: 'Hello, my name is Ilya'},
                {id: 2, message: 'I am fine'},
                {id: 3, message: 'Yo'},
            ],
            newMessageText: ''
        },
    },
    callback() {
        // заглушка
    },
    subscribe(observer: () => void) {
        this.callback = observer
    },

    getState() {
        return this._state
    },
    dispatch(action) {
        this._state.profileComponent = profileReducer(this._state.profileComponent, action)
        this._state.dialogComponent = dialogReducer(this._state.dialogComponent, action)
        this.callback()
    }
}

// можно записать вот так и потом использовать этот тип
// type X = typeof store._state.dialogComponent