import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import React from 'react';

export type FormDataPostType = {
    myPost: string
}


export const MyPostsForm: React.FC<InjectedFormProps<FormDataPostType>> = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field component={'textarea'} name={'myPosts'} placeholder={'post'}/></div>
                <div>
                    <button> Add post</button>
                </div>
            </form>
        </div>
    );
};

export const MyPostReduxForm = reduxForm<FormDataPostType>({form: 'posts'})(MyPostsForm)