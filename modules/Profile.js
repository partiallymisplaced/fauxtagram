const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }],
    following: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }],
    posts: [{
        postId: {
            type: Schema.Types.ObjectId,
            ref: 'posts'
        }
    }]
});
    
module.exports = Profile = mongoose.model('profile', ProfileSchema);
