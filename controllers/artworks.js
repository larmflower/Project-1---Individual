// CONTAINS CONTROLLER FUNCTIONS

const Artwork = require('../models/artwork');

function indexRoute(req, res, next) {
  Artwork
    .find()
    .populate('createdBy')
    .exec()
    .then((artworks) => {
      console.log(artworks);
      res.render('artworks/index', { artworks });
    })
    .catch(next);
}

function newRoute(req, res) {
  return res.render('artworks/new');
}

function createRoute(req, res, next) {
  if(req.file) req.body.image = req.file.key;
  req.body.createdBy = req.user;

  Artwork
    .create(req.body)
    .then(() => res.redirect('/artworks'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/artworks/new`, err.toString());
      next(err);
    });
}

function showRoute(req, res, next) {
  Artwork
    .findById(req.params.id)
    .populate('createdBy')
    .exec()
    .then(artwork => {
      if(!artwork) return res.notFound();
      return res.render('artworks/show', { artwork });
    })
    .catch(next);
}

function historyRoute(req, res, next) {
  Artwork
    .findById(req.params.id)
    .populate('createdBy')
    .exec()
    .then(artwork => {
      if(!artwork) return res.notFound();
      return res.render('artworks/history', { artwork, keywords: req.query.keywords.split(',') });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  Artwork
    .findById(req.params.id)
    .exec()
    .then(artwork => {
      if(!artwork) return res.redirect();

      return res.render('artworks/edit', { artwork });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  Artwork
    .findById(req.params.id)
    .exec()
    .then(artwork => {
      if(!artwork) return res.notFound();

      for(const field in req.body) {
        artwork[field] = req.body[field];
      }

      req.body.newKeyword.split(',').forEach((keyword) => {
        if (keyword !== '') artwork.keywords.push(keyword);
      });

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
    .exec()
    .then(artwork => {
      if(!artwork) return res.notFound();
      return artwork.remove();
    })
    .then(() => res.redirect('/artworks'))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  history: historyRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
};
