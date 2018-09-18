const jwtParser = require('./jwt-parser');
const checkRole = require('./check-role');
const checkUser = require('./check-user');
const user = require('./user');
const quiz = require('./quiz');
const question = require('./question');
const response = require('./response');

module.exports.jwtParser = jwtParser;
module.exports.checkRole = checkRole;
module.exports.checkUser = checkUser;
module.exports.user = user;
module.exports.quiz = quiz;
module.exports.question = question;
module.exports.response = response;
