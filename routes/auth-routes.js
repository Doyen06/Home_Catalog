const express     = require("express");
const authRoutes  = express.Router();
const passport  = require('passport');

//user model
const User        = require("../models/user-model");

//bcrypt
const bcrypt      = require("bcrypt");
const bcryptSalt  = 10;

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup-view.ejs");
});

authRoutes.post("/signup", (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName  = req.body.lastName;
  const email     = req.body.email;
  const homeName  = req.body.homeName;
  const primaryAddress = req.body.primaryAddress;
  const password  = req.body.password;

  if (email === "" || password === "") {
    res.render("auth/signup-view.ejs", { message: "Indicate email and password" });
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.render("auth/signup-view.ejs", { message: "The email already exists" });
      return;
    }

    const salt     = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      homeName: homeName,
      primaryAddress: primaryAddress,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup-view.ejs", { message: "Something went wrong" });
      } else {
        req.flash("success","You have been registered.");
        res.redirect("/my-profile");
      }
    });
  });
});


authRoutes.get('/login', (req, res, next)=>{
  res.render('auth/login-view.ejs', {
    errorMessage: req.flash('error')
  });
});

authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login");
});

authRoutes.post("/login", passport.authenticate("local", {
  successReturnToOrRedirect: '/my-profile',
  failureRedirect: "/login",
  failureFlash: true,
  successFlash: "You have been logged in, user!",
  passReqToCallback: true
}));
authRoutes.get('/logout',(req, res) =>{
  req.logout();
  req.flash('success', "You have successfully logged out");
  res.redirect('/');
});


module.exports    = authRoutes;
