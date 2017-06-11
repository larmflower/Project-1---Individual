// CONTAINS THE RESTFUL FUNCTIONS FOR ARTWORKS.. DO WE NEED A FILE FOR USERS AS WELL?
// SEE BOOKS LESSON IN W04D03 LESSON also see HOTELS LESSON w05d01
// CONTAINS CONTROLLER FUNCTIONS
const Artwork =require('../models/artwork');

function indexRoute(req, res, next) {
  Artwork
  .find()
  .populate('createdBy')
  .exec()
  .then((artworks) => res.render('artworks/index', { artworks }))
  .catch(next);
}

function newRoute(req, res) {
  return res.render('artworks/new');
}

function createRoute(req, res, next) {
  req.body.createdBy = req.user;
  Artwork
  .create(req.body)
  .then(() => res.redirect('/artworks/index'))
  .catch((err) => {
    // -------------------------------------------------need req.params.id below?
    if(err.name === 'ValidationError') return res.badRequest(`/artworks/edit`, err.toString());
    next(err);
  });
}

// ------------------------------------will need to connect users to the artwork
function showRoute(req, res, next) {
  Artwork
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .exec()
    .then((artwork) => {
      if(!artwork) return res.notFound();
      return res.render('artworks/show', { artwork });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  Artwork
    .findById(req.params.id)
    .populate('createdBy')
    .exec()
    .then((artwork) => {
      if(!artwork) return res.redirect();
      if(!artwork.belongsTo(req.user)) return res.unauthorized(`/artworks/${artwork.id}`, 'You do not have permission to edit that resource');
      return res.render('artworks/edit', { artwork });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  Artwork
    .findById(req.params.id)
    .populate('createdBy')
    .exec()
    .then((artwork) => {
      if(!artwork) return res.notFound();

      for(const field in req.body) {
        artwork[field] = req.body[field];
      }

      return artwork.save();
    })
    .then(() => res.redirect(`/artworks/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/artworks/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function deleteRoute(req, res, next) {
  Artwork
    .findById(req.params.id)
    .populate('createdBy')
    .exec()
    .then((artwork) => {
      if(!artwork) return res.notFound();
      return artwork.remove();
    })
    .then(() => res.redirect('/artworks'))
    .catch(next);
}


// -------------------------------------------could add comments later?????
// function createCommentRoute(req, res, next) {
//   req.body.createdBy = req.user;
//   Artwork
//     .findById(req.params.id)
//     .exec()
//     .then((artwork) => {
//       if(!artwork) return res.notFound();
//       artwork.comments.push(req.body); // create an embedded record
//       return artwork.save();
//     })
//     .then((artwork) => res.redirect(`/artworks/${artwork.id}`))
//     .catch(next);
// }

// function deleteCommentRoute(req, res, next) {
//   Artwork
//     .findById(req.params.id)
//     .exec()
//     .then((artwork) => {
//       if(!artwork) return res.notFound();
//       // get the embedded record by it's id
//       const comment = artwork.comments.id(req.params.commentId);
//       comment.remove();
//
//       return artwork.save();
//     })
//     .then((artwork) => res.redirect(`/artworks/${artwork.id}`))
//     .catch(next);
// }

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
  // createComment: createCommentRoute,
  // deleteComment: deleteCommentRoute
};
