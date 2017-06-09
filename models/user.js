// THESE ARE THE SCHEMA FOR USERS
// SEE CLASSWORK FROM W04D04 EXPRESS AUTH
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});


// lifecycle hook -- mongoose middleware
userSchema.pre('save', function hashPassword(next) {
  if(!this.isModified('password')) return next();

  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  next();
});


userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation;
  });
//
//

// important here is the next()
userSchema.pre('validate', function checkPassword(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password){
    this.invalidate('passwordConfirmation', 'does not match');
  }
  next();
});
//
// // compareSync will take inputted password , hash it and compare it , if yes, return true
userSchema.methods.validatePassword = function
validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
