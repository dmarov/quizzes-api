'use strict';

const prequest = require('request-promise-native');

// checks if jwt user is the same user as requested
module.exports = _ => {

    return async (ctx, next) => {

        let jwt = ctx.state.jwt;
        jwt && jwt.user === ctx.params.user ? await next() : ctx.status = 401;

    }
}
