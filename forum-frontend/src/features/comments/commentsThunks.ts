import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Comment, CommentMutation } from '../../types';
import { RootState } from '../../app/store';

export const fetchComments = createAsyncThunk<Comment[], string>('comments/fetchAll', async (id) => {
  const { data: comments } = await axiosApi.get<Comment[]>(`/comments?post=${id}`);
  return comments;
});

export const createComment = createAsyncThunk<void, CommentMutation, { state: RootState }>(
  'comments/create',
  async (payload, { getState }) => {
    const token = getState().users.user?.token;

    if (!token) {
      throw new Error('No token found');
    }

    const { post, text } = payload;

    const commentMutation = {
      post: post,
      text,
    };

    await axiosApi.post('/comments', commentMutation, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
);
