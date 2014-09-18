var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    if (req.session.roles.indexOf('admin')) {
      var admin = true;
    res.render('admin', { 
      title: 'App',
      name: req.session.name,
      admin: true
    });
  }
});


module.exports = router;
