const express = require('express');
const router = express.Router();

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

router.post('/', (req, res) => {
  const newRecipe = new Recipe({
    name: req.body.name,
    ingredients: req.body.ingredients
  });
  newRecipe.save()
    .then(recipe => res.json(recipe))
    .catch(err => console.log(err));
});


router.delete('/:id', (req, res) => {

  Recipe.findById(req.params.id)
    .then(recipe => recipe.remove()
      // .then(() => res.json({ removed: true })))
      .then(() => {
        Recipe.find()
          .sort({ date: -1 })
          .then(recipes => res.json(recipes));
      }))
    .catch(err => console.log(err));

});

module.exports = router;