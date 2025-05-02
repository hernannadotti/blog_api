const mongoose = require('mongoose');
const Post = require('../models/Post');

const mongoUri = process.env.MONGO_URI;

let isConnected = false;

async function connectToDatabase() {
    if (!isConnected) {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
    }
}

exports.handler = async (event, context) => {
    
    try {
        await connectToDatabase();
        const posts = await Post.find();
        return {
            statusCode: 200,
            body: JSON.stringify(posts),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};