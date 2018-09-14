'use strict';

const Router = require('koa-better-router');

const quizzesRoutes = require('./quizzes');
const quizRoutes = require('./quiz');
const quizTagsRoutes = require('./quiz-tags');
const quizTagRoutes = require('./quiz-tag');
const questions = require('./questions');

const routes = Router();

routes.extend(quizzesRoutes);
routes.extend(quizRoutes);
routes.extend(quizTagsRoutes);
routes.extend(quizTagRoutes);
routes.extend(questions);

module.exports = routes;
