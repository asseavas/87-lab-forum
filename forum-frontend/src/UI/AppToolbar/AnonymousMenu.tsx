import { Grid2 } from '@mui/material';
import { StyledNavLink } from '../../constants';

const AnonymousMenu = () => {
  return (
    <Grid2>
      <StyledNavLink to="/register">Sign up</StyledNavLink>
      <StyledNavLink to="/login">Sign in</StyledNavLink>
    </Grid2>
  );
};

export default AnonymousMenu;
