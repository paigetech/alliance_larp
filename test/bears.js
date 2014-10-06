process.env.NODE_ENV = 'test';
var app = require('../app');
var assert = require('assert');
var request = require('request');
var chai = require('chai');
var expect = chai.expect;
var nano = require('nano')('http://localhost:5984');
var bears = nano.db.use('bears');
 
describe('bears api', function(){

  before(function() {
    this.server = app.listen(3001);
  });

  it('GET api/bears should return 200', function(done){
    var options = {
      url: 'http://localhost:3001/api/bears',
    };
    request.get(options , function(err, res, body){
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('POST api/bears should create a new bear and return 200', function(done){
    var options = {
      url: 'http://localhost:3001/api/bears',
      form:{name: 'test_bear', color: 'test_color'}
    };
    request.post(options , function(err, res, body){
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.equal('{"message":"test_bear"}');
      done();
    });
  });

  it('PUT api/bears should update the test_bear', function(done){
    var options = {
      url: 'http://localhost:3001/api/bears/test_bear',
      form:{name: 'test_bear', color: 'updated_test_color'}
    };
    setTimeout( function() {
        request.put(options , function(err, res, body){
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.equal('{"message":"updated test_bear"}');
          done(err);
        });
      }, 100);
  });

  it('DELETE api/bears should delete the test_bear', function(done){
    var options = {
      url: 'http://localhost:3001/api/bears/test_bear'
    };
    setTimeout( function() {
      
        request.del(options , function(err, res, body){
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.equal('{"message":"deleted test_bear"}');
          done(err);
        });
      }, 100);
  });


});

