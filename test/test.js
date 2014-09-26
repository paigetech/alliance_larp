process.env.NODE_ENV = 'test';
var app = require('../app');
var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var Browser = require('zombie');

 
describe('header', function() {
  before(function() {
    this.server = app.listen(3000);
    // initialize the browser using the same port as the test application
    this.browser = new Browser({ site: 'http://localhost:3000' });
  });

  // load the contact page
  before(function(done) {
    this.browser.visit('/', done);
  });

  it('should add a nav menu to the page', function(){
      this.browser.assert.success();
      assert.equal(this.browser.text('.brand'), "App");
    });
    
  // ...
  after(function(done) {
    this.server.close(done);
  });

});
