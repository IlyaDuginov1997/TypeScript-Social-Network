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
}

const ADD_NEW_MESSAGE = 'messages/ADD_NEW_MESSAGE';
const CHANGE_MESSAGE_EL = 'messages/CHANGE_MESSAGE_EL';

export type DispatchActionType = AddMessageType | ChangeMessageElType

export type AddMessageType = ReturnType<typeof addMessage>

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
};

export function dialogReducer(state = initialState, action: DispatchActionType): DialogComponentType {
    switch (action.type) {
        case ADD_NEW_MESSAGE: {
            let body = action.message;
            return {
                ...state,
                messages: [...state.messages, {
                    id: 5,
                    message: body,
                }]
            };
        }
        default:
            return state;
    }
}

export function addMessage(message: string) {
    return {
        type: ADD_NEW_MESSAGE,
        message,
    } as const;
}