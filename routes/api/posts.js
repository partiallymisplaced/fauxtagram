const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const validatePostInput = require('../../validation/post');


// @route   GET api/posts
// @desc    Get the specified user and all its posts.
// @access  Private
// router.get('/',
//   (req,res) => {
//     let errors = {};
//     Profile.findOne({user: req.query.userId})
//       .populate('user', ['username'])
//       .populate('posts')
//       .then(profile => {
//         if (!profile) {
//           errors.noprofile = 'There is no profile for this user';
//           return res.status(404).json(errors);
//         }
//         res.json(profile);
//       })
//       .catch(err => res.status(400).json(err));
//   }
// )

router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
});

// @route   POST api/posts/
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      user: req.user.id,
      username: req.user.username,
      // avatar: req.profile.avatar,
      url: req.body.url,
      comment: req.body.comment,
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route   DELETE api/posts/
// @desc    Create or edit user profile
// @access  Private
router.delete('/', passport.authenticate('jwt', {session: false}),
  (req, res) => {
    let errors = {};
    
    if (!req.body.postIdToDelete) {
        errors.missingPostIdToDelete = 'A post ID to delete must be specified.';
        return res.status(400).json(errors);
    }

    Profile.findOne({user: req.user.id})
    .then(myProfile => {
      let indexOfPost = myProfile.posts.indexOf(req.body.postIdToDelete);
      if (indexOfPost > -1) {
        myProfile.posts.splice(indexOfPost, 1);
        myProfile.save()
        .then(() => {
          Post.findByIdAndRemove(req.body.postIdToDelete)
          .then((err, deletedPost) => {
            if (deletedPost){
              res.status(204);
            }
            else{
              return res.status(404).json(err);
            }
          });
        });
      }
      else{
        errors.noprofile = 'Post was not found or does not belong to current user.';
        return res.status(404).json(errors);  }
    });
  }
)
  
// @route   POST api/posts/:postId/comment
// @desc    Enables adding comments to posts  
// @access  Private

router.post(
  '/:postId/comment',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Post.findById(req.params.postId)
    .then(post => {
      const newComment = new Comment({
        author: req.user.id,
        body: req.body.body,
      })
      post.comments.push(newComment);
      post.save()
        .then(post => res.json(post))
    })
    .catch(err => console.log(err));
  }
)

// @route   DELETE api/posts/:postId/:commentId
// @desc    Enables deleting of comments to posts
// @access  Private

router.delete(
  '/:postId/:commentId',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    let errors = {};

    if (!req.params.postId){
      errors.missingPostId = 'A post ID must have a media file.';
      return res.status(400).json(errors);
    }

    if (!req.params.postId){
      errors.missingPostId = 'A comment ID must have a media file.';
      return res.status(400).json(errors);
    }

    Post
    .update({"_id": req.params.postId}, { $pull: {"comments": { "_id": req.params.commentId}}})
    .exec()
    .then(updateInfo => {
      res.json(updateInfo);
    })
    .catch(err => console.log(err));      
  }
)

// @route   POST api/posts/like
// @desc    Follow a user
// @access  Private
router.post('/like', passport.authenticate('jwt', {session: false}),
  (req, res) => {
    let errors = {};
    
    if (!req.body.likedPostId) {
        errors.noLikedPostId = 'A likedPostId must be specified.';
        return res.status(400).json(errors);
    }

    Post.findById(req.body.likedPostId)
      .then(foundPost => {
        if (foundPost) {
          var indexOfExistingLike = foundPost.likes.indexOf(req.user.id);
          if (indexOfExistingLike < 0) {
            foundPost.likes.push(req.user.id);
            foundPost.save()
            .then(foundPost2 => {
              res.json(foundPost)
            });
          }
          else{
            res.json(foundPost)
          }
        } else {
            errors.noprofile = 'Post not found.';
            return res.status(404).json(errors);
        }
      });
  }
)

// @route   POST api/posts/unlike
// @desc    Follow a user
// @access  Private
router.post('/unlike', passport.authenticate('jwt', {session: false}),
  (req, res) => {
    let errors = {};
    
    if (!req.body.unlikedPostId) {
        errors.noUnlikedPostId = 'An unlikedPostId must be specified.';
        return res.status(400).json(errors);
    }

    Post.findById(req.body.unlikedPostId)
      .then(foundPost => {
        if (foundPost) {
          var indexOfExistingLike = foundPost.likes.indexOf(req.user.id);
          if (indexOfExistingLike > -1) {
            foundPost.likes.splice(indexOfExistingLike, 1);
            foundPost.save()
            .then(foundPost2 => {
              res.json(foundPost)
            });
          }
          else{
            res.json(foundPost)
          }
        } else {
            errors.noprofile = 'Post not found.';
            return res.status(404).json(errors);
        }
      });
  }
)

module.exports = router;