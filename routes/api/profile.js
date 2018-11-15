const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profile = require('../../models/Profile');

// @route   GET api/profile
// @desc    Get current user profile
// @access  Private
router.get('/',
  passport.authenticate('jwt', { session: false }),
  (req,res) => {
    const errors = {};
    Profile.findOne({user: req.user.id})
      .populate('user', ['username'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
)

// @route   GET api/profile/all
// @desc    Gets all user profiles
// @access  Public

router.get('/all', (req, res) => {
  let errors = {};
  
  Profile.find()
  .populate('user', ['username'])
  .then(profiles => {
    if (profiles.length === 0) {
      console.log(res.status);
      errors.profiles = "No profiles found";
      return res.status(404).json(errors);
    }
    res.json(profiles);
  })
  .catch(err => res.status(404).json({profile: "No profiles available at this time"}))
})

// @route   POST api/profile                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
// @desc    Create or edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.avatar) profileFields.avatar = req.body.avatar;

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
// @desc    Follow a user
// @access  Private
router.post('/follow', passport.authenticate('jwt', {session: false}),
  (req, res) => {
    let errors = {};
    
    if (!req.body.userIdToFollow) {
        errors.noprofile = 'A user to follow must be specified.';
        return res.status(400).json(errors);
    }

    Profile.findOne({user: req.user.id})
      .then(myProfile => {
        if (myProfile) {
          myProfile.following.push(req.body.userIdToFollow);
          myProfile.save()
          .then(profile => {
            Profile.findOne({user: req.body.userIdToFollow})
            .then(profileBeingFollowed => {
              if (profileBeingFollowed) {
                profileBeingFollowed.followers.push(req.user.id);
                profileBeingFollowed.save()
                .then(updatedProfileBeingFollowed => res.json(profile));                
              } else {
                  errors.noprofile = 'Profile not found.';
                  return res.status(404).json(errors);
              }
            })
          });
        } else {
            errors.noprofile = 'Profile not found.';
            return res.status(404).json(errors);
        }
      });
  }
)

// @route   POST api/profile/unfollow
// @desc    Unfollow a user
// @access  Private
router.post('/unfollow', passport.authenticate('jwt', {session: false}),
  (req, res) => {
    let errors = {};
    
    if (!req.body.userIdToUnfollow) {
        errors.noprofile = 'A user to unfollow must be specified.';
        return res.status(400).json(errors);
    }

    Profile.findOne({user: req.user.id})
      .then(myProfile => {
        if (myProfile) {
          var indexOfFollowingToRemove = myProfile.following.indexOf(req.body.userIdToUnfollow);
          if (indexOfFollowingToRemove > -1) {
            myProfile.following.splice(indexOfFollowingToRemove, 1);
            myProfile.save()
            .then(profile => {
              Profile.findOne({user: req.body.userIdToUnfollow})
              .then(profileBeingFollowed => {
                if (profileBeingFollowed) {
                  var indexOfFollowersToRemove = profileBeingFollowed.followers.indexOf(req.user.id);
                  if (indexOfFollowersToRemove > -1) {
                    profileBeingFollowed.followers.splice(indexOfFollowersToRemove, 1);
                    profileBeingFollowed.save()
                    .then(updatedProfileBeingFollowed => res.json(profile));                
                  }
                  else{
                    res.json(profile)
                  }
                } else {
                    errors.noprofile = 'Profile not found.';
                    return res.status(404).json(errors);
                }
              })
            });  
          }
          else {
            res.json(profile)
          }
        } else {
            errors.noprofile = 'Profile not found.';
            return res.status(404).json(errors);
        }
      });
  }
)

module.exports = router;