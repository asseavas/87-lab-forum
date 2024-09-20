import { useEffect } from 'react';
import { CircularProgress, Grid2, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPosts, selectPostsFetching } from './postsSlice';
import { fetchPosts } from './postsThunks';
import PostItem from './components/PostItem';

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const isFetching = useAppSelector(selectPostsFetching);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Grid2 container direction="column" spacing={2} sx={{ pb: 3 }}>
      <Grid2 container spacing={1}>
        {isFetching ? (
          <Grid2 container sx={{ justifyContent: 'center' }}>
            <CircularProgress />
          </Grid2>
        ) : (
          <Grid2 container sx={{ mt: 3 }} spacing={2} justifyContent="center">
            {posts.length !== 0 ? (
              posts.map((post) => <PostItem key={post._id} post={post} />)
            ) : (
              <Typography
                variant="h6"
                color="text.secondary"
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: '15%',
                }}
              >
                No posts
              </Typography>
            )}
          </Grid2>
        )}
      </Grid2>
    </Grid2>
  );
};

export default Posts;
