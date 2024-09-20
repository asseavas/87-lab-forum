import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CardMedia, CircularProgress, Grid2, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { fetchComments } from '../comments/commentsThunks';
import Comments from '../comments/Comments';
import textMessage from '../../assets/images/text-message.webp';
import { selectOnePost, selectOnePostFetching } from './postsSlice';
import { fetchOnePost } from './postsThunks';

const OnePost = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const onePost = useAppSelector(selectOnePost);
  const isFetching = useAppSelector(selectOnePostFetching);

  let cardImage = textMessage;

  if (onePost?.image) {
    cardImage = `http://localhost:8000/${onePost.image}`;
  }

  useEffect(() => {
    dispatch(fetchOnePost(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  return (
    <Grid2 container spacing={4} mt={4}>
      <Grid2 size={6}>
        {isFetching && (
          <Grid2>
            <CircularProgress />
          </Grid2>
        )}
        {onePost && (
          <Grid2 container spacing={2} direction="column">
            <Grid2>
              <CardMedia
                component="img"
                sx={{ width: '100%', height: '300px', borderRadius: '10px' }}
                image={cardImage}
                alt={onePost.title}
              />
            </Grid2>
            <Grid2 component={Typography}>
              <span style={{ fontWeight: 'bold' }}>{onePost.user.username}</span>{' '}
              <span style={{ color: 'grey' }}>{dayjs(onePost.datetime).format('DD.MM.YYYY HH:mm')}</span>
            </Grid2>
            <Grid2 component={Typography} variant="h4" fontWeight={'bold'}>
              {onePost.title}
            </Grid2>
            <Grid2 component={Typography} sx={{ borderTop: '1px solid rgba(80, 80, 80, 0.7)', pt: 2, mt: 1 }}>
              {onePost.description}
            </Grid2>
          </Grid2>
        )}
      </Grid2>
      <Grid2 size={6}>
        <Comments id={id} />
      </Grid2>
    </Grid2>
  );
};

export default OnePost;
