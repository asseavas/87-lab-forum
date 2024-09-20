import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Post from './models/Post';
import Comment from './models/Comment';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;
  try {
    await db.dropCollection('posts');
    await db.dropCollection('comments');
    await db.dropCollection('users');
  } catch (error) {
    console.log('Skipping drop...');
  }

  const johnDoe = new User({
    username: 'John Doe',
    password: '1nkn$jb',
  });

  const annyMay = new User({
    username: 'Anny May',
    password: '5nd9$ld',
  });

  johnDoe.generateToken();
  await johnDoe.save();

  annyMay.generateToken();
  await annyMay.save();

  const [post1, post2, post3, post4] = await Post.create(
    {
      title: 'The Future of AI in Everyday Life',
      description:
        'Artificial intelligence is becoming an integral part of our daily routines. From virtual assistants to personalized recommendations, AI is enhancing how we interact with technology. But what does the future hold? In this post, we explore potential advancements in AI and how they might shape the way we live, work, and communicate.',
      image: null,
      user: johnDoe,
      datetime: new Date(),
    },
    {
      title: 'Why Minimalism Is More Than Just a Trend',
      description:
        'Minimalism isn’t just about decluttering your space—it’s a mindset that promotes intentional living. By focusing on what truly matters, minimalists find more time, energy, and happiness in everyday life. Discover why this lifestyle choice is becoming more popular and how you can start simplifying today.',
      image: 'fixtures/minimalism.avif',
      user: johnDoe,
      datetime: new Date(),
    },
    {
      title: 'Exploring the Mysteries of the Deep Ocean',
      description:
        "Despite covering over 70% of the Earth's surface, the ocean remains largely unexplored. Recent discoveries reveal strange and fascinating creatures living in its depths. This post takes a deep dive into the mysteries of the ocean and what scientists hope to uncover in the future.",
      image: 'fixtures/ocean.jpg',
      user: annyMay,
      datetime: new Date(),
    },
    {
      title: 'The Rise of Remote Work: A Permanent Shift?',
      description:
        'The pandemic accelerated the adoption of remote work, but is it here to stay? Many companies are embracing flexible work environments, while others push for a return to the office. We discuss the benefits, challenges, and long-term implications of remote work in a post-pandemic world.',
      image: 'fixtures/remote-work.jpg',
      user: annyMay,
      datetime: new Date(),
    },
  );

  await Comment.create(
    {
      user: johnDoe,
      post: post3,
      text: "The deep ocean is so fascinating! It's incredible to think that we know more about space than our own oceans. I recently read about those bioluminescent creatures—they look like something out of a sci-fi movie! I hope we continue to explore and learn more about these mysterious depths.",
      datetime: new Date(),
    },
    {
      user: annyMay,
      post: post1,
      text: "AI is advancing so quickly! It's amazing how much it already impacts our daily lives, and I can't wait to see what's next. The possibilities seem endless.",
      datetime: new Date(),
    },
    {
      user: johnDoe,
      post: post4,
      text: "Remote work has definitely changed the game. It's great for flexibility, but I wonder how it will affect teamwork long-term. Finding the right balance is going to be key!",
      datetime: new Date(),
    },
    {
      user: johnDoe,
      post: post4,
      text: "Remote work is a game-changer! It'll be interesting to see if it's here to stay long-term.",
      datetime: new Date(),
    },
    {
      user: annyMay,
      post: post2,
      text: "Minimalism really changes how we see our stuff! It's refreshing to focus on what truly matters. I'm inspired to declutter my space!",
      datetime: new Date(),
    },
  );

  await db.close();
};

run().catch(console.error);
