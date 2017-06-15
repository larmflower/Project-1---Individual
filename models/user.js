// THESE ARE THE SCHEMA FOR USERS
// SEE CLASSWORK FROM W04D04 EXPRESS AUTH
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String },
  email: { type: String },
  password: { type: String },
  instagramId: { type: Number }
});

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation;
  });
//

// lifecycle hook -- mongoose middleware
userSchema.pre('save', function hashPassword(next) {
  if(!this.isModified('password')) return next();
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  next();
});

// important here is the next()
userSchema.pre('validate', function checkPassword(next) {
  console.log('pre validate hook');
  if(!this.password && !this.instagramId) {
    this.invalidate('password', 'required');
  }
  if(this.password && this._passwordConfirmation !== this.password){
    this.invalidate('passwordConfirmation', 'does not match');
  }
  next();
});

// // compareSync will take inputted password , hash it and compare it , if yes, return true
userSchema.methods.validatePassword = function
validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.pre('remove', function removeUserPosts(next) {
  this.model('Artwork').remove({ createdBy: this.id }, next);
});


module.exports = mongoose.model('User', userSchema);
