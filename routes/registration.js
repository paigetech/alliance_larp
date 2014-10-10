var express = require('express');
var router = express.Router();

/* GET admin page. */
router.get('/', function(req, res, next) {
  
    if (!req.session.loggedIn) {
      res.redirect('../login');
  } else {
    res.render('registration', { 
      title: 'Pre-Register',
      name: req.session.name,
    });
  }


});


module.exports = router;
