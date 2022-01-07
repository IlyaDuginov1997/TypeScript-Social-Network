import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import React from 'react';
import {maxLengthCreator, requiredField} from '../../../Utils/Validators/Validator';
import {Textarea} from '../../../Common/FormControl/ValidatedForm';

export type FormDataPostType = {
    myPosts: string
}
const maxLength10 = maxLengthCreator(10);


export const MyPostsForm: React.FC<InjectedFormProps<FormDataPostType>> = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field
                        component={Textarea}
                        name={'myPosts'}
                        validate={[requiredField, maxLength10]}
                        placeholder={'Enter your post'}/>
                </div>
                <div>
                    <button> Add post</button>
                </div>
            </form>
        </div>
    );
};

export const MyPostReduxForm = reduxForm<FormDataPostType>({form: 'posts'})(MyPostsForm);