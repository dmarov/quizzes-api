'use strict';

const Request = require('request-promise-native');
const args = require('@lib/args.js');
 

module.exports = async (ctx, next) => {

    prefix = params.prefix;
    ctx.body = 'ok jwt';


    await next();

}
