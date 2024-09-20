import { Comment } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createComment, fetchComments } from './commentsThunks';

export interface CommentsState {
  items: Comment[];
  itemsFetching: boolean;
  isCreating: boolean;
}

const initialState: CommentsState = {
  items: [],
  itemsFetching: false,
  isCreating: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.itemsFetching = true;
      })
      .addCase(fetchComments.fulfilled, (state, { payload: comments }) => {
        state.itemsFetching = false;
        state.items = comments;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.itemsFetching = false;
      });

    builder
      .addCase(createComment.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createComment.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createComment.rejected, (state) => {
        state.isCreating = false;
      });
  },
  selectors: {
    selectComments: (state) => state.items,
    selectCommentsFetching: (state) => state.itemsFetching,
    selectCommentsCreating: (state) => state.isCreating,
  },
});

export const commentsReducer = commentsSlice.reducer;

export const { selectComments, selectCommentsFetching, selectCommentsCreating } = commentsSlice.selectors;
