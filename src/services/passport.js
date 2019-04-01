const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');


const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, async function(email, password, done) {
  // User.findOne({ email: email }, function(err, user) {
  //   if (err) { return done(err); }
  //   if (!user) { return done(null, false); }
  //
  //   user.comparePassword(password, function(err, isMatch) {
  //     if (err) { return done(err); }
  //     if (!isMatch) { return done(null, false); }
  //
  //     return done(null, user);
  //   });
  // });

  try {
    const user = await User.findOne({ email });
    if(!user) {
      done(null, false);
    }

    user.comparePassword(password, (err, isMatch) => {
      if(err) {
        done(err, null);
      }
      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  } catch(e) {
    done(e, null);
  }
});

// -------------------------------------------------------------------------------------

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, async function(payload, done) {
  // User.findById(payload.sub, function(err, user) {
  //   if (err) { return done(err, false); }
  //
  //   if (user) {
  //     done(null, user);
  //   } else {
  //     done(null, false);
  //   }
  // });

  try {
    const user = await user.findById(payload.id);
    if(!user) {
      done(null, false);
    }
    if(user) {
      return done(null, user)
    }
  } catch(e) {
    return done(e, null);
  }
});

passport.use(jwtLogin);
passport.use(localLogin);
