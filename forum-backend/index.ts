import express from 'express';
import cors from 'cors';
import config from './config';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import postRouter from './routes/posts';
import commentsRouter from './routes/comments';

const app = express();
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/users', usersRouter);
app.use('/posts', postRouter);
app.use('/comments', commentsRouter);

const run = async () => {
  await mongoose.connect(config.database);

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
