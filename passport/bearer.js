const passport = require("passport");
const User = require("../models/User");
const BearerStrategy = require("passport-http-bearer").Strategy;
const jwt = require("jsonwebtoken");

passport.use(
  new BearerStrategy(function (token, done) {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    User.findById(decoded.id, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      return done(null, user, { scope: "all" });
    });
  })
);
