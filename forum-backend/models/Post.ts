import mongoose, { HydratedDocument, Schema } from 'mongoose';
import { PostFields } from '../types';

const PostSchema = new mongoose.Schema<PostFields>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    validate: {
      async validator(value: string) {
        const currentDocument = this as HydratedDocument<PostFields>;
        return !!(value || currentDocument.image);
      },
      message: 'Either description or image must be present!',
    },
  },
  image: {
    type: String,
    validate: {
      async validator(value: string) {
        const currentDocument = this as HydratedDocument<PostFields>;
        return !!(value || currentDocument.description);
      },
      message: 'Either description or image must be present!',
    },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
});

const Post = mongoose.model('Post', PostSchema);

export default Post;
