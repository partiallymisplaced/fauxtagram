const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profile = require('../../modules/Profile');

// @route   GET api/profile
// @desc    Get current user profile
// @access  Private
router.get('/', passport.authenticate('jwt', {session: false}),
  (req,res) => {
    let errors = {};
    Profile.findOne({user: req.user.id})
      .populate('user', ['username'])
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

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.avatar) profileFields.handle = req.body.avatar;

    Profile.findOne({user: req.user.id})
      .then(profile => {
        if (profile) {
          //Update
          Profile.findOneAndUpdate(
            {user: req.user.id},
            {$set: profileFields},
            {new: true}
          ).then(profile => res.json(profile));
        } else {
            //Create
            new Profile(profileFields)
                .save()
                .then(profile => res.json(profile));
        }
      });
  })

// @route   POST api/profile/follow
// @desc    Create or edit user profile
// @access  Private
router.post('/follow', passport.authenticate('jwt', {session: false}),
  (req, res) => {
    let errors = {};
    
    if (!req.body.userIdToFollow) {
        errors.noprofile = 'A user to follow must be specified.';
        return res.status(400).json(errors);
    }

    // Add to current user's following array
    Profile.findOne({user: req.user.id})
      .then(profile => {
        if (profile) {
          profile.following
          .insert({userId: req.body.userIdToFollow})
          .then(profile => res.json(profile));
        } else {
            errors.noprofile = 'Profile not found.';
            return res.status(404).json(errors);
        }
      });

      // Add to followers array of user being followed.
      Profile.findOne({user: req.body.userIdToFollow})
        .then(profile => {
          if (profile) {
            profile.followers
            .insert({userId: req.user.id});
          } else {
              errors.noprofile = 'Profile not found.';
              return res.status(404).json(errors);
          }
        });
  }
)

module.exports = router;