'use strict';

const Router = require('koa-better-router');
const Request = require('request-promise-native');

const route = Router().loadMethods();
 
route.get('/users', async (ctx, next) => {

    ctx.body = 'ok 1';
    await next();

});

module.exports = route;
