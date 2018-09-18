const Router = require('koa-better-router');
const camelCaseKeys = require('camelcase-keys');
const snakeCaseKeys = require('snakecase-keys');
const knex = require('knex')({ client: 'pg' });

const { checkRole, checkUser, user, quiz } = require('../middleware');
const hal = require('../factory/hal');
const path = '/users/:user/quizzes/:quizId/responses';
const routes = Router().loadMethods();

routes.post(path, user(), quiz(),
    async (ctx, next) => {

        let quiz = ctx.state.quiz;

        let content = ctx.request.body;

        let response = await ctx.db.response.insert({ quiz_id: quiz.id, content })
            .then(res => camelCaseKeys(res));

        let origin = ctx.origin;
        let userName = ctx.params.user;
        let quizId = quiz.id;
        let responseId = response.id;

        let _links = await hal.response.links({ origin, userName, quizId, responseId });
        let _embedded = await hal.response.embedded({ origin, userName, quizId, responseId });

        ctx.set('Content-Type', 'application/hal+json');
        ctx.body = {
            ...response,
            _links,
            _embedded,
        };
    }
);

module.exports = routes;
