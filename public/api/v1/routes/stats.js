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

        let offset = parseInt(ctx.query.offset);
        if (!offset) offset = 0;

        let limit = parseInt(ctx.query.limit);
        if (!limit) limit = 30;

        let dateFrom = new Date(0).toISOString();
        let dateTo = new Date().toISOString();

        if (ctx.query.dateFrom)
            dateFrom = (new Date(Date.parse(ctx.query.dateFrom))).toISOString();

        if (ctx.query.dateTo)
            dateTo = (new Date(Date.parse(ctx.query.dateTo))).toISOString();

        let quiz = ctx.state.quiz;

        let qb = knex('question')
            .select()
            .where({ quiz_id: quiz.id });

        let tag = ctx.query.tag;

        if (tag) {
            let tags = tag;
            if (!Array.isArray(tags)) tags = [ tag ];
            qb = qb.where(knex.raw('tags @> :tags::jsonb', { tags: JSON.stringify(tags) }))
        }

        let qbCnt = qb.clone()
            .count()
            .toSQL()
            .toNative();

        let total = await ctx.db.query(qbCnt.sql, qbCnt.bindings)
            .then(res => res[0].count);

        qb = qb.toSQL()
            .toNative();

        let questions = await ctx.db.query(qb.sql, qb.bindings);

        let size = questions.length;

        let items = [];

        for (let question of questions) {

            let qb = knex('response')
                .select(knex.raw(`content->'${question.id}' as answer, COUNT(*)`))
                .whereBetween('creation_date', [ dateFrom, dateTo ])
                .where({ quiz_id: quiz.id })
                .groupBy(knex.raw('answer'))
                .toSQL()
                .toNative();

            let stats = await ctx.db.query(qb.sql, qb.bindings);
            items.push({ question, stats });
        }

        let origin = ctx.origin;
        let userName = ctx.params.user;
        let quizId = ctx.params.quizId;

        dateFrom = ctx.query.dateFrom;
        dateTo = ctx.query.dateTo;
        let _links = await hal.stats.links({ origin, userName, quizId,
            offset, limit, total, tag, dateFrom, dateTo });

        let _embedded = await hal.stats.embedded({ origin, userName, quizId, items });

        ctx.set('Content-Type', 'application/hal+json');
        ctx.body = { _embedded, _links, offset, limit, size };
    }
);

module.exports = routes;
