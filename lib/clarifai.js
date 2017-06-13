const rp = require('request-promise');

function analyseImage(req, res, next) {

  const image = req.file.key;
  const imageUrl = `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${image}`;

  return rp({
    method: 'POST',
    url: 'https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/outputs',
    json: true,
    headers: {
      'Authorization': 'Bearer 789uJjFUfXhV95bL1MsSd7SOJ6JyHK',
      'Content-Type': 'application/json'
    },
    body: {
      'inputs': [
        {
          'data': {
            'image': {
              'url': imageUrl
            }
          }
        }
      ]
    }
  })
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
