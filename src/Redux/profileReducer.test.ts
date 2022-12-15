import {deletePost, ProfileComponentType, profileReducer} from "./profileReducer";

let initialState: ProfileComponentType = {
    posts: [
        {id: 1, message: 'Hello, my name is Ilya', likesCount: 34},
        {id: 2, message: 'Hey, it is my second post', likesCount: 12},
        {id: 3, message: 'Sorry for my english', likesCount: 105},
        {id: 4, message: 'I love your likes', likesCount: 65},
    ],
    profile: null,
    status: '',
};

test('post should be deleted', () => {

    const action = deletePost(4);

    const newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(3);
    expect(newState.posts[2].message).toBe('Sorry for my english');
});