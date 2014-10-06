var express = require('express');
var router = express.Router();
var nano = require('nano')('http://localhost:5984');
var bears = nano.db.use('bears');

router.get('/', function(req, res) {
  bears.list(function(err, body) {
    var list = [];
    body.rows.forEach(function(doc) {
      list.push(doc.id);
    });
    res.json(list);
    });
});

router.post('/', function(req, res, next) {
  bears.insert({color: req.body.color}, req.body.name, function(err, body) {
    if (err) {
      return next(err);
    }
    console.log(body);
    res.json({ message: req.body.name });
    });
});

router.put('/:bear_id', function(req, res, next) {
  bears.update = function(obj, key, callback) {
    var db = this;
    db.get(key, function (err, existing) { 
      if(!err) obj._rev = existing._rev;
      db.insert(obj, key, callback);
    });
  }
   
  bears.update({color: req.body.color}, req.params.bear_id, function(err, body, header) {
    if (err) return next(err);
    res.send(200, { message: "updated " + req.params.bear_id});
  });
});

router.delete('/:bear_id', function(req, res, next) {
    console.log("deleting..." + req.params.bear_id);
    bears.get(req.params.bear_id, function(err, body, header) {
      if (err) {
        return next(err);
      }
        bears.destroy(req.params.bear_id, body._rev, function(err, body, header) {
          if (err) {
            return next(err);
          }
            res.send(200, { message: "deleted " + req.params.bear_id});
        });
    });
});


module.exports = router;
