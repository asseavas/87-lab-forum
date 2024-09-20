import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Comment } from '../../../types';

interface Props {
  comment: Comment;
}

const CommentItem: React.FC<Props> = ({ comment }) => {
  return (
    <Card sx={{ width: '100%', borderRadius: '10px' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div">
            {comment.user.username}
          </Typography>
          <Typography variant="body2" component="div" mb={2} mt={2} color="text.secondary">
            {dayjs(comment.datetime).format('DD.MM.YYYY HH:mm:ss')}
          </Typography>
        </Box>
        <Typography component="div">{comment.text}</Typography>
      </CardContent>
    </Card>
  );
};

export default CommentItem;
