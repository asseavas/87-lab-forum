import React from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid2, Typography } from '@mui/material';
import { Post } from '../../../types';
import textMessage from '../../../assets/images/text-message.webp';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../constants';

interface Props {
  post: Post;
}

const PostItem: React.FC<Props> = ({ post }) => {
  let cardImage = textMessage;

  if (post.image) {
    cardImage = `${API_URL}/${post.image}`;
  }

  return (
    <Grid2 size={10}>
      <Card sx={{ display: 'flex', width: '100%', borderRadius: '10px' }}>
        <CardMedia image={cardImage} sx={{ width: '400px', height: '160px' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, width: '100%' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography variant="subtitle1" component="div" sx={{ color: 'text.secondary' }}>
              {dayjs(post.datetime).format('DD.MM.YYYY HH:mm')} by {post.user.username}
            </Typography>
            <Typography component="div" variant="h6" sx={{ fontWeight: 'bold' }} mt={5}>
              {post.title}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              marginTop: 'auto',
              paddingInline: '20px',
            }}
          >
            <Button component={Link} to={`/posts/${post._id}`}>
              Read in full
            </Button>
          </CardActions>
        </Box>
      </Card>
    </Grid2>
  );
};

export default PostItem;
