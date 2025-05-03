import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Post from './models/Post.js';


const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT || 8080;

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));



app.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

app.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the post', error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});







