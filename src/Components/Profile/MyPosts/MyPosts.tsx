import React from 'react';
import classes from './MyPosts.module.css'
import Post from './Post/Post';
import {DispatchActionType, PostsType} from '../../../Redux/State';

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
            props.dispatch({type: 'ADD-NEW-POST'})
        }
    }

    const onPostChange = () => {
        if (newPostEl.current) {
            props.dispatch({
                    type: 'CHANGE-POST-EL',
                    postEl: newPostEl.current?.value
                }
            )
        }
    }

    return (
        <div>
            My posts
            <div>
                <textarea value={props.newPostText} ref={newPostEl} onChange={onPostChange}></textarea>
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