'use strict';

const Router = require('koa-better-router');

const users = require('./users');
const user = require('./user');
const quizzes = require('./quizzes');
const quiz = require('./quiz');
const quizTags = require('./quiz-tags');
const quizTag = require('./quiz-tag');
const questions = require('./questions');
const question = require('./question');
const questionTags = require('./question-tags');
const questionTag = require('./question-tag');
const responses = require('./responses');
const response = require('./response');
const stats = require('./stats');
const stat = require('./stat');

const routes = Router();

routes.extend(users);
routes.extend(user);
routes.extend(quizzes);
routes.extend(quiz);
routes.extend(quizTags);
routes.extend(quizTag);
routes.extend(questions);
routes.extend(question);
routes.extend(questionTags);
routes.extend(questionTag);
routes.extend(responses);
routes.extend(response);
routes.extend(stats);
routes.extend(stat);

module.exports = routes;
