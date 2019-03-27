// const Movie = require('../models/Movies');
//
// // get all movies
// exports.getAllMovies = function(req, res, next) {
//   Movie.find({}, function(err, data) {
//     if (err) return res.status(500).send(err);
//
//     return res.status(200).send(data);
//   });
// }
//
// //limit get all movies
// exports.getAllLimit = function(req, res, next) {
//   Movie.find({}, { skip:0, limit:9 }, function(err, data){
//     if(err) return res.status(500).sent(err);
//
//     return res.status(200).send(data);
//   })
// }
//
// // get specific movie
// exports.getMovie = function(req, res, next) {
//   Movie.find({}, function(err, data) {
//     if (err) return res.status(500).send(err);
//
//     return res.status(200).send(people);
//   });
// }
//
// //upload movie
// exports.uploadMovie = function(req, res, next) {
//   const { name, kind, url } = req.body;
//   debugger;
//   const movieInstance = new Movie({
//     name: name,
//     kind: kind,
//     url: url,
//     createdAt: Date.now(),
//   });
//   movieInstance.save(function(err){
//     if(err) {
//       return res.status(500).send(err);
//     }
//     return res.redirect('/getAllMovies');
//   });
// }
//
//
// //delete movies
//
// //update movie
