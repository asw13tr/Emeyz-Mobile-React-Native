import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    post: {},
    postListActive: false
}

const Post = createSlice({
    name: "post",
    initialState,
    reducers: {

        setPosts(state, action){
            if(action.payload.reset===true){
                state.posts = (action.payload.posts || [])
            }else{
                state.posts = state.posts.concat(action.payload.posts)
            }
        },
        setPost(state, action){
            state.post = action.payload
        },
        setPostListActive(state, action){
            state.postListActive = action.payload
        }
    }
})


export const {setPosts, setPost, setPostListActive} = Post.actions;
export default Post.reducer;
