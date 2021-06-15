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

export type DispatchActionType = AddNewPostType | ChangePostELType | AddMessageType | ChangeMessageELType

export type AddNewPostType = {
    type: 'ADD-NEW-POST'
}

export type ChangePostELType = {
    type: 'CHANGE-POST-EL'
    postEl: string
}

export type AddMessageType = {
    type: 'ADD-NEW-MESSAGE'
}

export type ChangeMessageELType = {
    type: 'CHANGE-MESSAGE-EL'
    messageEl: string
}


export type StoreType = {
    _state: RootStateType
    callback: () => void
    observe: (observer: () => void) => void
    // changePostEL: (el: string) => void
    // addPost: () => void
    // changeMessageEl: (el: string) => void
    // addMessage: () => void
    getState: () => RootStateType
    dispatch: (action: DispatchActionType) => void
}

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
    },
    observe(observer: () => void) {
        this.callback = observer
    },

    // changePostEL(el: string) {
    //     this._state.profileComponent.newPostText = el
    //     this.callback()
    // },
    // addPost() {
    //     let newPost = {
    //         id: 5,
    //         message: this._state.profileComponent.newPostText,
    //         likesCount: 17
    //     }
    //     this._state.profileComponent.posts.push(newPost)
    //     this._state.profileComponent.newPostText = ''
    //     this.callback()
    // },
    // changeMessageEl(el: string) {
    //     this._state.dialogComponent.newMessageText = el
    //     this.callback()
    // },
    // addMessage() {
    //     let newMessageEl = {
    //         id: 5,
    //         message: this._state.dialogComponent.newMessageText,
    //     }
    //     this._state.dialogComponent.messages.push(newMessageEl)
    //     this._state.dialogComponent.newMessageText = ''
    //     this.callback()
    // },

    getState() {
        return this._state
    },
    dispatch(action) {
        if (action.type === 'CHANGE-POST-EL') {
            this._state.profileComponent.newPostText = action.postEl
            this.callback()
        } else if (action.type === 'ADD-NEW-POST') {
            let newPost = {
                id: 5,
                message: this._state.profileComponent.newPostText,
                likesCount: 17
            }
            this._state.profileComponent.posts.push(newPost)
            this._state.profileComponent.newPostText = ''
            this.callback()
        } else if (action.type === 'CHANGE-MESSAGE-EL') {
            this._state.dialogComponent.newMessageText = action.messageEl
            this.callback()
        } else if (action.type === 'ADD-NEW-MESSAGE') {
            let newMessageEl = {
                id: 5,
                message: this._state.dialogComponent.newMessageText,
            }
            this._state.dialogComponent.messages.push(newMessageEl)
            this._state.dialogComponent.newMessageText = ''
            this.callback()
        }
    }
}
