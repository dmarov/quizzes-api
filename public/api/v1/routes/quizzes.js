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
            .where({ user_id: user.id })
            .orderBy('sort')
            .offset(offset)
            .limit(limit);

        let tags = ctx.query.tags;

        if (tags)
            qb = qb.where(knex.raw('tags @> :tags::jsonb', { tags: JSON.stringify(tags) }))

        qb = qb.toSQL()
            .toNative();

        let quizzes = await ctx.db.query(qb.sql, qb.bindings)
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

routes.patch(path, checkRole('admin'), checkUser(), user(),
    async (ctx, next) => {

        let user = ctx.state.user;
        let diff = ctx.request.body;

        let quizzes;
        try {

            quizzes = await ctx.db.withTransaction(async tx => {

                let quizzes = [];

                for(let patch of diff) {

                    let props = patch.props;
                    props = snakeCaseKeys(props);

                    delete props.id;
                    delete props.user_id;
                    delete props.creation_date;
                    delete props.tags;

                    if (patch.op == 'replace') {

                        let quiz = await tx.quiz.update({
                            user_id: user.id,
                            id: patch.id,
                        },
                            props
                        ).then(res => camelCaseKeys(res));

                        console.log(quiz);
                        if (quiz) quizzes.push(quiz);
                        else throw {code: 404, message: 'quiz not found'};

                    } else throw {code: 422, message: "invalid operation"};

                }

                return quizzes;
            });
        } catch(e) {
            ctx.status = e.code ? e.code : 500;
            ctx.body = e.message;
            return;
        }

        let origin = ctx.origin;
        let userName = ctx.params.user;

        let _links = await hal.quizzes.links({ origin, userName });
        let _embedded = await hal.quizzes.embedded({ origin, userName });

        ctx.set('Content-Type', 'application/hal+json');
        ctx.body = {
            _links,
            _embedded,
        };
    }
);
module.exports = routes;
