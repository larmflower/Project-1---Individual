const router = require('express').Router();
const registrations = require('../controllers/registrations');
const users = require('../controllers/users');
const artworks = require('../controllers/artworks');
const sessions = require('../controllers/sessions');
const oauth = require('../controllers/oauth');
const secureRoute = require('../lib/secureRoute');
const upload = require('../lib/upload');
const clarifai = require('../lib/clarifai');

// --------------DO I NEED TO REQUIRE CLARIFAI BELOW?---------------
const Clarifai = require('clarifai');

router.get('/', (req, res) => res.render('statics/index'));

router.route('/users/:id')
  .get(users.show)
  .post(upload.single('image'), users.update)
  .delete(secureRoute, users.delete);

router.route('/users/:id/edit')
  .get(secureRoute, users.edit);

router.route('/artworks')
  .get(artworks.index)
  .post(secureRoute, upload.single('image'), clarifai.analyseImage, artworks.create);

router.route('/artworks/new')
  .get(secureRoute, artworks.new);

router.route('/artworks/:id')
  .get(artworks.show)
  .put(artworks.update)
  .delete(secureRoute, artworks.delete);

router.route('/artworks/:id/history')
  .get(artworks.history);

router.route('/artworks/:id/edit')
  .get(secureRoute, artworks.edit);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/oauth/github')
  .get(oauth.github);

router.all('*', (req, res) => res.notFound());

// ----------------DO I NEED TO EXPORT CLARIFAI BELOW ---------------
module.exports = router, Clarifai;
