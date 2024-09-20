import express from 'express';
import Comment from '../models/Comment';
import auth, { RequestWithUser } from '../middleware/auth';
import mongoose from 'mongoose';
import { CommentMutation } from '../types';

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
  try {
    const filter: Record<string, unknown> = {};

    if (req.query.post) {
      filter.post = req.query.post;
    }
    const comments = await Comment.find(filter).populate('user', 'username').sort({ datetime: -1 });
    return res.send(comments);
  } catch (error) {
    next(error);
  }
});

commentsRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const CommentMutation: CommentMutation = {
      user: req.user?._id,
      post: req.body.post,
      text: req.body.text,
      datetime: new Date(),
    };

    if (!req.body.text || !req.body.post) {
      return res.status(400).send({ error: 'Comment text and post are required!' });
    }

    if (!req.user) {
      return res.status(401).send({ error: 'User not found' });
    }

    const comment = new Comment(CommentMutation);
    await comment.save();

    return res.send(comment);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

export default commentsRouter;
