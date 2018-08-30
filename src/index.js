#!/usr/bin/env node

'use strict';
/* namespases for nodejs */
require('module-alias/register');

const args = require('@lib/args');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-better-router');
const http = require('http');

const apiV1Route = require('./api/v1');
const apiV1Middleware = require('./api/v1/middleware/jwt-parser')

let app = new Koa();

app.use(bodyParser());

app.use(
    Router({ prefix: '/api/v1' })
        .extend(apiV1Route)
        .middleware()
);

app.use(
    apiV1Route
        .middleware()
);

let server = http.createServer(app.callback());
server.listen(args.port, args.host)
