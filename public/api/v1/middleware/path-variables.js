'use strict';

const Router = require('koa-better-router');
const Request = require('request-promise-native');
const args = require('../../../lib/args.js');

const route = Router().loadMethods();
 
/*
 * parses given jwt if specified and sets permissions in ctx
 * */

route.get('/:path(.*)', async (ctx, next) => {

    console.log(args);
    ctx.body = 'ok';
    await next();

});

module.exports = route;
