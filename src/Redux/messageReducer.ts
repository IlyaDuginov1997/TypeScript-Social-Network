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

const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE'
const CHANGE_MESSAGE_EL = 'CHANGE_MESSAGE_EL'

export type DispatchActionType = AddMessageType | ChangeMessageElType

export type AddMessageType = {
    type: typeof ADD_NEW_MESSAGE
}

export type ChangeMessageElType = {
    type: typeof CHANGE_MESSAGE_EL
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
    newMessageText: 'It is my first message to you'

}

export function dialogReducer(state = initialState, action: DispatchActionType): DialogComponentType {
    switch (action.type) {
        case CHANGE_MESSAGE_EL:
            return {
                ...state,
                newMessageText: action.messageEl
            }

        case ADD_NEW_MESSAGE: {
            let body = state.newMessageText
            return  {
                ...state,
                newMessageText: '',
                messages: [...state.messages, {
                    id: 5,
                    message: body,
                }]
            }

        }
        default:
            return state
    }
}

export function addMessageEl(messageEl: string): ChangeMessageElType {
    return {
        type: CHANGE_MESSAGE_EL,
        messageEl: messageEl
    }
}

export function addMessage(): AddMessageType {
    return {
        type: ADD_NEW_MESSAGE,
    }
}