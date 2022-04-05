import React from 'react';
import {PostsType} from '../../../Redux/profileReducer';
import classes from './MyPosts.module.css';
import {FormDataPostType, MyPostReduxForm} from './MyPostsForm';
import Post from './Post/Post';

type MyPostsPropsType = {
    posts: Array<PostsType>
    addPost: (post: string) => void
}

function MyPosts(props: MyPostsPropsType) {
    let postsItem = props.posts.map(p => <Post key={p.id}
                                               message={p.message}
                                               likesCount={p.likesCount}/>);

    const onSubmit = (formData: FormDataPostType) => {
        props.addPost(formData.myPosts);
    };

    return (
        <div>
            My posts
            <MyPostReduxForm
                onSubmit={onSubmit}/>
            {/*<div>*/}
            {/*    <textarea value={props.newPostText} ref={newPostEl} onChange={addPostEl}></textarea>*/}
            {/*    <div>*/}
            {/*        <button onClick={onAddPost}>Add post</button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={classes.posts}>
                {postsItem}
            </div>

        </div>
    );
}

export default MyPosts;
