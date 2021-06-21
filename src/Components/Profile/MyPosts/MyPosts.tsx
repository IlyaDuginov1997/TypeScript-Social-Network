import React from 'react';
import classes from './MyPosts.module.css'
import Post from './Post/Post';
import {PostsType} from '../../../Redux/Store';

type MyPostsPropsType = {
    posts: Array<PostsType>
    newPostText: string
    addPost: () => void
    addPostEl: (text: string) => void
}

function MyPosts(props: MyPostsPropsType) {


    let postsItem = props.posts.map(p => <Post key={p.id}
                                               message={p.message}
                                               likesCount={p.likesCount}/>)

    const newPostEl = React.createRef<HTMLTextAreaElement>()

    const onAddPost = () => {
        if (newPostEl.current) {
            props.addPost()
        }
    }

    const addPostEl = () => {
        if (newPostEl.current) {
            props.addPostEl(newPostEl.current?.value)
        }
    }

    return (
        <div>
            My posts
            <div>
                <textarea value={props.newPostText} ref={newPostEl} onChange={addPostEl}></textarea>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={classes.posts}>
                {postsItem}
            </div>

        </div>
    );
}

export default MyPosts;