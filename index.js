const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');

const recipes = require('./routes/recipes');
const auth = require('./routes/auth');

const app = express();

app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose.connect(db)
  .then(() => console.log('mongo database connected'))
  .catch(err => console.log(err));


app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/recipes', recipes);
app.use('/auth', auth);

if(process.env.NODE_ENV === 'production') {

  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
  
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server listening on ${PORT}`));
