const Clarifai = require('clarifai');
const clarifaiApp = new Clarifai.App(
  process.env.CLARIFAI_CLIENT_ID,
  process.env.CLARIFAI_CLIENT_SECRET
);


function analyseImage(req, res, next) {

  const image = req.file.key;
  const imageUrl = `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${image}`;

  return clarifaiApp.models.predict(Clarifai.GENERAL_MODEL, imageUrl)
  .then((response) => {
    req.body.keywords = [];
    const concepts = response.outputs[0].data.concepts;
    concepts.forEach((concept) => {
      req.body.keywords.push(concept.name);
    });
    next();
  })
  .catch(next);
}

module.exports = {
  analyseImage
};
