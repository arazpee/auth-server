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

// -------------------------------------------------------------------------------------------------------------------
// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
//   secretOrKey: config.secret
// };
//
// const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
//
//   try {
//     const user = await User.findById(payload.id);
//     if(user) {
//       return done(null, user)
//     }
//     if(!user) {
//       done(null, false);
//     }
//   } catch(e) {
//     return done(e, null);
//   }
// });

passport.use(localLogin);
// passport.use(jwtLogin);
