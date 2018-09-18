'use strict';

const Router = require('koa-better-router');

const quizzesRoutes = require('./quizzes');
const quizRoutes = require('./quiz');
const quizTagsRoutes = require('./quiz-tags');
const quizTagRoutes = require('./quiz-tag');
const questions = require('./questions');
const question = require('./question');
const responses = require('./responses');
const response = require('./response');
const stats = require('./stats');

const routes = Router();

routes.extend(quizzesRoutes);
routes.extend(quizRoutes);
routes.extend(quizTagsRoutes);
routes.extend(quizTagRoutes);
routes.extend(questions);
routes.extend(question);
routes.extend(responses);
routes.extend(response);
routes.extend(stats);

module.exports = routes;
