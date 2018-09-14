'use strict';

const camelCaseKeys = require('camelcase-keys');

module.exports = _ => {

    return async (ctx, next) => {

        let userName = ctx.params.user;

        let user = await ctx.db.user
            .findOne({ name: userName });

        if (user === null) {
            ctx.status = 404;
            ctx.body = 'user not found';
        } else {
            ctx.state.user = camelCaseKeys(user);
            await next();
        }

    }
}
