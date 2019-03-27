const Authentication = require('./controllers/authentication');
const Movie = require('./controllers/movie');
require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/getAllMovies', Movie.getAllMovies);
  // app.get('/getMovie', Movie.getMovie);
  app.post('/uploadMovie', Movie.uploadMovie);

  app.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'there' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
}
