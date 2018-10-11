const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    body: {
       type: string,
       required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const PostSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    mediaUrl: {
        type: string,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    comments: [CommentSchema],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]
});

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    website:{
        type: String,
        required: false
    },
    bio: {
        type : String,
        required: false
    },
    avatar: {
        type : String,
        required: false
    },
    followers: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }],
    following: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }],
    posts: [PostSchema]
});
    
module.exports = Profile = mongoose.model('profile', ProfileSchema);
