const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const Artwork = require('../models/artwork');
const User = require('../models/user');

Artwork.collection.drop();
User.collection.drop();

User
  .create([{
    name: 'Lauren',
    username: 'larmflower',
    email: 'lnarosetta@gmail.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Artwork
      .create([{
        title: 'Figure1',
        image: 'https://scontent.xx.fbcdn.net/v/t1.0-9/12631312_1020823441292660_3833445527524706375_n.jpg?oh=f6eb93844565bb1c6ebbc6de0d45f4a8&oe=59ABB46E'
      },{
        title: 'Portrait1',
        image: 'https://scontent.xx.fbcdn.net/v/t1.0-9/12647362_1020917557949915_289193911640483414_n.jpg?oh=2315ab20e97a1715008069079b02d268&oe=59A391DB'
      }]);
  })
  .then((artworks) => console.log(`${artworks.length} artworks created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
