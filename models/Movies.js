const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
  name: { type: String },
  kind: { type: String },
  url: { type: String },
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

// moviesSchema.pre('save', function(next) {
//   var thisSchema = this;
//   thisSchema.updatedAt = Date.now();
//   next();
// });


module.exports = mongoose.model('movies', moviesSchema);
