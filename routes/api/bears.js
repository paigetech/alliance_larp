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

    res.json(list);
    
    });
});

router.post('/', function(req, res) {
  bears.insert({color: req.body.color}, req.body.name, function(err, body) {
    if (err) {
      console.log('[bears.insert]', err.message);
      return;
    }
    console.log(body);
    res.json({ message: req.body.name });
    });
});

router.put('/', function(req, res) {
  bears.update = function(obj, key, cb) {
    var db = this;
    db.get(key, function(err, existing) {
      if(!err) obj._rev = existing._rev;
      db.insert(obj, key, cb);
    });
  }
  bears.update({color: req.body.color}, req.body.name, function(err, res) {
    if (err) return console.log('no update');
    console.log('updated');
  });
});

module.exports = router;
