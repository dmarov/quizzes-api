const Router = require('koa-better-router');
const camelCaseKeys = require('camelcase-keys');
const snakeCaseKeys = require('snakecase-keys');
const knex = require('knex')({ client: 'pg' });

const { checkRole, checkUser, user, quiz } = require('../middleware');
const hal = require('../factory/hal');
const path = '/users/:user/quizzes/:quizId/stats';
const routes = Router().loadMethods();

routes.get(path, user(), quiz(),
    async (ctx, next) => {

        let dateFrom = new Date(0).toISOString();
        let dateTo = new Date().toISOString();

        if (ctx.query.dateFrom)
            dateFrom = (new Date(Date.parse(ctx.query.dateFrom))).toISOString();

        if (ctx.query.dateTo)
            dateTo = (new Date(Date.parse(ctx.query.dateTo))).toISOString();

        let quiz = ctx.state.quiz;

        let qb = knex('question')
            .select()
            .where({ quiz_id: quiz.id })
            .toSQL()
            .toNative();

        let questions = await ctx.db.query(qb.sql, qb.bindings);

        let items = [];

        for (let question of questions) {

            let qb = knex('response')
                .select(knex.raw(`content->'${question.id}' as answer, COUNT(*)`))
                .whereBetween('creation_date', [ dateFrom, dateTo ])
                .where({ quiz_id: quiz.id })
                .groupBy(knex.raw(`answer`))
                .toSQL()
                .toNative();

            let stats = await ctx.db.query(qb.sql, qb.bindings);
            items.push({ question, stats });
        }

        let origin = ctx.origin;
        let userName = ctx.params.user;
        let quizId = ctx.params.quizId;

        let _links = await hal.stats.links({ origin, userName, quizId });
        let _embedded = await hal.stats.embedded({ origin, userName, quizId });

        ctx.set('Content-Type', 'application/hal+json');
        ctx.body = { items, _embedded, _links };
    }
);

module.exports = routes;
