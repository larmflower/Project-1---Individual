// NEED TO REQUIRE CONTROLLERS UP HERE
const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
// const oauth = require('../controllers/oauth');
const secureRoute = require('../lib/secureRoute');
const artworks = require('../controllers/artworks');
const users = require('../controllers/user');


// A home route
router.get('/', (req, res) => res.render('./statics/index'));

// A route to the artworks index , and to create new which only users can do?
router.route('/artworks/index')
.get(artworks.index)
.post(secureRoute, artworks.create);

router.route('/artworks/new')
.get(secureRoute, artworks.new);

router.route('/artworks/:id')
.get(artworks.show)
.put(secureRoute, artworks.update)
.delete(secureRoute, artworks.delete);

router.route('/artworks/:id/edit')
.get(secureRoute, artworks.edit);

router.route('/registrations/new')
.get(registrations.new)
.post(registrations.create);

router.route('/login')
.get(sessions.new)
.post(sessions.create);

router.route('/logout')
.get(sessions.delete);

router.route('/users/show')
.get(users.show);

// POSSIBLE TO ADD COMMENTS LATER ON...
// router.route('/artworks/:id/comments')
// .post(secureRoute, artworks.createComment);
// router.route('/artworks/:id/comments/:commentId')
// .delete(secureRoute, artworks.deleteComment);


router.all('*', (req, res) => res.notFound());

module.exports = router;
