'use strict';

const prequest = require('request-promise-native');

module.exports = role => {

    return async (ctx, next) => {

        let jwt = ctx.state.jwt;
        jwt && jwt.role === role ? await next() : ctx.status = 401;

    }
}
