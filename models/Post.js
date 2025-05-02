import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
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
    }
}, { collection: 'posts' });

const Post = mongoose.model('Post', postSchema);

export default Post;