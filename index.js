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
  .then(() => console.log('Connected now to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Route to get all posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
