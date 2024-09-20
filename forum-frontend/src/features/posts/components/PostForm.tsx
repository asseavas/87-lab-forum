import React, { useState } from 'react';
import { Grid2, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import { PostMutation } from '../../../types';
import FileInput from '../../../UI/FileInput/FileInput';

interface Props {
  onSubmit: (post: PostMutation) => void;
  isLoading: boolean;
}

const emptyState: PostMutation = {
  title: '',
  description: '',
  image: null,
};

const PostForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [state, setState] = useState<PostMutation>(emptyState);
  const [error, setError] = useState<string | null>(null);

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!state.title.trim()) {
      setError('Title cannot be empty or just whitespace.');
      return;
    }

    if (!state.description?.trim() && !state.image) {
      setError('Either description or image must be provided.');
      return;
    }

    setError(null);
    onSubmit({ ...state });
    setState(emptyState);
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Grid2
      container
      spacing={2}
      component="form"
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      onSubmit={submitFormHandler}
    >
      <Grid2 width="100%">
        <TextField
          required
          label="Title"
          id="title"
          name="title"
          value={state.title}
          onChange={inputChangeHandler}
          error={!!error}
          helperText={error}
        />
      </Grid2>
      <Grid2 width="100%">
        <TextField
          multiline
          label="Description"
          id="description"
          name="description"
          value={state.description}
          onChange={inputChangeHandler}
        />
      </Grid2>
      <Grid2 width="100%">
        <FileInput label="Image" name="image" onChange={fileInputChangeHandler} />
      </Grid2>
      <Grid2 width="100%">
        <LoadingButton
          sx={{
            width: '100%',
            height: '45px',
            backgroundColor: error ? 'red' : 'primary.main',
            '&:hover': {
              backgroundColor: error ? 'darkred' : 'primary.dark',
            },
          }}
          type="submit"
          loading={isLoading}
          endIcon={<AddIcon />}
          variant="contained"
        >
          Add
        </LoadingButton>
      </Grid2>
    </Grid2>
  );
};

export default PostForm;
