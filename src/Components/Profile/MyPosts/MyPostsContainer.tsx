import { AddPostActionCreator, PostsType } from 'src/Redux/profileReducer';
import MyPosts from 'src/Components/Profile/MyPosts/MyPosts';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootReduxState } from 'src/Redux/redux-store';

type mapStateToPropsType = {
  posts: Array<PostsType>
}

type mapDispatchToPropsType = {
  addPost: (post: string) => void
}

let mapStateToProps = (state: RootReduxState): mapStateToPropsType => {
  return {
    posts: state.profileComponent.posts,
  };
};

let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
  return {
    addPost: (post: string) => {
      dispatch(AddPostActionCreator(post));
    },
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;