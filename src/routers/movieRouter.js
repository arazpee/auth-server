const passport = require('passport');
const Movie = require('../models/movie');
const requireAuth = require('../middlewares/authMiddleware');

const router = function(app) {
  app.post('/movies', requireAuth, async (req, res) => {
    const data = new Movie({
      name: req.body.name
    }).save();

    res.status(201).send({ data });
  })

  app.get('/movies', async (req, res) => {
    const movie = await Movie.find({});
    res.send(movie);
  });

  app.delete('/movies/:id', requireAuth, async (req, res) => {
    try {
      await Movie.findOneAndDelete({ _id: req.params.id });
      res.status(200).send();
    } catch(e) {
      res.status(400).send(e);
    }
  });

  app.patch('/movies/:id', requireAuth, async (req, res) => {
    try {
      const data = await Movie.findByIdAndUpdate(req.params.id, {
        name: req.body.name
      });
      if (!data) {
        res.status(400).send("bad request");
      }

      res.status(200).send(data);
    } catch(e) {
      res.status(400).send(e);
    }
  });
}

module.exports = router;
