'use strict';

const Request = require('request-promise-native');

module.exports.get = async (ctx, next) => {

    ctx.body = 'ok 1';
    await next();

};
