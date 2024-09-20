import { Container, Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import AppToolbar from './UI/AppToolbar/AppToolbar';
import Login from './features/users/Login';
import Register from './features/users/Register';
import Posts from './features/posts/Posts';
import OnePost from './features/posts/OnePost';
import NewPost from './features/posts/NewPost';

const App = () => {
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Container maxWidth="lg" component="main">
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/posts/:id" element={<OnePost />} />
          <Route path="/posts/new" element={<NewPost />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
