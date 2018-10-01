const Router = require('koa-better-router');
const camelCaseKeys = require('camelcase-keys');
const snakeCaseKeys = require('snakecase-keys');
const knex = require('knex')({ client: 'pg' });

const { checkRole, checkUser, user, quiz } = require('../middleware');
const hal = require('../factory/hal');
const path = '/users/:user/quizzes/:quizId/questions';
const routes = Router().loadMethods();

const validator = require('../factory/validator');
const validateContent = validator.question.content;
const validateResponse = validator.question.response;

routes.get(path, user(), quiz(),
    async (ctx, next) => {

        let offset = parseInt(ctx.query.offset);
        if (!offset) offset = 0;

        let limit = parseInt(ctx.query.limit);
        if (!limit) limit = 30;

        let quiz = ctx.state.quiz;

        let qb = knex('question')
            .where({ quiz_id: quiz.id })
            .offset(offset)
            .limit(limit);

        let tags = ctx.query.tags;

        if (tags)
            qb = qb.where(knex.raw('tags @> :tags::jsonb', { tags: JSON.stringify(tags) }))

        qb = qb.toSQL()
            .toNative();

        let questions = await ctx.db.query(qb.sql, qb.bindings)
            .then(res => res.map(item => camelCaseKeys(item)));

        let origin = ctx.origin;
        let userName = ctx.params.user;
        let quizId = ctx.params.quizId;
        let size = questions.length;

        let _links = await hal.questions.links({ origin, userName, quizId, offset, limit, size });
        let _embedded = await hal.questions.embedded({ origin, userName, quizId, questions });

        ctx.set('Content-Type', 'application/hal+json');
        ctx.body = { _embedded, _links, offset, limit, size };
    }
);

routes.post(path, checkRole('admin'), checkUser(), user(), quiz(),
    async (ctx, next) => {

        let quiz = ctx.state.quiz;

        let qb = knex('question')
            .max({max: 'sort'})
            .where({ quiz_id: quiz.id })
            .toSQL()
            .toNative();

        let maxSort = await ctx.db.query(qb.sql, qb.bindings)
            .then(res => res[0])
            .then(res => res ? res.max : 0);

        let sort = maxSort + 1;

        let fields = snakeCaseKeys(ctx.request.body);
        delete fields.id;
        fields.quiz_id = quiz.id;
        delete fields.creation_date;
        fields.sort = sort;
        delete fields.tags;

        if (fields.content)
        try {
            fields.content = await validateContent(fields.content);
        } catch (e) {
            ctx.status = 422;
            ctx.body = 'invalid question content specified';
            return;
        }

        if (fields.response)
        try {
            fields.response = await validateResponse(fields.response);
        } catch (e) {
            ctx.status = 422;
            ctx.body = 'invalid question response specified';
            return;
        }

        let question = await ctx.db.question.insert(fields)
            .then(res => camelCaseKeys(res));

        let origin = ctx.origin;
        let userName = ctx.params.user;
        let quizId = quiz.id;
        let questionId = question.id;

        let _links = await hal.question.links({ origin, userName, quizId, questionId });
        let _embedded = await hal.question.embedded({ origin, userName, quizId, questionId });

        ctx.set('Content-Type', 'application/hal+json');
        ctx.body = {
            ...question,
            _links,
            _embedded,
        };
    }
);

module.exports = routes;
