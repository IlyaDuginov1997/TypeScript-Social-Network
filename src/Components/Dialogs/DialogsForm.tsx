import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import React from 'react';
import { Textarea } from '../../Common/FormControl/ValidatedForm';
import {maxLengthCreator, requiredField} from '../../Utils/Validators/Validator';

export type FormDataDialogsType = {
    message: string
}

const maxLength30 = maxLengthCreator(30)

export const DialogsForm: React.FC<InjectedFormProps<FormDataDialogsType>> = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div><Field
                    component={Textarea}
                    validate={[requiredField, maxLength30]}
                    name={'message'}
                    placeholder={'Add message'}/>
                </div>

                <div>
                    <button> Add message</button>
                </div>
            </form>
        </div>
    );
};

export const DialogsReduxForm = reduxForm<FormDataDialogsType>({form: 'dialogs'})(DialogsForm);
