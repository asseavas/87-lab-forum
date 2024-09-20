import { Post } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createPost, fetchOnePost, fetchPosts } from './postsThunks';

export interface PostsState {
  items: Post[];
  onePost: Post | null;
  itemsFetching: boolean;
  oneFetching: boolean;
  isCreating: boolean;
}

const initialState: PostsState = {
  items: [],
  onePost: null,
  itemsFetching: false,
  oneFetching: false,
  isCreating: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.itemsFetching = true;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload: posts }) => {
        state.itemsFetching = false;
        state.items = posts;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.itemsFetching = false;
      });

    builder
      .addCase(createPost.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createPost.rejected, (state) => {
        state.isCreating = false;
      });

    builder
      .addCase(fetchOnePost.pending, (state) => {
        state.onePost = null;
        state.oneFetching = true;
      })
      .addCase(fetchOnePost.fulfilled, (state, { payload: post }) => {
        state.onePost = post;
        state.oneFetching = false;
      })
      .addCase(fetchOnePost.rejected, (state) => {
        state.oneFetching = false;
      });
  },
  selectors: {
    selectPosts: (state) => state.items,
    selectPostsFetching: (state) => state.itemsFetching,
    selectPostCreating: (state) => state.isCreating,
    selectOnePost: (state) => state.onePost,
    selectOnePostFetching: (state) => state.oneFetching,
  },
});

export const postsReducer = postsSlice.reducer;

export const { selectPosts, selectPostsFetching, selectPostCreating, selectOnePost, selectOnePostFetching } =
  postsSlice.selectors;
