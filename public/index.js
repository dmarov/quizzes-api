#!/usr/bin/env node

'use strict';

const args = require('./lib/args');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-better-router');
const http = require('http');
const apiV1Route = require('./api/v1');

let app = new Koa();

app.use(bodyParser());

let apiV1FullRoute = Router({ prefix: '/api/v1' });
apiV1FullRoute.extend(apiV1Route);
app.use(apiV1FullRoute.middleware());

let server = http.createServer(app.callback());
server.listen(args.port, args.host)
