const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Bring in the model
const User = require('../models/User');

router.post('/register', (req, res) => {

  // Check to see if user email is already in db
  User.find({ email: req.body.email })
    // user is an array
    .then(user => {
      if(user.length >= 1) {
        return res.json({ err: 'User already exists' });
      }
      // If there is no email of that kind, create new user
      else {
        bcrypt.hash(req.body.password, 10, (err, hashedPw) => {
          if(err) res.status(500).json({ error: err})
          else {
            const newUser = new User({
              email: req.body.email,
              password: hashedPw
            });
      
            newUser.save()
              .then(res => {
                console.log(res);
                res.json({ msg: 'user registered successfully'});
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


module.exports = router;