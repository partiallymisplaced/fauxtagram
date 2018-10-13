
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

// @route   POST api/posts/
// @desc    Create or edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}),
  (req, res) => {
    let errors = {};
    
    if (!req.body.mediaUrl) {
        errors.noprofile = 'A post must have a media file.';
        return res.status(400).json(errors);
    }

    const postFields = {};
    postFields.mediaUrl = req.body.mediaUrl;

    let createdPostId;
    new Post(profileFields)
    .save()
    .then(createdPost => createdPostId = createdPost._id);

    Profile.findOne({user: req.user.id})
      .then(profile => {
        if (profile) {
          profile.posts
          .insert({postId: createdPostId})
          .then(profile => res.json(profile));

        } else {
            errors.noprofile = 'Profile not found.';
            return res.status(404).json(errors);
        }
      });
  }
)

module.exports = router;