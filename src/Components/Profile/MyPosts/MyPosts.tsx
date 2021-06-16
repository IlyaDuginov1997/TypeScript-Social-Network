import React from 'react';
import classes from './MyPosts.module.css'
import Post from './Post/Post';
import {DispatchActionType, PostsType} from '../../../Redux/State';
import {AddPostActionCreator, AddPostElActionCreator} from '../../../Redux/profileReducer';

type MyPostsPropsType = {
    posts: Array<PostsType>
    dispatch: (action: DispatchActionType) => void
    newPostText: string
}

function MyPosts(props: MyPostsPropsType) {


    let postsItem = props.posts.map(p => <Post key={p.id}
                                               message={p.message}
                                               likesCount={p.likesCount}/>)

    const newPostEl = React.createRef<HTMLTextAreaElement>()

    const addPost = () => {
        if (newPostEl.current) {
            props.dispatch(AddPostActionCreator())
        }
    }

    const addPostEl = () => {
        if (newPostEl.current) {
            props.dispatch(AddPostElActionCreator(newPostEl.current?.value))
        }
    }

    return (
        <div>
            My posts
            <div>
                <textarea value={props.newPostText} ref={newPostEl} onChange={addPostEl}></textarea>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={classes.posts}>
                {postsItem}
            </div>

        </div>
    );
}

export default MyPosts;