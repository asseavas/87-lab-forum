import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPostCreating } from './postsSlice';
import { PostMutation } from '../../types';
import { createPost } from './postsThunks';
import { Container, Grid2, Typography } from '@mui/material';
import PostForm from './components/PostForm';
import { toast } from 'react-toastify';
import { selectUser } from '../users/usersSlice';

const NewPost = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectPostCreating);
  const user = useAppSelector(selectUser);

  if (!user) {
    return <Navigate to="/" />;
  }

  const onFormSubmit = async (postMutation: PostMutation) => {
    try {
      await dispatch(createPost(postMutation));
      navigate('/');
    } catch (error) {
      toast.error('The post was not created!');
    }
  };

  return (
    <Container maxWidth="md">
      <Grid2 container direction="column" mt={4}>
        <Grid2>
          <Typography variant="h4" mb={4} fontWeight="bold">
            New post
          </Typography>
        </Grid2>
        <Grid2 justifyContent="space-between">
          <PostForm onSubmit={onFormSubmit} isLoading={isCreating} />
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default NewPost;
