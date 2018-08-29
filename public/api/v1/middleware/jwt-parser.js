'use strict';

const Router = require('koa-better-router');
const Request = require('request-promise-native');
const args = require('../../../lib/args.js');

const route = Router().loadMethods();
 
route.get('/:path(.*)', async (ctx, next) => {

    try {

        // let result = request(args.jwtDecoderUrl)

        ctx.state.jwt = {
            user: "Bob",
            permissions: {},
        };

    } catch(e) {
    
    }

    await next();

});

module.exports = route;
