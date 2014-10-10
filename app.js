
/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var utils = require('lockit-utils');
var nano = require('nano')('http://localhost:5984');

var app = express();

//Routes
var routes = require('./routes/');
var users = require('./routes/users');
var admin = require('./routes/admin');
var registration = require('./routes/registration');
var bears = require('./routes/api/bears');
var config = require('./config.js');
var Lockit = require('lockit');
var router = express.Router();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieSession({
  secret: 'this is my super secret string'
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next){
      res.locals.session = req.session;
          next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/admin', admin);
app.use('/registration', registration);
app.use('/api/bears', bears);

// private dummy route
app.get('/private', utils.restrict(config), function(req, res) {
  res.send('only visible if logged in');
});

var lockit = new Lockit(config);
app.use(lockit.router);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
