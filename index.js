import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import Post from './models/Post.js';

config()

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error('MONGO_URI is not defined in the environment variables');
    process.exit(1);
}

mongoose.connect(mongoUri).then(() => {
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
});

app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        if (!posts.length) {
            console.log('No posts found in the database.');
            return res.status(404).json({ message: 'No posts found' });
        }
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})