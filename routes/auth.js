const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

// Bring in the model
const User = require('../models/User');

// Register a new user
router.post('/register', (req, res) => {

  // Check to see if user email is already in db
  User.find({ username: req.body.username })
    // user is an array
    .then(user => {
      // If there is a user with that email then return
      if(user.length >= 1) {
        return res.status(400).json({ err: 'User already exists' });
      }
      // If there is no user with that username, create new user
      else {
        
        bcrypt.hash(req.body.password, 10, (err, hashedPw) => {
          if(err) res.status(500).json({ error: err})
          else {
            const newUser = new User({
              username: req.body.username,
              password: hashedPw
            });

            newUser.save()
              .then(newUser => {
                console.log(newUser);
                res.json({ msg: 'user registered successfully', data: newUser});
              })
              .catch(err => {
                console.log(err);
                res.json({error: err})
              });
          }
        });
      }
    })
    .catch(err => console.log(err));
});

// Log in a user
router.post('/login', (req, res) => {

  User.find({username: req.body.username})
    .then(user => {
      // Because its an array - user not found
      if(user.length < 1) return res.json({msg: 'Auth error'});

      // Check if the hashed pw in the db is equal to the pw coming in
      bcrypt.compare(req.body.password, user[0].password, (err, data) => {

        if(err) return res.json({msg: 'Auth error'});

        // True if passwords are equal
        if(data) {

          const payload = {
            username: user[0].username,
            id: user[0]._id
          };

          // process.env.JWT_KEY
          const userToken = jwt.sign(payload, keys.secretKey, { expiresIn: '1h' });

          // Give the user back a signed jwt
          return res.json({
            user: user[0],
            msg: 'Auth success',
            token: 'Bearer ' + userToken
          });
        }
        else return res.json({msg: 'Auth error'});

      });
    })
    .catch(err => console.log('ERROR', err));
});


module.exports = router;