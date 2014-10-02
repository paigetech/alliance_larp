var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    if (!req.session.loggedIn) {
      res.redirect('../login');
  } else {

    console.log("name " + req.session.name);
    console.log("email " + req.session.email);
    console.log("role " + req.session.roles);
    console.log("admin " + req.session.admin);
    res.render('index', { 
      title: 'App',
      name: req.session.name,
    });
  }
});


module.exports = router;
