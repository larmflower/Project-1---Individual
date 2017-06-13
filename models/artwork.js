const mongoose = require('mongoose');
const s3 = require('../lib/s3');

const artworkSchema = new mongoose.Schema({
  image: { type: String },
  caption: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  keywords: [ { type: String, trim: true } ]
});

artworkSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return null;
    if(this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.image}`;
  });

artworkSchema.pre('remove', function removeImage(next) {
  if(!this.image) return next();
  s3.deleteObject({ Key: this.image }, next);
});

module.exports = mongoose.model('Artwork', artworkSchema);
