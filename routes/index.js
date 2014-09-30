var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    if (!req.session.loggedIn) {
      res.redirect('../login');
  } else {

    res.render('index', { 
      title: 'App',
      name: req.session.name,
      admin: true
    });
    console.log("session " + req.session.name);
    console.log("session " + req.session.email);
    console.log("session " + req.session.roles);
  }
});


module.exports = router;
