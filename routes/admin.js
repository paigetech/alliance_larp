var express = require('express');
var router = express.Router();

/* GET admin page. */
router.get('/', function(req, res) {
    if (!req.session.loggedIn) {
      res.redirect('../login');
  } else {
    res.render('admin', { 
      title: 'Admin',
      name: req.session.name,
    });
  }
});


module.exports = router;
