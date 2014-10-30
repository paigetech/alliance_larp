process.env.NODE_ENV = 'test';
var app = require('../app');
var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var Browser = require('zombie');

describe('registration page', function() {
  before(function() {
    this.server = app.listen(3001);
    this.browser = new Browser({ site: 'http://localhost:3001' });
  });

  beforeEach(function(done) {
    var browser = this.browser;
    browser.visit('/login',function(err) {
      if (err) return done(err);
      browser.
        fill("login", "admin").
        fill("password", "password").
        pressButton("Login", function() {
          assert.ok(browser.success);
          done();
        });
    });
  });


  beforeEach(function(done) {
    var browser = this.browser;
    browser.visit('/registration', done);
  });

  it('should redirect to the login page for non-logged in user', function(done){
    var browser = this.browser;
    browser.visit('/logout', function(err) {
      if (err) return done(err);
      browser.visit('/registration', function(err) {
        if (err) return done(err);
        assert.equal(browser.text('.panel-heading'), 'Login');
        done();
      });
    });
  });

  it('should show a registration form', function(done) {
    var browser = this.browser;
      assert.ok(browser.success);
      assert.equal(browser.text('h1'), 'Pre-Register');
      assert.equal(browser.text('label'), 'First NameLast NameEmail');
    done();
  });


  it('should refuse empty submissions', function(done){
    var browser = this.browser;
    browser.pressButton("Submit", function(err){
      if (err) return done(err);
      assert.ok(browser.success);
      assert.equal(browser.text('li.error'), 'Email is requiredFirst Name is requiredLast Name is requiredEmail not valid');
      done();
    });
  });

  it('should refuse partial submissions', function(done){
    var browser = this.browser;
    browser
      .fill("email", "foo@bar.com")
      .fill("lastName", "Foo")
      .pressButton("Submit", function(err){
        if (err) return done(err);
        assert.ok(browser.success);
        assert.equal(browser.text('li.error'), 'First Name is required');
        done();
      });
  });

  it('should keep values on partial submissions', function(done){
    var browser = this.browser;
    browser
      .fill("email", "foo@bar.com")
      .fill("lastName", "Foo")
      .pressButton("Submit", function(err){
        if (err) return done(err);
        assert.ok(browser.success);
        assert.equal(browser.field('lastName').value, 'Foo');
        done();
      });
  });

  it('should refuse invalid emails', function(done){
    var browser = this.browser;
    browser
      .fill("email", "foobar.com")
      .fill("lastName", "Foo")
      .fill("firstName", "bar")
      .pressButton("Submit", function(err){
        if (err) return done(err);
        assert.ok(browser.success);
        assert.equal(browser.text('li.error'), 'Email not valid');
        done();
      });
  });

  it('should accept complete submissions and redirect to the index', function(done){
    var browser = this.browser;
    browser
      .fill("email", "foo@bar.com")
      .fill("lastName", "Foo")
      .fill("firstName", "bar")
      .pressButton("Submit", function(err){
        if (err) return done(err);
        assert.ok(browser.success);
        assert.equal(browser.text('p.message'), 'Registration Submitted Successfully!');
        assert.equal(browser.text('h1'), 'App');
        done();
      });
  });

  it('should store the submission in the database', function(done){
    var browser = this.browser;
    browser
      .fill("email", "foo@bar.com")
      .fill("lastName", "Foo")
      .fill("firstName", "bar")
      .pressButton("Submit", function(err){
        if (err) return done(err);
        assert.ok(browser.success);
        assert.equal(browser.text('p.message'), 'Registration Submitted Successfully!');
        assert.equal(browser.text('h1'), 'App');
        done();
      });
  });

  after(function(done) {
    this.server.close(done);
  });
});
