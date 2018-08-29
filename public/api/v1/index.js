'use strict';

const Router = require('koa-better-router');

const doc = require('./doc');

const routes = Router();

routes.extend(doc);

module.exports = routes;

