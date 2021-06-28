import React from 'react';
import {AddPostActionCreator, AddPostElActionCreator, PostsType} from '../../../Redux/profileReducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {RootReduxState} from '../../../Redux/redux-store';

type mapStateToPropsType = {
    posts: Array<PostsType>
    newPostText: string
}

type mapDispatchToPropsType = {
    addPost: () => void
    addPostEl: (text: string) => void
}

// function MyPostsContainer(props: MyPostsPropsType) {
//
//     let posts = props.store.getState().profileComponent.posts;
//     let newPostText = props.store.getState().profileComponent.newPostText
//
//
//     const addPost = () => {
//         props.store.dispatch(AddPostActionCreator())
//     }
//
//     const addPostEl = (text: string) => {
//         if (text) {
//             props.store.dispatch(AddPostElActionCreator(text))
//         }
//     }
//
//     return (
//         <MyPosts
//             posts={posts}
//             newPostText={newPostText}
//             addPost={addPost}
//             addPostEl={addPostEl}/>
//     );
// }




let mapStateToProps = (state: RootReduxState): mapStateToPropsType => {
    debugger
    return {
        posts: state.profileComponent.posts,
        newPostText: state.profileComponent.newPostText,
    }
}

let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        addPost: () => {
            dispatch(AddPostActionCreator())
        },
        addPostEl: (text: string) => {
            dispatch(AddPostElActionCreator(text))
        }

    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;