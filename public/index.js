#!/usr/bin/env node

'use strict';

require('module-alias/register');

const args = require('@lib/args');
const Koa = require('koa');
const http = require('http');
const mount = require('koa-mount');

const apiV1Promise = require('./api/v1');
// const apiV2 = require('./api/v2');

let init = async _ => {

    let apiV1 = await apiV1Promise();
    // let app = await apiV1Promise();

    let app = new Koa();
    app.use(mount('/api/v1', apiV1))
    // app.use(mount('/api/v2', apiV2))
    app.use(mount('/', apiV1));

    let server = http.createServer(app.callback());
    server.listen(args.port, args.host)
};

init();
