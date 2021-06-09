import React from 'react';
import classes from './MyPosts.module.css'
import Post from './Post/Post';
import {PostsType} from '../../../Redux/State';

type MyPostsPropsType = {
    posts: Array<PostsType>
    addPost: () => void
    changePostEL: (el: string) => void
    newPostText: string
}
function MyPosts(props: MyPostsPropsType) {


    let postsItem = props.posts.map( p => <Post key={p.id}
                                                message={p.message}
                                                likesCount={p.likesCount}/> )

    const newPostEl = React.createRef<HTMLTextAreaElement>()

    const addPost = () => {
        if (newPostEl.current) {
            props.addPost()
        }
    }

    const onPostChange = () => {
        if (newPostEl.current) {
            props.changePostEL(newPostEl.current?.value)
        }
    }

    return (
        <div>
            My posts
            <div>
                <textarea value={props.newPostText} ref={newPostEl} onChange={onPostChange}></textarea>
                <div>
                    <button onClick={ addPost }>Add post</button>
                </div>
            </div>
            <div className={classes.posts}>
                { postsItem }
            </div>

        </div>
    );
}

export default MyPosts;