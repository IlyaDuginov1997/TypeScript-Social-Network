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


export const state = {
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
    }
}

let rerenderEntireTree = () => {
    console.log('hello')
}

export const observe = (observer: () => void) => {
    rerenderEntireTree = observer
}

export function changePostEL(el: string) {
    state.profileComponent.newPostText = el
    console.log(el)
    rerenderEntireTree()
}

export function addPost() {
    let newPost = {
        id: 5,
        message: state.profileComponent.newPostText,
        likesCount: 17
    }
    state.profileComponent.posts.push(newPost)
    state.profileComponent.newPostText = ''
    rerenderEntireTree()
}


export function changeMessageEl(el: string) {
    state.dialogComponent.newMessageText = el
    console.log(el)
    rerenderEntireTree()
}

export function addMessage() {
    let newMessageEl = {
        id: 5,
        message: state.dialogComponent.newMessageText,
    }
    state.dialogComponent.messages.push(newMessageEl)
    state.dialogComponent.newMessageText = ''
    rerenderEntireTree()
}