var express = require('express');
var router = express.Router();
0

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
