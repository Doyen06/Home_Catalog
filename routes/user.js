const express = require('express');
const router  = express.Router();
const ensure = require('connect-ensure-login');


router.get('/my-profile', ensure.ensureLoggedIn(), (req, res, next) => {

  res.render('user/profile', {
    successMessage: req.flash('success')
  });
});

module.exports = router;
