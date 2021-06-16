import {AddMessageType, ChangeMessageElType, DialogComponentType, DispatchActionType} from './State';

export function dialogReducer(state: DialogComponentType, action: DispatchActionType): DialogComponentType {
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