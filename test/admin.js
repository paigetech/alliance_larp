process.env.NODE_ENV = 'test';
var app = require('../app');
var assert = require('assert');
var Browser = require('zombie');
 
describe('admin page', function() {
  before(function() {
    this.server = app.listen(3000);
    // initialize the browser using the same port as the test application
    this.browser = new Browser({ site: 'http://localhost:3000' });
  });

  // load the admin page
  before(function(done) {
    this.browser.visit('/admin', done);
  });

  it('should open a login page for non-logged in users', function(){
      this.browser.assert.success();
      assert.equal(this.browser.text('.panel-heading'), 'Login');
    });


  after(function(done) {
    this.server.close(done);
  });

});
