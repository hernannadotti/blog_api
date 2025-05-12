import express from 'express';
import mongoose from 'mongoose';
import Post from './models/Post.js'; // Assuming Post.js is in a 'models' directory

const app = express();
const port = process.env.PORT || 8080; // Vercel sets PORT automatically
// Restoring the fallback URI as a safeguard
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://hernan12345:sc4r3toDoAnotherJob@blogcluster.1hqlzkd.mongodb.net/';

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
let dbConnected = false;
const connectDB = async () => {
  if (dbConnected) {
    console.log('MongoDB already connected.');
    return;
  }
  if (!mongoUri) {
    console.error('MongoDB connection error: MONGO_URI is not defined.');
    // dbConnected remains false
    return;
  }
  try {
    await mongoose.connect(mongoUri);
    dbConnected = true;
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // dbConnected remains false
  }
};

// Initial connection attempt
connectDB();

app.get('/', (req, res) => {
  res.send('Express app with MongoDB integration is running!');
});

app.get('/posts', async (req, res) => {
  if (!dbConnected) {
    console.log('No DB connection in /posts, attempting to connect...');
    await connectDB(); // Attempt to connect if not already connected
    if (!dbConnected) {
      // If still not connected after attempt, send error
      return res.status(503).send('Service unavailable: Database not connected.');
    }
  }
  try {
    const posts = await Post.find({}); // Fetch all posts
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).send('Error fetching posts from database.');
  }
});

// If not running on Vercel (i.e., locally for testing, though Vercel CLI handles this)
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

export default app;
