var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs'),
  parsedData;

fs.readFile(path.resolve(__dirname + './../data/products.json'), handleFile);

function handleFile(err, data) {
  if (err) throw err
  parsedData = JSON.parse(data);
}

/* GET products listing. */
router.get('/getProduct', function(req, res, next) {
  const { query, pageNumber } = req.query;
  const filteredResults = parsedData.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
  const listLimit = 15;
  const paginatedResults = filteredResults.slice((pageNumber - 1)*listLimit, pageNumber*listLimit);

  res.send({
    data: paginatedResults,
    status: 'OK',
    code: 200
  });
});

module.exports = router;
