const express = require('express');
const router = express.Router();

// Bring in the model
const Recipe = require('../models/Recipe');

router.get('/', (req, res) => {

  console.log('hi from recipes');

  Recipe.find()
    .sort({ date: -1 })
    .then(recipes => res.json(recipes));

});

router.post('/', (req, res) => {

  console.log('RECIEVED ', req.body.name);
  const newRecipe = new Recipe({
    name: req.body.name
  });

  newRecipe.save()
    .then(recipe => res.json(recipe))
    .catch(err => console.log(err));

});


router.delete('/:id', (req, res) => {

  Recipe.findById(req.params.id)
    .then(recipe => recipe.remove().then(() => res.json({ removed: true })))
    .catch(err => console.log(err));

});

module.exports = router;