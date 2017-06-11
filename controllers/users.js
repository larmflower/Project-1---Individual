// CONTAINS THE RESTFUL FUNCTIONS FOR ARTWORKS.. DO WE NEED A FILE FOR USERS AS WELL?
// SEE BOOKS LESSON IN W04D03 LESSON also see HOTELS LESSON w05d01
// CONTAINS CONTROLLER FUNCTIONS
const User =require('../models/user');

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      return res.render('users/show', { user });
    })
    .catch(next);
}
// ------------------------------------------NEED AN EDIT FUNCTION

function deleteRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      return user.remove();
    })
    .then(() => res.redirect('/users'))
    .catch(next);
}
// ------------------------------NOT TOO SURE ABOUT THESE...

module.exports = {
  show: showRoute,
  delete: deleteRoute
  // createComment: createCommentRoute,
  // deleteComment: deleteCommentRoute
};
