const express = require('express');
const router = express.Router();
// const authorize = require('../middleware/authorize');
const passport = require('passport');

// Bring in the model
const Recipe = require('../models/Recipe');

// Get all recipe's
router.get('/', (req, res) => {
  Recipe.find()
    .sort({ date: -1 })
    .then(recipes => res.json(recipes));
});

// Get single recipe
router.get('/:id', (req, res) => {
  Recipe.findById({ _id: req.params.id })
    .then(recipe => res.json(recipe))
    .catch(err => console.log(err));
});

// Create a recipe
// Protected
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log('we should be authed')
  const newRecipe = new Recipe({
    name: req.body.name,
    ingredients: req.body.ingredients
  });
  newRecipe.save()
    .then(recipe => res.json(recipe))
    .catch(err => console.log(err));
});

// Update a recipe
// Protected
router.patch('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, ingredients: req.body.ingredients } })
    .then(data => {
      Recipe.find()
        .sort({ date: -1 })
        .then(recipes => res.json(recipes))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

// Delete a recipe
// Protected
router.delete('/:id', (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => recipe.remove()
      .then(() => {
        Recipe.find()
          .sort({ date: -1 })
          .then(recipes => res.json(recipes))
          .catch(err => console.log(err));
      }))
    .catch(err => console.log(err));

});

module.exports = router;