import { Button, styled } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';

export const API_URL = 'http://localhost:8000';

export const StyledToolbarLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
  fontSize: '30px',
  fontWeight: 'bolder',
});

export const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  height: '40px',
  padding: '6px 14px',
  borderRadius: '6px',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#0d569e',
  },
});

export const StyledButton = styled(Button)({
  color: 'inherit',
  textTransform: 'none',
  fontSize: '16px',
  height: '40px',
  padding: '6px 14px',
  borderRadius: '6px',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#0d569e',
  },
});

export const StyledNavLink = styled(NavLink)({
  color: 'inherit',
  textTransform: 'none',
  textDecoration: 'none',
  fontSize: '16px',
  height: '40px',
  padding: '6px 14px',
  borderRadius: '6px',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#0d569e',
  },
});
