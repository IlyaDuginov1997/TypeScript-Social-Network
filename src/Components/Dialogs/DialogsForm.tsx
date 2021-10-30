import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import React from 'react';

export type FormDataDialogsType = {
    message: string
}

export const DialogsForm: React.FC<InjectedFormProps<FormDataDialogsType>> = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div><Field component={'textarea'} name={'message'} placeholder={'Add message'}/></div>

                <div>
                    <button> Add message</button>
                </div>
            </form>
        </div>
    );
}

export const DialogsReduxForm = reduxForm<FormDataDialogsType>({form: 'dialogs'})(DialogsForm);
