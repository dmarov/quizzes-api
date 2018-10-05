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

        let qb = knex('quiz')
            .where({ user_id: user.id });

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

        qb = qb.orderBy('sort')
            .offset(offset)
            .limit(limit)
            .toSQL()
            .toNative();

        let quizzes = await ctx.db.query(qb.sql, qb.bindings)
            .then(res => res.map(item => camelCaseKeys(item)));

        let origin = ctx.origin;
        let userName = ctx.params.user;
        let size = quizzes.length;

        let _links = await hal.quizzes.links({ origin, userName, offset, limit, total });
        let _embedded = await hal.quizzes.embedded({ origin, userName, quizzes });

        ctx.set('Content-Type', 'application/hal+json');
        ctx.body = { _embedded, _links, offset, limit, size, total };
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

        let quiz;
        try {
            quiz = await ctx.db.quiz.insert(fields)
                .then(res => camelCaseKeys(res));
        } catch(e) {
            ctx.status = 422;
            ctx.body = e.message;
            return;
        }

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

routes.patch(path, checkRole('admin'), checkUser(), user(),
    async (ctx, next) => {

        let user = ctx.state.user;
        let diff = ctx.request.body;

        if (!Array.isArray(diff)) {
            ctx.status = 422;
            ctx.body = e.message;
            return;
        }

        let quizzes;
        try {

            quizzes = await ctx.db.withTransaction(async tx => {

                let quizzes = [];

                for(let patch of diff) {

                    patch = snakeCaseKeys(patch);

                    let id = patch.id;
                    delete patch.id;
                    if (patch.user_id || patch.creation_date || patch.tags)
                        throw {code: 403, message: 'forbidden'};

                    let patchedQuizzes = await tx.quiz.update({
                        user_id: user.id, id,
                    },
                        patch
                    ).then(res => camelCaseKeys(res));

                    if (patchedQuizzes.length > 0) quizzes.push(patchedQuizzes[0]);
                    else throw {code: 404, message: 'quiz not found'};
                }

                return quizzes;
            });
        } catch(e) {
            ctx.status = e.code ? e.code : 500;
            ctx.body = e.message;
            return;
        }

        ctx.status = 204;
    }
);

module.exports = routes;
