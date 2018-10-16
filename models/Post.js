const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    body: {
       type: String,
       required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

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
    comments: [CommentSchema],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]
});

module.exports = Comment = mongoose.model('comment', CommentSchema);
module.exports = Post = mongoose.model('posts', PostSchema);
