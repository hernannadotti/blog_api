import express from 'express';
import mongoose from 'mongoose';
import Post from './models/Post.js'; // Assuming Post.js is in a 'models' directory

const app = express();
const port = process.env.PORT || 8080; // Vercel sets PORT automatically
const mongoUri = process.env.MONGO_URI;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
let dbConnected = false;
const connectDB = async () => {
  if (dbConnected) return;
  try {
    await mongoose.connect(mongoUri);
    dbConnected = true;
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // Exit process with failure in a server environment if DB connection is critical at startup
    // For serverless, we might want to allow the function to attempt connection on each invocation
    // or handle errors gracefully per request.
    // For now, we'll log the error and subsequent requests might fail if DB is needed.
  }
};

// Ensure DB is connected before handling requests that need it.
// For Vercel, this connection might happen on each cold start.
// A more robust approach for serverless might involve connecting on demand.
connectDB();

app.get('/', (req, res) => {
  res.send('Express app with MongoDB integration is running!');
});

app.get('/posts', async (req, res) => {
  if (!dbConnected) {
    // Attempt to reconnect if not connected.
    await connectDB();
    if (!dbConnected) {
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
