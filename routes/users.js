var express = require('express');
var router = express.Router();
var nano = require('nano')('http://localhost:5984');
var bears = nano.db.use('bears');

router.get('/', function(req, res) {
  bears.list(function(err, body) {
    var list = [];
    console.log(body);
    body.rows.forEach(function(doc) {
    console.log(doc.id);
    list.push(doc.id);
    });

    res.send(list);
    
    });
});

module.exports = router;
