var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Dapper-Apps',
    description: 'Dapper-Apps LLC Company Website.',
    keywords: 'Dapper, Apps, Dapper-Apps, LLC'
  });
});

module.exports = router;