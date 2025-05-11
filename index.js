"use client";

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
  .then(() => {
    console.log('Connected now to MongoDB');
    // Start the server only after the database connection is successful
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    // Optionally, exit the process if the database connection fails
    // process.exit(1); 
  });

// Route to get all posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
});

// Assuming the /blog/:slug route was also intended to be kept
// If it was removed intentionally, this part can be omitted.
// If you have the content of models/Post.js, I can verify if findById is appropriate.
// For now, I'm re-adding a generic version of it.
app.get('/blog/:slug', async (req, res) => {
  try {
    // This assumes 'slug' is the ID. If it's a different field, adjust Post.findOne({ slug: req.params.slug })
    const post = await Post.findById(req.params.slug); 
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error retrieving post by slug:', error);
    res.status(500).json({ message: 'Error retrieving the post', error: error.message });
  }
});

export default app;
