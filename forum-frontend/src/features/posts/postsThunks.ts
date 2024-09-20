import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post, PostMutation } from '../../types';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';

export const fetchPosts = createAsyncThunk<Post[]>('posts/fetchAll', async () => {
  const { data: posts } = await axiosApi.get<Post[]>('/posts');
  return posts;
});

export const fetchOnePost = createAsyncThunk<Post, string>('posts/fetchOne', async (id) => {
  const { data: post } = await axiosApi.get<Post>(`/posts/${id}`);
  return post;
});

export const createPost = createAsyncThunk<void, PostMutation, { state: RootState }>(
  'posts/create',
  async (PostMutation, { getState }) => {
    const token = getState().users.user?.token;

    if (!token) {
      throw new Error('No token found');
    }

    await axiosApi.post('/comments', PostMutation, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
);
