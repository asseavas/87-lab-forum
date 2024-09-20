import { AppBar, Container, Grid2, Toolbar, Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/users/usersSlice';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';
import { StyledToolbarLink } from '../../constants';

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Container maxWidth="lg">
          <Grid2 container justifyContent="space-between" alignItems="center" spacing={5}>
            <Grid2>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <StyledToolbarLink to="/">Forum</StyledToolbarLink>
              </Typography>
            </Grid2>
            <Grid2 container>{user ? <UserMenu user={user} /> : <AnonymousMenu />}</Grid2>
          </Grid2>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
