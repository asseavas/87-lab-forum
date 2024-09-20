import { CircularProgress, Grid2, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectComments, selectCommentsCreating, selectCommentsFetching } from './commentsSlice';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { createComment, fetchComments } from './commentsThunks';
import { CommentMutation } from '../../types';
import { selectUser } from '../users/usersSlice';
import { LoadingButton } from '@mui/lab';
import CommentItem from './components/CommentItem';
import { toast } from 'react-toastify';

interface Props {
  id: string;
}

export const emptyState: CommentMutation = {
  post: '',
  text: '',
};

const Comments: React.FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<CommentMutation>(emptyState);
  const [error, setError] = useState<string | null>(null);
  const comments = useAppSelector(selectComments);
  const commentsFetching = useAppSelector(selectCommentsFetching);
  const commentCreating = useAppSelector(selectCommentsCreating);
  const user = useAppSelector(selectUser);

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (!state.text.trim()) {
        setError('Text cannot be empty or just whitespace.');
        return;
      }
      setError(null);
      await dispatch(createComment({ post: id, text: state.text })).unwrap();
      await dispatch(fetchComments(id));
      setState(emptyState);
    } catch (error) {
      toast.error('The comment was not created!');
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Grid2 container direction="column" spacing={2}>
      {user && (
        <Grid2 container direction="column">
          <Grid2 component={Typography} variant="h5">
            Add comment
          </Grid2>
          <Grid2 container spacing={1} component="form" alignItems="center" onSubmit={submitFormHandler}>
            <Grid2 size={10}>
              <TextField
                required
                multiline
                label="Text"
                id="text"
                name="text"
                value={state.text}
                onChange={inputChangeHandler}
                error={!!error}
                helperText={error}
              />
            </Grid2>
            <Grid2 size={2}>
              <LoadingButton
                type="submit"
                loading={commentCreating}
                endIcon={<AddIcon />}
                variant="contained"
                sx={{ height: '53px', width: '100%' }}
              >
                Add
              </LoadingButton>
            </Grid2>
          </Grid2>
        </Grid2>
      )}
      {commentsFetching && (
        <Grid2>
          <CircularProgress />
        </Grid2>
      )}
      {comments.length !== 0 ? (
        comments.map((comment) => <CommentItem key={comment._id} comment={comment} />)
      ) : (
        <Typography
          color="text.secondary"
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '15%',
          }}
        >
          No comments
        </Typography>
      )}
    </Grid2>
  );
};

export default Comments;
