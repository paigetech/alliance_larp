process.env.NODE_ENV = 'test';
var app = require('../app');
var http = require('../support/http');
var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var Browser = require('zombie');
 
describe('bears api', function(){

  before(function() {
    http.createServer(app,done);
  });

  it('GET /bears should return 200', function(done){
    request().get('/api/bears').expect(200, done);
  });

});

