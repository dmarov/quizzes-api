'use strict';

const camelCaseKeys = require('camelcase-keys');

module.exports = _ => {

    return async (ctx, next) => {

        let quizId = ctx.state.quiz.id;
        let responseId = ctx.params.responseId;

        let response = await ctx.db.response
            .findOne({ id: responseId });

        if (response === null) {
            ctx.status = 404;
            ctx.body = 'response not found';
        } else {
            ctx.state.response = camelCaseKeys(response);
            await next();
        }

    }
}
