import React from 'react';
import {AddPostActionCreator, AddPostElActionCreator} from '../../../Redux/profileReducer';
import MyPosts from './MyPosts';
import {ReduxStoreType} from '../../../Redux/redux-store';

type MyPostsPropsType = {
    store: ReduxStoreType

}

function MyPostsContainer(props: MyPostsPropsType) {

    let posts = props.store.getState().profileComponent.posts;
    let newPostText = props.store.getState().profileComponent.newPostText


    const addPost = () => {
        props.store.dispatch(AddPostActionCreator())
    }

    const addPostEl = (text: string) => {
        if (text) {
            props.store.dispatch(AddPostElActionCreator(text))
        }
    }

    return (
        <MyPosts posts={posts} newPostText={newPostText} addPost={addPost} addPostEl={addPostEl}/>
    );
}

export default MyPostsContainer;