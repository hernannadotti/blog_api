import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: () => Date.now()
    },
    excerpt: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    upVotes: {
        type: Number,
        default: 0
    },
    downVotes: {
        type: Number,
        default: 0
    }
}, { collection: 'posts' });

const Post = mongoose.model('Post', postSchema);

export default Post;
