const Router = require('koa-better-router');
const camelCaseKeys = require('camelcase-keys');
const snakeCaseKeys = require('snakecase-keys');
const knex = require('knex')({ client: 'pg' });

const { checkRole, checkUser, user } = require('../middleware');
const hal = require('../factory/hal');
const path = '/users/:user/quizzes';
const routes = Router().loadMethods();

routes.get(path, user(),
    async (ctx, next) => {

        let offset = parseInt(ctx.query.offset);
        if (!offset) offset = 0;

        let limit = parseInt(ctx.query.limit);
        if (!limit) limit = 30;

        let user = ctx.state.user;

        let quizzes = await ctx.db.quiz
            .find({ user_id: user.id }, { offset, limit })
            .then(res => res.map(item => camelCaseKeys(item)));

        let origin = ctx.origin;
        let userName = ctx.params.user;
        let size = quizzes.length;

        let _links = await hal.quizzes.links({ origin, userName, offset, limit, size });
        let _embedded = await hal.quizzes.embedded({ origin, userName, quizzes });

        ctx.set('Content-Type', 'application/hal+json');
        ctx.body = { _embedded, _links, offset, limit, size };
    }
);

routes.post(path, checkRole('admin'), checkUser(), user(),
    async (ctx, next) => {

        let user = ctx.state.user;

        let qb = knex('quiz')
            .max({max: 'sort'})
            .where({ user_id: user.id })
            .toSQL()
            .toNative();

        let maxSort = await ctx.db.query(qb.sql, qb.bindings)
            .then(res => res[0])
            .then(res => res ? res.max : 0);

        let sort = maxSort + 1;

        let fields = snakeCaseKeys(ctx.request.body);
        delete fields.id;
        fields.user_id = user.id;
        delete fields.creation_date;
        fields.sort = sort;
        delete fields.tags;

        let quiz = await ctx.db.quiz.insert(fields)
            .then(res => camelCaseKeys(res));

        let origin = ctx.origin;
        let userName = ctx.params.user;
        let quizId = quiz.id;

        let _links = await hal.quiz.links({ origin, userName, quizId });
        let _embedded = await hal.quiz.embedded({ origin, userName, quizId });

        ctx.set('Content-Type', 'application/hal+json');
        ctx.body = {
            ...quiz,
            _links,
            _embedded,
        };
    }
);

module.exports = routes;
