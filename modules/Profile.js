const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = require('./Post');



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
    posts: [Post]
});
    
module.exports = Profile = mongoose.model('profile', ProfileSchema);
