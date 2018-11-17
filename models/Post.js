const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    username:{
        type: String,
    },
    avatar: {
        type: String,
        ref: 'profile'
    },
    url: {
        type: String,
        required: true
    },
    comment: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }],
    comments: [{
        type: Schema.Types.ObjectId, 
        ref: 'comments'
    }]

});

module.exports = Post = mongoose.model('posts', PostSchema);
