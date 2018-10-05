'use strict';

const camelCaseKeys = require('camelcase-keys');

module.exports = _ => {

    return async (ctx, next) => {

        let quizId = ctx.state.quiz.id;
        let questionId = ctx.params.questionId;

        let question = await ctx.db.question
            .findOne({ id: questionId, quiz_id: quizId });

        if (question === null) {
            ctx.status = 404;
            ctx.body = 'question not found';
        } else {
            ctx.state.question = camelCaseKeys(question);
            await next();
        }

    }
}
