process.env.NODE_ENV = 'test';
var app = require('../app');
var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var Browser = require('zombie');

describe('registration page', function() {
  before(function() {
    this.server = app.listen(3001);
    // initialize the browser using the same port as the test application
    this.browser = new Browser({ site: 'http://localhost:3001' });
  });

  before(function(done) {
    var browser = this.browser;
    browser.visit('/login',function() {
      browser.
          fill("login", "admin").
          fill("password", "password").
          pressButton("Login", function() {
            assert.ok(browser.success);
          });
      done();
    });
  });

  before(function(done) {
    var browser = this.browser;
    browser.visit('/registration', done);
  });

  it('should open a home page for logged in users', function(done){
    var browser = this.browser;
    browser.visit('/logout',function() {
      assert.ok(browser.success);
      browser.visit('/registration',function() {
        assert.ok(browser.success);
        assert.equal(browser.text('.panel-heading'), 'Login');
      });
      done();
    });
  });

  it('should show a registration form for a logged in user', function(done) {
    var browser = this.browser;
    browser.visit('/registration',function() {
      assert.ok(browser.success);
      assert.equal(browser.text('h1'), 'Pre-Register');
      assert.equal(browser.text('form label'), 'First NameLast NameEvent');
    });
    done();
  });


  it('should refuse empty submissions');

  it('should refuse partial submissions');
  it('should keep values on partial submissions');
  it('should refuse invalid emails');
  it('should accept complete submissions');

  after(function(done) {
    this.server.close(done);
  });
});
