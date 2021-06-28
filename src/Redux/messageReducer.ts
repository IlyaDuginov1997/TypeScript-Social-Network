import { AddNewPostType, ChangePostElType } from './profileReducer';

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

export type DispatchActionType = AddNewPostType | ChangePostElType | AddMessageType | ChangeMessageElType

export type AddMessageType = {
    type: 'ADD-NEW-MESSAGE'
}

export type ChangeMessageElType = {
    type: 'CHANGE-MESSAGE-EL'
    messageEl: string
}


let initialState: DialogComponentType = {
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

export function dialogReducer(state = initialState, action: DispatchActionType): DialogComponentType {
    switch (action.type) {
        case 'CHANGE-MESSAGE-EL':
            state.newMessageText = action.messageEl
            return state
        case 'ADD-NEW-MESSAGE':
            let newMessageEl = {
                id: 5,
                message: state.newMessageText,
            }
            state.messages.push(newMessageEl)
            state.newMessageText = ''
            return state
        default:
            return state
    }
}

export function AddMessageElActionCreator(messageEl: string): ChangeMessageElType {
    return {
        type: 'CHANGE-MESSAGE-EL',
        messageEl: messageEl
    }
}

export function AddMessageActionCreator(): AddMessageType {
    return {
        type: 'ADD-NEW-MESSAGE',
    }
}