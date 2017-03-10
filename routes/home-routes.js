const express = require('express');
const multer = require('multer');
const ensure = require('connect-ensure-login');

const homeRoutes = express.Router();

// This is for photos correct? Where should I file this to?
const uploads =multer({dest: __dirname + '/../public/uploads/'});

const Home = require('../models/home-model.js');

homeRoutes.get('/home/new',
  ensure.ensureLoggedIn(),(req, res, next)=> {
  res.render('home/new.ejs',{
    message: req.flash('success')
  });
});

homeRoutes.post('/home',
  ensure.ensureLoggedIn(),
  uploads.single('homePicture'),(req, res, next) => {
  const homePicture     = req.file.filename;
  const insuranceCompany= req.body.insuranceCompany;
  const insurancePhone  = req.body.insurancePhone;
  const agentName       = req.body.agentName;
  const insurancePolicy = req.body.insurancePolicy;

  const newHome = new Home ({
    insuranceCompany: insuranceCompany,
    insurancePhone: insurancePhone,
    agentName: agentName,
    insurancePolicy: insurancePolicy,
    //picture sent to where with multer?
    homePicture: `/uploads/${homePicture}`,
  });

  newHome.save ((err) => {
    if (err) { return next(err); }
    else {
      req.user.home=newHome._id;
      req.user.save((err) =>{
        if (err) { return next(err); }
        req.flash('success', 'Your house has been created.');
        res.redirect('/my-profile');
      });

    }
  });
});

homeRoutes.get(':/id', ensure.ensureLoggedIn(), (req, res, next) => {
  let homeId = req.params.id;
  home.findById(homeId, (err, home) => {
    if (err) { return next(err); }

//render in home page, with user info
    res.render('index', { home: home });
  });

});
module.exports = homeRoutes;
