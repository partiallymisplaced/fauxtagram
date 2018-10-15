// Express
const express = require('express');
const router = express.Router();

// Bcrypt.js
const bcrypt = require('bcryptjs');

// JSON web token
const jwt = require('jsonwebtoken');

// Passport
const passport = require('passport');

// Keys
const keys = require('../../keys');

// Validate inputs
const validateSignupInput = require('../../validation/signup');
const validateLoginInput = require('../../validation/login');

// Imports User model
const User = require('../../models/User');

// @route   POST api/users/signup
// @desc    Enables user signup
// @access  Public

// Checks if user exists by username 
// TODO:    Check if user exists by email, username or phone number
router.post('/signup', (req, res) => {
    // Validates input before passing onto form
    const {errors, isValid} = validateSignupInput(req.body);
    if (!isValid){
        return res.status(400).json(errors);
    }
  
    const username = req.body.username;
    const email = req.body.email;

    User.findOne({ $or: [{ username: username }, { email: email }] })
    .then(user => {
            if(user){
                return res.status(400).json({
                    username: "Email or username is already taken."

                })
            } else {
                const newUser = new User({
                    email: req.body.email,
                    mobileNumber: req.body.mobileNumber,
                    fullName: req.body.fullName,
                    username: req.body.username,
                    password: req.body.password
                });
                
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) { console.log(err); throw err; }
                    bcrypt.hash(newUser.password, salt, 
                        (err, hash) => {
                            if (err) { console.log(err); throw err; }
                            newUser.password = hash;
                            newUser.save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err));
                            console.log("Saved user");
                        }) 
                });
            }
        })
        .catch(err => console.log(err));
})

// @route   POST api/users/login
// @desc    Enables user login
// @access  Public

router.post('/login', (req, res) => {
    // Validates input before passing onto form
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username})
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    user: "Username not found"
                });
            } else {
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch){
                            const payload = {
                                id: user.id, 
                                username: user.username,
                                email: user.email
                            };
                            jwt.sign(
                                payload,
                                keys.secretOrKey,{
                                     expiresIn: '1h'
                             }, (err, token) => {
                                    if (err) {
                                        throw err
                                    } else {
                                        res.json({
                                            success: true,
                                            token: 'Bearer ' + token
                                        });
                                    }
                                }
                            );

                        } else {
                            return res.status(400).json({
                                password: "Password incorrect"
                            });
                        }
                    })
            }
        })
})


// @route   GET api/users/current
// @desc    Returns current user data
// @access  Private || Protected

router.get('/current', 
    passport.authenticate('jwt', {
        session: false
    }), (req, res) => {
        res.json({
            id: req.user.id,
            username: req.user.username,
            email: req.user.email,
            fullName: req.user.fullName,
            mobileNumber: req.user.mobileNumber
        });
    });

module.exports = router;