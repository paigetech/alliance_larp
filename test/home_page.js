process.env.NODE_ENV = 'test';
var app = require('../app');
var assert = require('assert');
var Browser = require('zombie');
 
describe('contact page', function() {
  before(function() {
    this.server = app.listen(3000);
    // initialize the browser using the same port as the test application
    this.browser = new Browser({ site: 'http://localhost:3000' });
  });

  // load the home page
  before(function(done) {
    this.browser.visit('/', done);
  });

  it('should open a login page for non-logged in users', function(){
      this.browser.assert.success();
      assert.equal(this.browser.text('.panel-heading'), 'Login');
    });
    
    it('should open a home page for logged in users', function(){
      this.browser.
        fill("login", "paigetech@gmail.com").
        fill("password", "password").
        pressButton("Login", function() {
          this.browser.assert.success();
          assert.ok(this.browser.text('.brand'), "App");
      });
    });
  // ...
  after(function(done) {
    this.server.close(done);
  });

});
