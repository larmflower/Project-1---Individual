const rp = require('request-promise');

function harvardProxy(req, res) {
  rp({
    url: 'http://api.harvardartmuseums.org/object',
    qs: {
      size: 10,
      apikey: process.env.HARVARD_API_KEY,
      keyword: req.query.keyword
    },
    json: true
  })
  .then((data) => {
    res.json(data);
  });
}

module.exports = {
  proxy: harvardProxy
};
