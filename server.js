// Express
const express = require('express');
const app = express();

// Mongoose
const mongoose = require('mongoose');
const db = require('./keys').mongoURI;

// Body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Routes
const users = require('./routes/api/users');
app.use('/api/users', users);

mongoose
.connect(db)
.then(() => console.log("Connected to mongoDB."))
.catch(err => console.log(err));

// Passport
const passport = require('passport');
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Port
const port = 8989;
app.listen(port, () => console.log(`Server running on port:${port}`));