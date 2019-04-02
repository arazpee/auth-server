// const jwt = require('jwt-simple');
// const config = require('../config');
//
// module.exports = function (user) {
//   const timestamp = new Date().getTime();
//   return jwt.encode({ id: user.id, iat: timestamp }, config.secret);
// }

const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (id) => {
  const token = jwt.sign({ id: id }, config.secret);
  return token;
}
