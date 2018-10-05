const Router = require('koa-better-router');
const camelCaseKeys = require('camelcase-keys');
const snakeCaseKeys = require('snakecase-keys');
const knex = require('knex')({ client: 'pg' });

const { checkRole, checkUser, user, quiz, question } = require('../middleware');
const hal = require('../factory/hal');
const path = '/users/:user/quizzes/:quizId/stats/:questionId';
const routes = Router().loadMethods();

routes.get(path, user(), quiz(), question(),
    async (ctx, next) => {

        let quiz = ctx.state.quiz;

        let dateFrom = new Date(0).toISOString();
        let dateTo = new Date().toISOString();

        if (ctx.query.dateFrom)
            dateFrom = (new Date(Date.parse(ctx.query.dateFrom))).toISOString();

        if (ctx.query.dateTo)
            dateTo = (new Date(Date.parse(ctx.query.dateTo))).toISOString();

        let question = ctx.state.question;

        let qb = knex('response')
            .select(knex.raw(`content->'${question.id}' as answer, COUNT(*)`))
            .whereBetween('creation_date', [ dateFrom, dateTo ])
            .where({ quiz_id: quiz.id })
            .groupBy(knex.raw('answer'))
            .toSQL()
            .toNative();

        let stats = await ctx.db.query(qb.sql, qb.bindings);

        let origin = ctx.origin;
        let userName = ctx.params.user;
        let quizId = ctx.params.quizId;
        let questionId = ctx.params.questionId;

        let _links = await hal.stat.links({ origin, userName, quizId, questionId });
        let _embedded = await hal.stat.embedded({ origin, userName, quizId, questionId });

        ctx.set('Content-Type', 'application/hal+json');
        ctx.body = { question, stats, _embedded, _links };
    }
);

module.exports = routes;
