var express = require('express');
var router = express.Router();

/* GET admin page. */
router.get('/', function(req, res, next) {
  
  if(!req.session.loggedIn) {
    res.redirect('../login');
  } else {
    res.render('registration', { 
      title: 'Pre-Register',
      name: req.session.name,
    });
  }

});

router.post('/', function(req,res){
  req.assert('email', 'Email is required').notEmpty();
  req.assert('firstName', 'First Name is required').notEmpty();
  req.assert('lastName', 'Last Name is required').notEmpty();
  req.assert('email', 'Email not valid').isEmail();

  var errors = req.validationErrors();
  if(!errors){
    res.render('index', { 
      title: 'App',
      message: 'Registration Submitted Successfully!',
      errors: {}
    });
  }
  else {
    res.render('registration', {
      title: 'Pre-Register',
      message: '',
      errors: errors,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    });
  }
});


module.exports = router;
