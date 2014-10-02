process.env.NODE_ENV = 'test';
var app = require('../app');
var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var Browser = require('zombie');
 
describe('admin page', function() {
  before(function() {
    this.server = app.listen(3001);
    // initialize the browser using the same port as the test application
    this.browser = new Browser({ site: 'http://localhost:3001' });
  });

  // load the admin page
  beforeEach(function(done) {
    this.browser.visit('/admin', done);
  });

  it('should open a login page for non-logged in users', function(){
      this.browser.assert.success();
      assert.equal(this.browser.text('.panel-heading'), 'Login');
    });

  it('should open an admin page for admin users', function(done){
    var browser = this.browser;
    browser.visit('/login',function() {
      browser.
          fill("login", "admin").
          fill("password", "password").
          pressButton("Login", function() {
            assert.ok(browser.success);
            browser.visit('/admin', function(){
              assert.equal(browser.text('h1'), "Admin");
              done();
            });
          });
    });
  });

  after(function(done) {
    this.server.close(done);
  });


});
