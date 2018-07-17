const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Bring in the model
const User = require('../models/User');

router.post('/register', (req, res) => {

  const newUser = {
    email: req.body.email,
    password: bcrypt.hash(req.body.password)
  };

});


module.exports = router;