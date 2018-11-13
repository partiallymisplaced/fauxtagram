const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    mediaUrl: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    comments: [{
        type: Schema.Types.ObjectId, 
        ref: 'comments'
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]
});

module.exports = Post = mongoose.model('posts', PostSchema);
