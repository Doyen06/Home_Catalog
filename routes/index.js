const express = require('express');
const router  = express.Router();

/* GET landing page. */
router.get('/', (req, res, next) => {

  res.render('index', {
    successMessage: req.flash('success'),

  });
});

module.exports = router;
