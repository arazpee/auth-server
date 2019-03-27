const passport = require('passport');
const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

require('../services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

const router = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'there' });
  });

  app.post('/signin', requireSignin, function(req, res, next) {
    res.send({ token: tokenForUser(req.user) });
  });

  app.post('/signup', function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.status(500).send({ error: 'You must provide email and password'});
    }

    User.findOne({ email: email }, function(err, existingUser) {
      if (err) { return next(err); }

      if (existingUser) {
        return res.status(500).send({ error: 'Email is in use' });
      }

      const user = new User({
        email: email,
        password: password
      });

      user.save(function(err) {
        if (err) { return next(err); }

        res.json({ token: tokenForUser(user) });
      });
    });
  });
}

module.exports = router;
