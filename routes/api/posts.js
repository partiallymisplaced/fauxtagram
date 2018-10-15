
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

// @route   GET api/posts
// @desc    Get the specified user and all its posts.
// @access  Private
router.get('/',
  (req,res) => {
    let errors = {};
    Profile.findOne({user: req.query.userId})
      .populate('user', ['username'])
      .populate('posts')
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(400).json(err));
  }
)

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

    new Post(postFields)
    .save()
    .then(createdPost => {
      Profile.findOne({user: req.user.id})
        .then(profile => {
          if (profile) {
            profile.posts.push(createdPost._id);
            profile.save().then(profile => res.json(profile));

          } else {
              errors.noprofile = 'Profile not found.';
              return res.status(404).json(errors);
          }
        });
    });
  }
)

module.exports = router;