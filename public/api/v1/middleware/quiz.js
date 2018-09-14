'use strict';

const camelCaseKeys = require('camelcase-keys');

module.exports = _ => {

    return async (ctx, next) => {

        let user = ctx.state.user;
        let quizId = ctx.params.quizId;

        let quiz = await ctx.db.quiz
            .findOne({ id: quizId })

        if (quiz === null) {
            ctx.status = 404;
            ctx.body = 'quiz not found';
        } else {
            ctx.state.quiz = camelCaseKeys(quiz);
            await next();
        }

    }
}
