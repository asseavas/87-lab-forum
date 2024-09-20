import React from 'react';
import { Grid2, Typography } from '@mui/material';
import { User } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/users/usersThunks';
import { StyledButton, StyledLink } from '../../constants';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Grid2 container alignItems="center" spacing={4}>
      <Grid2 component={Typography} variant="h6">
        Hello, {user.username}!
      </Grid2>
      <Grid2 container spacing={1} alignItems="center">
        <Grid2 component={StyledLink} to="/posts/new">
          Add new post
        </Grid2>
        <Grid2 component={StyledButton} variant="outlined" color="white" onClick={handleLogout}>
          Logout
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default UserMenu;
