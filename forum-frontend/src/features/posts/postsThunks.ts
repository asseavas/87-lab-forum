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
  async (postMutation, { getState }) => {
    const token = getState().users.user?.token;

    if (!token) {
      throw new Error('No token found');
    }

    const formData = new FormData();

    const keys = Object.keys(postMutation) as (keyof PostMutation)[];
    keys.forEach((key) => {
      const value = postMutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/posts', formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
);
