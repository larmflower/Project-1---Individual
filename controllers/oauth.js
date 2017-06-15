const rp = require('request-promise');
const config = require('../config/oauth');
const User = require('../models/user');

function instagram(req, res, next) {
  console.log(req.body);
  
  return rp({
    method: 'POST',
    url: config.instagram.accessTokenURL,
    form: {
      client_id: config.instagram.clientId,
      client_secret: config.instagram.clientSecret,
      grant_type: 'authorization_code',
      redirect_uri: config.instagram.redirect_uri,
      code: req.query.code
    },
    json: true
  })
  .then((token) => {
    console.log('TOKEN from Insta', token);
    return User
    .findOne({ $or: [{ email: token.user.email }, { instagramId: token.user.id }] })
    .then((user) => {
      if(!user) {
        user = new User({
          username: token.user.username,
          image: token.user.profile_picture
        });
      }
      user.instagramId = token.user.id;
      return user.save();
    });
  })
  .then((user) => {
    req.session.userId = user.id;
    req.session.isAuthenticated = true;

    req.flash('info', `Welcome back, ${user.username}!`);
    res.redirect(`/users/${user.id}`);
  })
  .catch(next);
}

module.exports = {
  instagram
};
