import express from 'express';
import { PostMutation } from '../types';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';
import Post from '../models/Post';
import auth, { RequestWithUser } from '../middleware/auth';

const postRouter = express.Router();

postRouter.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().populate('user', 'username').sort({ datetime: -1 });
    return res.send(posts);
  } catch (error) {
    next(error);
  }
});

postRouter.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'username');

    if (post === null) {
      return res.status(404).send({ error: 'Post not found' });
    }

    return res.send(post);
  } catch (error) {
    next(error);
  }
});

postRouter.post('/', imagesUpload.single('image'), auth, async (req: RequestWithUser, res, next) => {
  try {
    const PostMutation: PostMutation = {
      title: req.body.title,
      description: req.body.description || null,
      image: req.file ? req.file.filename : null,
      user: req.user?._id,
      datetime: new Date(),
    };

    if (!req.body.title) {
      return res.status(400).send({ error: 'Title is required!' });
    }

    if (!req.user) {
      return res.status(401).send({ error: 'User not found' });
    }

    const post = new Post(PostMutation);
    await post.save();

    return res.send(post);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

export default postRouter;
