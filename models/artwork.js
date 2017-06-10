// THESE ARE THE SCHEMAS FOR ARTWORK
// ? mongoose needed?
const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  title: String,
  image: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
  // ----------------------------------does created by above need required? ? ? 
  // comments: [ commentSchema ]
});

// this is a helper method for edit and delete buttons to show on page
artworkSchema.methods.belongsTo = function artworkBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};



module.exports = mongoose.model('Artwork', artworkSchema);

// -----------------------------------------------MAY ADD COMMENTS LATER
// const commentSchema = new mongoose.Schema({
//   content: {type: String, required: true },
//   createdBy: {type: mongoose.Schema.ObjectId, ref: 'User', required: true }
// }, {
//   timestamps: true
// });

// commentSchema.methods.belongsTo = function commentBelongsTo(user) {
//   if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
//   return user.id === this.createdBy.toString();
// };
