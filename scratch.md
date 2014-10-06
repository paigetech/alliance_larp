it('DELETE api/bears should delete the right bear and return 200', function(done){
    var options = {
      url: 'http://localhost:3001/api/bears/test_bear'
    };
    request.del(options , function(err, res, body){
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.equal('{"message":"deleted test_bear"}');
      done();
    });
  });
  bears.update = function(obj, key, cb) {
    var db = this;
      db.get(key, function(err, existing) {
        if(!err) obj._rev = existing._rev;
        db.insert(obj, key, cb);
      });
    }



router.put('/:bear_id', function(req, res) {
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
