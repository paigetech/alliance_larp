process.env.NODE_ENV = 'test';
var app = require('../app');
var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var Browser = require('zombie');

 
describe('header', function() {
  before(function() {
    this.server = app.listen(3001);
    // initialize the browser using the same port as the test application
    this.browser = new Browser({ site: 'http://localhost:3001' });
  });

  // load the contact page
  beforeEach(function(done) {
    this.browser.visit('/', done);
  });

  it('should add a nav menu to the page', function(done){
      this.browser.assert.success();
      assert.equal(this.browser.text('.brand'), "App");
      done();
    });

  it('should have an admin link for admin users', function(done){
    var browser = this.browser;
    browser.visit('/login',function() {
      browser.
          fill("login", "admin").
          fill("password", "password").
          pressButton("Login", function() {
            assert.ok(browser.success);
            assert.ok(browser.html('li'), "Admin");
            done();
          });
    });


  });
    
  // ...
  after(function(done) {
    this.server.close(done);
  });

});
