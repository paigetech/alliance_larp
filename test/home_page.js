process.env.NODE_ENV = 'test';
var app = require('../app');
var assert = require('assert');
var Browser = require('zombie');
 
describe('home page', function() {
  before(function() {
    this.server = app.listen(3001);
    // initialize the browser using the same port as the test application
    this.browser = new Browser({ site: 'http://localhost:3001' });
  });

  // load the home page
  before(function(done) {
    this.browser.visit('/', done);
  });

  it('should open a login page for non-logged in users', function(done){
      this.browser.assert.success();
      assert.equal(this.browser.text('.panel-heading'), 'Login');
      done();
    });
    
    it('should open a home page for logged in users', function(done){
      var browser = this.browser;
      browser.visit('/login',function() {
       browser.
          fill("login", "foo").
          fill("password", "bar").
          pressButton("Login", function() {
              assert.ok(browser.success);
              assert.ok(browser.text('.brand'), "App");
              done();
          });
      });
    });
  // ...
  after(function(done) {
    this.server.close(done);
  });

});
