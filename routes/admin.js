var express = require('express');
var router = express.Router();

/* GET admin page. */
router.get('/', function(req, res, next) {
  
  if (req.session.admin){
    res.render('admin', { 
      title: 'Admin',
      name: req.session.name,
    });
    next();
  } else {
      res.redirect('/');
  }


});


module.exports = router;
