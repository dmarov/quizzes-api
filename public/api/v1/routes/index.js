'use strict';

const Router = require('koa-better-router');

const quizzesRoutes = require('./quizzes');
const quizRoutes = require('./quiz');

const routes = Router();

routes.extend(quizzesRoutes);
routes.extend(quizRoutes);

module.exports = routes;
